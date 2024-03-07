export class AuthModel{
    constructor(
        public username?: string,
        public password?: string
    ){}
}

export class JwtToken{
    constructor(
        public token?: string
    ){}
}