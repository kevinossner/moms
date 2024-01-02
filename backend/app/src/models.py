from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Mom(Base):
    __tablename__ = "moms"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    payment_status = Column(Boolean, default=True)
    registrations = relationship('Registration', back_populates='mom')

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    date = Column(String)
    registrations = relationship('Registration', back_populates='appointments')

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    appointment_id = Column(Integer, ForeignKey("appointments.id"))
    mom_id = Column(Integer, ForeignKey("moms.id"))
    mom = relationship('Mom', lazy='subquery', back_populates='registrations')
    appointments = relationship('Appointment', back_populates='registrations')