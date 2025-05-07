import mysql.connector
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow POST, GET, OPTIONS, etc.
    allow_headers=["*"],
)


security=HTTPBasic()
mydb=mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="info"
)
class Item(BaseModel):
   Username:str
   Password:str

def authenticate(credentials: HTTPBasicCredentials, obj: Item):
       if credentials.username != obj.Username or credentials.password != obj.Password:
           raise HTTPException(
               status_code=status.HTTP_401_UNAUTHORIZED,
               detail="Invalid credentials",
               headers={"WWW-Authenticate": "Basic"})

@app.post("/reset-password")
def frgtpass(obj: Item,
    credentials: HTTPBasicCredentials = Depends(security)):
    authenticate(credentials, obj)
    mycursor = mydb.cursor()
    mycursor.execute("select Username,Password from AuthTable;")
    myresult=mycursor.fetchall()
    for Username,Password in myresult:
     if Username==obj.Username:
        mycursor.execute("update AuthTable set Password=%s where Username=%s;",(obj.Password,obj.Username))
        mydb.commit()
        return{"status": "Success",
            "message": "Password updated successfully"}

    mycursor.close()
    mydb.close()