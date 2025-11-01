import React from 'react'
import type { Icontratista } from '../models/Icontratista';

interface Props {
  editState: Icontratista | null; 
}

export const ContratistasForm:  React.FC<Props> = ({ editState })  => {
    console.log('editState en ContratistasForm:', editState);
    
    return (
    <div>ContratistasForm</div>
  )
}
