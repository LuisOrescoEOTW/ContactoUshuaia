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
def listar_rubros(db: Session = Depends(get_db)):
    return db.query(models.Rubros).filter(models.Rubros.deleted == False).order_by(models.Rubros.nombre).all()

@app.post("/Rubros/", response_model=schemas.Rubros)
def crear_rubro(registro: schemas.Rubros, db: Session = Depends(get_db)):
    return rubro_crud.create(db, registro)

@app.put("/Rubros/{rubro_id}", response_model=schemas.Rubros)
def actualizar_rubro(rubro_id: int, registro: schemas.Rubros, db: Session = Depends(get_db)):
    return rubro_crud.update(db, rubro_id, registro)

@app.delete("/Rubros/{rubro_id}")
def borrar_rubro(rubro_id: int, db: Session = Depends(get_db)):
    return rubro_crud.logical_delete(db, rubro_id)

# ==== ENDPOINTS CONTRATISTAS ====

# ==== ENDPOINTS RUBROS X CONTRATISTAS ====

# ==== ENDPOINTS PALABRAS CLAVES ====