import { Token } from "typedi";
export interface IConnection {
}
export declare const MysqlToken: Token<IConnection>;
export declare const ElasticToken: Token<IConnection>;
