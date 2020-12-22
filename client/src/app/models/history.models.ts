interface _historyUser{
    _id: string;
    name: string;
}

export class history{

    constructor(
        public description: string,
        public money: string,
        public reg_time: string,
        public user: _historyUser,   

    ){}
}