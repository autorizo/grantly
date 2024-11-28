import { useState } from 'react'

interface UpdateNameProps {
  currentName: string
  onUpdate: (newName: string) => void
  onClose: () => void
}

export const UpdateName = ({
  currentName,
  onUpdate,
  onClose,
}: UpdateNameProps) => {
  const [newName, setNewName] = useState<string>(currentName)

  const handleSubmit = () => {
    if (newName !== currentName) {
      onUpdate(newName)
    }
  }

  return (
    <div>
      <h2 className='text-xl mb-4'>Update Name</h2>
      <input
        type='text'
        value={newName}
        onChange={e => setNewName(e.target.value)}
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
          Save
        </button>
      </div>
    </div>
  )
}
