import type { Juego } from '../types/juego.types'

interface JuegoCardProps extends Juego {
    onEditar: (id: number) => void
    onEliminar: (id: number) => void
}

export function JuegoCard({ id, titulo, descripcion, fechaLanzamiento, desarrollador, distribuidor, plataforma, portadaUrl, onEditar, onEliminar}: JuegoCardProps) {
    
    return (
        <article className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col justify-between hover:border-indigo-500 transition-colors shadow-sm">
            <div>
                <div className="flex items-center justify-between mb-3">

                    <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-indigo-500/20">
                            ID #{id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Catálogo Base</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-5">{titulo}</h3>

                <img 
                className="mb-5 mx-auto"
                src={portadaUrl}
                alt={`Portada de ${titulo}`}
                style={{ width: '150px', borderRadius: '8px' }}
                />

                <p className="text-sm text-white mb-2">{descripcion}</p>
                <p className="text-sm text-white mb-2"><strong>Fecha de lanzamiento:</strong> {new Date(fechaLanzamiento).toLocaleDateString('es-HN')}</p>
                <p className="text-sm text-white mb-2"><strong>Desarrollador:</strong> {desarrollador}</p>
                <p className="text-sm text-white mb-2"><strong>Distribuidor:</strong> {distribuidor}</p>
                <p className="text-sm text-white mb-2"><strong>Plataforma:</strong> {plataforma}</p>
            </div>
            
            {/* 
               En la Unidad 3, cuando tengamos sistema de Usuarios (IAM), 
               este botón llamará a la tabla transaccional para adoptar el hábito.
            */}
            <div className="flex flex-col gap-3">
                <button disabled 
                    className="w-full bg-slate-900/80 text-slate-400 hover:bg-slate-700 text-sm font-medium py-2.5 px-4 rounded-lg cursor-not-allowed border border-slate-700">
                    Crear Reseña (Requiere Sesión)
                </button>

                <button 
                    onClick={() => onEditar(id)} 
                    className="w-full bg-cyan-950 text-slate-400 hover:bg-cyan-700 text-sm font-medium py-2.5 px-4 cursor-pointer rounded-lg border border-slate-700">
                    Editar
                </button>

                <button  
                    onClick={() => onEliminar(id)} 
                    className="w-full bg-red-950 text-slate-400 hover:bg-red-700 text-sm font-medium py-2.5 px-4 cursor-pointer rounded-lg border border-slate-700">
                    Eliminar
                </button>

            </div>
        </article>
    );
}
