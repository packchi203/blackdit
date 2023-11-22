import { Account } from "./account";

export interface Comment {
     id:number
     account:Account
     content:string
     voteType:string
     voteCount:number
     vote:boolean
     reply:any
     bookmark:boolean
     children:boolean
     createdAt:string
}