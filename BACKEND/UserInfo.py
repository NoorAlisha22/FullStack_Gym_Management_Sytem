import mysql.connector
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/select")
def retrieve_data(
    departmentFilter: str = Query(None),
    semesterFilter: str = Query(None),
    SearchData: str = Query(None),
    sortby: str= Query("Sno"),
    sortorder: str= Query("ASC")
):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="info"
    )
    mycursor = mydb.cursor()

    query = "SELECT Sno, Username, Password, Department, Semester, CGPA FROM AuthTable"
    conditions = []
    params = []

    if SearchData:
        search_condition = """
               (Username LIKE %s OR
                Department LIKE %s OR
                CGPA LIKE %s OR
                SNo LIKE %s)
           """
        conditions.append(search_condition)
        wildcard = f"%{SearchData}%"
        params.extend([wildcard, wildcard, wildcard, wildcard])

    if departmentFilter:
        conditions.append("Department = %s")
        params.append(departmentFilter)
    if semesterFilter:
        conditions.append("Semester = %s")
        params.append(semesterFilter)


    if conditions:
        query += " WHERE " + " AND ".join(conditions)


    allowed_sort_col=["Sno","Username","Password","Department","Semester","CGPA"]
    allowed_sort_orders=["ASC","DESC"]

    if sortby in allowed_sort_col and sortorder in allowed_sort_orders:
        query+=f" order by {sortby} {sortorder}"
    else:
        query+=f"order by Sno ASC"


    mycursor.execute(query, params)
    myresult = mycursor.fetchall()


    result_list = []
    for i, j, k, l, m, n in myresult:
        result_list.append({"Sno": i, "Username": j, "Password": k, "Department": l, "Semester": m, "CGPA": n})

    mycursor.close()
    mydb.close()

    return {"users":result_list}