let fs = require('fs');
var express = require('express');
var app = express();
var config = require('./config.json');
var dbengine = require('./sql/dbengine')(config);

app.use('/',express.static(__dirname + "/www/"));
app.listen(8080);

//******** LOG **********************************************************************/
var trueLog = console.log;
console.log = function(msg)
{
    let BufferDate = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, '0') + new Date().getDate().toString().padStart(2, '0');
    
    if(!fs.existsSync(__dirname +"/log/"))
    {
        fs.mkdirSync(__dirname +"/log/");
    }

    fs.appendFile(__dirname +"/log/" + BufferDate + ".log", msg + '\r\n', function(err) 
    {
        if(err) 
        {
            return trueLog(err);
        }
    });  
    fs.appendFile(__dirname + "/log/" + BufferDate + ".log",'------------------------------------------------------------------------------------------------------\r\n', function(err) 
    {
        if(err) 
        {
            return trueLog(err);
        }
    }); 

    trueLog(msg);
}
process.on('uncaughtException', function(err) {
    console.log(err.stack);
});
//******************************************************************************* */