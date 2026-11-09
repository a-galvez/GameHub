import { z } from 'zod'

// Espejo de las validaciones de FluentValidation en .NET
export const crearJuegoSchema = z.object({
    titulo: z
        .string()
        .trim()
        .min(1, 'El título del juego no puede estar vacío.')
        .max(100, 'El título es demasiado largo.'),

    descripcion: z
        .string()
        .trim()
        .max(2000, 'La descripción no puede superar los 2000 caracteres.'),

    desarrollador: z
        .string()
        .trim()
        .min(1, 'El desarrollador no puede estar vacío.')
        .max(100, 'El desarrollador no puede superar los 100 caracteres.'),

    distribuidor: z
        .string()
        .trim()
        .min(1, 'El distribuidor no puede estar vacío.')
        .max(100, 'El distribuidor no puede superar los 100 caracteres.'),

    plataforma: z
        .string()
        .trim()
        .min(1, 'La plataforma no puede estar vacía.')
        .max(50, 'La plataforma no puede superar los 100 caracteres.'),

    portadaUrl: z
        .string()
        .trim()
        .refine(
            (url) => url === '' || z.url().safeParse(url).success,
            'La portada debe ser una URL válida.'
        ),
})

export type CrearJuegoSchemaType = z.infer<typeof crearJuegoSchema>