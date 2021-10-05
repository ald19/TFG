export class Recipe {
    constructor(id = -1, nombre = '', descripcion = '', duracion = '', extra = '', fecha_publicacion = '', valoracion = 0, id_usuario = -1, nickname = ''){
        this.id = id,
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.duracion = duracion,
        this.extra = extra,
        this.fecha_publicacion = fecha_publicacion,
        this.valoracion = valoracion,
        this.id_usuario = id_usuario,
        this.nickname = nickname
    }

    id: number;
    nombre: string;
    descripcion: string;
    duracion: string;
    extra: string;
    fecha_publicacion: string;
    valoracion: number;
    id_usuario: number;
    nickname: string;
}
