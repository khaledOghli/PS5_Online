import React, { Component } from 'react'
import ReactDOM from 'react-dom'; 
import './Loader.scss';
import { FiPower } from 'react-icons/fi';
import video from './PlayStation_Intro.mkv';
const defaultConfig = {
	cpanel: true, // you can remove it if you don't need the CP
	particles: [],
	bgColorLeft: "#56464C",
	bgColorRight: "#14121E",
	particleColors: ["#D1D191", "#DBD9DA", "#3A2A2C", "#948E92"],
	particleSpeed: 1.5,
	particleMax: 150,
	particleDelay: 70,
	particleSize: 6
};

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.state = defaultConfig;
		this.updateAnimationState = this.updateAnimationState.bind(this);
		this.timeLast = Date.now();
		this.colorVariation = 0;
        this.animateFade = false;
        this.animateFadeVideo = false;
	}

	componentDidMount() {
		this.rAF = requestAnimationFrame(this.updateAnimationState);
  
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.rAF);
	}

	particleColor(color) {
		function hexToRgb(hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result
				? {
						r: parseInt(result[1], 16),
						g: parseInt(result[2], 16),
						b: parseInt(result[3], 16)
				  }
				: null;
		}

		const rgbColor = hexToRgb(color);

		return {
			r: Math.round(
				Math.random() * this.colorVariation - this.colorVariation / 2 + rgbColor.r
			),
			g: Math.round(
				Math.random() * this.colorVariation - this.colorVariation / 2 + rgbColor.g
			),
			b: Math.round(
				Math.random() * this.colorVariation - this.colorVariation / 2 + rgbColor.b
			),
			a: 0,
			m: 1,
			s: Math.random()
		};
	}

	updateAnimationState() {
		let particlesCurrent = this.state.particles;

		if (particlesCurrent.length > 0) {
			particlesCurrent = particlesCurrent.filter((p) => {
				return (
					p.x > -10 &&
					p.x < window.innerWidth + 10 &&
					p.y > -10 &&
					p.y < window.innerHeight + 10
				);
			});
		}

		if (particlesCurrent.length < this.state.particleMax) {
			const timeCurrent = Date.now();
			if (timeCurrent - this.timeLast > this.state.particleDelay) {
				particlesCurrent.push({
					x: Math.round(Math.random() * window.innerWidth),
					y: Math.round(
						(Math.random() * window.innerHeight) / 2 + window.innerHeight / 4
					),
					r: Math.ceil(Math.random() * this.state.particleSize),
					c: this.particleColor(
						this.state.particleColors[
							Math.floor(Math.random() * this.state.particleColors.length)
						]
					),
					s: Math.random() * 2,
					d: Math.round(Math.random() * 360)
				});
				this.timeLast = timeCurrent;
			}
		}

		if (particlesCurrent.length > 0) {
			particlesCurrent.map((p) => {
				const n = 180 - (p.d + 90);
				if (p.c.a > 0.9) {
					p.c.m = -1;
				} else if (p.c.a < 0.1) {
					p.c.m = 1;
				}
				p.c.a += 0.05 * p.c.m * p.c.s;

				if (p.d > 0 && p.d < 180) {
					p.x +=
						(Math.sin(p.d) / Math.sin(1)) * (this.state.particleSpeed * p.s) * 0.1;
				} else {
					p.x -=
						(Math.sin(p.d) / Math.sin(1)) * (this.state.particleSpeed * p.s) * 0.1;
				}
				if (p.d > 90 && p.d < 270) {
					p.y +=
						(Math.sin(n) / Math.sin(1)) * (this.state.particleSpeed * p.s) * 0.1;
				} else {
					p.y -=
						(Math.sin(n) / Math.sin(1)) * (this.state.particleSpeed * p.s) * 0.1;
				}
				return p;
			});
		}

		this.setState({ particles: particlesCurrent });
		this.rAF = requestAnimationFrame(this.updateAnimationState);
	}

	handleChange(i, value) {
		let particleColors = [...this.state.particleColors];
		particleColors[i] = value;
		this.setState({ particleColors });
	}

	handleAdd() {
		let particleColors = [...this.state.particleColors];
		particleColors.push("#000000");
		this.setState({ particleColors });
	}

	handleRemove(i) {
		let particleColors = [...this.state.particleColors];
		if (particleColors.length > 1) {
			particleColors.splice(i, 1);
			this.setState({ particleColors });
		}
	}

	handleDelete() {
		this.setState({ particles: [] });
	}

	handleReset() {
		this.setState(defaultConfig);
	}

    enterHome() {
        this.animateFade = true;
        const $this = this;
        setTimeout(() => {
            document.querySelector('.preloader video').play();
            document.querySelector('.preloader video').onended = function() {
                $this.animateFadeVideo = true;
                setTimeout(() => {
                    $this.props.getLoaderState(false)
                },1100)
            };
        },1100)
    }
	render() {
		return (
			<>
                <div className={`preloader ${this.animateFadeVideo ? 'fadingOut' : ''}`}>
                    <video width="100%" height="100%" preload="auto">
                        <source src={video} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                </div>
                <div className={`ps5-home ${this.animateFade ? 'fadingOut' : ''}`} >
                    <CanvasItem state={this.state} />
                    <div className="ps5-home-content">
                        <p>Click the button to Start</p>
                        <button onClick={() => this.enterHome()} className="ps5-btn ps5-btn-mono ps5-btn-lg focus ps5-home-btn">
                            <FiPower className="icon-power" />
                            <div className="ps5-shine focus"></div>
                            <div className="ps5-shine focus"></div>
                            <div className="ps5-shine focus"></div>
                        </button>
                    </div>
                </div>
                
			</>
		);
	}
}

class CanvasItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.canvasRef = React.createRef();
	}

	componentDidUpdate() {
		const state = this.props.state;
		const particles = state.particles;
		const colorGradientLeft = state.bgColorLeft;
		const colorGradientRight = state.bgColorRight;

		const canvas = this.canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const ctx = canvas.getContext("2d");
		const width = canvas.width;
		const height = canvas.height;
		ctx.save();

		let gradient = ctx.createLinearGradient(0, 0, width, height);
		gradient.addColorStop(0, colorGradientLeft);
		gradient.addColorStop(1, colorGradientRight);
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, width, height);

		particles.forEach((p) => {
			ctx.beginPath();
			ctx.fillStyle =
				"rgba(" + p.c.r + "," + p.c.g + "," + p.c.b + "," + p.c.a + ")";
			ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();
		});

		ctx.restore();
	}

	render() {
		return <canvas ref={this.canvasRef}></canvas>;
	}
}

export default Canvas
