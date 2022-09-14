const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://moonjs:5855mj@realmcluster.idv44.mongodb.net/nodeTest?retryWrites=true&w=majority',
function(error,client){
    app.listen(8080,function(){
        // 앞에건 서버띄울번호 뒤엔 그 서버에 실행할 기능
        console.log('server start');
    });
})

// mongodb
// mongodb+srv://moonjs:<password>@realmcluster.idv44.mongodb.net/?retryWrites=true&w=majority




app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/write',function(req, res){
    res.sendFile(__dirname + '/write.html');
});


// 내가 보낸 정보는 req에 담겨있는데 보고싶으면 body-parser라는 라이브러리를 다운로드 받아야한다.
app.post('/newPost', function(req, res){
    res.send('전송완료');
    console.log(req.body);
    // 응답을 받아오면 객체형태라서 req.body안에 있는 것들을 꺼내와야한다.
    // DB에 저장하고싶으면 mongoDB는 호스팅을 받을수있음
})