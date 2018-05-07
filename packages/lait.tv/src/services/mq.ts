import * as amqplib from "amqplib";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import { Service } from "typedi";

/**
 * rabbitmq服务
 */
@Service({ global: false })
export class MQueueService {
    public queueName: string;

    private connection: amqplib.Connection;
    private channel: amqplib.Channel;
    private consume: amqplib.Replies.Consume;
    private exchange: amqplib.Replies.AssertExchange;

    /**
     * 初始化消费队列
     * 1. 初始化queue
     * 2. 创建exchange
     * 3. 创建queue
     * 4. 绑定queue的路由
     * 5. 开始消费
     * @param rabbitmqConfig mq的配置
     * @param queueName      mq要消费的q名称
     * @param consumeMsg     消息的消费方法
     * @param prefetch       每次获取的消息数量
     * @param delay          延迟时间
     */
    public async initConsume(
        rabbitmqConfig: { url: string, options: any },
        queueName: string,
        consumeMsg: Function,
        config: any
    ): Promise<boolean> {
        let count = 0, queue: amqplib.Replies.AssertQueue;

        this.queueName = queueName;

        try {
            await this.initQueue(rabbitmqConfig);
            this.exchange = await this.channel.assertExchange("amqp.topic", "topic", { durable: true });
            queue = await this.getQueueMessageCount(this.queueName);

            await this.channel.bindQueue(queue.queue, this.exchange.exchange, queueName);
            await this.channel.prefetch(config.prefech || 3);
            console.log(`开始消费queue:${queue.queue}`);

            // 1. 序列化queue的消息
            // 2. 调用消费方法
            this.consume = await this.channel.consume(queue.queue, async (msg: amqplib.Message | null) => {
                let msgData: any;

                // 如果queue的msg不能正常序列化，则丢弃掉当前消息
                try {
                    msgData = await this.getQueueItemFromMsg(msg as any);
                } catch (e) {
                    if (this.channel) {
                        this.channel.nack(msg as any);
                    }

                    return;
                }

                await bluebird.delay(config.delay || 1000);

                try {
                    let data = await consumeMsg({ config, data: msgData });

                    if (this.channel) {
                        this.channel.ack(msg as any);
                    }
                } catch (err) {
                    if (this.channel) {
                        this.channel.nack(msg as any);
                    }
                }
                return null;
            }, { noAck: false, exclusive: false });
        } catch (e) {
            return false;
        }

        return queue.consumerCount + queue.messageCount === 0;
    }

    /**
     * 
     * @param qName 获得queue的消费数量
     */
    public async getQueueMessageCount(qName: string): Promise<amqplib.Replies.AssertQueue> {
        if (!this.channel) {
            throw new Error("没有建立channel！");
        }

        let queue: amqplib.Replies.AssertQueue = await this.channel.assertQueue(qName, { durable: true, exclusive: false });

        return queue;
    }

    /**
     * 数据入queue
     * @param items       要入queue的消息
     * @param routingKey  路由key
     */
    public addItemsToQueue(items: Array<any>, routingKey?: string) {
        let rtn = true;

        if (!this.channel) {
            throw new Error("没有建立channel连接！");
        }
        items.forEach((item) => {
            let push = this.channel.publish(this.exchange.exchange, routingKey || this.queueName, new Buffer(JSON.stringify(item)), {});

            rtn = rtn && push;
        });

        return rtn;
    }

    /**
     * 销毁队列
     * @param purge 是否清楚数据
     */
    public async destroy(purge = false): Promise<void> {
        try {
            await this.channel.nackAll(true);
            await this.channel.cancel(this.consume.consumerTag);
            if (purge) {
                await this.channel.deleteQueue(this.queueName);
            }
            await this.channel.close();
            await this.connection.close();

            delete this.channel;
            delete this.connection;
            delete this.consume;
            delete this.exchange;

            console.log("queue stoped!");
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 初始化队列
     * @param rabbitmqConfig mq的配置
     */
    private async initQueue(rabbitmqConfig: { url: string, options: any }): Promise<void> {
        if (this.channel) {
            return;
        }

        this.connection = await amqplib.connect(rabbitmqConfig.url, rabbitmqConfig.options);
        this.channel = await this.connection.createConfirmChannel();

        this.channel.on("error", (err) => {
            console.log("channel error", err);
        });
        this.channel.on("close", () => {
            console.log("channel closed!");
        });
        console.log("mq connection ok!");
    }

    /**
     * 提取queueItem
     * @param msg 消息体
     */
    private async getQueueItemFromMsg(msg: amqplib.Message): Promise<any> {
        let queueItem;

        try {
            queueItem = JSON.parse(msg.content.toString());
        } catch (e) {
            console.log(e);
            throw e;
        }

        return queueItem;
    }
}
