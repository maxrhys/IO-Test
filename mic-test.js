const startMicTestButton = document.getElementById('start-mic-test');
const canvas = document.getElementById('audio-visualizer');
const canvasCtx = canvas.getContext('2d');

function visualize(stream) {
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();

  source.connect(analyser);
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  function draw() {
    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }

  draw();
}

async function startMicTest() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    visualize(stream);

    const recorder = new MediaRecorder(stream);
    let chunks = [];

    recorder.addEventListener('dataavailable', (event) => {
      chunks.push(event.data);
    });

    recorder.addEventListener('stop', () => {
      const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
      const audioURL = URL.createObjectURL(blob);

      const audio = new Audio(audioURL);
      audio.play();
      stream.getTracks().forEach((track) => track.stop());
    });

    recorder.start();
    setTimeout(() => {
      recorder.stop();
    }, 5000);

  } catch (err) {
    console.error('Error:', err);
  }
}

startMicTestButton.addEventListener('click', startMicTest);