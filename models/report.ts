import { Account } from "./account";

export interface Report {
     id:number
     account:Account
     reason:string
     reportStatus:string
     reportType:string
     createdAt:string
}