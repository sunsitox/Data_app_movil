export interface Users{
    id:number;
    username:string;
    password:string;
    email:string;
    rut:string;
    isactive:boolean;
    isAlumno:boolean;
    isProfesor:boolean;
}

export interface UserNuevo{
    username:string;
    password:string;
    email:string;
    rut:string;
    isactive:boolean;
    isAlumno:boolean;
    isProfesor:boolean;
}
