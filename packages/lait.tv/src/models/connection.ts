import { createConnection, Connection, Repository, ObjectType } from "typeorm";
import { Token } from "typedi";

export interface IConnection {
    
}

export const MysqlToken = new Token<IConnection>("default"); 
export const ElasticToken = new Token<IConnection>("db.elastic"); 
