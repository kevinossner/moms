from pydantic import BaseModel


class MamaBase(BaseModel):
    first_name: str
    last_name: str

class Mama(MamaBase):
    id: int

    class Config:
        orm_mode = True