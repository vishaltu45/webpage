export function anim() {
  const c = document.getElementById("c");
  if (!c) {
    console.error("Canvas not found!");
    return;
  }
  console.log("Canvas found ✅");
  const ctx = c.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2D context!");
    return;
  }
  console.log("Canvas context ready ✅");
  let w = (c.width = window.innerWidth);
  let h = (c.height = window.innerHeight);
  let hw = w / 2;
  let hh = h / 2;

  const opts = {
    strings: ["HAPPY", "BIRTHDAY!", "to You"],
    charSize: 30,
    charSpacing: 35,
    lineHeight: 40,

    cx: w / 2,
    cy: h / 2,

    fireworkPrevPoints: 10,
    fireworkBaseLineWidth: 5,
    fireworkAddedLineWidth: 8,
    fireworkSpawnTime: 200,
    fireworkBaseReachTime: 30,
    fireworkAddedReachTime: 30,
    fireworkCircleBaseSize: 20,
    fireworkCircleAddedSize: 10,
    fireworkCircleBaseTime: 30,
    fireworkCircleAddedTime: 30,
    fireworkCircleFadeBaseTime: 10,
    fireworkCircleFadeAddedTime: 5,
    fireworkBaseShards: 5,
    fireworkAddedShards: 5,
    fireworkShardPrevPoints: 3,
    fireworkShardBaseVel: 4,
    fireworkShardAddedVel: 2,
    fireworkShardBaseSize: 3,
    fireworkShardAddedSize: 3,
    gravity: 0.1,
    upFlow: -0.1,
    letterContemplatingWaitTime: 360,
    balloonSpawnTime: 20,
    balloonBaseInflateTime: 10,
    balloonAddedInflateTime: 10,
    balloonBaseSize: 20,
    balloonAddedSize: 20,
    balloonBaseVel: 0.4,
    balloonAddedVel: 0.4,
    balloonBaseRadian: -(Math.PI / 2 - 0.5),
    balloonAddedRadian: -1,
  };

  const longestString = Math.max(...opts.strings.map((s) => s.length));
  const calc = {
    totalWidth: opts.charSpacing * longestString,
  };

  const Tau = Math.PI * 2;
  const TauQuarter = Tau / 4;
  const letters = [];

  ctx.font = `${opts.charSize}px Verdana`;

  function Letter(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.dx = -ctx.measureText(char).width / 2;
    this.dy = +opts.charSize / 2;
    this.fireworkDy = this.y - hh;

    const hue = (x / calc.totalWidth) * 360;

    this.color = `hsl(${hue},80%,50%)`;
    this.lightAlphaColor = `hsla(${hue},80%,light%,alp)`;
    this.lightColor = `hsl(${hue},80%,light%)`;
    this.alphaColor = `hsla(${hue},80%,50%,alp)`;

    this.reset();
  }

  Letter.prototype.reset = function () {
    this.phase = "firework";
    this.tick = 0;
    this.spawned = false;
    this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
    this.reachTime =
      (opts.fireworkBaseReachTime +
        opts.fireworkAddedReachTime * Math.random()) |
      0;
    this.lineWidth =
      opts.fireworkBaseLineWidth +
      opts.fireworkAddedLineWidth * Math.random();
    this.prevPoints = [[0, hh, 0]];
  };
  
  Letter.prototype.step = function () {
  if (this.phase === "firework") {
    if (!this.spawned) {
      ++this.tick;
      if (this.tick >= this.spawningTime) {
        this.tick = 0;
        this.spawned = true;
      }
    } else {
      ++this.tick;
      const linearProportion = this.tick / this.reachTime;
      const armonicProportion = Math.sin(linearProportion * TauQuarter);
      const x = linearProportion * this.x;
      const y = hh + armonicProportion * this.fireworkDy;

      if (this.prevPoints.length > opts.fireworkPrevPoints)
        this.prevPoints.shift();

      this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

      const lineWidthProportion = 1 / (this.prevPoints.length - 1);
      for (let i = 1; i < this.prevPoints.length; ++i) {
        const point = this.prevPoints[i];
        const point2 = this.prevPoints[i - 1];
        ctx.strokeStyle = this.alphaColor.replace(
          "alp",
          i / this.prevPoints.length
        );
        ctx.lineWidth = point[2] * lineWidthProportion * i;
        ctx.beginPath();
        ctx.moveTo(point[0], point[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.stroke();
      }

      if (this.tick >= this.reachTime) {
        this.phase = "contemplate";
        this.tick = 0;
        this.shards = [];
        for (let i = 0; i < 10; i++) {
          const angle = Math.random() * Tau;
          this.shards.push(
            new Shard(
              this.x,
              this.y,
              Math.cos(angle),
              Math.sin(angle),
              this.alphaColor
            )
          );
        }
      }
    }
  } else if (this.phase === "contemplate") {
    ctx.fillStyle = this.lightColor.replace("light", 70);
    ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

    for (let i = 0; i < this.shards.length; ++i) {
      this.shards[i].step();
      if (!this.shards[i].alive) {
        this.shards.splice(i, 1);
        --i;
      }
    }

    ++this.tick;
    if (this.tick > opts.letterContemplatingWaitTime) {
      this.phase = "balloon";
      this.tick = 0;
      this.size =
        opts.balloonBaseSize +
        opts.balloonAddedSize * Math.random();
      const rad =
        opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random();
      const vel =
        opts.balloonBaseVel + opts.balloonAddedVel * Math.random();
      this.vx = Math.cos(rad) * vel;
      this.vy = Math.sin(rad) * vel;
      this.cx = this.x;
      this.cy = this.y;
    }
  } else if (this.phase === "balloon") {
    this.cx += this.vx;
    this.cy += this.vy += opts.upFlow;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    generateBalloonPath(this.cx, this.cy, this.size);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(this.cx, this.cy);
    ctx.lineTo(this.cx, this.cy + this.size);
    ctx.stroke();

    ctx.fillStyle = this.lightColor.replace("light", 70);
    ctx.fillText(this.char, this.cx + this.dx, this.cy + this.dy + this.size);

    if (this.cy + this.size < -hh || this.cx < -hw || this.cy > h + hh)
      this.phase = "done";
  }
};


  function Shard(x, y, vx, vy, color) {
    const vel =
      opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();
    this.vx = vx * vel;
    this.vy = vy * vel;
    this.x = x;
    this.y = y;
    this.prevPoints = [[x, y]];
    this.color = color;
    this.alive = true;
    this.size =
      opts.fireworkShardBaseSize +
      opts.fireworkShardAddedSize * Math.random();
  }

  Shard.prototype.step = function () {
    this.x += this.vx;
    this.y += this.vy += opts.gravity;

    if (this.prevPoints.length > opts.fireworkShardPrevPoints)
      this.prevPoints.shift();
    this.prevPoints.push([this.x, this.y]);

    const lineWidthProportion = this.size / this.prevPoints.length;

    for (let k = 0; k < this.prevPoints.length - 1; ++k) {
      const point = this.prevPoints[k],
        point2 = this.prevPoints[k + 1];
      ctx.strokeStyle = this.color.replace("alp", k / this.prevPoints.length);
      ctx.lineWidth = k * lineWidthProportion;
      ctx.beginPath();
      ctx.moveTo(point[0], point[1]);
      ctx.lineTo(point2[0], point2[1]);
      ctx.stroke();
    }

    if (this.prevPoints[0][1] > hh) this.alive = false;
  };

  function generateBalloonPath(x, y, size) {
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x - size / 2,
      y - size / 2,
      x - size / 4,
      y - size,
      x,
      y - size
    );
    ctx.bezierCurveTo(
      x + size / 4,
      y - size,
      x + size / 2,
      y - size / 2,
      x,
      y
    );
  }

  for (let i = 0; i < opts.strings.length; ++i) {
    for (let j = 0; j < opts.strings[i].length; ++j) {
      letters.push(
        new Letter(
          opts.strings[i][j],
          j * opts.charSpacing +
            opts.charSpacing / 2 -
            (opts.strings[i].length * opts.charSize) / 2,
          i * opts.lineHeight +
            opts.lineHeight / 2 -
            (opts.strings.length * opts.lineHeight) / 2
        )
      );
    }
  }

  function renderLoop() {
    window.requestAnimationFrame(renderLoop);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    ctx.translate(hw, hh);

    let done = true;
    for (let l = 0; l < letters.length; ++l) {
      letters[l].step?.();
      if (letters[l].phase !== "done") done = false;
    }

    ctx.translate(-hw, -hh);

    if (done) for (let l = 0; l < letters.length; ++l) letters[l].reset?.();
    console.log("Loop running:", letters.map(l => l.phase));

  }

  renderLoop();

  window.addEventListener("resize", () => {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    hw = w / 2;
    hh = h / 2;
    ctx.font = opts.charSize + "px Verdana";
  });
}

export function loopSequence() {
  const showCake = () => {
  const cake = document.querySelector(".cake");
  if (!cake) return;

  cake.style.visibility = "visible"; // 👈 Force visible before animation
  cake.classList.remove("animate");
  void cake.offsetWidth;
  setTimeout(() => {
    cake.classList.add("animate");
  }, 100);

  document.getElementById("cake-container").style.display = "block";
  document.getElementById("c").style.display = "none";
};

  const showFireworks = () => {
  document.getElementById("cake-container").style.display = "none";
  document.getElementById("c").style.display = "block";

  if (!window.__fireworksStarted) {
    window.__fireworksStarted = true;

    // 🔧 Delay anim() slightly to ensure canvas is mounted
    setTimeout(() => {
      anim();
    }, 100); // small delay allows canvas to exist in DOM
  }
};


  function startLoop() {
    showCake();
    setTimeout(() => showFireworks(), 10000);
    setTimeout(() => startLoop(), 22000);
  }

  startLoop();
}
