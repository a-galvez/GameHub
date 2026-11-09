import { useState } from 'react'
import type { Juego } from '../types/juego.types'
import { eliminarJuegoAsync, extraerMensajeErrorBackend } from '../api/juegosApi'

interface EliminarJuegoModalProps {
    juego: Juego
    onJuegoEliminado: (id: number) => void
    onCancelar: () => void
}

export function EliminarJuegoModal({
    juego,
    onJuegoEliminado,
    onCancelar
}: EliminarJuegoModalProps) {

    const [eliminando, setEliminando] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const manejarEliminacion = async () => {
        try {
            setEliminando(true)
            setError(null)

            await eliminarJuegoAsync(juego.id)

            onJuegoEliminado(juego.id)

        } catch (error) {
            console.error('Error al eliminar el juego:', error)
            setError(extraerMensajeErrorBackend(error))
        } finally {
            setEliminando(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">

                <h2 className="text-xl font-bold text-white mb-3">
                    Confirmar eliminación
                </h2>

                <p className="text-slate-300 mb-4">
                    ¿Estás seguro de que deseas eliminar el juego{' '}
                    <strong className="text-white">{juego.titulo}</strong>?
                </p>

                {error && (
                    <p className="text-sm text-red-400 mb-4">
                        {error}
                    </p>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancelar}
                        disabled={eliminando}
                        className="w-full bg-cyan-950 text-slate-400 hover:bg-cyan-700 text-sm font-medium py-2.5 px-4 cursor-pointer rounded-lg border border-slate-700"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={manejarEliminacion}
                        disabled={eliminando}
                        className="w-full bg-red-950 text-slate-400 hover:bg-red-700 text-sm font-medium py-2.5 px-4 cursor-pointer rounded-lg border border-slate-700"
                    >
                        {eliminando ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>

            </div>
        </div>
    )
}