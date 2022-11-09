var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'TaniRA143',
  database : 'new_schema'
});

connection.connect();

var create_query = "create table teachers (teacher_number int, teacher_name varchar(50), date_of_birth date, subject text, gender enum('m', 'f'))"

connection.query(create_query, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results[0]);
});
connection.end();
