let particulas = [];
let mousePosAnterior = { x: 0, y: 0 };
let tiempoSinMovimiento = 0;
let tiempoInicioSinMovimiento = 0;
let mouseDetenido = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(20);
  
  // Verificar si el mouse se ha movido
  if (mouseX !== mousePosAnterior.x || mouseY !== mousePosAnterior.y) {
    tiempoSinMovimiento = 0; // Reiniciar el tiempo sin movimiento
    mouseDetenido = false;
    tiempoInicioSinMovimiento = millis(); // devuelve el número de milisegundos que han transcurrido desde que el programa empezó a ejecutarse.
    crearParticulas(mouseX, mouseY);
  } else {
    tiempoSinMovimiento = millis() - tiempoInicioSinMovimiento; // Contar el tiempo que lleva sin moverse
    if (tiempoSinMovimiento > 2000) { // Si pasa más de 2 segundos
      mouseDetenido = true;
    }
  }

  for (let i = 0; i < particulas.length; i++) {
    particulas[i].update(mouseDetenido); // Pasar si el mouse está detenido
    particulas[i].display();
  }

  // Eliminar partículas "muertas"
  for (let i = particulas.length - 1; i >= 0; i--) {
    if (!particulas[i].estaViva) {
      particulas.splice(i, 1);
    }
  }

  // Actualizar posición del mouse
  mousePosAnterior.x = mouseX;
  mousePosAnterior.y = mouseY;
}

function crearParticulas(x, y) {
  let nuevaParticula = new Particula(x, y);
  particulas.push(nuevaParticula);
}

class Particula {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.tamano = random(8, 20);
    this.tiempoVida = 300;
    this.brillo = random(200, 255);
    this.color = color(random(255, 255), random(150, 200), 0, this.brillo); 
    this.estaViva = true;
  }

  update(mouseDetenido) {
    // Movimiento aleatorio para flotar
    this.x += this.vx + random(-0.5, 0.5);
    this.y += this.vy + random(-0.5, 0.5);

    // Hacer que el brillo y el tamaño varíen si el mouse está detenido
    if (mouseDetenido) {
      this.brillo = constrain(this.brillo + 5, 200, 300);
      this.tamano = constrain(this.tamano + 0.5, 8, 500);  
      this.color = color(random(255, 255), random(150, 200), 20, this.brillo);
    }

    this.brillo = max(this.brillo - 1, 0);
    this.color = color(random(255, 255), random(150, 200), 0, this.brillo);

    this.tiempoVida--;
    if (this.tiempoVida <= 0 || this.brillo <= 0) {
      this.estaViva = false;  // La partícula muere cuando el brillo llega a cero
    }
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.tamano);
  }
}
