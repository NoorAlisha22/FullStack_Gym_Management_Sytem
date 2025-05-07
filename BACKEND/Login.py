import mysql.connector
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="info"
)

# Request model
class Item(BaseModel):
    Username: str
    Password: str

# Authentication
security = HTTPBasic()

def authenticate(credentials: HTTPBasicCredentials, obj: Item):
    if credentials.username != obj.Username or credentials.password != obj.Password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )


@app.post("/Validate")
def ValidateFunc(credentials: HTTPBasicCredentials = Depends(security)):
    mycursor = mydb.cursor()
    mycursor.execute("SELECT Password FROM AuthTable WHERE Username = %s", (credentials.username,))
    result = mycursor.fetchone()
    mycursor.close()

    if result and result[0] == credentials.password:
        return {"status": "Success", "message": "Login successful"}
    raise HTTPException(status_code=400, detail="Invalid Username or Password")

@app.get("/AuthTable")
def func():
    mycursor = mydb.cursor()
    mycursor.execute("SELECT Sno,Username, Password,Department,Semester,CGPA FROM AuthTable;")
    myresult = mycursor.fetchall()
    mycursor.close()
    return {"users":myresult}


