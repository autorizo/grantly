import React from 'react'
import { OauthProvider, useAuth } from 'contexts'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { z } from 'zod'
import { FacebookIcon, GoogleIcon } from 'components'

// Zod validation schema for email/password
const loginSchema = z.object({
  email: z.string().email('Correo invalido').nonempty('El correo es requerido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .nonempty('La contraseña es requerida'),
})

const providers = [
  {
    provider: OauthProvider.Google,
    name: 'Google',
    logo: <GoogleIcon className='text-4xl' />,
  },
  {
    provider: OauthProvider.Facebook,
    name: 'Facebook',
    logo: <FacebookIcon className='text-4xl' />,
  },
  // {
  //   provider: OauthProvider.Microsoft,
  //   name: 'Microsoft',
  //   logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo_%282012%29.svg', // Correct Microsoft logo
  // },
]

export const LoginLayout = () => {
  const { signIn } = useAuth() ?? {}

  // Handle form submission for email/password login
  const handleSubmit = async (values: { email: string; password: string }) => {
    // Here you would handle the logic for the form submission, e.g., calling an API or signIn

    
  }

  // Form validation using Zod
  const validateForm = (values: { email: string; password: string }) => {
    const result = loginSchema.safeParse(values)
    const errors: { email?: string; password?: string } = {}

    if (!result.success) {
      result.error.errors.forEach(err => {
        errors[err.path[0] as keyof typeof errors] = err.message
      })
    }

    return errors
  }

  return (
    <div className='flex flex-col gap-6 items-center justify-center h-screen bg-gray-50 px-10'>
      <img className='h-1/6 object-cover' src='/images/icon-512.png' />
      <h1 className='text-3xl font-semibold mb-6'>Inicio de sesión</h1>

      {/* Formik Form for Email/Password Login */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validateForm} // Using Zod for manual validation
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='w-full max-w-sm space-y-4'>
            {/* Email Field */}
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-sm text-gray-600 mb-1'>
                Correo
              </label>
              <Field
                id='email'
                name='email'
                type='email'
                className='p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
              />
              <ErrorMessage
                name='email'
                component='p'
                className='text-xs text-red-500 mt-1'
              />
            </div>

            {/* Password Field */}
            <div className='flex flex-col'>
              <label htmlFor='password' className='text-sm text-gray-600 mb-1'>
                Contraseña
              </label>
              <Field
                id='password'
                name='password'
                type='password'
                className='p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
              />
              <ErrorMessage
                name='password'
                component='p'
                className='text-xs text-red-500 mt-1'
              />
            </div>

            {/* Login Button */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200'
            >
              {isSubmitting ? 'Logging in...' : 'Ingresar'}
            </button>
          </Form>
        )}
      </Formik>

      <div className='text-center mt-6'>Ingresa con:</div>

      <div className=' flex justify-center items-center w-full gap-2'>
        {/* OAuth Buttons with Logos */}
        {providers.map(({ provider, name, logo }) => (
          <button
            key={provider}
            onClick={() => signIn(provider)}
            aria-label={`Sign in with ${name}`}
          >
            {logo}
          </button>
        ))}
      </div>
    </div>
  )
}
