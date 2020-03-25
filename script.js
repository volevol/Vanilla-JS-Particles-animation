const cnv = document.querySelector(`canvas`);
const ctx = cnv.getContext(`2d`);

const cfg = {
    orbsCount: 400,
    minVelocity: 0.2,
    ringsCount: 10
};

let cw, ch, cx, cy, ph;
function resize() {
    cw = cnv.width = innerWidth;
    ch = cnv.height = innerHeight;
    cx = cw * 0.5;
    cy = ch * 0.5;
    ph = cy * 0.4;
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

        let x = cx + cos * (ph + this.radius);
        let y = cy + sin * (ph + this.radius);

        let optic = sin * this.size * this.impact * 0.7;

        let size = this.size + optic;

        ctx.fillStyle = `red`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();

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

    ctx.fillStyle = `rgb(22,22,22)`; // Очищает холст
    ctx.fillRect(0, 0, cw, ch);

    orbsList.map(e => e.refresh()); // Заново заполняет
}
loop();
