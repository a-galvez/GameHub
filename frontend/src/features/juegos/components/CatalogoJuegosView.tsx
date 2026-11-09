import { useState, useEffect } from 'react'
import type { Juego } from '../types/juego.types'
import { obtenerJuegosAsync, extraerMensajeErrorBackend } from '../api/juegosApi'
import { JuegoCard } from './JuegoCard'
import { CrearJuegoForm } from './CrearJuegoForm'
import { EditarJuegoForm } from './EditarJuegoForm'
import { EliminarJuegoModal } from './EliminarJuegoModal'

export function CatalogoJuegosView() {
  const [juegos, setJuegos] = useState<Juego[]>([])
  const [cargando, setCargando] = useState<boolean>(true)
  const [errorRed, setErrorRed] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState<string>('')
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false)
  const [juegoAActualizar, setJuegoAActualizar] = useState<Juego | null>(null)
  const [juegoAEliminar, setJuegoAEliminar] = useState<Juego | null>(null)


  useEffect(() => {
    obtenerJuegosAsync()
      .then((datosDesdePostgres) => {
        setJuegos(datosDesdePostgres)
        setErrorRed(null)
      })
      .catch((error) => {
        console.error('Auditoría de Error en la Petición HTTP:', error)
        setErrorRed(extraerMensajeErrorBackend(error))
      })
      .finally(() => {
        setCargando(false)
      })
  }, [])

  const manejarJuegoCreado = (nuevoJuegoDesdeBD: Juego) => {
    setJuegos((juegosActuales) => [...juegosActuales, nuevoJuegoDesdeBD])
    setMostrarFormulario(false)
  }

  const manejarSeleccionJuego = (juego: Juego) => {
    setMostrarFormulario(false)
    setJuegoAActualizar(juego)
  }

  const manejarJuegoEditado = async () => {
    try {
        const juegosActualizados = await obtenerJuegosAsync()
        setJuegos(juegosActualizados)
        setJuegoAActualizar(null)
    } catch (error) {
        console.error('Error al actualizar el catálogo:', error)
        setErrorRed(extraerMensajeErrorBackend(error))
    }
  }

  const manejarSeleccionEliminar = (id: number) => {
    const juego = juegos.find(juego => juego.id === id)

    if (juego) {
        setJuegoAEliminar(juego)
    }
  }

  const manejarJuegoEliminado = (id: number) => {
    setJuegos(juegosActuales =>
        juegosActuales.filter(juego => juego.id !== id)
    )

    setJuegoAEliminar(null)
  }

  const juegosFiltrados = juegos.filter((juego) =>
    juego.titulo.toLowerCase().includes(busqueda.toLowerCase())
  )

  // --- ZONA 4: RENDERIZADO EXCLUSIVO DEL CATÁLOGO ---
  return (
    <div>
      {/* Barra Superior de Título y Acción Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Catálogo de Juegos</h1>
          <p className="text-slate-400 text-sm mt-1">
            Conectado en tiempo real vía HTTP/CORS con <code className="text-indigo-400 font-mono">PostgreSQL</code>.
          </p>
        </div>

        {!mostrarFormulario && !juegoAActualizar && (
            <button
                onClick={() => setMostrarFormulario(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
            >
                + Nuevo Juego
            </button>
        )}
      </div>

      {mostrarFormulario && (
          <CrearJuegoForm
            onJuegoCreado={manejarJuegoCreado}
            onCancelar={() => setMostrarFormulario(false)}
          />
      )}

      {juegoAActualizar && (
          <EditarJuegoForm
            key={juegoAActualizar.id}
            juego={juegoAActualizar}
            onJuegoEditado={manejarJuegoEditado}
            onCancelar={() => setJuegoAActualizar(null)}
          />
      )}

      {juegoAEliminar && (
        <EliminarJuegoModal
          juego={juegoAEliminar}
          onJuegoEliminado={manejarJuegoEliminado}
          onCancelar={() => setJuegoAEliminar(null)}
        />
      )}

      {/* Buscador Reactivo */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="🔍 Filtrar juegos en el catálogo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:max-w-md bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <span className="text-xs text-slate-400">
            Mostrando <strong className="text-white">{juegosFiltrados.length}</strong> de {juegos.length} registros en memoria
        </span>
      </div>

      {/* 1. Estado de Carga */}
      {cargando && (
        <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-12 text-center">
          <p className="text-indigo-400 font-semibold animate-pulse text-lg">
            ⏳ Consultando endpoint GET /api/juegos en .NET...
          </p>
        </div>
      )}

      {/* 2. Estado de Error de Red o Bloqueo CORS */}
      {!cargando && errorRed && (
        <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-6 text-center">
          <p className="text-red-400 font-bold text-base mb-1">Error de Comunicación Full-Stack</p>
          <p className="text-slate-300 text-sm">{errorRed}</p>
        </div>
      )}

      {/* 3. Estado de Éxito: Renderizado de las filas reales de PostgreSQL */}
      {!cargando && !errorRed && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {juegosFiltrados.map((juego) => (
              <JuegoCard
                key={juego.id}
                {...juego}
                onEditar={() => manejarSeleccionJuego(juego)}
                onEliminar={manejarSeleccionEliminar}
              />
            ))}
        </section>
      )}
    </div>
  )
}