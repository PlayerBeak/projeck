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
let con = ""
let page = 0
let foods = ["라면", "우동", "햄버거"]
let tag = []
let ramen = [[4,5],2500,1,"인스턴트인간","라면",0,5,37.005816,127.227503,[]]//[[기분 점수들], 가격,인원수,업적이름, 음식 이름,최근 먹은 날짜,업적까지 남은 횟수]
let udon = [[3,4,5],5000,1,"니혼진인가요?","우동",0,5,37.005816,127.227503,[]]
let burger = [[4,5],6000,1,"버거왕","햄버거",0,5,37.005816,127.227503,[]]
tag.push(ramen)
tag.push(udon)
tag.push(burger)

function preload(){
    ramenimg = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mama_instant_noodle_block.jpg/600px-Mama_instant_noodle_block.jpg?20140515094805')
    udonimg = loadImage('https://upload.wikimedia.org/wikipedia/commons/9/9c/Garak-guksu.jpg')
    burgerimg = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/250px-RedDot_Burger.jpg')
    ramen.push(ramenimg)
    udon.push(udonimg)
    burger.push(burgerimg)
    getCurrentWeather()
}


let foodcount = 3
let tagcount = 10

let tabWidth = 1600
let tabCount = 1
let search = false
let setWidth = 270
let setTab = 15
const clickDates = []
const savedValue = []
let countRamen = 0
function setup() {
    createCanvas(1600, 1200)
    noStroke()

    inputBox = createInput('')
    inputBox.position(width/2 - 250, height - 80)// 채팅 입력창 위치
    inputBox.size(500,50) // 채팅 입력창크기설정
    inputBox.style('font-size', '20px')// 입력창 입력문자크기 설정
    inputBox.hide() // 초기화면에서 입력창 숨기기

    ramenimg.resize(300,300)
    udonimg.resize(300,300)
    burgerimg.resize(300,300)
    let img
    rank = ""
    N1 = 1
    N2 = 1
    won = 0
    layers = []
    layers.push(body = new Layer(createGraphics(width,height),"body",0))// 초기화면생성
    
    body.draw = ()=>{
        body.g.textAlign(CENTER)
        body.g.fill(255)
        body.g.rect(5, 5, width - 10, height - 10)
        body.g.noStroke()
        body.g.rect(1455,100, 130, 130)
        body.g.fill(160)
        body.g.stroke(0)
        body.g.strokeWeight(1)
        body.g.textSize(150)
        body.g.text("⚙",1520,220)
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
        body.g.text("메뉴 찾기",width/2,height/2+55)
        body.g.fill(152,251,152)
        body.g.stroke(255)
        body.g.rect(1465,260, 110, 110,20)
        body.g.stroke(0)
        body.g.fill(0)
        body.g.textSize(30)
        body.g.text("데이터 초기화",1470,280,100)
    }

    for(let i=0;i<layers.length;i++){
        layers[i].display()
    }
    const stored = localStorage.getItem("clickDatesMD");
    if (stored) {
        let saved = JSON.parse(stored)
        for (let i = 0; i < saved.length; i++) {
            clickDates.push(saved[i])
        }
    }
    console.log(clickDates)
    const fooded = localStorage.getItem("currentfood_4")
    if (fooded) {
        let savedfood = JSON.parse(fooded)
        for (let i = 0; i < savedfood.length; i++) {
            savedValue.push(savedfood[i])
        }
    }
    console.log(savedValue)

    if (clickDates.length > 0 && typeof currentfood !== 'undefined') {
        for (let i = 0; i < foodcount; i++) {
            for (let a = 0; a < foodcount; a++) {
                if (tag[a].includes(savedValue[i])) {
                    const newDate = new Date(clickDates[i])  // 새로 클릭된 날짜
                    let previousDate

                    if (!tag[a][9] || isNaN(new Date(tag[a][9]).getTime())) {
                        // 값이 없거나 잘못된 날짜일 경우: 자기 자신으로 설정
                        previousDate = new Date(clickDates[i])
                    } else {
                        previousDate = new Date(tag[a][9])
                    }
                    console.log(previousDate)
                    const diffInMs = newDate - previousDate
                    
                    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
                    tag[a][5] = diffInDays
    
                    // 최신 날짜로 갱신
                    tag[a][9] = clickDates[i]
                    
                    }
                
                }

            countRamen = savedValue.filter(item => item === foods[i]).length
    
            tag[i][6] = tag[i][6] - countRamen
            if (tag[i][6] < 0){
                tag[i][6] = 0
            }
        }
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
const apiKey = '1a81ae5c986844dd9f794843252704' // WeatherAPI에서 발급받은 API 키
const city = 'Anseong' // 원하는 도시나 지역
temp = ""
condi = ""
weathericon = ""
async function getCurrentWeather() {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
  
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태: ${response.status}`)
      }
      const data = await response.json()
      
      console.log('현재 온도:', data.current.temp_c + '°C')
      console.log('날씨 상태:', data.current.condition.text)
      console.log('아이콘 URL:', 'https:' + data.current.condition.icon)
      temp = data.current.temp_c + '°C'
      iconimg = loadImage('https:' + data.current.condition.icon)
      condi = data.current.condition.text
    } catch (error) {
      console.error('날씨 정보를 가져오는 중 오류 발생:', error)
    }
    if (condi === "Clear" || condi === "Sunny"){
        condi = "맑음"
    }
    else if (condi === "Mostly clear"){
        condi = "대채로 맑음"
    }
    else if (condi === "Partly Cloudy" || condi === "Cloudy"){
        condi = "흐림"
    }
    else if (condi === "Mostly Cloudy"){
        condi = "대채로 흐림"
    }
    else if (condi === "Rain" || condi === "Light Rain" || condi === "Heavy Rain" || condi === "Showers" || condi === "Drizzle"){
        condi = "비"
    }
    else if (condi === "Snow" || condi === "Light Snow" || condi === "Heavy Snow" || condi === "Flurries"){
        condi = "눈"
    }
    else if (condi === "Fog" || condi === "Mist"){
        condi = "안개"
    }
    else if (condi === "Thunderstorm" || condi === "Light Thunderstorm" || condi === "Severe Thunderstorm"){
        condi = "뇌우"
    }
    else if (condi === "Windy"){
        condi = "강한바람"
    }
    else if (condi === "Blizzard"){
        condi = "눈보라"
    }
    else if (condi === "Hail"){
        condi = "우박"
    }
}

let userInput = ""
let keyon = false
let a = 0
let userresult = []
let newtag = []
let currentfood = 0
function searchTab() {
    a = 0
    userresult = []
    newtag = []
    currentfood = 0
    keyon = false
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
            newLayer.g.rect(300,320, 350, 100, 20)
            newLayer.g.rect(300,50, 350, 200, 20)
            newLayer.g.fill(0)
            newLayer.g.textSize(30)
            newLayer.g.text(temp,475,70)
            newLayer.g.image(iconimg,440,120)
            newLayer.g.text(condi,475,210)
            newLayer.g.text("오늘의 기분은?",475,350)
            newLayer.g.text("1:매우 나쁨 ~ 5:매우 좋음",475,400)
        }
        if (keyon){
            for (i = 0; i < newLayer.input.length; i++){
                newLayer.g.fill(255)
                if (i < 3){
                    newLayer.g.rect(950,430 + i * 240, 350, 100, 20)
                    newLayer.g.rect(300,320 + (i + 1) * 240, 350, 100, 20)
                }
                newLayer.g.fill(0)
                newLayer.g.textSize(40)
                newLayer.g.text(newLayer.input[i],1125,480 + i * 240)
                newLayer.g.textSize(30)
                if (a === 1){
                    newLayer.g.text(questions[0][0],475,350)
                    newLayer.g.text(questions[0][1],475,400)
                    newLayer.g.text(questions[1][0],475,590)
                    newLayer.g.text(questions[1][1],475,640)
                }
                else if (a === 2){
                    newLayer.g.text(questions[0][0],475,350)
                    newLayer.g.text(questions[0][1],475,400)
                    newLayer.g.text(questions[1][0],475,590)
                    newLayer.g.text(questions[1][1],475,640)
                    newLayer.g.text(questions[2][0],475,830)
                    newLayer.g.text(questions[2][1],475,880)
                }
                else if (a === 3){
                    newLayer.g.fill(255)
                    newLayer.g.rect(950,910, 350, 100, 20)
                    newLayer.g.fill(0)
                    newLayer.g.textSize(40)
                    newLayer.g.text(newLayer.input[2],1125,960)
                    newLayer.g.textSize(30)
                    newLayer.g.text(questions[0][0],475,350)
                    newLayer.g.text(questions[0][1],475,400)
                    newLayer.g.text(questions[1][0],475,590)
                    newLayer.g.text(questions[1][1],475,640)
                    newLayer.g.text(questions[2][0],475,830)
                    newLayer.g.text(questions[2][1],475,880)
                    newLayer.g.fill(255)
                    newLayer.g.rect(100,height/2-100,width-200,200)
                    newLayer.g.fill(0)
                    newLayer.g.textSize(100)
                    newLayer.g.text("잠시후 이동합니다.",width/2,height/2)
                    
                    //if (condi === "흐림"){
                        for (i = 0; i < foodcount; i++){
                            if (tag[i][1] <= userresult[1] && tag[i][2] <= (userresult[2])){
                                if (tag[i][0].includes(userresult[0])){
                                    newtag.push(tag[i])
                                }
                            }
                        }
                    //}
                    img = newtag[0][tagcount]
                    con = newtag[0][4]
                    rank = newtag[0][3]
                    won = newtag[0][1]
                    N1 = newtag[0][5]
                    N2 = newtag[0][6]
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
        userresult.push(userInput)
        for (i=0;i<userresult.length;i++){
            userresult[i] = parseInt(userresult[i])
        }
        layers[page].input.push(userInput)
        keyon = true
        a += 1
        console.log(userresult)
    }
}

let map  // 구글 맵 객체를 저장할 변수
let mapContainer  // 맵을 추가할 div 요소
let mapInitialized = false

function createSetTab(){
    let newLayer = new Layer(createGraphics(width, height), "createSetTab", tabCount)
    newLayer.draw = () => {
        newLayer.g.stroke(0)
        newLayer.g.fill(255)
        newLayer.g.rect(205, 5, width - 410, height - 10)
        newLayer.g.fill(0)
        newLayer.g.strokeWeight(5)
        newLayer.g.line(1250, 50, 1350, 150)
        newLayer.g.line(1350, 50, 1250, 150)
    }
    layers.push(newLayer)
}

function result1(){
    
    let newLayer = new Layer(createGraphics(width, height), "result1", tabCount)
    newLayer.draw = ()=>{
        
        newLayer.g.stroke(0)
        newLayer.g.fill(255)
        newLayer.g.rect(5, 5, width - 10, height - 10)
        newLayer.g.rect(width/2-550,height/2-300,200,100)
        newLayer.g.fill(0)
        newLayer.g.textSize(40)
        newLayer.g.textAlign(CENTER, CENTER)
        newLayer.g.text("<-- 이전",width/2-450,height/2-250)

        newLayer.g.fill(255)
        newLayer.g.rect(width/2+350,height/2-300,200,100)
        newLayer.g.fill(0)
        newLayer.g.text("넘기기 -->",width/2+450,height/2-250)

        newLayer.g.fill(255)
        newLayer.g.rect(width/2-100,height/2-80,200,100)
        newLayer.g.fill(0)
        newLayer.g.text("<확정>",width/2,height/2-30)
        newLayer.g.text("이 메뉴를 먹은지 " + N1 + "일이 지났습니다.",width/2,30)
        if (newtag[currentfood][6] === 0){
            newLayer.g.text(rank + " 업적을 달성했습니다.",width/2,100)
        }
        else{
            newLayer.g.text(rank + " 업적 달성까지 " + N2 + "번 남았습니다.",width/2,100)
        }
        

        newLayer.g.fill(0)
        newLayer.g.text("주의: ??? 알러지를 유발할 수 있습니다.",width/2,660)
        newLayer.g.text("평균가격: " + won + "원",width/2,720)
        newLayer.g.image(img,width/2-150,200)
    }

    if (!mapInitialized){
        const mapContainer = document.createElement("div")
        mapContainer.style.width = "500px"
        mapContainer.style.height = "400px"
        mapContainer.style.position = "absolute"
        mapContainer.style.top = (height / 2 + 190) + "px" // 메시지 아래에 위치시킴
        mapContainer.style.left = (100) + "px" // 화면 가운데로 위치시킴
        document.body.appendChild(mapContainer)

        const mapOptions = {
            center: { lat: 37.004, lng: 127.226247 },
            zoom: 15
        }
        const map = new google.maps.Map(mapContainer, mapOptions);

        let targetLocation = { lat: newtag[currentfood][7], lng: newtag[currentfood][8] }
        let userLocation = { lat: 37.004, lng: 127.226247 } // 기준 위치
        const latLng1 = new google.maps.LatLng(userLocation.lat, userLocation.lng)
        const latLng2 = new google.maps.LatLng(targetLocation.lat, targetLocation.lng)
        const distance = google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2)
        // 마커 추가
        const marker2 = new google.maps.Marker({
            position: targetLocation,
            map: map,
            title: "이동"
        })
        const marker1 = new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "여기!"
        })
        // 거리 표시 (미터 단위)
        newLayer.g.fill(0)
        newLayer.g.textSize(30)
        newLayer.g.text("직선거리: " + (distance / 1000).toFixed(2) + " km", width / 2, height / 2 + 200)
        mapInitialized = true
    }

    layers.push(newLayer)
}

function storeClickDate() {
    let now = new Date()
    let month = now.getMonth() + 1 // getMonth()는 0~11이므로 +1
    let day = now.getDate();
  
    clickDates.push([month, day])
  
    localStorage.setItem("clickDatesMD", JSON.stringify(clickDates))
    savedValue.push(newtag[currentfood][4])
    localStorage.setItem("currentfood_4", JSON.stringify(savedValue))
}

function result2(){
    let newLayer = new Layer(createGraphics(width, height), "result2", tabCount)
    newLayer.draw = ()=>{
        newLayer.g.textSize(40)
        newLayer.g.textAlign(CENTER, CENTER)
        newLayer.g.text("축하합니다!! 오늘의 메뉴는 " + con + "입니다.", width/2, 700)
        newLayer.g.image(img,width/2-150,200)
        if (layers[page].name === "result2" && !mapInitialized){
            const mapContainer = document.createElement("div")

            document.body.appendChild(mapContainer)
            const mapOptions = {
                center: { lat: 37.004, lng: 127.226247 },
                zoom: 15
            }
            const map = new google.maps.Map(mapContainer, mapOptions);
            mapContainer.style.width = "500px"
            mapContainer.style.height = "400px"
            mapContainer.style.position = "absolute"
            mapContainer.style.top = (height / 2 + 190) + "px" // 메시지 아래에 위치시킴
            mapContainer.style.left = (100) + "px" // 화면 가운데로 위치시킴
            let targetLocation = { lat: newtag[currentfood][7], lng: newtag[currentfood][8] }
            let userLocation = { lat: 37.004, lng: 127.226247 } // 기준 위치
            const latLng1 = new google.maps.LatLng(userLocation.lat, userLocation.lng)
            const latLng2 = new google.maps.LatLng(targetLocation.lat, targetLocation.lng)
            const distance = google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2)
            // 마커 추가
            const marker2 = new google.maps.Marker({
                position: targetLocation,
                map: map,
                title: "이동"
            })
            const marker1 = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "여기!"
            })
            newLayer.g.fill(0)
            newLayer.g.textSize(30)
            newLayer.g.text("직선거리: " + (distance / 1000).toFixed(2) + " km", width / 2 + 50, height / 2 + 500)
            mapInitialized = true
        }
    }
    layers.push(newLayer)
}

function mousePressed() {
    if (layers[page].name === "body" && mouseX < width/2+400 && mouseX > width/2-400 && mouseY > height/2-100 && mouseY < height/2+100) {
        search = true
        searchTab()
        
        tabCount += 1
        page = tabCount - 1
    }
    
    if (layers[page].name === "createSetTab" && mouseX < 1350 && mouseX > 1250 && mouseY > 50 && mouseY < 150) {
        page = 0
    }

    if (layers[page].name === "body" && mouseX < 1575 && mouseX > 1460 && mouseY > 260 && mouseY < 370) {
        localStorage.clear()
    }

    if (layers[page].name === "body" && mouseX < 1585 && mouseX > 1450 && mouseY > 100 && mouseY < 230) {
        createSetTab()

        tabCount += 1
        page = tabCount - 1
    }

    if (layers[page].name === "result1"&&mouseX>width/2+350&&mouseX<width/2+550&&mouseY>height/2-300&&mouseY<height/2-200){
        currentfood++
        if (currentfood >= newtag.length){
            currentfood = newtag.length - 1
        }
        img = newtag[currentfood][tagcount]
        con = newtag[currentfood][4]
        rank = newtag[currentfood][3]
        won = newtag[currentfood][1]
        N1 = newtag[currentfood][5]
        N2 = newtag[currentfood][6]
    }
    if (layers[page].name === "result1"&&mouseX>width/2-550&&mouseX<width/2-350&&mouseY>height/2-300&&mouseY<height/2-200){
        currentfood--
        if (currentfood < 0){
            currentfood = 0
        }
        img = newtag[currentfood][tagcount]
        con = newtag[currentfood][4]
        rank = newtag[currentfood][3]
        won = newtag[currentfood][1]
        N1 = newtag[currentfood][5]
        N2 = newtag[currentfood][6]
    }
    if (layers[page].name === "result1"&&mouseX>width/2-100&&mouseX<width/2+100&&mouseY>height/2-80&&mouseY<height/2+20){
        result2()
        tabCount += 1
        page = tabCount - 1
        storeClickDate()
        mapInitialized = false
    }
}
