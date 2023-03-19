function playTone(frequency, duration, context) {
    return new Promise((resolve) => {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.1;

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
            resolve();
        }, duration);
    });
}

async function startSpeakerTest() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const frequencies = [440, 880, 1760, 3520];
    const duration = 500;

    for (const frequency of frequencies) {
        await playTone(frequency, duration, audioContext);
    }
}

document.getElementById('start-speaker').addEventListener('click', startSpeakerTest);
