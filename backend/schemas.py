from pydantic import BaseModel
from typing import Optional

class Rubros(BaseModel):
    id: Optional[int] = None
    nombre: str
    publicidad: Optional[str]
    icono: Optional[str]
    deleted: bool | None = False
    class Config:
        from_attributes = True  # Linux

class Contratistas(BaseModel):
    id: Optional[int] = None
    nombreApellido: str
    telefono: str
    email: Optional[str]
    matricula: Optional[str]
    deleted: bool | None = False
    class Config:
        from_attributes = True  # Linux

class RubrosXContratistas(BaseModel):
    id: Optional[int] = None
    rubrosId: int  # clave foránea
    contratistasId: int  # clave foránea
    cantidadPuntuados: int
    sumatoriaPuntuados: int
    habilitado: bool | None = False
    deleted: bool | None = False
    rubros: Optional[Rubros] = None  # relación
    contratistas: Optional[Contratistas] = None # relación
    class Config:
        from_attributes = True  # Linux

class PalabrasClaves(BaseModel):
    id: Optional[int] = None
    rubrosId: int  # clave foránea
    nombre: Optional[str]
    deleted: bool | None = False
    rubros: Optional[Rubros] = None # relación
    class Config:
        from_attributes = True  # Linux
