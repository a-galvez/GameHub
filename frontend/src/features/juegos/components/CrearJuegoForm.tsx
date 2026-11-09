import { useState, type FormEvent } from 'react'
import type { Juego } from '../types/juego.types'
import { crearJuegoAsync, extraerMensajeErrorBackend } from '../api/juegosApi'

interface CrearJuegoFormProps {
    onJuegoCreado: (nuevoJuego: Juego) => void;
    onCancelar: () => void;
}

export function CrearJuegoForm({ onJuegoCreado, onCancelar }: CrearJuegoFormProps) {
    const [titulo, setTitulo] = useState<string>('')
    const [descripcion, setDescripcion] = useState<string>('')
    const [fechaLanzamiento, setFechaLanzamiento] = useState<string>('')
    const [desarrollador, setDesarrollador] = useState<string>('')
    const [distribuidor, setDistribuidor] = useState<string>('')
    const [plataforma, setPlataforma] = useState<string>('')
    const [portadaUrl, setPortadaUrl] = useState<string>('')
    const [guardando, setGuardando] = useState<boolean>(false)
    const [errorServidor, setErrorServidor] = useState<string | null>(null)

    const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Evita el F5 nativo del navegador

        try {
            setGuardando(true)
            setErrorServidor(null)

            // ⚠ FASE 1: Enviamos el dato crudo sin validar en el Frontend para poner a prueba el Backend
            const juegoCreado = await crearJuegoAsync({ titulo, descripcion, fechaLanzamiento, desarrollador, distribuidor, plataforma, portadaUrl })

            setTitulo('')
            onJuegoCreado(juegoCreado)
        } catch (error) {
            // Extraemos los mensajes exactos del arreglo ValidationFailure[] de .NET
            const mensajeRealDeNet = extraerMensajeErrorBackend(error)
            console.error('Auditoría del rechazo de .NET:', error)
            setErrorServidor(mensajeRealDeNet)
        } finally {
            setGuardando(false)
        }
    }

    return (
        <form onSubmit={manejarEnvio} className="bg-slate-800/90 border border-indigo-500/40 rounded-xl p-5 mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white">Registrar Nuevo Juego</h2>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                    POST /api/juegos
                </span>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 mb-5">
                        <label className="text-sm font-medium text-slate-300">
                            Título del juego
                        </label>
                        <input
                            id="titulo"
                            type="text"
                            placeholder="Ej. Red Dead Redemption 2"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-5">
                        <label className="text-sm font-medium text-slate-300">
                            Descripción del juego
                        </label>
                        <input
                        type="text"
                        placeholder="Detalla brevemente una descripción del juego (máx. 2000 carácteres)"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        disabled={guardando}
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-slate-300">
                                Fecha de lanzamiento del juego
                            </label>
                            <input
                            type="date"
                            value={fechaLanzamiento}
                            onChange={(e) => setFechaLanzamiento(e.target.value)}
                            disabled={guardando}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-slate-300">
                                Desarrollador del juego
                            </label>
                            <input
                            type="text"
                            placeholder="Ej.: Rockstar Games"
                            value={desarrollador}
                            onChange={(e) => setDesarrollador(e.target.value)}
                            disabled={guardando}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-slate-300">
                                Distribuidor del juego
                            </label>
                            <input
                            type="text"
                            placeholder="Ej.: Rockstar Games"
                            value={distribuidor}
                            onChange={(e) => setDistribuidor(e.target.value)}
                            disabled={guardando}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-slate-300">
                                Plataformas del juego
                            </label>
                            <input
                            type="text"
                            placeholder="Ej.: Xbox, Playstation, PC"
                            value={plataforma}
                            onChange={(e) => setPlataforma(e.target.value)}
                            disabled={guardando}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-slate-300">
                                Link de la portada del juego
                            </label>
                            <input
                            type="text"
                            placeholder="Pon un URL válido"
                            value={portadaUrl}
                            onChange={(e) => setPortadaUrl(e.target.value)}
                            disabled={guardando}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"
                            />
                        </div>
                    </div>

                </div>

                <div className="flex flex-row justify-end gap-3 pt-3">
                    <button type="submit" disabled={guardando} className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-lg cursor-pointer">
                    {guardando ? 'Enviando...' : 'Guardar en PostgreSQL'}
                    </button>
                    <button type="button" onClick={onCancelar} className="bg-slate-700 text-slate-200 text-sm px-4 py-2.5 rounded-lg cursor-pointer">
                        Cancelar
                    </button>
                </div>
            </div>

            {/* Banner que muestra literalmente las reglas de FluentValidation que fallaron en .NET */}
            {errorServidor && (
                <div className="mt-4 bg-red-950/60 border border-red-500/40 rounded-lg p-3 text-xs text-red-300 flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <span><strong>Rechazo del Servidor (.NET FluentValidation):</strong> {errorServidor}</span>
                </div>
            )}
        </form>
    )
}
