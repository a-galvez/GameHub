import { useState, type FormEvent } from 'react'
import type { Juego, EditarJuegoDto } from '../types/juego.types'
import { editarJuegoAsync, extraerMensajeErrorBackend } from '../api/juegosApi'

interface EditarJuegoFormProps {
    juego: Juego
    onJuegoEditado: () => void
    onCancelar: () => void
}

export function EditarJuegoForm({
    juego,
    onJuegoEditado,
    onCancelar
}: EditarJuegoFormProps) {

    const [titulo, setTitulo] = useState(juego.titulo)
    const [descripcion, setDescripcion] = useState(juego.descripcion ?? '')
    const [fechaLanzamiento, setFechaLanzamiento] = useState(juego.fechaLanzamiento ?? '')
    const [desarrollador, setDesarrollador] = useState(juego.desarrollador ?? '')
    const [distribuidor, setDistribuidor] = useState(juego.distribuidor ?? '')
    const [plataforma, setPlataforma] = useState(juego.plataforma ?? '')
    const [portadaUrl, setPortadaUrl] = useState(juego.portadaUrl ?? '')

    const [guardando, setGuardando] = useState(false)
    const [errorServidor, setErrorServidor] = useState<string | null>(null)

    const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setGuardando(true)
            setErrorServidor(null)

            const juegoActualizado: EditarJuegoDto = {
                titulo,
                descripcion,
                fechaLanzamiento,
                desarrollador,
                distribuidor,
                plataforma,
                portadaUrl
            }

            await editarJuegoAsync(juego.id, juegoActualizado)

            onJuegoEditado()

        } catch (error) {
            const mensajeRealDeNet = extraerMensajeErrorBackend(error)

            console.error('Error al editar el juego:', error)
            setErrorServidor(mensajeRealDeNet)

        } finally {
            setGuardando(false)
        }
    }

    return (
        <form
            onSubmit={manejarEnvio}
            className="bg-slate-800/90 border border-indigo-500/40 rounded-xl p-5 mb-8 shadow-lg"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white">
                    Editar juego
                </h2>

                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                    PUT /api/juegos/{juego.id}
                </span>
            </div>

            <div className="flex flex-col gap-5">

                {/* Título */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="titulo" className="text-sm font-medium text-slate-300">
                        Título del juego
                    </label>

                    <input
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        disabled={guardando}
                        required
                        maxLength={100}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                    />
                </div>

                {/* Descripción */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="descripcion" className="text-sm font-medium text-slate-300">
                        Descripción del juego
                    </label>

                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        disabled={guardando}
                        maxLength={2000}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white resize-y"
                    />
                </div>

                {/* Fecha, desarrollador y distribuidor */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fechaLanzamiento" className="text-sm font-medium text-slate-300">
                            Fecha de lanzamiento
                        </label>

                        <input
                            id="fechaLanzamiento"
                            type="date"
                            value={fechaLanzamiento}
                            onChange={(e) => setFechaLanzamiento(e.target.value)}
                            disabled={guardando}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="desarrollador" className="text-sm font-medium text-slate-300">
                            Desarrollador
                        </label>

                        <input
                            id="desarrollador"
                            type="text"
                            value={desarrollador}
                            onChange={(e) => setDesarrollador(e.target.value)}
                            disabled={guardando}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="distribuidor" className="text-sm font-medium text-slate-300">
                            Distribuidor
                        </label>

                        <input
                            id="distribuidor"
                            type="text"
                            value={distribuidor}
                            onChange={(e) => setDistribuidor(e.target.value)}
                            disabled={guardando}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                        />
                    </div>

                </div>

                {/* Plataforma y portada */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <div className="flex flex-col gap-1">
                        <label htmlFor="plataforma" className="text-sm font-medium text-slate-300">
                            Plataformas
                        </label>

                        <input
                            id="plataforma"
                            type="text"
                            value={plataforma}
                            onChange={(e) => setPlataforma(e.target.value)}
                            disabled={guardando}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="portadaUrl" className="text-sm font-medium text-slate-300">
                            URL de la portada
                        </label>

                        <input
                            id="portadaUrl"
                            type="url"
                            value={portadaUrl}
                            onChange={(e) => setPortadaUrl(e.target.value)}
                            disabled={guardando}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                        />
                    </div>

                </div>

                {/* Botones */}
                <div className="flex flex-row justify-end gap-3 pt-3 border-t border-slate-700">

                    <button
                        type="button"
                        onClick={onCancelar}
                        disabled={guardando}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm px-4 py-2.5 rounded-lg cursor-pointer disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={guardando}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-lg cursor-pointer disabled:opacity-50"
                    >
                        {guardando ? 'Guardando...' : 'Guardar cambios'}
                    </button>

                </div>

            </div>

            {/* Errores del backend */}
            {errorServidor && (
                <div className="mt-4 bg-red-950/60 border border-red-500/40 rounded-lg p-3 text-xs text-red-300 flex items-center gap-2">
                    <span>
                        <strong>Error al actualizar el juego:</strong> {errorServidor}
                    </span>
                </div>
            )}

        </form>
    )
}