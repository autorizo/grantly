// RecoverPassword.tsx
import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { z } from 'zod'
import { ZodError } from 'zod'
import { generateRecoveryToken } from 'servers/auth'

interface RecoverPasswordValues {
  email: string
}

// Define the schema using Zod
const emailValidationSchema = z.object({
  email: z
    .string()
    .email('El correo no es valido.')
    .min(1, { message: 'Correo  requerido.' }),
})

export const RecoverPassword = () => {
  const [message, setMessage] = useState<{
    message: string
    type: 'error' | 'success'
  } | null>(null)

  // Initial form values
  const initialValues: RecoverPasswordValues = { email: '' }

  // Handle form submission
  const handleSubmit = async (values: RecoverPasswordValues) => {
    try {
      const response = await generateRecoveryToken(values.email)

      if (response.status === 200) {
        setMessage({
          message:
            'Revise su correo electrónico para restablecer su contraseña',
          type: 'success',
        })
      }
    } catch (error) {
      setMessage({
        message: 'No se pudo enviar el correo electrónico',
        type: 'error',
      })
    }
  }

  // Zod validation function for Formik
  const validate = (values: RecoverPasswordValues) => {
    setMessage(null)
    try {
      emailValidationSchema.parse(values)
      return {} // No errors
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: Record<string, string> = {}
        error.errors.forEach(err => {
          validationErrors[err.path[0]] = err.message
        })
        return validationErrors
      }
      return {}
    }
  }

  return (
    <div className='flex flex-col items-center max-w-md mx-auto p-6 bg-white rounded-lg h-svh justify-center gap-5'>
      <img className='h-56 object-cover' src='/images/icon-512.png' />
      <h2 className='text-2xl font-semibold text-gray-800'>
        Recuperar contraseña
      </h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form className='w-full mt-6'>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Ingresa tu correo electrónico para recuperar tu contraseña,
              recibirás un correo con las instrucciones.
            </label>
            <Field
              type='email'
              id='email'
              name='email'
              placeholder='Ingrese su correo electrónico'
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            />
            <ErrorMessage
              name='email'
              component='div'
              className='text-red-500 text-sm mt-1'
            />
          </div>

          {message && (
            <div
              className={`rounded-md mt-4 p-2 text-sm text-white ${
                message.type === 'success' ? 'bg-green-400' : 'bg-red-400'
              }`}
            >
              {message.message}.
            </div>
          )}

          <button
            type='submit'
            className='w-full mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          >
            Recuperar
          </button>
          <div className='mt-3'>
            <a href='/login' className='text-sm text-primary'>
              Regresar al inicio de sesión
            </a>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
