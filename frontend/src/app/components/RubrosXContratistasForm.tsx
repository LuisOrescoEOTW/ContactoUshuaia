import React from 'react'
import type { IrubroXContratista } from '../models/IrubroXContratista';

interface Props {
  editState: IrubroXContratista | null; 
}

export const RubrosXContratistasForm:  React.FC<Props> = ({ editState })  => {
    console.log('editState:', editState);
    
    return (
    <div>RubrosXContratistasForm</div>
  )
}
