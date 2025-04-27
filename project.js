class Layer{
    constructor(graphics,name="",idx,input = []){
        this.g = graphics
        this.name = name
        this.idx = idx
        this.input = input
    }
    display(){
        image(this.g,0,0)
    }
}

function preload(){
    img1 = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mama_instant_noodle_block.jpg/600px-Mama_instant_noodle_block.jpg?20140515094805')
    img2 = loadImage('https://upload.wikimedia.org/wikipedia/commons/9/9c/Garak-guksu.jpg')
    
}
let arr1 = []
let arr2 = ["우동","라면"]
arr1.push(arr2)
let con = arr1[0][1]
let page = 0

let tabWidth = 1600
let tabCount = 1
let search = false
let setWidth = 270
let setTab = 15
let weatherData;
let isWeatherLoading = true;
function setup() {
    createCanvas(1600, 900)
    noStroke()

    inputBox = createInput('')
    inputBox.position(width/2 - 250, height - 80)// 채팅 입력창 위치
    inputBox.size(500,50) // 채팅 입력창크기설정
    inputBox.style('font-size', '20px')// 입력창 입력문자크기 설정
    inputBox.hide() // 초기화면에서 입력창 숨기기

    img1.resize(300,300)
    img2.resize(300,300)
    img = img1
    rank = "인스턴트 인간"
    N1 = 1
    N2 = 1
    kmeter = "300"
    won1 = 2500
    won2 = 0
    n = 1
    layers = []
    layers.push(body = new Layer(createGraphics(width,height),"body",0))// 초기화면생성
    
    body.draw = ()=>{
        body.g.fill(255)
        body.g.rect(5, 5, width - 10, height - 10)
        body.g.noStroke()
        body.g.rect(1455,100, 130, 130)
        body.g.fill(160)
        body.g.stroke(0)
        body.g.strokeWeight(1)
        body.g.textSize(150)
        body.g.text("⚙",1456,220)
        body.g.fill(255)
        body.g.strokeWeight(5)
        for (let i = 0; i < 1; i++) {
            if (mouseX < width/2+400 && mouseX > width/2-400 && mouseY > height/2-100 && mouseY < height/2+100) {
                body.g.stroke(160)
            } 
            else {
                body.g.stroke(255)
            }
            body.g.rect(width/2-400, height/2-100, 800, 200)
        }
        body.g.fill(0)
        body.g.textSize(150)
        body.g.strokeWeight(1)
        body.g.text("메뉴 찾기",width/2-285,height/2+55)
        body.g.fill(152,251,152)
        body.g.stroke(255)
        body.g.rect(1465,260, 110, 110,20)
    }

    for(let i=0;i<layers.length;i++){
        layers[i].display()
    }
    
}

function draw() {
    background(0)
    drawContentBox()
    if (page < layers.length) {
        if (typeof layers[page].draw === "function") {
            layers[page].draw()
        }
        layers[page].display()
    }
    if (layers[page].name !== "search") {
        inputBox.hide()
    }
}

function drawContentBox() {
    stroke(0)
    strokeWeight(5)
    fill(255)
    rect(5, 5, width - 10, height - 10)
}

