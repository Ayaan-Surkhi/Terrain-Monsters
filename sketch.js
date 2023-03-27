let cols;
let rows;
let scl = 20;
let w = 1400;
let h = 1000;
let flying = 0;
let terrain = [];
let planet1;
let planet2;
let planet3;
let planet4;
let planets;
let ship1;
let ship2;
let ship3;
let laser;
let ships = [];
let aliens = [];
let font;
let score = 0;
let pace = 4;
let life;
let lives = 3;
let planet;
const scoreElem = document.querySelector('.score');

function preload() {
    // Load Assets
    planet1 = loadImage('./assets/planet-01.svg');
    planet2 = loadImage('./assets/planet-08.svg');
    planet3 = loadImage('./assets/planet-09.svg');
    planet4 = loadImage('./assets/planet-11.svg');
    planets = [planet1, planet2, planet3, planet4];
    ship1 = loadImage('./assets/shipBlue.png');
    ship2 = loadImage('./assets/shipGreen.png');
    ship3 = loadImage('./assets/shipYellow.png');
    laser = loadImage('./assets/laser.png');
    life = loadImage('./assets/live.png');
    font = loadFont('./assets/openSans.ttf')
}

function setup() {
    createCanvas(1280, 600, WEBGL);
    cols = w/scl;
    rows = h/scl;

    ships = [ship1, ship2, ship3];
    planet = random(planets);
    aliens.push(new Alien(random(ships)));

    for (var x = 0; x < cols; x++) {
        terrain[x] = [];
        for (var y = 0; y < rows; y++) {
          terrain[x][y] = 0; 
        }
    }

    textFont(font);
    textSize(25);
}
  
function draw() {    
    flying -= 0.1;

    let yoff = flying;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
          xoff += 0.2;
        }
        yoff += 0.2;
    }
    
    background('#00235B');

    // Score Board
    fill(255);
    text(`Score: ${score}`, 450, -250);

    // Lives
    for (let i = 0; i < lives; i++) {
        image(life, -450-(i*60), -250, 50, 50)
    }

    // Planet
    fill(255, 217, 0);
    noStroke();
    image(planet, -100, -280, 100, 100);

    // Show Ships And Aliens
    for(let i = aliens.length-1; i >= 0; i--){
        aliens[i].show();
        aliens[i].update();
    
        if(aliens[i].offscreen()){
            aliens.splice(i, 1);
        }
    }

    // Add Aliens
    if(frameCount % 10 == 0){
        aliens.push(new Alien(random(ships)));
    }

    // Increase difficulty
    setTimeout(() => {
        pace += 0.05;
    }, 500);

    stroke(255);
    
    translate(0, 50)
    rotateX(PI/3)
    translate(-w/2, -h/2)

    // Terrain
    for (y = 0; y < rows; y++) {
       beginShape(TRIANGLE_STRIP);
       fill(random(100), random(100, 200), random(200, 250));
        for (x = 0; x < cols; x++) {
            vertex(x*scl, y*scl, terrain[x][y]);
            vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
        }
        endShape();
    }   

    // Check for End
    if (lives === 0) {
        setTimeout(() => {
            frameRate(0);
        }, 500);

        scoreElem.style.display = 'flex';
        scoreElem.innerHTML = `
        Your Score was: ${score}
        <a href="/Terrain-Monsters/game.html">Play again</a>
        `;
    }
}

function mousePressed () {
    // Check for click
    for(let i = aliens.length-1; i >= 0; i--){
        aliens[i].clicked();
    }      
}
