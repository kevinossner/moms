from sqlalchemy.orm import Session

from .. import models, schemas


def read_moms(db: Session):
    return db.query(models.Mom).order_by(models.Mom.last_name).all()

def read_mom_by_id(db: Session, id: int):
    return db.query(models.Mom).filter(models.Mom.id == id).first()

def create_mom(db: Session, mom: schemas.MomBase):
    db_entry = models.Mom(first_name=mom.first_name, last_name=mom.last_name, payment_status=mom.payment_status)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def delete_mom(db: Session, id: int):
    db_entry = db.query(models.Mom).filter(models.Mom.id == id).first()
    db.delete(db_entry)
    db.commit()
    return db_entry

def update_mom(db: Session, id: int, mom: schemas.MomBase):
    db_entry = db.query(models.Mom).filter(models.Mom.id == id).first()
    for key, value in mom.dict().items():
        setattr(db_entry, key, value)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def read_appointments(db: Session):
    return db.query(models.Appointment).order_by(models.Appointment.id).all()

def read_appointments_by_date(db: Session, date: str):
    return db.query(models.Appointment).filter(models.Appointment.date == date).all()

def delete_appointment(db: Session, id: int):
    db_entry = db.query(models.Appointment).filter(models.Appointment.id == id).first()
    db.delete(db_entry)
    db.commit()
    return db_entry

def create_appointment(db: Session, appointment: schemas.AppointmentBase):
    db_entry = models.Appointment(name=appointment.name, date=appointment.date)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def read_registrations(db: Session):
    return db.query(models.Registration).order_by(models.Registration.id).all()

def create_registration(db: Session, registration: schemas.RegistrationBase):
    db_entry = models.Registration(appointment_id=registration.appointment_id, mom_id=registration.mom_id)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def update_registration(db: Session, id: int, attended: bool):
    db_entry = db.query(models.Registration).filter(models.Registration.id == id).first()
    db_entry.attended = attended
    db.commit()
    db.refresh(db_entry)
    return db_entry

def delete_registration(db: Session, id: int):
    db_entry = db.query(models.Registration).filter(models.Registration.id == id).first()
    db.delete(db_entry)
    db.commit()
    return db_entry