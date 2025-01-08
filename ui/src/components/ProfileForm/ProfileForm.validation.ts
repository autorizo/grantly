// utils/validation.ts
import { z } from 'zod'

export const ProfileSchema = z.object({
  first_name: z.string().min(1, { message: 'El primer nombre es obligatorio' }),
  last_name: z.string().min(1, { message: 'El apellido es obligatorio' }),
  phone: z.string().min(1, { message: 'El teléfono es obligatorio' }),
  phone_country_code: z.string().optional(),
  email: z
    .string()
    .min(1, { message: 'El correo es obligatorio' })
    .email({ message: 'Correo inválido' }),
  image: z.string().optional(),
  id: z.string().optional(),
})
