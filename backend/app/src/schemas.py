from pydantic import BaseModel


class MamaBase(BaseModel):
    first_name: str
    last_name: str
    payment_status: bool

class Mama(MamaBase):
    id: int

    class Config:
        orm_mode = True

class AppointmentBase(BaseModel):
    name: str
    date: str

class Appointment(AppointmentBase):
    id: int

    class Config:
        orm_mode = True