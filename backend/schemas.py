from pydantic import BaseModel
from typing import Optional

class Rubros(BaseModel):
    id = int
    nombre = str
    publicidad = Optional[str]
    icono = Optional[str]
    deleted: bool | None = False
    class Config:
        from_attributes = True  # Linux

class Contratistas(BaseModel):
    id = int
    nombreApellido = str
    telefono = str
    email = Optional[str]
    matricula = Optional[str]
    deleted: bool | None = False
    class Config:
        from_attributes = True  # Linux

class RubrosXContratistas(BaseModel):
    id = int
    rubrosId = int  # clave foránea
    contratistasId = int  # clave foránea
    cantidadPuntuados = int
    sumatoriaPuntuados = int
    habilitado = int
    deleted: bool | None = False
    rubros = Optional[Rubros]  # relación
    contratistas = Optional[Contratistas]  # relación
    class Config:
        from_attributes = True  # Linux

class PalabrasClaves(BaseModel):
    id = int
    rubrosId = int  # clave foránea
    nombre = Optional[str]
    deleted: bool | None = False
    rubros = Optional[Rubros] # relación
    class Config:
        from_attributes = True  # Linux
