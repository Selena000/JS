let oC = document.getElementById('canvas')
let oGC = oC.getContext('2d')
let oImg = new Image()

oImg.src = './person.png'
oImg.onload = function() {
  // oGC.translate(300, 200)
  let iRotate = -90
  let ball = []
  let bullet = []
  
  // 鼠标动，头像跟着动
  oC.onmousemove = function(ev) {
    let x = ev.clientX - oC.offsetLeft
    let y = ev.clientY - oC.offsetTop
    let a = x - 300
    let b = y - 200
    let c = Math.sqrt(a * a + b * b)

    if (a > 0 && b > 0) {
      iRotate = Math.asin( b / c) + 90 * Math.PI / 180
    } else if (a > 0) {
      iRotate = Math.asin( a / c) 
    }

    if(a < 0 && b > 0){
      iRotate = -(Math.asin(b / c) + 90 * Math.PI / 180);
    } else if(a < 0){
      iRotate = Math.asin(a / c);
    }
  }
  // 鼠标按下，发射红色小球
  oC.onmousedown = function(ev) {
    let x = ev.clientX - oC.offsetLeft
    let y = ev.clientY - oC.offsetTop
    
    let a = x - 300
    let b = y - 200
    let c = Math.sqrt(a * a, b * b)

    let speed = 5
    let sX = speed * a / c
    let sY = speed * b / c

    bullet.push({
      x: 300,
      y: 200,
      sX: sX,
      sY: sY
    })
  }
  setInterval(() => {
    oGC.clearRect(0, 0, oC.clientWidth, oC.height)
    
    // 头像位置
    oGC.save()
    oGC.translate(300, 200)
    oGC.rotate(iRotate)
    oGC.translate(-40, -40)
    oGC.drawImage(oImg, 0, 0)
    oGC.restore()

    // 大圆
    oGC.beginPath()
    // 弧度=(Math.PI/180)*角度。
    oGC.arc(300, 200, 200, -90 * Math.PI / 180, 180 * Math.PI / 180, false)
    oGC.stroke()
    
    // 小圆
    oGC.beginPath()
    oGC.arc(250, 200, 150, 180 * Math.PI / 180, 0, false)
    oGC.stroke()
  
    oGC.beginPath()
    oGC.arc(400, 200, 20, 0, 360 * Math.PI / 180)
    oGC.stroke()

    for (let i = 0; i < ball.length; i++) {
      oGC.beginPath()
      // 移动黑色小球
      oGC.moveTo(ball[i].x, ball[i].y)
      oGC.arc(ball[i].x, ball[i].y, 20, 0, 360 * Math.PI / 180)
      oGC.fill()
    }

    // 红色小球的运动
    for (let i = 0; i < bullet.length; i++) {
      oGC.save()
      oGC.fillStyle = 'red'
      oGC.beginPath()
      oGC.moveTo(bullet[i].x, bullet[i].y)
      oGC.arc(bullet[i].x, bullet[i].y, 20, 0, 360 * Math.PI / 180, false)
      oGC.fill()
      oGC.restore()
    }
  }, 1000 / 60)

  setInterval(() => {
    // 更改红色小球的位置
    for (let i = 0; i < bullet.length; i++) {
      bullet[i].x = bullet[i].x + bullet[i].sX
      bullet[i].y = bullet[i].y + bullet[i].sY
    }

    // 更改黑色小球的位置
    for (let i = 0; i < ball.length; i ++) {
      ball[i].num ++;
      // 转小圈
      if (ball[i].num >= 270) {
        ball[i].r = 150
        ball[i].startX = 250
        ball[i].startY = 50
      }

      if (ball[i].num === 270 + 180) {
        alert('游戏结束！')
        window.location.reload()
      }

      ball[i].x = Math.sin(ball[i].num * Math.PI / 180) * ball[i].r + ball[i].startX
      ball[i].y = ball[i].r - Math.cos(ball[i].num * Math.PI / 180) * ball[i].r + ball[i].startY
    }

    // 检测碰撞
    for (let i = 0; i < bullet.length; i++) {
      for (let j = 0; j < ball.length; j++) {
        if (pz(bullet[i].x, bullet[i].y, ball[j].x, ball[j].y)) {
          bullet.splice(i, 1)
          ball.splice(j, 1)
          break
        }
      }
    }
  }, 30)
  
  // 新增黑色小球
  setInterval(() => {
    ball.push({
      startX: 300,
      startY: 0,
      x: 300,
      y: 0,
      r: 200,
      num: 0
    })
  }, 350)
}

function pz(x1, y1, x2, y2) {
  let a = Math.abs(x1 - x2)
  let b = Math.abs(y1 - y2)
  let c = Math.sqrt(a * a + b * b)
  return c < 40
}