// 익스프레스 웹 프레임워크 사용 설정 
const express = require('express')
const app = express()
const port = 3000


const connect = require('./schemas');
connect();

// 라우트 기능 사용. require() 안에 파일 위치를 보내면 해당 폴더의 js 파일을 사용할 수 있다.
// 라우트 기능을 사용하면 내가 index.js에 ./routes/goods 즉, ./routes라는 공통적인 경로를 갖는 애들을 다른 파일에 정리해서 사용할 수 있다.
// const goodsRouter = require('./routes/goods');
// const userRouter = require('./routes/user');

// 라우트 기능. routers 폴더 하위의 goods.js에 접근 
// 
const goodsRouter = require("./routers/goods");
app.use("/api", [goodsRouter]);


// 미들웨어란 route를 요청하기 전에 실행되는 기능을 의미한다. route에 오기 전 중간단계에서 처리해야할 작업을 설정한다.
// express.json(), express.urlencoded({ extended: false }) 는 데이터 가공 용도로 사용한다.
// express.static('public')을 작성하고 public directory 안에 cat.png를 넣었다. 이 경우, http://localhost:3000/cat.jpg 의 주소로 들어가면 이미지를 웹 브라우저에서 볼 수 있다.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


// use 함수를 사용하여 라우트 기능을 사용할 수 있다. 
// app.use('/goods', goodsRouter);
// app.use('/user', userRouter);

// set 함수를 사용해서 ejs 템플릿을 사용할 수 있다.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 템플릿을 사용하는 경우, res.send가 아닌, res.render를 사용한다.
// 우리가 값을 넘길때 body로 넘길 수도 있고 query로 넘길 수 있는데 여기서는 query를 사용함
// test?name=willy 이렇게 주소 뒷창에 치면 해당 쿼리스트링이 여기로 넘어온다! 
app.get('/test', (req, res) => {
    let name = req.query.name;
    res.render('test', { name });
})

app.get('/home', (req, res) => {
    res.render('index');
})

app.get('/detail', (req, res) => {
    let goodsId = req.query.goodsId;
    res.render('detail', { goodsId });
})


app.get('/', (req, res) => {
    res.send('<!DOCTYPE html>\
    <html lang="en">\
    <head>\
        <meta charset="UTF-8">\
        <meta http-equiv="X-UA-Compatible" content="IE=edge">\
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
        <title>Document</title>\
    </head>\
    <body>\
        Hi. I am with html<br>\
        <a href="/hi">Say Hi!</a>\
    </body>\
    </html>')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})