import { Formik, Field, Form, ErrorMessage } from 'formik'
import { z } from 'zod'
import { useState } from 'react'
import { CloseEyeIcon, OpenEyeIcon, ToastType } from 'components'
import { resetPassword } from 'servers/auth'
import { useNavigate } from 'react-router-dom'
import { useToast } from 'contexts'

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .min(1, 'La contraseña es obligatoria')
      .regex(
        /[A-Z]/,
        'La contraseña debe contener al menos una letra mayúscula'
      ) // Uppercase letter
      .regex(
        /[a-z]/,
        'La contraseña debe contener al menos una letra minúscula'
      ) // Lowercase letter
      .regex(/[0-9]/, 'La contraseña debe contener al menos un número') // Number
      .regex(
        /[\W_]/,
        'La contraseña debe contener al menos un carácter especial'
      ) // Special character (non-alphanumeric)
      .refine(val => !/(password|123456|qwerty)/i.test(val), {
        message:
          'La contraseña es demasiado común, por favor elige una diferente',
      }), // Avoid common passwords
    confirmPassword: z
      .string()
      .min(1, 'Confirmar la contraseña es obligatorio'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword'],
  })

// Define TypeScript types based on Zod schema
type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

// Helper function to integrate Zod with Formik validation
const zodValidate = (schema: z.ZodSchema<any>) => {
  return async (values: any) => {
    try {
      schema.parse(values) // Validate using Zod schema
      return {} // No errors if validation is successful
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errors: { [key: string]: string } = {}
        e.errors.forEach(error => {
          errors[error.path[0]] = error.message // Map errors to field names
        })
        return errors
      }
      return {}
    }
  }
}

const initialValues: ResetPasswordValues = {
  newPassword: '',
  confirmPassword: '',
}

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  // get token by url
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')
  const { showToast } = useToast()

  const handleSubmit = async ({ newPassword }: ResetPasswordValues) => {
    if (!token) {
      console.error('Token is missing')
      return
    }

    // Include token in the values
    const payload = {
      password: newPassword,
      token, // Attach token to the values object
    }

    const response = await resetPassword(payload)

    if (response.status === 200) {
      // show toast
      showToast('Contraseña restablecida exitosamente', ToastType.SUCCESS)

      // Redirect to login page after successful password reset
      navigate('/login')
    }
  }

  return (
    <div className='flex flex-col items-center  max-w-md mx-auto p-6 bg-white rounded-lg h-svh justify-center gap-5'>
      <img
        className='h-56 object-cover'
        alt='avatar'
        src='/images/icon-512.png'
      />

      <h2 className='text-2xl font-semibold text-center mb-6'>
        Restablecer contraseña
      </h2>
      <Formik
        initialValues={initialValues}
        validate={zodValidate(resetPasswordSchema)} // Use Zod validation
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='w-full mt-6'>
            {/* New Password field */}
            <div className='mb-4'>
              <label
                htmlFor='newPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Nueva contraseña
              </label>
              <div className='relative'>
                <Field
                  id='newPassword'
                  name='newPassword'
                  type={showPassword ? 'text' : 'password'}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <CloseEyeIcon className='h-5 w-5' />
                  ) : (
                    <OpenEyeIcon className='h-5 w-5' />
                  )}
                </button>
              </div>
              <ErrorMessage
                name='newPassword'
                component='div'
                className='text-red-500 text-xs mt-1'
              />
            </div>

            {/* Confirm Password field */}
            <div className='mb-4'>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Confirmar contraseña
              </label>
              <div className='relative'>
                <Field
                  id='confirmPassword'
                  name='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <CloseEyeIcon className='h-5 w-5' />
                  ) : (
                    <OpenEyeIcon className='h-5 w-5' />
                  )}
                </button>
              </div>
              <ErrorMessage
                name='confirmPassword'
                component='div'
                className='text-red-500 text-xs mt-1'
              />
            </div>

            {/* Submit Button */}
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
              >
                Restaurar contraseña
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
