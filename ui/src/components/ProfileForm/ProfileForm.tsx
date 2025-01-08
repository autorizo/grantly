import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { TypeOf } from 'zod'
import { ProfileSchema } from './ProfileForm.validation'

export type User = TypeOf<typeof ProfileSchema>

interface ProfileFormProps {
  user: User
  onSubmit: (values: User) => void
  emailDisabled?: boolean
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  onSubmit,
  emailDisabled = true,
}) => {
  const [initialValues, setInitialValues] = useState<User | null>(null)

  // Asignar los valores de usuario una vez estén disponibles
  useEffect(() => {
    if (user) {
      setInitialValues({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        phone_country_code: user.phone_country_code || '',
        email: user.email || '',
      })
    }
  }, [user]) // Se ejecuta cada vez que 'user' cambia

  // Validación manual usando Zod
  const validate = (values: User) => {
    const result = ProfileSchema.safeParse(values)
    if (!result.success) {
      const errors: { [key: string]: string } = {}
      result.error.errors.forEach(err => {
        errors[err.path[0]] = err.message
      })
      return errors
    }
    return {}
  }

  if (!initialValues) {
    // Retornar un cargando mientras se espera que `user` llegue
    return <div>Loading...</div>
  }

  return (
    <Formik
      key={initialValues.email} // Usar el email como clave para forzar la actualización
      initialValues={initialValues} // Usar los valores iniciales después de ser asignados
      validate={validate} // Usar la validación personalizada
      onSubmit={values => {
        console.log('values:', values)
        onSubmit(values)
      }} // Pasar la función onSubmit
    >
      {formik => (
        <Form>
          {/* Campo de primer nombre */}
          <div className='mb-4'>
            <label
              className='block text-sm text-gray-600 mb-1'
              htmlFor='first_name'
            >
              Primer nombre:
            </label>
            <Field
              id='first_name'
              name='first_name'
              type='text'
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-full'
              placeholder='Ingresa tu primer nombre'
            />
            <ErrorMessage
              name='first_name'
              component='p'
              className='text-xs text-red-500 mt-1'
            />
          </div>

          {/* Campo de apellido */}
          <div className='mb-4'>
            <label
              className='block text-sm text-gray-600 mb-1'
              htmlFor='last_name'
            >
              Apellido:
            </label>
            <Field
              id='last_name'
              name='last_name'
              type='text'
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-full'
              placeholder='Ingresa tu apellido'
            />
            <ErrorMessage
              name='last_name'
              component='p'
              className='text-xs text-red-500 mt-1'
            />
          </div>

          {/* Campo de teléfono */}
          <div className='mb-4'>
            <label className='block text-sm text-gray-600 mb-1' htmlFor='phone'>
              Teléfono:
            </label>
            <Field
              id='phone'
              name='phone'
              type='text'
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-full'
              placeholder='Ingresa tu teléfono'
            />
            <ErrorMessage
              name='phone'
              component='p'
              className='text-xs text-red-500 mt-1'
            />
          </div>

          {/* Campo de correo electrónico (solo lectura) */}
          <div className='mb-4'>
            <label className='block text-sm text-gray-600 mb-1' htmlFor='email'>
              Correo:
            </label>
            <Field
              id='email'
              name='email'
              type='text'
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-full'
              placeholder='Ingresa tu primer nombre'
              disabled={emailDisabled}
            />
            <ErrorMessage
              name='email'
              component='p'
              className='text-xs text-red-500 mt-1'
            />
          </div>

          {/* Botón de enviar */}
          <button
            type='submit'
            className='w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200'
          >
            Guardar cambios
          </button>
        </Form>
      )}
    </Formik>
  )
}
