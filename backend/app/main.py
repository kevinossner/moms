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


@app.get("/moms/", response_model=list[schemas.Mom])
def get_moms(db: Session = Depends(get_db)):
    return crud.read_moms(db)

@app.get("/moms/{id}", response_model=schemas.Mom)
def get_mom_by_id(id: int, db: Session = Depends(get_db)):
    return crud.read_mom_by_id(db, id=id)

@app.post("/moms/", response_model=schemas.Mom)
def post_mom(mom: schemas.MomBase, db: Session = Depends(get_db)):
    return crud.create_mom(db=db, mom=mom)

@app.put("/moms/{id}", response_model=schemas.Mom)
def put_mom(id: int, mom: schemas.MomBase, db: Session = Depends(get_db)):
    return crud.update_mom(db=db, id=id, mom=mom)

@app.delete("/moms/{id}", response_model=schemas.Mom)
def delete_mom(id: int, db: Session = Depends(get_db)):
    return crud.delete_mom(db=db, id=id)

@app.get("/appointments/", response_model=list[schemas.Appointment])
def get_appointments(db: Session = Depends(get_db)):
    return crud.read_appointments(db)

@app.get("/appointments/{date}", response_model=list[schemas.Appointment])
def get_appointments_by_date(date: str, db: Session = Depends(get_db)):
    return crud.read_appointments_by_date(db, date=date)

@app.delete("/appointments/{id}", response_model=schemas.Appointment)
def delete_appointment(id: int, db: Session = Depends(get_db)):
    return crud.delete_appointment(db=db, id=id)

@app.post("/appointments/", response_model=schemas.Appointment)
def post_appointment(appointment: schemas.AppointmentBase, db: Session = Depends(get_db)):
    return crud.create_appointment(db=db, appointment=appointment)

@app.get("/registrations/", response_model=list[schemas.Registration])
def get_registrations(db: Session = Depends(get_db)):
    return crud.read_registrations(db)

@app.post("/registrations/", response_model=schemas.Registration)
def post_registration(registration: schemas.RegistrationBase, db: Session = Depends(get_db)):
    return crud.create_registration(db=db, registration=registration)

@app.delete("/registrations/{id}", response_model=schemas.Registration)
def delete_registration(id: int, db: Session = Depends(get_db)):
    return crud.delete_registration(db=db, id=id)