// Sound system using Web Audio API (zero external assets needed)

let audioCtx = null;
let isMuted = localStorage.getItem('minesweeper_sound_muted') === 'true';

const getAudioContext = () => {
	if (typeof window === 'undefined') return null;
	if (!audioCtx) {
		const AudioContextClass = window.AudioContext || window.webkitAudioContext;
		if (AudioContextClass) {
			audioCtx = new AudioContextClass();
		}
	}
	if (audioCtx && audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	return audioCtx;
};

export const getSoundMuted = () => isMuted;

export const setSoundMuted = (muted) => {
	isMuted = muted;
	try {
		localStorage.setItem('minesweeper_sound_muted', muted ? 'true' : 'false');
	} catch (e) {
		// Ignore local storage errors
	}
};

export const playSound = (type) => {
	if (isMuted) return;
	const ctx = getAudioContext();
	if (!ctx) return;

	try {
		const now = ctx.currentTime;

		switch (type) {
			case 'click': {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = 'triangle';
				osc.frequency.setValueAtTime(400, now);
				osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
				gain.gain.setValueAtTime(0.15, now);
				gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(now);
				osc.stop(now + 0.05);
				break;
			}
			case 'flag': {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = 'sine';
				osc.frequency.setValueAtTime(600, now);
				osc.frequency.setValueAtTime(900, now + 0.04);
				gain.gain.setValueAtTime(0.18, now);
				gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(now);
				osc.stop(now + 0.1);
				break;
			}
			case 'unflag': {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = 'sine';
				osc.frequency.setValueAtTime(800, now);
				osc.frequency.setValueAtTime(400, now + 0.04);
				gain.gain.setValueAtTime(0.15, now);
				gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(now);
				osc.stop(now + 0.08);
				break;
			}
			case 'chord': {
				[520, 780].forEach((freq, idx) => {
					const osc = ctx.createOscillator();
					const gain = ctx.createGain();
					osc.type = 'sine';
					osc.frequency.setValueAtTime(freq, now + idx * 0.03);
					gain.gain.setValueAtTime(0.15, now + idx * 0.03);
					gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.08);
					osc.connect(gain);
					gain.connect(ctx.destination);
					osc.start(now + idx * 0.03);
					osc.stop(now + idx * 0.03 + 0.08);
				});
				break;
			}
			case 'explode': {
				// White noise buffer for explosion boom
				const bufferSize = ctx.sampleRate * 0.5;
				const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
				const data = buffer.getChannelData(0);
				for (let i = 0; i < bufferSize; i++) {
					data[i] = Math.random() * 2 - 1;
				}
				const noise = ctx.createBufferSource();
				noise.buffer = buffer;

				const filter = ctx.createBiquadFilter();
				filter.type = 'lowpass';
				filter.frequency.setValueAtTime(800, now);
				filter.frequency.exponentialRampToValueAtTime(60, now + 0.45);

				const gain = ctx.createGain();
				gain.gain.setValueAtTime(0.4, now);
				gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

				noise.connect(filter);
				filter.connect(gain);
				gain.connect(ctx.destination);
				noise.start(now);
				noise.stop(now + 0.5);
				break;
			}
			case 'win': {
				// Cheerful triumph arpeggio: C5 -> E5 -> G5 -> C6
				const notes = [523.25, 659.25, 783.99, 1046.5];
				notes.forEach((freq, i) => {
					const osc = ctx.createOscillator();
					const gain = ctx.createGain();
					osc.type = 'triangle';
					osc.frequency.setValueAtTime(freq, now + i * 0.1);
					gain.gain.setValueAtTime(0.2, now + i * 0.1);
					gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
					osc.connect(gain);
					gain.connect(ctx.destination);
					osc.start(now + i * 0.1);
					osc.stop(now + i * 0.1 + 0.25);
				});
				break;
			}
			default:
				break;
		}
	} catch (e) {
		// Audio might be restricted until user gesture
	}
};
