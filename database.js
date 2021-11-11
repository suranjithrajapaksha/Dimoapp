var mysql = require('mysql');
var express = require('express');
var app = express();

app.get("/", function(request,response){
    fetchData(response);
    console.log('Done');
});

var db = mysql.createConnection({
    host:'mysql',
    user:'root',
    password:'Suranith',
    database:'location'
});

db.connect(function(err){
    if (err){throw err;}
    console.log('connected...')
})

function executeQuery(sql, cb){
    db.query(sql, function(error, result, fields){
        if(error){throw error;}
        cb(result);

    })
}
function fetchData(response){
    executeQuery("SELECT * FROM location", function(result){
        console.log('result');
        response.write('<table><tr>');
        for(var raw in result){
            response.write('<tr>'); 
            for(var column in result[raw]){
                response.write('<td><lable>'+result[raw][column]+'</lable></td>');
            }
            
            response.write('</tr>');
        }
        
        response.end('</table>');  
    });
}



app.listen(8080, function(){
console.log('listening');
})
