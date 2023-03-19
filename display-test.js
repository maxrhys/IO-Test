const testPatterns = [
    { name: 'solid-red', style: 'rgb(255, 0, 0)' },
    { name: 'solid-green', style: 'rgb(0, 255, 0)' },
    { name: 'solid-blue', style: 'rgb(0, 0, 255)' },
    { name: 'solid-white', style: 'rgb(255, 255, 255)' },
    { name: 'solid-black', style: 'rgb(0, 0, 0)' },
    { name: 'gray-50', style: 'rgb(128, 128, 128)' },
    { name: 'checkerboard', style: 'repeating-linear-gradient(45deg, #000, #000 10px, #fff 10px, #fff 20px)' },
    { name: 'horizontal-gradient', style: 'linear-gradient(to right, rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255))' },
    { name: 'vertical-gradient', style: 'linear-gradient(to bottom, rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255))' }
];


const startTestBtn = document.getElementById('start-display-test');
const testArea = document.getElementById('testArea');

startTestBtn.addEventListener('click', () => {
    startDisplayTest();
});

function startDisplayTest() {
    openFullscreen(testArea);
    let patternIndex = 0;
    let loopCounter = 0;

    function nextPattern() {
        if (patternIndex < testPatterns.length) {
            const currentPattern = testPatterns[patternIndex];
            testArea.style.backgroundColor = currentPattern.name.startsWith('solid') || currentPattern.name === 'gray-50' ? currentPattern.style : '';
            testArea.style.backgroundImage = currentPattern.name === 'checkerboard' ? currentPattern.style : '';
            if (currentPattern.name === 'horizontal-gradient' || currentPattern.name === 'vertical-gradient' ) {
                testArea.style.backgroundImage = currentPattern.style;
                testArea.style.backgroundSize = '100% 100%';
            } else {
                testArea.style.backgroundSize = '';
            }
            patternIndex++;
            setTimeout(nextPattern, 2000);
        } else {
            loopCounter++;
            if (loopCounter < 2) {
                patternIndex = 0;
                nextPattern();
            } else {
                closeFullscreen();
                testArea.removeAttribute('style');
            }
        }
    }
    

    nextPattern();
}
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}
