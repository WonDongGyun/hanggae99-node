# hanggae99-node  
[**[트리스티의 [항해99] 노드편에 오신 여러분을 환영합니다!]**](https://tristy.tistory.com/)  
항해99 으썸한 노드 시작편.  
지금 시작합니다!!!  

Express???  
------------
> Node.js를 위한 빠르고 개방적인 간결한 웹 프레임워크  

Express란 무엇이고 왜 사용하는지 한번 간단하게 배워봅시다.  

#### 웹 서버
> 우리가 어떤 브라우저의 주소창에 주소를 쳤을 때, 화면을 보내서 볼 수 있게 해주는 것을 웹서버라고 합니다.  
> 웹브라우저의 주소창에 특정 주소를 적었을 때, 브라우저는 해당 주소에 존재하는 웹서버를 호출하고 웹서버는 홈페이지 내용을 웹브라우저에게 보내줍니다.  

Node.js에서도 웹서버를 만들 수 있습니다. 하지만 혼자서 이미지나 파일을 관리하고, url로 넘어온 파라미터들을 분류해서 다른 화면을 보여주고, 로그인 관리를 하는 것이 쉽지만은 않습니다.  
이런 작업들을 쉽게 할 수 있도록 필요한 기능들을 미리 만들어둔 것을 **프레임워크(FrameWork)** 라고 합니다.  
**Express** 는 node에서 웹서버를 만들기 위해 사용하는 프레임워크 중 가장 보편적으로 사용하는 것입니다.


#### 사용하기 [기초 설정편]

먼저 vsCode 터미널에서 다음의 명령어를 입력합시다.  

```bash
$ npm init -y
```  

설마 앞에 달러 표시까지 입력하지는 않겠죠?  
**npm init -y** 를 입력하면 여러가지 기본 설정을 알아서 설정해줍니다. 설정이 끝나면 아래와 같이 **package.json** 파일이 생성됩니다.

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/111860518-61d8f500-898b-11eb-9b00-a1ce0d95c901.png"></p>



그리고 express를 설치해 봅시다. 마찬가지로 터미널에 다음의 명령어를 입력합시다.  
```bash
$ npm install express
```  

그러면 이렇게 짜잔~  
package.json 파일에 express가 들어가 있는것을 확인할 수 있답니다.
<p align="center"><img src="https://user-images.githubusercontent.com/52685665/111860644-3d314d00-898c-11eb-94d7-4d9dac6fc618.png"></p>

추가로 package-lock.json 파일과 node_modules 라는 파일이 생성된 것을 확인할 수 있답니다.  


**package-lock.json**
> 어떤 패키지들이 어떤 버전으로 설치되었는지 기록해놓은 파일. 이 파일이 있다면 다른 사람들과 협업할 때 같은 환경으로 개발할 수 있게 해준다.  

**node_modules**
> 실제로 설치된 패키지들이 들어있는 폴더

이제 기초 설정은 끝났습니다. 터미널에 다음의 명령어를 입력하고 웹페이지가 잘 나오는지 확인해봅시다.
```bash
$ node index.js
```  
브라우저에 http://localhost:자신이 설정한 포트번호/ 를 입력해봅시다.



#### 사용하기 [기본편 1]  
Express도 설치했으니 요녀석에 대해 좀 더 알아봅시다. 알아야 쓰죠~  

```javascript
const express = require('express')
const app = express()
const port = 3000
```  
위의 코드는 Express를 사용하기 위한 기본 설정입니다. 포트번호를 바꿀 때에는 port 변수의 값을 조정해주시면 됩니다.  


1. Routing
   > 경로를 찾아가는 과정이라는 뜻으로, url의 path 부분에 따라 다른 결과를 보여주도록 합니다.

```javascript
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```  
Express에서는 get()을 사용하여 라우팅 설정을 합니다. 위의 코드는 웹서버를 실행하고,  
res.send()를 사용해서홈페이지에 처음 들어갔을 때 나오는 default화면에 'Hello World!'를 띄웁니다.  

router는 url 주소 외에도 http method라는 부분을 통해 다르게 응답할 수도 있습니다.
> GET, POST, DELETE, HEAD, PUT, CONNECT, OPTIONS, TRACE, PATCH


router를 사용하면 사용자가 요청한 url마다 다르게 응답할 수 있습니다. 하지만, 하나의 파일에 여러개의 페이지를 몰아 넣기에는 너무 코드가 길어집니다.  
그래서 router는 공통된 부분을 묶어서 다른 폴더에 보관하게 하고, 그것을 꺼내서 사용할 수 있게끔 하는 설정을 제공한답니다.  

```javascript
const goodsRouter = require('./routes/goods');
app.use('/goods',goodsRouter);
```
require('./파일이 들어있는 폴더/js파일');  
app.use('/설정할 url',goodsRouter);  
이렇게 설정하면 폴더가 다르더라도 url에 접근할 수 있답니다.  
그리고 router를 설정한 폴더의 js파일에는 이런식으로 설정을 해주시면 됩니다.  

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/111861526-648b1880-8992-11eb-9ff4-4547b0e55b08.png"></p>

2. Middleware
   > route를 요청하기 전에 실행되는 기능을 의미합니다.  route에 오기 전 중간단계에서 처리해야할 작업을 설정해두면, route에 접근 전 middleware의 기능이 실행됩니다.

```javascript
app.use((req, res, next) => {
  console.log(req);
  next();
});
```
미들웨어의 경우 설정이 조금 다릅니다. router를 쓸 때는 get()을 사용했다면 미들웨어의 경우에는 use()를 사용합니다.  
위의 예시 코드를 사용하게 되면 어떤 요청이 들어오던 간에, req 로그를 찍고 next()로 다음 미들웨어를 실행합니다.  
만약 없다면 router가 실행되겠죠.  

```javascript
app.use(express.static('public'));
```

static은 Express에서 제공하는 가장 기본적인 미들웨어 입니다. 위의 코드를 사용하면 public이라는 폴더에 있는 파일을 사용할 수 있습니다.  
이 프로젝트에는 이미지가 들어있습니다. 웹브라우저 주소입력창에 localhost 주소끝에 cat.png를 입력해 보면 고양이 사진이 나온답니다~  



3. Template Engine
  > 웹서버를 구현하면, 해당 url에 따라 웹페이지를 보여주게 될 것입니다. 하지만, 그 때마다 html 파일을 전부 다 추가하기에는 너무 많고 복잡해지지 않을까요?  
  > 템플릿 엔진을 사용하면 공통의 html을 미리 정의하고 페이지 특성에 따라 다른 부분을 동적으로 바꿀 수 있답니다.  
  > 최근에는 페이지 마다 특성이 너무 다르다 보니 안쓰는 경우도 있다고 하네요.  
  > 
  > - 많은 코드를 줄일 수 있다.
  > - 재사용성이 높다.
  > - 유지보수에 용이하다.
  > 라는 장점이 있습니다.

Express에는 수많은 템플릿 엔진이 존재하는데, 여기서는 ejs라는 템플릿 엔진을 사용해 볼 것입니다.   
```javascript
$ npm install ejs
```

터미널에서 위의 코드를 입력하시고, package.json에 dependencies 부분에 ejs라는 항목이 들어가 있는지 확인해주세요.  


```javascript
app.get('/test', (req, res) => {
  let name = req.query.name;
  res.render('test', {name});
})
```
<p align="center"><img src="https://user-images.githubusercontent.com/52685665/111862223-47a51400-8997-11eb-8344-9ec4f57c4e29.png"></p>


템플릿 엔진에서는 해당 route로 데이터를 넘겨줄 수 있습니다. res.render() 부분에서 'test.ejs'에 파일을 그리고 해당 ejs에 { name } 값을 넘겨주고 있습니다.  
해당 route로 데이터를 넘겨줄 때는 http://localhost:3000/test?name=donggyun 이런식으로 넘겨줄 수 있답니다.  
해당 데이터를 넘겨주면 <%= name %> 이 부분이 { name } 값을 받아서 해당 값을 보여줍니다.  



#### 사용하기 [기본편 2] 










