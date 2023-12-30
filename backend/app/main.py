from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .src.utils import crud
from .src import models, schemas
from .src.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/mamas/", response_model=list[schemas.Mama])
def get_mamas(db: Session = Depends(get_db)):
    return crud.read_mamas(db)

@app.get("/mamas/{id}", response_model=schemas.Mama)
def get_mama_by_id(id: int, db: Session = Depends(get_db)):
    return crud.read_mama_by_id(db, id=id)

@app.post("/mamas/", response_model=schemas.Mama)
def post_mama(mama: schemas.MamaBase, db: Session = Depends(get_db)):
    return crud.create_mama(db=db, mama=mama)

@app.put("/mamas/{id}", response_model=schemas.Mama)
def put_mama(id: int, mama: schemas.MamaBase, db: Session = Depends(get_db)):
    return crud.update_mama(db=db, id=id, mama=mama)

@app.delete("/mamas/{id}", response_model=schemas.Mama)
def delete_mama(id: int, db: Session = Depends(get_db)):
    return crud.delete_mama(db=db, id=id)

@app.get("/appointments/", response_model=list[schemas.Appointment])
def get_appointments(db: Session = Depends(get_db)):
    return crud.read_appointments(db)

@app.post("/appointments/", response_model=schemas.Appointment)
def post_appointment(appointment: schemas.AppointmentBase, db: Session = Depends(get_db)):
    return crud.create_appointment(db=db, appointment=appointment)