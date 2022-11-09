var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'TaniRA143',
  database : 'new_schema'
});

connection.connect();
var create_query = "create table students (student_number int, student_name varchar(50), date_of_birth date, height int, gender enum('m', 'f'))"

connection.query(create_query, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results[0]);
});
var insert_queries = [
                    "insert into students values (103, 'Ahmad', '1986-01-11', 8.3, 'm')",
                    "insert into students values (104, 'Rim', '1979-11-01', 8.7, 'f')",
                    "insert into students values (105, 'Rabia', '1978-05-30', 8.1, 'f')",
                    "insert into students values (106, 'Karam', '1994-02-02', 8.8, 'm')"
                    ]

for(var i in insert_queries){
    console.log("Going to run ", insert_queries[i])
    connection.query(insert_queries[i], function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log("the reply is ", results[0]);
    });
}
connection.end();
