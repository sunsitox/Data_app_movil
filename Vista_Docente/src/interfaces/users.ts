export interface Users{
    id:string;
    username:string;
    password:string;
    email:string;
    rut:string;
    clases:any[];
    isactive:boolean;
    isAlumno:boolean;
    isProfesor:boolean;
}

export interface UserNuevo{
    username:string;
    password:string;
    email:string;
    rut:string;
    clases:any[];
    isactive:boolean;
    isAlumno:boolean;
    isProfesor:boolean;
}

export interface Iclase{
    name:string;
    code:string;
    seccion:string;
}