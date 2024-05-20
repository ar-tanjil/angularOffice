export class NotifyModel{
    constructor(
        public id?: number,
        public senderId?: string,
        public recipientId?: string,
        public content?: string,
        public type?: string
    ){}
}