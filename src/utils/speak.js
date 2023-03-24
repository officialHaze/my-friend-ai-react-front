export function speak(synth, data, disableSubmitBtn, enableSubmitBtn) {
	//wait for a second before starting the speech to load all the available voices and select the appropriate voice for the speech
	setTimeout(() => {
		synth.cancel();
		const voice = synth.getVoices()[6];
		const utterThis = new SpeechSynthesisUtterance();
		utterThis.voice = voice;
		utterThis.rate = 1.15;

		//since non native voice will stop abruptly after speaking 200-300 chars
		//breaking the whole response text into small chunks and storing them into
		// an array which is later provided to the synth to speak in chunks
		let text = "";
		let textArray = [];
		for (let i = 0; i < data.length; i++) {
			text += data[i];
			if (data[i] === ".") { //breaking signal is period
				textArray.push(text);
				text = "";
			}
		}
		textArray.push(text);
		let i = 0;
		utterThis.text = textArray[i];
		synth.speak(utterThis);
		if (synth.speaking) {
			console.log("speaking");
			disableSubmitBtn();
		}
		utterThis.onend = () => {
			i += 1;
			if (i < textArray.length) {
				utterThis.text = textArray[i];
				synth.speak(utterThis);
			} else {
				console.log("finished");
				enableSubmitBtn();
				return;
			}
		};
	}, 1000);
}
