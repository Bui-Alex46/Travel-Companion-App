import sqlite3

# Save database in the memory
conn = sqlite3.connect('employee.db')

# create a cursor to execute Sql statement
c = conn.cursor()

# c.execute("""CREATE TABLE employees (
#             first TEXT,
#             last TEXT,
#             pay REAL
#     )""")

# c.execute("INSERT INTO employees VALUES ('Jason', 'Zeng', 150000.00)")

c.execute("SELECT * FROM employees")

print(c.fetchall())

conn.commit()


conn.close()