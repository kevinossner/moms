from pydantic import BaseModel
from typing import List


class MomBase(BaseModel):
    first_name: str
    last_name: str
    payment_status: bool

class Mom(MomBase):
    id: int

    class Config:
        orm_mode = True

class RegistrationBase(BaseModel):
    mom_id: int
    appointment_id: int

class Registration(RegistrationBase):
    id: int
    mom: Mom
    attended: bool

    class Config:
        orm_mode = True

class AppointmentBase(BaseModel):
    name: str
    date: str

class Appointment(AppointmentBase):
    id: int
    registrations: List[Registration]

    class Config:
        orm_mode = True