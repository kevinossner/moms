from sqlalchemy.orm import Session

from .. import models, schemas


def read_mamas(db: Session):
    return db.query(models.Mama).order_by(models.Mama.last_name).all()

def read_mama_by_id(db: Session, id: int):
    return db.query(models.Mama).filter(models.Mama.id == id).first()

def create_mama(db: Session, mama: schemas.MamaBase):
    db_entry = models.Mama(first_name=mama.first_name, last_name=mama.last_name)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def delete_mama(db: Session, id: int):
    db_entry = db.query(models.Mama).filter(models.Mama.id == id).first()
    db.delete(db_entry)
    db.commit()
    return db_entry

def update_mama(db: Session, id: int, mama: schemas.MamaBase):
    db_entry = db.query(models.Mama).filter(models.Mama.id == id).first()
    for key, value in mama.dict().items():
        setattr(db_entry, key, value)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry