"# nodejs-mssql-connect-demo" 

Proof-of-Concept: A node.js project to demo on connecting MS-SQL-Server database and query using DML and Stored Procedure.

We will be trying to achieve this task in below three diffrenet versions:
    A). Async/Await (refer to "src\data-access\db-async-await.js")
    B). Promises (Pending)
    C). Callbacks (Pending)


Pre-Requisites, as below:

************************************************************************
-- MS SQL Server (Create DB, Login, user etc) -- You can change DB name and FileName for .mdf and .ldf as per your choice

Go to "data-schema\db-script.sql" in this project folder and execute the script after opening your SSMS editor.
Please note that I have used SQL Server 2014 for this demo but you can use any 2014 or greater on your machine...

************************************************************************

***********
 NPM used:
***********
    1) npm install express
    2) npm install mssql
    3) npm install -D dotenv
    4) npm install -D debug

