import { create } from 'zustand'
import { BookInt, libraryInt } from '../types/book'
import { toast } from 'react-toastify'

interface BookAddInterface {
  bookUser: libraryInt
  addBookUser: (book: BookInt) => void
  removeBookUser: (book: string) => void
  // removeAllBookUser: () => void
}

export const useBookUser = create<BookAddInterface>((set) => ({
  bookUser: { library: [] },
  addBookUser: (book) =>
    set((state) => {
      const exist = state.bookUser.library.every(({ book: { ISBN } }) => ISBN !== book.ISBN)
      if (exist) {
        toast.success('Se agrego el libro correctamente', { autoClose: 1000 })
        return { bookUser: { library: [...state.bookUser.library, { book }] } }
      }
      toast.error('Este libro ya esta agregado a la lista')
      return state
    }),
  removeBookUser: (book) =>
    set((state) => {
      toast.success('Se elimino el libro correctamente', { autoClose: 1000 })
      return { bookUser: { library: [...state.bookUser.library.filter(({ book: { ISBN } }) => ISBN !== book)] } }
    })
}))
