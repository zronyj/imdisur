var app = new Vue({
	el: "#app",
	data: {
		stickyNav: false,
		vueCanvas: null,
		canvasParams: {
			partilcesOnScreen: 500,
			particlesArray: [],
			w: 0,
			h: 0
		}
	},
	methods: {
		random: function (min, max) {
			return min + Math.random() * (max - min + 1);
		},
		createGlitter: function () {
			for (var i = 0; i < this.canvasParams.partilcesOnScreen; i++) {
				this.canvasParams.particlesArray.push({
					x: Math.random() * this.canvasParams.w,
					y: Math.random() * this.canvasParams.h,
					opacity: 0.5 + Math.random() * 0.5,
					speedX: this.random(-0.05,0.05),
					speedY: this.random(0.7, 0.9),
					radius: this.random(0.4, 0.5)
				});
			}
		},
		drawGlitter: function () {
			for (var i = 0; i < this.canvasParams.particlesArray.length; i++) {
				var gradient = this.vueCanvas.createRadialGradient(
					this.canvasParams.particlesArray[i].x,
					this.canvasParams.particlesArray[i].y,
					0,
					this.canvasParams.particlesArray[i].x,
					this.canvasParams.particlesArray[i].y,
					this.canvasParams.particlesArray[i].radius,
				);

				gradient.addColorStop(0.0, "rgba(240,240,240," + this.canvasParams.particlesArray[i].opacity + ")");
				gradient.addColorStop(1.0, "rgba(210,210,210," + this.canvasParams.particlesArray[i].opacity + ")");

				this.vueCanvas.beginPath();
				this.vueCanvas.arc(
					this.canvasParams.particlesArray[i].x,
					this.canvasParams.particlesArray[i].y,
					this.canvasParams.particlesArray[i].radius,
					0,
					Math.PI*2,
					false
				);

				this.vueCanvas.fillStyle = gradient;
				this.vueCanvas.fill();
			}
		},
		moveGlitter: function () {
			for (var i = 0; i < this.canvasParams.particlesArray.length; i++) {
				this.canvasParams.particlesArray[i].x += this.canvasParams.particlesArray[i].speedX;
				this.canvasParams.particlesArray[i].y += this.canvasParams.particlesArray[i].speedY;
				if (this.canvasParams.particlesArray[i].y > this.canvasParams.h) {
					this.canvasParams.particlesArray[i].x = Math.random() * this.canvasParams.w * 1.5;
					this.canvasParams.particlesArray[i].y = -50;
				}
			}
		},
		updateGlitter: function () {
			this.vueCanvas.clearRect(0,0,this.canvasParams.w,this.canvasParams.h);
			this.drawGlitter();
			this.moveGlitter();
		}
	},
	mounted() {
		window.document.onscroll = () => {
			let navBar = document.getElementById('nav');
			if (window.scrollY > navBar.offsetTop) {
				this.stickyNav = true;
			} else {
				this.stickyNav = false;
			}
		}
		var alto = document.getElementById("comienza").offsetHeight;
		document.getElementById("rosado").setAttribute("style", "height:" + alto + "px");
		var canvas = document.getElementById('glitter');
		var ctx = canvas.getContext('2d');
		this.canvasParams.w = canvas.width = document.getElementById("rosado").offsetWidth;
		this.canvasParams.h = canvas.height = document.getElementById("rosado").offsetHeight;
		this.vueCanvas = ctx;
		setInterval(this.updateGlitter, 50);
		this.createGlitter();
	}
});