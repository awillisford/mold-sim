class Mold {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = .5;

        this.facing = random(360);
        this.dx = cos(this.facing);
        this.dy = sin(this.facing);

        this.sensorAngle = 45;
        this.sensorDistance = 40;
        this.l_sensor = createVector(0,0);
        this.f_sensor = createVector(0,0);
        this.r_sensor = createVector(0,0);
    }

    update() {
        this.dx = cos(this.facing);
        this.dy = sin(this.facing);

        this.x = (this.x + this.dx + width) % width;
        this.y = (this.y + this.dy + height) % height;

        this.l_sensor.x = (this.x + this.sensorDistance * cos(this.facing - this.sensorAngle) + width) % width;
        this.l_sensor.y = (this.y + this.sensorDistance * sin(this.facing - this.sensorAngle) + height) % height;
        this.f_sensor.x = (this.x + this.sensorDistance * cos(this.facing) + width) % width;
        this.f_sensor.y = (this.y + this.sensorDistance * sin(this.facing) + height) % height;
        this.r_sensor.x = (this.x + this.sensorDistance * cos(this.facing + this.sensorAngle) + width) % width;
        this.r_sensor.y = (this.y + this.sensorDistance * sin(this.facing + this.sensorAngle) + height) % height;

        let l, f, r;
        l = this.getPixelBrightness(this.l_sensor.x, this.l_sensor.y);
        f = this.getPixelBrightness(this.f_sensor.x, this.f_sensor.y);
        r = this.getPixelBrightness(this.r_sensor.x, this.r_sensor.y);
        if (f > l && f > r) {
            // no change in facing
        } else if (f < l && f < r) {
            if (random(1) > 0.5) {
                this.facing += this.sensorAngle;
            } else {
                this.facing -= this.sensorAngle;
            }
        } else if (l > r) {
            this.facing -= this.sensorAngle;
        } else if (r > l) {
            this.facing += this.sensorAngle;
        }
        // Leave a trail
        set(floor(this.x), floor(this.y), color(205, 255, 25, 100));
    }

    getPixelBrightness(x, y) {
        let index = 4 * (floor(y) * width * d + floor(x) * d);
        return pixels[index];
    }

    display() {
        fill(205, 255, 25);
        noStroke();
        circle(this.x, this.y, this.r * 2);
    }
}