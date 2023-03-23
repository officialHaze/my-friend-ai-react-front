export function speak(synth, data, disableSubmitBtn, enableSubmitBtn) {
	setTimeout(() => {
		synth.cancel();
		const voice = synth.getVoices()[6];
		const utterThis = new SpeechSynthesisUtterance();
		utterThis.voice = voice;
		utterThis.rate = 1.15;
		let text = "";
		let textArray = [];
		for (let i = 0; i < data.length; i++) {
			text += data[i];
			if (data[i] === ".") {
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
