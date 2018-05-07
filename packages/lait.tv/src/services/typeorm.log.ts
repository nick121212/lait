import { Service, Inject } from "typedi";
import { Logger, QueryRunner } from "typeorm";
import { LogService } from "./index";

/**
 * 自定义数据库log输出
 */
@Service({ global: true })
export class PinoLogger implements Logger {

    constructor(private $log: LogService) {

    }
    /**
     * Logs query and parameters used in it.
     */
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this.$log.logger.info({
            dbOpt: {
                query,
                parameters
            }
        });
    }
    /**
     * Logs query that is failed.
     */
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this.$log.logger.error({
            dbOpt: {
                query,
                error,
                parameters
            }
        });
    }
    /**
     * Logs query that is slow.
     */
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this.$log.logger.warn({
            dbOpt: {
                query,
                time,
                parameters
            }
        });
    }
    /**
     * Logs events from the schema build process.
     */
    logSchemaBuild(message: string, queryRunner?: QueryRunner): any {

    }
    /**
     * Logs events from the migrations run process.
     */
    logMigration(message: string, queryRunner?: QueryRunner): any {

    }
    /**
     * Perform logging using given logger, or by default to the console.
     * Log has its own level and message.
     */
    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {

    }
}