import { ISession } from "connect-typeorm";
export declare class SessionModel implements ISession {
    expiredAt: number;
    id: string;
    json: string;
}
