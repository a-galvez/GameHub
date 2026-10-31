import type { Juego } from '../types/juego.types'

// Función asíncrona que retorna una Promesa con el arreglo de hábitos
export const obtenerJuegosAsync = (): Promise<Juego[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
                  const datosCatalogo: Juego[] = [
                  {
                    id: 1,
                    titulo: 'Red Dead Redemption 2',
                    descripcion: 'Aventura de acción y mundo abierto ambientada en el viejo oeste estadounidense, donde Arthur Morgan y la banda de Van der Linde luchan por sobrevivir.',
                    fechaLanzamiento: new Date('2018-10-26'),
                    desarrollador: 'Rockstar Studios',
                    distribuidor: 'Rockstar Games',
                    plataforma: 'PC, PlayStation 4, Xbox One',
                    portadaUrl: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg'
                  },
                  {
                    id: 2,
                    titulo: 'Hades',
                    descripcion: 'Videojuego roguelike de acción en el que Zagreus, hijo de Hades, intenta escapar del inframundo griego.',
                    fechaLanzamiento: new Date('2020-09-17'),
                    desarrollador: 'Supergiant Games',
                    distribuidor: 'Supergiant Games',
                    plataforma: 'PC, Nintendo Switch, PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S',
                    portadaUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Hades_cover_art.jpg'
                  },
                  {
                    id: 3,
                    titulo: 'Stardew Valley',
                    descripcion: 'Simulador de granja RPG donde puedes cultivar, criar animales, explorar minas, pescar y relacionarte con los habitantes de Pueblo Pelícano.',
                    fechaLanzamiento: new Date('2016-02-26'),
                    desarrollador: 'ConcernedApe',
                    distribuidor: 'ConcernedApe',
                    plataforma: 'PC, Nintendo Switch, PlayStation 4, Xbox One, Android, iOS',
                    portadaUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Logo_of_Stardew_Valley.png'
                  },
                ]
            resolve(datosCatalogo)
        }, 1000)
    })
}
