const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class projectCard {
    constructor(title, link, desc, date, photo){
        this.title = title
        this.link = link
        this.desc = desc
        this.date = date
        this.photo = photo
    }
}

Find_My_State = new projectCard("Find My State", "https://tomashfield.github.io/FindMyState/", "A small project to conduct individual research into API utilization and responsive design strategies.", "1/9/23 - 1/15/23", "images/find_my_state.png")
Decyde = new projectCard("Decyde 2.0", "https://tomashfield.github.io/DECYDE_2.0/index.html", "A passion project designed to assist individuals dealing with daily indecision. If you find yourself grappling with choices, we've got your back when it comes to making decisions!", "12/18/22 - 2/1/23", "images/decyde.png")

cardArr = [Decyde, Find_My_State]
c = document.getElementById("Cards");
ca = document.getElementById("cards-Area")


async function delayedLoop() {
    for(i = 0; i < cardArr.length; i++){
        createCard(cardArr[i], i)
        await delay(750)
    }
}

function createCard(card, cardNum){
    var articleElement = document.createElement('article');
    var titleElement = document.createElement('h1');
    var dateElement = document.createElement('h2');
    var linkElement = document.createElement('a');
    var descElement = document.createElement('p');
    var photoElement = document.createElement('img');

    titleElement.textContent = card.title;
    titleElement.className = "title"

    dateElement.textContent = card.date;
    dateElement.className = "date"

    linkElement.href = card.link;
    linkElement.target = '_blank';
    linkElement.textContent = card.link;
    linkElement.className = "link"

    descElement.textContent = card.desc;
    descElement.className = "desc"

    photoElement.src = card.photo;
    photoElement.className = "photo"

    articleElement.appendChild(titleElement)
    articleElement.appendChild(dateElement)
    articleElement.appendChild(linkElement)
    articleElement.appendChild(descElement)
    articleElement.appendChild(photoElement)
    articleElement.className = "card" + cardNum
    articleElement.classList.add('opacityOn')
    $(".card" + cardNum).addClass("card")
    c.appendChild(articleElement)
}






p = document.getElementById("start-Up");
m = document.getElementById("main-Website");
function proceed(){
    p.style.animation = "changeOpacityOff 5s backwards";
}



//Firework Functions
//##########################################################################

// helper functions
const PI2 = Math.PI * 2
const random = (min, max) => Math.random() * (max - min + 1) + min | 0
const timestamp = _ => new Date().getTime()

// container
class Birthday {
  constructor() {
    this.resize()

    // create a lovely place to store the firework
    this.fireworks = []
    this.counter = 0

  }
  
  resize() {
    this.width = canvas.width = window.innerWidth
    let center = this.width / 2 | 0
    this.spawnA = center - center / 4 | 0
    this.spawnB = center + center / 4 | 0
    
    this.height = canvas.height = window.innerHeight
    this.spawnC = this.height * .1
    this.spawnD = this.height * .5
    
  }
  
  onClick(evt) {
     let x = evt.clientX || evt.touches && evt.touches[0].pageX
     let y = evt.clientY || evt.touches && evt.touches[0].pageY
     
     let count = random(3,5)
     for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        x,
        y,
        random(0, 260),
        random(30, 110)))
          
     this.counter = -1
     
  }
  
  update(delta) {
    ctx.globalCompositeOperation = 'hard-light'
    ctx.fillStyle = `rgba(20,20,20,${ 7 * delta })`
    ctx.fillRect(0, 0, this.width, this.height)

    ctx.globalCompositeOperation = 'lighter'
    for (let firework of this.fireworks) firework.update(delta)

    // if enough time passed... create new new firework
    this.counter += delta * 3 // each second
    if (this.counter >= 1) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        random(0, this.width),
        random(this.spawnC, this.spawnD),
        random(0, 360),
        random(100, 200))) //changes the firework size
      this.counter = 0
    }
    // remove the dead fireworks
    if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

  }
}

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false
    this.offsprings = offsprings

    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY

    this.shade = shade
    this.history = []
  }
  update(delta) {
    if (this.dead) return

    let xDiff = this.targetX - this.x
    let yDiff = this.targetY - this.y
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
      this.x += xDiff * 2 * delta
      this.y += yDiff * 2 * delta

      this.history.push({
        x: this.x,
        y: this.y
      })

      if (this.history.length > 20) this.history.shift()

    } else {
      if (this.offsprings && !this.madeChilds) {
        
        let babies = this.offsprings / 2
        for (let i = 0; i < babies; i++) {
          let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
          let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

          birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

        }

      }
      this.madeChilds = true
      this.history.shift()
    }
    
    if (this.history.length === 0) this.dead = true
    else if (this.offsprings) { 
        for (let i = 0; this.history.length > i; i++) {
          let point = this.history[i]
          ctx.beginPath()
          ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
          ctx.arc(point.x, point.y, 1, 0, PI2, false)
          ctx.fill()
        } 
      } else {
      ctx.beginPath()
      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
      ctx.arc(this.x, this.y, 1, 0, PI2, false)
      ctx.fill()
    }

  }
}

let canvas = document.getElementById('birthday')
let ctx = canvas.getContext('2d')

let then = timestamp()

let birthday = new Birthday
window.onresize = () => birthday.resize()
let fireworksRunning = true;

function toggleFireworks() {
    fireworksRunning = !fireworksRunning; // Toggle the flag
    
    // If the animation is turned off, clear the canvas
    if (!fireworksRunning) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

setTimeout(function() {
    let then = timestamp()
  
    ;(function loop(){
      requestAnimationFrame(loop)
  
      if (fireworksRunning) {
        let now = timestamp();
        let delta = now - then;
    
        then = now;
        birthday.update(delta / 1000);
      }})()
  }, 3000);

wait(7 * 1000).then(() => proceed())
wait(12 * 1000).then(() => toggleFireworks())
wait(11 * 1000).then(() =>p.style.display = "none")
wait(11.5 * 1000).then(() =>m.style.display = "block")
wait(12 * 1000).then(() => setTimeout( function() { $(".mainWebsite").addClass("big"); }, 1 ));
wait(13 * 1000).then(() => $('body').css('background-color', '#EFEFEF'));
wait(14 * 1000).then(() =>delayedLoop())
