const cnv = document.querySelector(`canvas`);
const ctx = cnv.getContext(`2d`);

const cfg = {
    orbsCount: 400,
    minVelocity: 0.2,
    ringsCount: 10
};

let cw, ch, cx, cy, ph, pw;
function resize() {
    cw = cnv.width = innerWidth;
    ch = cnv.height = innerHeight;
    cx = cw * 0.5;
    cy = ch * 0.5;
    ph = cy * 0.4;
    pw = cx * 0.4;
}
resize();
window.addEventListener(`resize`, resize);

class Orb {
    constructor() {
        this.size = Math.random() * 5 + 2;
        this.angle = Math.random() * 360;
        this.radius =
            (((Math.random() * cfg.ringsCount) | 0) * ph) / cfg.ringsCount;
        this.impact = this.radius / ph;
        this.velocity = cfg.minVelocity + Math.random() * cfg.minVelocity;
    }

    refresh() {
        let radian = (this.angle * Math.PI) / 180;

        let cos = Math.cos(radian);
        let sin = Math.sin(radian);

        let offsetX = cos * pw * this.impact;
        let offsetY = sin * pw * this.impact;

        let x = cx + cos * (ph + this.radius) + offsetX;
        let y = cy + sin * (ph + this.radius) - offsetY;

        let distToC = Math.hypot(x - cx, y - cy);

        let optic = sin * this.size * this.impact * 0.7;

        let size = this.size + optic;

        let h = this.angle;
        let s = 100;
        let l = (1 - Math.sin(this.impact * Math.PI)) * 90 + 10;
        let color = `hsl(${h}, ${s}%, ${l}%)`;

        if (distToC > ph - 1 || sin > 0) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill();
        }

        this.angle = (this.angle + this.velocity) % 360;
    }
}

let orbsList = [];
function createStardust() {
    for (let i = 0; i < cfg.orbsCount; i++) {
        orbsList.push(new Orb());
    }
}
createStardust();

function loop() {
    requestAnimationFrame(loop);
    ctx.globalCompositeOperation = `normal`;
    ctx.fillStyle = `rgb(22,22,22)`; // Очищает холст
    ctx.fillRect(0, 0, cw, ch);

    ctx.globalCompositeOperation = `lighter`;
    orbsList.map(e => e.refresh()); // Заново заполняет
}
loop();
