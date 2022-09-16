const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const MongoClient = require('mongodb').MongoClient;
// ejs라는 view engine을 쓰겠다 - ejs는 html이랑 비슷하게 생겼으나 데이터를 보여줄 수 있음!
app.set('view engine', 'ejs');
var db;
MongoClient.connect('mongodb+srv://moonjs:5855mj@realmcluster.idv44.mongodb.net/nodeTest?retryWrites=true&w=majority',
function(error,client){
    if(error) {return console.log(error)}

    // db명!
    db = client.db('nodeTest');

    //collection 괄호 안엔 table명
    // db.collection('moon').insertOne({이름: 'Moon', 나이 : '27+1', _id : 'id도 내가 부여할 수 있음'}, function(error, result){
    //     console.log('save success');
    // });

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
    //collection 괄호 안엔 table명
    db.collection('moon').insertOne({제목: req.body.title, 날짜: req.body.date},function(){
        console.log('완료')
    })
});

app.get('/list',function(req,res){
    // db data 모두 꺼내기
    db.collection('moon').find().toArray(function(error, result){
        console.log(result);
        res.render('list.ejs', {posts:result});
    });
})