// express 로드
const express = require('express')
const app = express()
const port = 3000

// view 파일의 기본 경로 설정
app.set('views', __dirname+"/views")
// view engine 지정 -> ejs
app.set('view engine', 'ejs')

// post 형태로 데이터를 받는 겅우 json 형태로 데이터를 변환해주는 세팅
app.use(express.urlencoded({extended:false}))

// dotenv를 이용하여 환경변수 설정
require('dotenv').config()

// mysql2 라이브러리 로드
const mysql = require('mysql2')

// .env 파일과 연결?하기 
const connection = mysql.createConnection({
    host : process.env.host,
    port :  process.env.port,
    user : process.env.user,
    password :  process.env.password, 
    database :  process.env.database
})

// localhost:3000으로 요청이 들어오는 경우
app.get('/', function(req, res){
    res.render('login')
})

// localhost:3000/signup [get]
app.get('/signup', function(req, res){
    res.render('signup')
})

// localhost:3000/login [post]
app.post('/login', function(req, res){
    // 유저가 보낸 데이터를 변수에 대입 & 확인
    const input_id = req.body._id
    const input_pass = req.body._pass
    console.log("id: ", input_id, "pass: ", input_pass)

    // user_info 테이블에서 유저가 입력한 데이터가 존재하는지 확인하기
    const sql = `
        select
        *
        from
        user_info
        where
        id = ?
        and
        password = ?
        `
    // 물음표 안에 들어갈 값
    const values = [input_id, input_pass]
    connection.query(
        sql,
        values,
        function(err, result) {
            if(err) {
                console.log(err)
                res.send(err)
            } else {
                // mysql에서 express 서버 결과물의 데이터의 형태 (배열 안 JSON 형태)
                /*
                데이터가 존재하는 경우
                  [
                    {
                        'id' : xxxx,
                        'password' : xxxx,
                        'name' : xxxx,
                        'age' : xxxx,
                        'log': xxxx
                    }
                 ] 
                
                데이터가 존재하지 않는 경우
                  []
                */
                
                if(result.length == 0){
                    res.send("로그인 실패")
                } else {
                    res.send("로그인 성공")
                }
            }
        }
    )    
})


// const connection = mysql.createConnection({
//     host : 'localhost', // 주소 = 어디에있는 mysql을 사용할 것인가 | 맥의 경우 127.0.0.1로 입력
//     port : 3306,
//     user : 'root',
//     password : '0000', // 패스워드 지정 안 했으면 패스 가능
//     database : 'my_data'
// })

// 서버 실행
const server = app.listen(port, function(){
    console.log("Server Start")
})