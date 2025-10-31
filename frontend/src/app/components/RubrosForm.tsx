import React from 'react'
import type { Irubros } from '../models/Irubros';

interface Props {
  editState: Irubros | null; 
}

export const RubrosForm:  React.FC<Props> = ({ editState })  => {
    console.log('editState en RubrosForm:', editState);
    
    return (
    <div>RubrosForm</div>
  )
}
