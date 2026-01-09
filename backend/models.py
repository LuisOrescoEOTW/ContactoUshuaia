from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Float
from database import Base
from sqlalchemy.orm import relationship

class Rubros(Base):
    __tablename__ = "Rubros"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    publicidad = Column(String)
    icono = Column(String)
    deleted = Column(Boolean, default=False)

class Contratistas(Base):
    __tablename__ = "Contratistas"
    
    id = Column(Integer, primary_key=True, index=True)
    nombreApellido = Column(String)
    telefono = Column(String)
    email = Column(String)
    matricula = Column(String)
    deleted = Column(Boolean, default=False)

class RubrosXContratistas(Base):
    __tablename__ = "RubrosXContratistas"
    
    id = Column(Integer, primary_key=True, index=True)
    rubrosId = Column(Integer, ForeignKey("Rubros.id"))  # clave foránea
    contratistasId = Column(Integer, ForeignKey("Contratistas.id"))  # clave foránea
    cantidadPuntuados = Column(Integer)
    sumatoriaPuntuados = Column(Integer)
    habilitado = Column(Boolean, default=False)
    deleted = Column(Boolean, default=False)
    rubros = relationship("Rubros")  # relación
    contratistas = relationship("Contratistas")  # relación

class PalabrasClaves(Base):
    __tablename__ = "PalabrasClaves"
    
    id = Column(Integer, primary_key=True, index=True)
    rubrosId = Column(Integer, ForeignKey("Rubros.id"))  # clave foránea
    nombre = Column(String)
    deleted = Column(Boolean, default=False)
    rubros = relationship("Rubros")  # relación

class PreguntasFrecuentes(Base):
    __tablename__ = "PreguntasFrecuentes"
    
    id = Column(Integer, primary_key=True, index=True)
    pregunta = Column(String)
    respuesta = Column(String)
    deleted = Column(Boolean, default=False)

class Aviso(Base):
    __tablename__ = "Aviso"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    email = Column(String)
    deleted = Column(Boolean, default=False)
class Puntuar(Base):
    __tablename__ = "Puntuar"
    
    id = Column(Integer, primary_key=True, index=True)
    rubrosXcontratistasId = Column(Integer, ForeignKey("RubrosXContratistas.id"))  # clave foránea
    usuario = Column(String)
    puntaje = Column(Integer)
    deleted = Column(Boolean, default=False)
    rubrosXcontratistas = relationship("RubrosXContratistas")  # relación