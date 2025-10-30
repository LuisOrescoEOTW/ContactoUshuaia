import { configureStore } from '@reduxjs/toolkit'
import { rubrosSlice } from './slices/rubros/rubrosSlice'

export const store = configureStore({
  reducer: {
    rubros: rubrosSlice.reducer,
    
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch