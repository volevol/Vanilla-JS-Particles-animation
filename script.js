(() => {
    const cnv = document.querySelector(`canvas`);
    const ctx = cnv.getContext(`2d`);

    const cfg = {
        orbsCount: 40,
        minVelocity: 0.2
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
            this.size = 5;
            this.angle = Math.random() * 360;
            this.velocity = cfg.minVelocity + Math.random() * cfg.minVelocity;
        }

        refresh() {
            let radian = (this.angle * Math.PI) / 180;

            let cos = Math.cos(radian);
            let sin = Math.sin(radian);

            let x = cx + cos * ph;
            let y = cy + sin * ph;

            ctx.fillStyle = `red`;
            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, 2 * Math.PI);
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
})();
