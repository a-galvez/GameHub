import axios from 'axios'
import type { Juego, CrearJuegoDto, FluentValidationError, EditarJuegoDto } from '../types/juego.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
    console.error('ERROR CRÍTICO: No se detectó VITE_API_BASE_URL en frontend/.env')
}

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// 1. Endpoint GET: Obtener todo el catálogo
export const obtenerJuegosAsync = async (): Promise<Juego[]> => {
    const respuesta = await apiClient.get<Juego[]>('/juegos')

    if (!Array.isArray(respuesta.data)) {
        throw new Error('La respuesta recibida no es un arreglo JSON válido.')
    }

    return respuesta.data
}

export const obtenerJuegoAsync = async (idJuego: number): Promise<Juego> => {
    const respuesta = await apiClient.get<Juego>(`/juegos/${idJuego}`)
    return respuesta.data
}

export const crearJuegoAsync = async (nuevoJuego: CrearJuegoDto): Promise<Juego> => {
    const respuesta = await apiClient.post<Juego>('/juegos', nuevoJuego)
    return respuesta.data
}

export const editarJuegoAsync = async (idJuego: number, nuevoJuego: EditarJuegoDto): Promise<void> => {
    await apiClient.put(`/juegos/${idJuego}`, nuevoJuego)
}

export const eliminarJuegoAsync = async (id: number): Promise<void> => {
    await apiClient.delete(`/juegos/${id}`)
}

export const extraerMensajeErrorBackend = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        // Caso A: El servidor .NET está apagado o el navegador bloqueó por CORS
        if (!error.response) {
            return 'Sin respuesta del servidor (.NET apagado o bloqueo de seguridad CORS en el navegador).'
        }

        const status = error.response.status
        const data = error.response.data

        // Caso B: Arreglo de errores devuelto por FluentValidation en .NET -> [ { propertyName, errorMessage }, ... ]
        if (Array.isArray(data)) {
            const erroresFluent = (data as FluentValidationError[])
                .map((item) => item?.errorMessage)
                .filter((msg): msg is string => typeof msg === 'string' && msg.trim().length > 0)

            if (erroresFluent.length > 0) {
                return `[HTTP ${status}] ${erroresFluent.join(' | ')}`
            }
        }

        // Caso C: El controlador de .NET devolvió un string directo -> BadRequest("Mensaje...")
        if (typeof data === 'string' && data.trim().length > 0) {
            return `[HTTP ${status}] ${data}`
        }

        // Caso D: El servidor devolvió un objeto JSON (ProblemDetails o { error / mensaje })
        if (data && typeof data === 'object') {
            const obj = data as Record<string, unknown>

            if ('errors' in obj && obj.errors && typeof obj.errors === 'object') {
                const listaErrores = Object.values(obj.errors as Record<string, string[]>).flat()
                if (listaErrores.length > 0) {
                    return `[HTTP ${status}] ${listaErrores.join(' | ')}`
                }
            }

            const mensajeExplicito = obj.error || obj.mensaje || obj.message || obj.detail || obj.title
            if (typeof mensajeExplicito === 'string' && mensajeExplicito.trim().length > 0) {
                return `[HTTP ${status}] ${mensajeExplicito}`
            }
        }

        return `[HTTP ${status}] El servidor .NET rechazó la operación.`
    }

    return error instanceof Error ? error.message : 'Error inesperado en la aplicación.'
}
