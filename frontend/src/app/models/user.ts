export class User {
    constructor(id = '', name = '', nickname = '', email = '', password = '', birth_date = ''){
        this.id = id,
        this.name = name,
        this.nickname = nickname,
        this.email = email,
        this.password = password,
        this.birth_date = birth_date
    }

    id: string;
    name: string;
    nickname: string;
    email: string;
    password: string;
    birth_date: string;
}
