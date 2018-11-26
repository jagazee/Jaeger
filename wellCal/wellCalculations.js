var express = require('express');

const { initTracer } = require("./lib/tracing");
const tracer = initTracer("Well-Calculations");

var app = express();
const port = 3200;
app.listen(port);
console.log(`Listening on port ${port}`);

const http = require('http');
var options = {
    host: 'welldir',
    path: '/api/wells',
    port: 3000
};

app.get('/api/wells/:id', function (req,response) {
     const span = tracer.startSpan('Well-Calculations');
     var wells = [];
     var arr = [];
    let request = http.get(options,function(res){
        res.on('data', function (data) {
            arr += data;
            console.log(arr);
        });
        res.on('end', function () {
            wells = JSON.parse(arr);
            console.log(wells);
            let well = wells.find(c => c.id === parseInt(req.params.id));
            if (!well) response.status('404').send('Well with given id was not found');
            span.setTag("Well:", well);
            span.finish();
            tracer.close();
            response.send(well);

        });
    });
    request.on("error",(err) => {
        console.log("Error: " + err.message);
    });
    request.end();


});