function getWeather() {
    let apiKey = '1a81ae5c986844dd9f794843252704'; // <-- 여기 너의 WeatherAPI 키 입력!
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=대덕면&lang=ko`;
  
    loadJSON(url, gotWeather, 'json');
}

function gotWeather(data) {
    weatherData = data
    console.log(weatherData)
}

let userInput = ""
let keyon = false
let a = 0
function searchTab() {
    let newLayer = new Layer(createGraphics(width, height), "search", tabCount)
    newLayer.draw = () => {
        const questions = [
            ["오늘의 기분은?", "1:매우 나쁨 ~ 5:매우 좋음"],
            ["사용할 수 있는 금액", "(숫자만입력)"],
            ["인원수 입력", "(숫자만입력)"]
        ]
        newLayer.g.textAlign(CENTER, CENTER)
        newLayer.g.fill(255)
        inputBox.show()
        newLayer.g.stroke(0)
        
        newLayer.g.strokeWeight(1)
        newLayer.g.textSize(30)

        if (newLayer.input.length == 0){
            newLayer.g.fill(255)
            newLayer.g.rect(300,220, 350, 80, 20)
            newLayer.g.fill(0)
            newLayer.g.text("오늘의 기분은?",475,240)
            newLayer.g.text("1:매우 나쁨 ~ 5:매우 좋음",475,280)
        }
        if (keyon){
            for (i = 0; i < newLayer.input.length; i++){
                newLayer.g.fill(255)
                newLayer.g.rect(950,300 + i * 200, 350, 100, 20)
                newLayer.g.rect(300,220 + i * 200, 350, 80, 20)
                if (i < 2){
                    newLayer.g.rect(300,220 + (i + 1) * 200, 350, 80, 20)
                }
                newLayer.g.fill(0)
                newLayer.g.textSize(40)
                newLayer.g.text(newLayer.input[i],1125,345 + i * 200)
                newLayer.g.textSize(30)
                if (a === 1){
                    newLayer.g.text(questions[0][0],475,240)
                    newLayer.g.text(questions[0][1],475,280)
                    newLayer.g.text(questions[1][0],475,440)
                    newLayer.g.text(questions[1][1],475,480)
                }
                else if (a === 2){
                    newLayer.g.text(questions[0][0],475,240)
                    newLayer.g.text(questions[0][1],475,280)
                    newLayer.g.text(questions[1][0],475,440)
                    newLayer.g.text(questions[1][1],475,480)
                    newLayer.g.text(questions[2][0],475,640)
                    newLayer.g.text(questions[2][1],475,680)
                }
                else if (a === 3){
                    newLayer.g.text(questions[0][0],475,240)
                    newLayer.g.text(questions[0][1],475,280)
                    newLayer.g.text(questions[1][0],475,440)
                    newLayer.g.text(questions[1][1],475,480)
                    newLayer.g.text(questions[2][0],475,640)
                    newLayer.g.text(questions[2][1],475,680)
                    newLayer.g.fill(255)
                    newLayer.g.rect(100,height/2-100,width-200,200)
                    newLayer.g.fill(0)
                    newLayer.g.textSize(100)
                    newLayer.g.text("잠시후 이동합니다.",width/2,height/2)
                    setTimeout(() => {
                        result1()
                        tabCount += 1
                        page = tabCount - 1
                      }, 2000)
                }
            }
            inputBox.value('')
            keyon = false
        }
    }
    layers.push(newLayer)
}

function keyPressed(){
    if (search && keyCode === ENTER && inputBox.value() !== ""){
        userInput = inputBox.value()
        layers[page].input.push(userInput)
        keyon = true
        a +=1
    }
}

function result1(){
    let newLayer = new Layer(createGraphics(width, height), "result1", tabCount)
    newLayer.draw = ()=>{
        newLayer.g.stroke(0)
        newLayer.g.fill(255)
        newLayer.g.rect(5, 5, width - 10, height - 10)
        newLayer.g.rect(width/2-600,height/2-100,200,100)
        newLayer.g.fill(0)
        newLayer.g.textSize(40)
        newLayer.g.textAlign(CENTER, CENTER)
        newLayer.g.text("<-- 이전",width/2-500,height/2-50)

        newLayer.g.fill(255)
        newLayer.g.rect(width/2+400,height/2-100,200,100)
        newLayer.g.fill(0)
        newLayer.g.text("넘기기 -->",width/2+500,height/2-50)

        newLayer.g.fill(255)
        newLayer.g.rect(width/2-100,height/2+120,200,100)
        newLayer.g.fill(0)
        newLayer.g.text("<확정>",width/2,height/2+170)
        newLayer.g.text("이 메뉴를 먹은지 " + N1 + "일이 지났습니다.",width/2,30)
        newLayer.g.text("이 메뉴를 먹은지 " + N1 + "일이 지났습니다.",width/2,30)
        newLayer.g.text(rank + " 업적 달성까지 " + N2 + "번 남았습니다.",width/2,100)

        newLayer.g.fill(0)
        newLayer.g.text("주의: ??? 알러지를 유발할 수 있습니다.",width/2,710)
        newLayer.g.text("평균가격: " + won1 + "원",width/2,790)
        newLayer.g.image(img,width/2-150,height/2-200)
    }

    layers.push(newLayer)
}

function result2(){
    let newLayer = new Layer(createGraphics(width, height), "result2", tabCount)
    newLayer.draw = ()=>{
        newLayer.g.fill(0)
        newLayer.g.textSize(40)
        newLayer.g.textAlign(CENTER, CENTER)
        newLayer.g.text("축하합니다!! 오늘의 메뉴는 " + con + "입니다.", width/2, height/2+200)
        newLayer.g.image(img,width/2-150,height/2-200)
    }
    layers.push(newLayer)
}

function mousePressed() {
    let tab = tabWidth/tabCount

    for (let i = 0; i < tabCount; i++) {
        if (mouseX < (i + 1) * tab - 35 && mouseX > i * tab && mouseX < (i + 1) * tab && mouseX > i * tab - 5 && mouseY > 60 && mouseY < 100) {
            page = i
        }
        
        
    }
    for (let i = 0; i < tabCount; i++) {
        if (mouseX < (i + 1) * tab - 5 && mouseX > (i + 1) * tab - 35 && mouseY > 65 && mouseY < 95 && i !== 0) {
            layers.splice(i, 1)
            tabCount--
            if (page === i) {
                page = i - 1
            } else if (page > i) {
                page--
                
            }
            return
        }
    }
    
    if (page === 0 && mouseX < width/2+400 && mouseX > width/2-400 && mouseY > height/2-100 && mouseY < height/2+100) {
        search = true
        searchTab()
        getWeather()
        tabCount += 1
        page = tabCount - 1
    }
    
    if (page === 0 && mouseX < 1585 && mouseX > 1450 && mouseY > 100 && mouseY < 230) {
        result1()
        tabCount += 1
        page = tabCount - 1
    }
    if (layers[page].name === "result1"&&mouseX>width/2+400&&mouseX<width/2+600&&mouseY>height/2-100&&mouseY<height/2){
        img = img2 
        con = arr1[0][0]
        rank = "니혼진인가요?"
        N1 = 3
        N2 = 2
        kmeter = "3k"
        won1 = 5000
        won2 = 4000
        n = 4
    }
    if (layers[page].name === "result1"&&mouseX>width/2-600&&mouseX<width/2-400&&mouseY>height/2-100&&mouseY<height/2){
        img = img1
        con = arr1[0][1]
        rank = "인스턴트 인간"
        N1 = 1
        N2 = 1
        kmeter = "300"
        won1 = 2500
        won2 = 0
        n = 1
        if (n<1){
            n = 1
        }
    }
    if (layers[page].name === "result1"&&mouseX>width/2-100&&mouseX<width/2+100&&mouseY>height/2+120&&mouseY<height/2+220){
        result2()
        tabCount += 1
        page = tabCount - 1
        
    }
}