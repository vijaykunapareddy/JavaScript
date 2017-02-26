var fs = require('fs');
var url = require('url');

function renderHTML(path, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(path, null, function (error, data) {
        if(error){
            res.writeHeader(404);
            res.write('error occured in  reading the file');
        }else{
            res.write(data);
        }
        res.end();
    });
}


module.exports = {
    handleRequest : function (req, res){
        res.writeHeader(200, {'Content-Type': 'text/html'});
        var path = url.parse(req.url).pathname;
        switch (path){
            case '/' :
                renderHTML('./welcome.html',res);
				break;
            case '/login' :
                renderHTML('./login.html',res);
				break;
            default :
                res.writeHeader(404);
                res.write('page no found');
                res.end();
        }
    }
};


    