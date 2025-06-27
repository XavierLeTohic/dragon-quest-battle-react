class AudioManager {
	audioContext;
	sounds = new Map();

	constructor() {
		this.audioContext = new (
			window.AudioContext || window.webkitAudioContext
		)();
	}

	destroy() {
		if (this.audioContext && this.audioContext.state !== "close") {
			this.audioContext.close();
		}
		this.sounds.clear();
	}

	async loadSound(name, url) {
		if (this.sounds.has(name)) {
			console.log(`Sound "${name}" already loaded, skipping...`);
			return;
		}

		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
		this.sounds.set(name, audioBuffer);
	}

	playSound(name, volume = 1.0) {
		const sound = this.sounds.get(name);
		if (!sound) {
			console.warn(`Sound "${name}" not found`);
			return;
		}

		const source = this.audioContext.createBufferSource();
		const gainNode = this.audioContext.createGain();

		source.buffer = sound;
		gainNode.gain.value = volume;

		source.connect(gainNode);
		gainNode.connect(this.audioContext.destination);

		source.start(0);
	}

	playMultipleSounds(soundNames) {
		// biome-ignore lint/complexity/noForEach: <explanation>
		soundNames.forEach((name) => this.playSound(name));
	}
}

export default AudioManager;
