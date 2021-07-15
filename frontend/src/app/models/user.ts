export class User {
    constructor(id = -1, name = '', nickname = '', email = '', password = '', birth_date = ''){
        this.id = id,
        this.name = name,
        this.nickname = nickname,
        this.email = email,
        this.password = password,
        this.birth_date = birth_date
    }

    id: number;
    name: string;
    nickname: string;
    email: string;
    password: string;
    birth_date: string;
}
