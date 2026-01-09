from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from crud_base import CRUDBase
import models, schemas
from database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
# ... (tus imports existentes)
from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks 
from pydantic import BaseModel, EmailStr 
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig # <== ¡Nuevo!

from dotenv import load_dotenv

load_dotenv()  # Carga las variables del archivo .env

DATABASE_URL = os.getenv("DATABASE_URL")
FRONTEND_URL = os.getenv("FRONTEND_URL")

# === CONFIGURACIÓN DE CORREO (Usando Variables de Entorno) ===
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MAIL_SERVER = os.getenv("MAIL_SERVER")
MAIL_PORT = int(os.getenv("MAIL_PORT", 587)) # Asegura que sea un entero, default 587

conf = ConnectionConfig(
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_FROM=MAIL_USERNAME,         # El remitente será la misma cuenta de usuario
    MAIL_PORT=MAIL_PORT,
    MAIL_SERVER=MAIL_SERVER,
    MAIL_STARTTLS=True,             # Estándar para la mayoría de SMTPs
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)

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
preguntas_crud = CRUDBase(models.PreguntasFrecuentes)
aviso_crud = CRUDBase(models.Aviso)
puntuar_crud = CRUDBase(models.Puntuar)

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

@app.get("/RubrosXContratistasHabilitados/", response_model=list[schemas.RubrosXContratistas])
def listarRubrosXContratistas(db: Session = Depends(get_db)):
    return db.query(models.RubrosXContratistas).filter(models.RubrosXContratistas.deleted == False, models.RubrosXContratistas.habilitado == True).order_by(models.RubrosXContratistas.rubrosId).all()

@app.get("/RubrosXContratistas/{contratista_id}", response_model=list[schemas.RubrosXContratistas])
def listarRubrosXContratistasByContratista(contratista_id: int, db: Session = Depends(get_db)):
    return db.query(models.RubrosXContratistas).filter(models.RubrosXContratistas.deleted == False, models.RubrosXContratistas.contratistasId == contratista_id).order_by(models.RubrosXContratistas.rubrosId).all()

@app.get("/RubrosXContratistas/getByRubroId/{rubro_id}", response_model=list[schemas.RubrosXContratistas])
def listarRubrosXContratistasByRubro(rubro_id: int, db: Session = Depends(get_db)):
    return db.query(models.RubrosXContratistas).filter(models.RubrosXContratistas.deleted == False, models.RubrosXContratistas.rubrosId == rubro_id).order_by(models.RubrosXContratistas.rubrosId).all()

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
@app.get("/PalabrasClaves/nombresUnicos/", response_model=list[str])
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

# ==== ENDPOINTS PREGUNTAS FRECUENTES ====
@app.get("/PreguntasFrecuentes/", response_model=list[schemas.PreguntasFrecuentes])
def listarPreguntasFrecuentes(db: Session = Depends(get_db)):
    return db.query(models.PreguntasFrecuentes).filter(models.PreguntasFrecuentes.deleted == False).order_by(models.PreguntasFrecuentes.pregunta).all()

@app.get("/PreguntasFrecuentes/{pregunta_id}", response_model=schemas.PreguntasFrecuentes)
def listarPreguntasFrecuentesById(pregunta_id: int, db: Session = Depends(get_db)):
    return preguntas_crud.get_by_id(db, pregunta_id)

@app.post("/PreguntasFrecuentes/")
def crearPreguntasFrecuentes(registro: schemas.PreguntasFrecuentes, db: Session = Depends(get_db)):
    return preguntas_crud.create(db, registro)

@app.put("/PreguntasFrecuentes/{pregunta_id}")
def actualizarPreguntasFrecuentes(pregunta_id: int, registro: schemas.PreguntasFrecuentes, db: Session = Depends(get_db)):
    return preguntas_crud.update(db, pregunta_id, registro)

@app.delete("/PreguntasFrecuentes/{pregunta_id}")
def borrarPreguntasFrecuentes(pregunta_id: int, db: Session = Depends(get_db)):
    return preguntas_crud.logical_delete(db, pregunta_id)

