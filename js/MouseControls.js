/**
 * * * CAMERA MOUSE CONTROL
 * Perspective effect on the scene with the mouse
 */
class MouseControls {
  constructor(camera, { mouseMove = [1, 1], velocity = [0.1, 0.1] } = {}) {
    if (mouseMove.length < 2 || velocity.length < 2) {
      console.error('ERROR : mouseMove and velocity have to be an array of 2 (x, y)');
      return;
    }

    // Props
    this.camera = camera;
    this.mouseMove = mouseMove;
    this.velocity = velocity;

    this.init();

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.update = this.update.bind(this);

    document.body.addEventListener('mousemove', this.handleMouseMove);
  }
  init() {
    this.lookAt = [0, 0, 0];
    this.initialPosition = this.camera.position.clone();
    this.position = this.camera.position.clone();
  }
  handleMouseMove(event) {
    this.position.x = this.initialPosition.x + ((event.clientX / window.innerWidth) - 0.5) * this.mouseMove[0];
    this.position.y = this.initialPosition.x - ((event.clientY / window.innerHeight) - 0.5) * this.mouseMove[1];
  }
  update() {
    this.camera.position.x += (this.position.x - this.camera.position.x) * this.velocity[0];
    this.camera.position.y += (this.position.y - this.camera.position.y) * this.velocity[1];
    this.camera.lookAt(this.lookAt);
  }
}