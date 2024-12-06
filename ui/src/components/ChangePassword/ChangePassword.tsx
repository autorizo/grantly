import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as z from 'zod'

interface ChangePasswordProps {
  onChangePassword: (oldPassword: string, newPassword: string) => void
  onClose: () => void
  onOldPasswordValidation: (oldPassword: string) => Promise<boolean>
}

// Define the validation schema using Zod
const ChangePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .min(1, 'La contraseña es obligatoria')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula') // Uppercase letter
    .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula') // Lowercase letter
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número') // Number
    .regex(/[\W_]/, 'La contraseña debe contener al menos un carácter especial') // Special character (non-alphanumeric)
    .refine(val => !/(password|123456|qwerty)/i.test(val), {
      message: 'La contraseña es demasiado común, por favor elige una diferente',
    }), // Avoid common passwords
  confirmPassword: z
    .string()
    .min(1, 'Confirmar la contraseña es obligatorio'),
})
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword'],
  })

// Validation function to convert Zod validation errors to Formik format
const validate = (values: { oldPassword: string, newPassword: string, confirmPassword: string }) => {
  try {
    ChangePasswordSchema.parse(values)
    return {}
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors: { [key: string]: string } = {}
      e.errors.forEach((err) => {
        errors[err.path[0]] = err.message
      })
      return errors
    }
    return {}
  }
}

export const ChangePassword = ({
  onChangePassword,
  onClose,
  onOldPasswordValidation
}: ChangePasswordProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (values: { oldPassword: string, newPassword: string }) => {
    setIsSubmitting(true)
    setError('')

    const isOldPasswordValid = await onOldPasswordValidation(values.oldPassword)

    if (!isOldPasswordValid) {
      setError('Old password is incorrect.')
      setIsSubmitting(false)
      return
    }

    onChangePassword(values.oldPassword, values.newPassword)
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div>
      <h2 className='text-xl mb-4'>Change Password</h2>
      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Field
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <Field
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div className='mt-4 flex justify-end space-x-4'>
              <button
                type="button"
                onClick={onClose}
                className='bg-gray-500 text-white px-4 py-2 rounded-lg'
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
