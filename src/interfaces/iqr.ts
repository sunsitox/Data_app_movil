export interface Qr {
    id: string;
    clase: string;
    code: string;
    seccion: string;
    profesor: string;
    alumno: string;
    fecha_generacion: string;
    hora_generacion: string;
    hora_validacion: string;
    estado:boolean;
}

export interface QrNuevo {
    clase: string;
    code: string;
    seccion: string;
    profesor: string;
    alumno: string;
    fecha_generacion: string;
    hora_generacion: string;
    hora_validacion: string;
    estado:boolean;
}