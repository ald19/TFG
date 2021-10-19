export class User {
    constructor(id = -1, nombre = '', nickname = '', email = '', password = '', fecha_nacimiento = ''){
        this.id = id,
        this.nombre = nombre,
        this.nickname = nickname,
        this.email = email,
        this.password = password,
        this.fecha_nacimiento = fecha_nacimiento
    }

    id: number;
    nombre: string;
    nickname: string;
    email: string;
    password: string;
    fecha_nacimiento: string;
}
