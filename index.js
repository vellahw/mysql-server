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

// mysql2 라이브러리 로드
const mysql = require('mysql2')
// mysql 서버 정보를 입력하여 연결하기 
const connection = mysql.createConnection({
    host : 'localhost', // 주소 = 어디에있는 mysql을 사용할 것인가
    port : 3306,
    user : 'root',
    password : '0000', // 패스워드 지정 안 했으면 패스 가능
    database : 'my_data'
})

// 서버 실행
const server = app.listen(port, function(){
    console.log("Server Start")
})