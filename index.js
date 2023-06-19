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

// 서버 실행
const server = app.listen(port, function(){
    console.log("Server Start")
})