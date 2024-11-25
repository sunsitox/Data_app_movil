// Peticiones GET, PUT, DELETE
export interface IMaterias {
    id: number;
    name: string;
    code: string;
    seccion: string;
    horarios: IHorario[];
}

// Petición POST
export interface IMateria {
    name: string;
    code: string;
    seccion: string;
    horarios: IHorario[];
}

// Interfaz para los horarios
export interface IHorario {
    dia: string;
    hora_inicio: string;
    hora_fin: string;
}
