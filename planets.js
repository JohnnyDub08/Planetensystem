let orbiters = [];
let easycam;
class Sun {
  constructor(pos, size, col) {
    this.pos = pos;
    this.size = size;
    this.col = col;
    this.lastPos = [];
  }
  show() {
    
    fill(this.col);
    push();
    stroke(this.col);
    strokeWeight(5);
    line(this.pos.x, this.pos.y, this.pos.z,this.pos.x, this.pos.y-1000, this.pos.z)
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();
    sphere(this.size);  
    pop();
  }
}
class Orbiter extends Sun {
  constructor(pos, size, col, radius, speed) {
    super(pos, size, col)
    this.radius = radius;
    this.speed = speed;
  }
  show() {
    noStroke();
    fill(this.col);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    directionalLight(255,255,255, createVector(0,0,0).add(this.pos).normalize());
    ambientMaterial(this.col)
    sphere(this.size);
    pop();
  }
  move() {
    let angle = frameCount * 0.1 * this.speed;
    this.pos.x = this.radius * cos(angle);
    this.pos.y = cos(angle) * this.size *5;
    this.pos.z = this.radius * sin(angle);
    this.lastPos.push(createVector(this.pos.x,this.pos.y,this.pos.z));
    if (this.lastPos.length > 300) {
      this.lastPos.splice(0,1);
    }
    //console.log(this.lastPos);
    strokeWeight(0.9);
    beginShape();
    noFill();
    for (let i = 1; i < this.lastPos.length-1; i++) {
      let alpha = map(i, 0, this.lastPos.length, 0, 255);
      stroke(this.col);
      vertex(this.lastPos[i].x,this.lastPos[i].y-(this.lastPos.length-i)*3,this.lastPos[i].z);
    }
    endShape();
  }
}

function setup() {
  createCanvas(1200, 800, WEBGL);
  easycam = createEasyCam();
  //colorMode(HSB);
  smooth(8);
  sun = new Sun(createVector(0, 0, 0), 100, '#ffcc00' ,0 ,0);
  mercury = new Orbiter(createVector(sun.pos.x, sun.pos.y, sun.pos.z), 5, '#80a080', 150, 0.3);
  venus = new Orbiter(createVector(sun.pos.x, sun.pos.y, sun.pos.z), 6, '#aacc00', 180, 0.26);
  terra = new Orbiter(createVector(sun.pos.x, sun.pos.y, sun.pos.z), 7, '#0000ff', 210, 0.23);
  mars = new Orbiter(createVector(sun.pos.x, sun.pos.y, sun.pos.z), 8, '#ff0000', 250, 0.2);
  jupiter = new Orbiter(createVector(sun.pos.x, sun.pos.y, sun.pos.z), 10, '#ffff00', 300, 0.17);
  saturn = new Orbiter(createVector(sun.pos.x, sun.pos.y, sun.pos.z), 12, '#ffffff', 350, 0.14);
  uranus = new Orbiter(createVector(sun.pos.x, sun.pos.y, sun.pos.z), 7, '#0000ff', 420, 0.13);
  neptun = new Orbiter(createVector(sun.pos.x, sun.pos.y, sun.pos.z), 5, '#0000ff', 450, 0.11);

  orbiters.push(mercury);
  orbiters.push(venus);
  orbiters.push(terra);
  orbiters.push(mars);
  orbiters.push(jupiter);
  orbiters.push(saturn);
  orbiters.push(uranus);
  orbiters.push(neptun);
}

function draw() {
  background(0);
  //rotateZ(-PI/3);
  //rotateZ(frameCount*0.001);
  
  //directionalLight(250, 250, 250, -dirX, -dirY, -1);
  
  emissiveMaterial(255, 255, 255,0.1);
  sun.show();
  
  for (let i = 0; i < orbiters.length; i++) {
    orbiters[i].show();
    orbiters[i].move();
  }
}

