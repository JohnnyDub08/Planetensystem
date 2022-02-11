class Sun {
    constructor(pos, size, col) {
        this.pos = pos;
        this.size = size;
        this.col = col;
    }
    show() {
        noStroke();
        fill(this.col);
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        sphere(this.size);
        pop();
    }
    get position() {
        return createVector(this.pos);
    }
}
class Orbiter extends Sun {
    constructor(pos, size, col, rotationSpeed) {
        super(pos, size, col);
        this.rotationSpeed = rotationSpeed;
        
    }
    move() {
        this.pos = this.rotateAround(this.pos,createVector(sin(frameCount*0.01)*0.1,0.5+cos(frameCount*0.01)*0.1,0),this.rotationSpeed);
    }
    rotateAround(vect, axis, angle) {
        axis = p5.Vector.normalize(axis);
        return p5.Vector.add(
          p5.Vector.mult(vect, cos(angle)),
          p5.Vector.add(
            p5.Vector.mult(
              p5.Vector.cross(axis, vect),
              sin(angle)
            ),
            p5.Vector.mult(
              p5.Vector.mult(
                axis,
                p5.Vector.dot(axis, vect)
              ),
              (1 - cos(angle))
            )
          )
        );
      } 
}

let sunSize = 80;
function setup() {
    createCanvas(800, 600, WEBGL);
    sun = new Sun(createVector(0,0,0),sunSize,'#ffcc00');
    mercury = new Orbiter(createVector(sun.pos.x+sunSize+38.7,sun.pos.y,sun.pos.z),5,'808080', 0.04787);
    venus = new Orbiter(createVector(sun.pos.x+sunSize+72.2,sun.pos.y, sun.pos.z),6,'#aacc00', 0.03502);       
    terra = new Orbiter(createVector(sun.pos.x+sunSize+100,sun.pos.y,sun.pos.z),7,'#0000ff', 0.02978);
    mars = new Orbiter(createVector(sun.pos.x+sunSize+152,sun.pos.y, sun.pos.z),8,'#ff0000', 0.024077);
    jupiter = new Orbiter(createVector(sun.pos.x+sunSize+520,sun.pos.y, sun.pos.z),20,'#ffff00', 0.01307);
    saturn = new Orbiter(createVector(sun.pos.x+sunSize+958,sun.pos.y, sun.pos.z),20,'#ffffff', 0.00969); 
    uranus = new Orbiter(createVector(sun.pos.x+sunSize+1920,sun.pos.y, sun.pos.z),20,'#0000ff', 0.00681);
    neptun = new Orbiter(createVector(sun.pos.x+sunSize+3010,sun.pos.y, sun.pos.z),20,'#0000ff', 0.00543);

}

function draw() {
    background(127);
    sun.show();
    mercury.move();
    mercury.show();
    venus.move();
    venus.show();
    terra.move();
    terra.show();
    mars.move();
    mars.show();
    jupiter.move();
    jupiter.show(); 
    uranus.move();
    uranus.show();
}

