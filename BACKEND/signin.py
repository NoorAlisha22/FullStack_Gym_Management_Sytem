from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasicCredentials, HTTPBasic
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

security = HTTPBasic()

# Database connection
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="info"
)

correct_username = "FirstUsr"
correct_password = "aaa"
class Item(BaseModel):
    Username: str
    Password: str
    Department: str
    Semester: int
    CGPA: float
    Name: str


def basic_auth(obj:Item,credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.username != obj.Username or credentials.password != obj.Password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Basic"}
        )
    return credentials


@app.post("/insert")
async def insert(obj: Item, credentials: HTTPBasicCredentials = Depends(basic_auth)):
    mycursor = mydb.cursor()
    mycursor.execute("INSERT INTO AuthTable (Username, Password, Name, Department, Semester, CGPA) VALUES (%s, %s,%s,%s,%s,%s)", (obj.Username, obj.Password, obj.Name,obj.Department,obj.Semester,obj.CGPA))
    mydb.commit()
    mycursor.close()
    return {
        "status": "Success",
        "msg": "successfully inserted",
}