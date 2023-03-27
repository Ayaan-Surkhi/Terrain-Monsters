class Alien {
    constructor(image) {
        this.image = image;
        this.x = random(-300, 300);
        this.y = -200;
        this.w = 50;
        this.h = 50;
        this.speed = pace;
        this.gone = false;
    }

    show () {
        // Display Alien
        image(this.image, this.x, this.y, this.w, this.h)
    }

    update () {
        // Move Aliens down
        this.y += this.speed;
    }

    offscreen (){
        // Remove Alien from array if outside
        if (this.y > 100){
            // Check if ship not destroyed
            if (!this.gone) {
                lives--;
            }
           return true; 
        } else{
          return false
        }
    }

    clicked () {
        // Check if clicked
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < 750 && d > 710 && !this.gone) {
            this.image = laser;
            this.gone = true;
            score++;
        }
    }
}