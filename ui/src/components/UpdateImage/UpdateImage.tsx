import { ChangeEvent, useState } from 'react'

interface UpdateImageProps {
  onUpdate: (imageFile: File) => void
  onClose: () => void
}

export const UpdateImage = ({ onUpdate, onClose }: UpdateImageProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImageFile(file)
  }

  const handleSubmit = () => {
    if (imageFile) {
      onUpdate(imageFile)
    }
  }

  return (
    <div>
      <h2 className='text-xl mb-4'>Update Profile Image</h2>
      <input
        type='file'
        onChange={handleImageChange}
        className='w-full p-2 border border-gray-300 rounded-lg'
      />
      <div className='mt-4 flex justify-end space-x-4'>
        <button
          onClick={onClose}
          className='bg-gray-500 text-white px-4 py-2 rounded-lg'
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg'
        >
          Upload
        </button>
      </div>
    </div>
  )
}
