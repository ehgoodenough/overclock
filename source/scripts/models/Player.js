const MINIMUM_VELOCITY = 0.001
const MAXIMUM_VELOCITY = 1

class Player {
    constructor(protoplayer) {
        this.width = 16
        this.height = 12
        this.color = "#FFF"

        this.position = {x: WIDTH / 2, y: HEIGHT / 2}
        this.anchor = {x: 0.5, y: 0.5}

        this.acceleration = 0.5
        this.deceleration = 1.3
        this.velocity = {x: 0, y: 0}

        this.game = protoplayer.game

        this.counter = 0
        this.weapon = {
            rate: 0.2,
            speed: 4,
        }
    }
    update(delta) {
        // Inputs
        if(Input.isDown("W") || Input.isDown("UP")) {
            this.velocity.y -= this.acceleration * delta.realtime.inFrames
        }
        if(Input.isDown("S") || Input.isDown("DOWN")) {
            this.velocity.y += this.acceleration * delta.realtime.inFrames
        }
        if(Input.isDown("A") || Input.isDown("LEFT")) {
            this.velocity.x -= this.acceleration * delta.realtime.inFrames
        }
        if(Input.isDown("D") || Input.isDown("RIGHT")) {
            this.velocity.x += this.acceleration * delta.realtime.inFrames
        }

        this.counter += delta.realtime.inSeconds
        if(this.counter >= this.weapon.rate) {
            this.counter -= this.weapon.rate
            var projectile = new Projectile({
                speed: this.weapon.speed,
                game: this.game,
                position: {
                    x: this.position.x,
                    y: this.position.y
                }
            })
        }

        // Maximum Velocity
        if(this.velocity.x < -1 * MAXIMUM_VELOCITY) {
            this.velocity.x = -1 * MAXIMUM_VELOCITY
        }
        if(this.velocity.x > +1 * MAXIMUM_VELOCITY) {
            this.velocity.x = +1 * MAXIMUM_VELOCITY
        }
        if(this.velocity.y < -1 * MAXIMUM_VELOCITY) {
            this.velocity.y = -1 * MAXIMUM_VELOCITY
        }
        if(this.velocity.y > +1 * MAXIMUM_VELOCITY) {
            this.velocity.y = +1 * MAXIMUM_VELOCITY
        }

        // Collision
        if(this.position.x + this.velocity.x < 0
        || this.position.x + this.velocity.x > WIDTH) {
            this.velocity.x = 0
        }
        if(this.position.y + this.velocity.y < 0
        || this.position.y + this.velocity.y > HEIGHT) {
            this.velocity.y = 0
        }

        // Translation
        this.position.x += this.velocity.x * delta.realtime.inFrames
        this.position.y += this.velocity.y * delta.realtime.inFrames

        // Deceleration
        this.velocity.x *= 1 / this.deceleration
        this.velocity.y *= 1 / this.deceleration
        if(Math.abs(this.velocity.x) < MINIMUM_VELOCITY) {
            this.velocity.x = 0
        } if(Math.abs(this.velocity.y) < MINIMUM_VELOCITY) {
            this.velocity.y = 0
        }
    }
}
