import React from 'react'
import type { IpalabrasClaves } from '../models/IpalabrasClaves';

interface Props {
  editState: IpalabrasClaves | null; 
}

export const PalabrasClavesForm:  React.FC<Props> = ({ editState })  => {
    console.log('editState en PalabrasClavesForm:', editState);
    
    return (
    <div>PalabrasClavesForm</div>
  )
}
