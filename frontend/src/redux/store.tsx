import { configureStore } from '@reduxjs/toolkit'
import { rubrosSlice } from './slices/rubros/rubrosSlice'
import { contratistasSlice } from './slices/contratistas/contratistasSlice'
import { rubrosXContratistasSlice } from './slices/rubrosXContratistas/rubrosXContratistasSlice'
import { palabrasClavesSlice } from './slices/palabrasClaves/palabrasClavesSlice'

export const store = configureStore({
  reducer: {
    rubros: rubrosSlice.reducer,
    contratistas: contratistasSlice.reducer,    
    rubrosXContratistas: rubrosXContratistasSlice.reducer,
    palabrasClaves: palabrasClavesSlice.reducer,    
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch