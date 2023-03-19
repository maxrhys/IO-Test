async function getVideoDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'videoinput');
}

async function populateVideoInputs() {
    const videoInputs = document.getElementById('video-inputs');
    const devices = await getVideoDevices();
    devices.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Camera ${videoInputs.options.length + 1}`;
        videoInputs.add(option);
    });
}

async function startWebcamTest() {
    const videoElement = document.getElementById('video-preview');
    const videoInputs = document.getElementById('video-inputs');
    const deviceId = videoInputs.value;

    try {
        const constraints = { video: { deviceId: deviceId ? { exact: deviceId } : undefined } };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        videoElement.style.display = 'block';
        console.log('Webcam test started.');
    } catch (error) {
        console.error('Error starting webcam test:', error);
    }
}

document.getElementById('start-video').addEventListener('click', startWebcamTest);

populateVideoInputs();
