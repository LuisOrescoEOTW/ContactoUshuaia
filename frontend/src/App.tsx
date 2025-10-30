import React, { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store';
import { getRubros } from './redux/slices/rubros/rubrosThunks';


export const App = () => {

 // Lista de rubros
  const { rubros = [] } = useSelector((state: RootState) => state.rubros);
  const dispatch = useDispatch<AppDispatch>();

  //General disparo y trae todas los rubros
  useEffect(() => {
    dispatch(getRubros());
  }, [])

  useEffect(() => {
    console.log(rubros);
  }, [rubros])
  


  return (
    <div>App</div>
  )
}

