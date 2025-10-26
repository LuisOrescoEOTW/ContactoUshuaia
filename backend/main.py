from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from crud_base import CRUDBase
import models, schemas
from database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()  # Carga las variables del archivo .env

DATABASE_URL = os.getenv("DATABASE_URL")
FRONTEND_URL = os.getenv("FRONTEND_URL")

# ==== Inicialización FastAPI ====
app = FastAPI()

# ==== (Opcional) Habilitar CORS para pruebas con frontend ====
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==== Dependencia para obtener la sesión de DB ====
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==== ENDPOINTS Genéricos ====
rubro_crud = CRUDBase(models.Rubros)
contratista_crud = CRUDBase(models.Contratistas)
rubroxcontratista_crud = CRUDBase(models.RubrosXContratistas)
palabra_clave_crud = CRUDBase(models.PalabrasClaves)

# ==== ENDPOINTS RUBROS ====
@app.get("/Rubros/", response_model=list[schemas.Rubros])
def listarRubros(db: Session = Depends(get_db)):
    return db.query(models.Rubros).filter(models.Rubros.deleted == False).order_by(models.Rubros.nombre).all()

@app.get("/Rubros/{rubro_id}", response_model=schemas.Rubros)
def listarRubrosById(rubro_id: int, db: Session = Depends(get_db)):
    return rubro_crud.get_by_id(db, rubro_id)

@app.post("/Rubros/")
def crearRubro(registro: schemas.Rubros, db: Session = Depends(get_db)):
    return rubro_crud.create(db, registro)

@app.put("/Rubros/{rubro_id}")
def actualizarRubro(rubro_id: int, registro: schemas.Rubros, db: Session = Depends(get_db)):
    return rubro_crud.update(db, rubro_id, registro)

@app.delete("/Rubros/{rubro_id}")
def borrarRubro(rubro_id: int, db: Session = Depends(get_db)):
    return rubro_crud.logical_delete(db, rubro_id)

# ==== ENDPOINTS CONTRATISTAS ====
@app.get("/Contratistas/", response_model=list[schemas.Contratistas])
def listarContratistas(db: Session = Depends(get_db)):
    return db.query(models.Contratistas).filter(models.Contratistas.deleted == False).order_by(models.Contratistas.nombreApellido).all()

@app.post("/Contratistas/")
def crearContratistas(registro: schemas.Contratistas, db: Session = Depends(get_db)):
    return contratista_crud.create(db, registro)

@app.put("/Contratistas/{contratistas_id}")
def actualizarContratistas(contratistas_id: int, registro: schemas.Contratistas, db: Session = Depends(get_db)):
    return contratista_crud.update(db, contratistas_id, registro)

@app.delete("/Contratistas/{contratistas_id}")
def borrarContratistas(contratistas_id: int, db: Session = Depends(get_db)):
    return contratista_crud.logical_delete(db, contratistas_id)

# ==== ENDPOINTS RUBROS X CONTRATISTAS ====
@app.get("/RubrosXContratistas/", response_model=list[schemas.RubrosXContratistas])
def listarRubrosXContratistas(db: Session = Depends(get_db)):
    return db.query(models.RubrosXContratistas).filter(models.RubrosXContratistas.deleted == False).order_by(models.RubrosXContratistas.rubrosId).all()

@app.get("/RubrosXContratistas/{contratista_id}", response_model=list[schemas.RubrosXContratistas])
def listarRubrosXContratistasByContratista(contratista_id: int, db: Session = Depends(get_db)):
    return db.query(models.RubrosXContratistas).filter(models.RubrosXContratistas.deleted == False, models.RubrosXContratistas.contratistasId == contratista_id).order_by(models.RubrosXContratistas.rubrosId).all()

@app.post("/RubrosXContratistas/")
def crearRubrosXContratistas(registro: schemas.RubrosXContratistas, db: Session = Depends(get_db)):
    return rubroxcontratista_crud.create(db, registro)

@app.put("/RubrosXContratistas/{rubroxcontratista_id}")
def actualizarRubrosXContratistas(rubroxcontratista_id: int, registro: schemas.RubrosXContratistas, db: Session = Depends(get_db)):
    return rubroxcontratista_crud.update(db, rubroxcontratista_id, registro)

@app.delete("/RubrosXContratistas/{rubroxcontratista_id}")
def borrarRubrosXContratistas(rubroxcontratista_id: int, db: Session = Depends(get_db)):
    return rubroxcontratista_crud.logical_delete(db, rubroxcontratista_id)

# ==== ENDPOINTS PALABRAS CLAVES ====
@app.get("/PalabrasClaves/", response_model=list[schemas.PalabrasClaves])
def listarPalabrasClaves(db: Session = Depends(get_db)):
    return db.query(models.PalabrasClaves).filter(models.PalabrasClaves.deleted == False).order_by(models.PalabrasClaves.nombre).all()

#Get listado de nombres únicos
@app.get("/PalabrasClaves/nombresUnicos", response_model=list[str])
def listarPalabrasClavesByNombreUnicos(db: Session = Depends(get_db)):
    nombres = (db.query(models.PalabrasClaves.nombre).filter(models.PalabrasClaves.deleted == False).group_by(models.PalabrasClaves.nombre).order_by(models.PalabrasClaves.nombre).all())
    # Convierte [("bomba",), ("caño",), ("caldera",)] → ["bomba", "caño", "caldera"]
    return [n[0] for n in nombres]

# Get por nombre
@app.get("/PalabrasClaves/{nombre}", response_model=list[schemas.PalabrasClaves])
def listarPalabrasClavesByNombre(nombre: str, db: Session = Depends(get_db)):
    return db.query(models.PalabrasClaves).filter(models.PalabrasClaves.deleted == False, models.PalabrasClaves.nombre == nombre).order_by(models.PalabrasClaves.nombre).all()

@app.post("/PalabrasClaves/")
def crearPalabraClave(registro: schemas.PalabrasClaves, db: Session = Depends(get_db)):
    return palabra_clave_crud.create(db, registro)

@app.put("/PalabrasClaves/{palabra_clave_id}")
def actualizarPalabraClave(palabra_clave_id: int, registro: schemas.PalabrasClaves, db: Session = Depends(get_db)):
    return palabra_clave_crud.update(db, palabra_clave_id, registro)

@app.delete("/PalabrasClaves/{palabra_clave_id}")
def borrarPalabraClave(palabra_clave_id: int, db: Session = Depends(get_db)):
    return palabra_clave_crud.logical_delete(db, palabra_clave_id)
