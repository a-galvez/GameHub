export interface Juego {
    id: number;
    titulo: string;
    descripcion: string;
    fechaLanzamiento: string;
    desarrollador: string;
    distribuidor: string;
    plataforma: string;
    portadaUrl: string;
}

export interface CrearJuegoDto {
    titulo: string;
    descripcion: string;
    fechaLanzamiento: string;
    desarrollador: string;
    distribuidor: string;
    plataforma: string;
    portadaUrl: string;
}

export interface EditarJuegoDto {
    titulo: string;
    descripcion: string;
    fechaLanzamiento: string;
    desarrollador: string;
    distribuidor: string;
    plataforma: string;
    portadaUrl: string;
}

export interface FluentValidationError {
    propertyName: string;
    errorMessage: string;
    attemptedValue?: unknown;
    errorCode?: string;
}