# ==== ENDPOINTS AVISO ====
@app.get("/Aviso/", response_model=list[schemas.Aviso])
def listarAviso(db: Session = Depends(get_db)):
    return db.query(models.Aviso).filter(models.Aviso.deleted == False).order_by(models.Aviso.email).all()

@app.get("/Aviso/{aviso_id}", response_model=schemas.Aviso)
def listarAvisoById(aviso_id: int, db: Session = Depends(get_db)):
    return aviso_crud.get_by_id(db, aviso_id)

@app.post("/Aviso/")
def crearAviso(registro: schemas.Aviso, db: Session = Depends(get_db)):
    return aviso_crud.create(db, registro)

@app.put("/Aviso/{aviso_id}")
def actualizarAviso(aviso_id: int, registro: schemas.Aviso, db: Session = Depends(get_db)):
    return aviso_crud.update(db, aviso_id, registro)

@app.delete("/Aviso/{aviso_id}")
def borrarAviso(aviso_id: int, db: Session = Depends(get_db)):
    return aviso_crud.logical_delete(db, aviso_id)

# ==== ENDPOINTS PUNTUAR ====
@app.get("/Puntuar/", response_model=list[schemas.Puntuar])
def listarPuntuar(db: Session = Depends(get_db)):
    return db.query(models.Puntuar).filter(models.Puntuar.deleted == False).order_by(models.Puntuar.id).all()

@app.get("/Puntuar/{puntuar_id}", response_model=schemas.Puntuar)
def listarPuntuarById(puntuar_id: int, db: Session = Depends(get_db)):
    return puntuar_crud.get_by_id(db, puntuar_id)

@app.post("/Puntuar/")
def crearPuntuar(registro: schemas.Puntuar, db: Session = Depends(get_db)):
    return puntuar_crud.create(db, registro)

@app.put("/Puntuar/{puntuar_id}")
def actualizarPuntuar(puntuar_id: int, registro: schemas.Puntuar, db: Session = Depends(get_db)):
    return puntuar_crud.update(db, puntuar_id, registro)

@app.delete("/Puntuar/{puntuar_id}")
def borrarPuntuar(puntuar_id: int, db: Session = Depends(get_db)):
    return puntuar_crud.logical_delete(db, puntuar_id)

@app.delete("/Puntuar/Fisico/{puntuar_id}")
def borrarPuntuarFisico(puntuar_id: int, db: Session = Depends(get_db)):
    return puntuar_crud.delete(db, puntuar_id)


# ==== ENDPOINTS ENVÍO DE CORREO DE AVISO ====
@app.post("/EnviarAviso/")
async def enviar_correo_aviso(registro: schemas.Aviso, background_tasks: BackgroundTasks):
    """
    Envía un correo de aviso simple a la dirección proporcionada.
    Se ejecuta en tareas de fondo para no bloquear la respuesta HTTP.
    """
    
    # Contenido HTML simple
    html_content = f"""
    <html>
        <body>
            <h3>Generación Automática de Aviso</h3>
            <p>Estimado/a <strong>{registro.nombre}</strong>,</p>
            <p>Le informamos que cuenta con una nueva puntuación pendiente de aprobación.</p>
            <p>Por favor, ingrese en Admin de la aplicación Contacto Ushuaia para más detalles.</p>
            <br>
            <p>Saludos cordiales.</p>
        </body>
    </html>
    """
    
    # Estructura del mensaje de correo
    message = MessageSchema(
        subject="Notificación Contacto Ushuaia",
        recipients=[registro.email], # Espera una lista, aunque solo sea un destinatario
        body=html_content,
        subtype="html"
    )

    # Cliente de correo
    fm = FastMail(conf)
    
    # Agrega la tarea de envío al pool de tareas de fondo
    # Esto asegura que la respuesta sea rápida.
    background_tasks.add_task(fm.send_message, message)

    return {"message": f"Aviso para {registro.nombre} en cola para ser enviado a {registro.email}"}