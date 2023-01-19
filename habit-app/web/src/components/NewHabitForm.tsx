import { Check } from 'phosphor-react'

export function NewHabitForm() {
   return (
      <form className='w-full flex flex-col mt-6'>
         <label htmlFor='title' className='font-semibold leading-tight'>
            What's your compromise?
         </label>
         <input
            type='text'
            name='ttitle'
            id='title'
            placeholder='Ex.: Exercises, sleeping well, etc...'
            autoFocus
            className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400'
         />

         <label htmlFor='' className='font-semibold leading-tight mt-4'>
            How often?
         </label>
         <button
            type='submit'
            className='mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500'
         >
            <Check size={20} weight='bold' />
            Confirm
         </button>
      </form>
   )
}
