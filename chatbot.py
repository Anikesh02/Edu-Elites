import mysql.connector

def get_gpt4_Response(text):    
    mydb = mysql.connector.connect(
        host="cloud.mindsdb.com",
        user="parthjain1812@gmail.com",
        password='Dhruvparth2',
        port="3306"
    )

    cursor = mydb.cursor()
    cursor.execute(f'''SELECT response FROM mindsdb.eduLearningModel WHERE text = "{text}"''')

    return(cursor.fetchone()[0])