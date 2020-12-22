interface _balanceUser{
    _id: string;
    name: string;
}

export class balance{

    constructor(
        public money: string,
        public user: _balanceUser,   

    ){}
}