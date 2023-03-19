const mouseButtonMap = [
    { key: 'Left Click', code: 0 },
    { key: 'Middle Click', code: 1 },
    { key: 'Right Click', code: 2 },
    { key: 'Back Button', code: 3 },
    { key: 'Forward Button', code: 4 },
  ];
  
  function createMouseTest() {
    const mouseTest = document.getElementById('mouse-test');
    let row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '5px';
    row.style.marginBottom = '5px';
    mouseTest.appendChild(row);
  
    mouseButtonMap.forEach((button) => {
      const buttonElement = document.createElement('div');
      buttonElement.textContent = button.key;
      buttonElement.classList.add('key');
      buttonElement.dataset.code = button.code;
  
      row.appendChild(buttonElement);
    });
  }
  
  createMouseTest();
  
  const mouseArea = document.querySelector('.mouse-area');
  
  mouseArea.addEventListener('mousedown', (event) => {
    event.preventDefault();
    const buttonElement = document.querySelector(`[data-code="${event.button}"]`);
    if (buttonElement) {
      buttonElement.classList.add('pressed');
    }
  });
  
  mouseArea.addEventListener('mouseup', (event) => {
    event.preventDefault();
    const buttonElement = document.querySelector(`[data-code="${event.button}"]`);
    if (buttonElement) {
      buttonElement.classList.remove('pressed');
      buttonElement.classList.toggle('active');
    }
  });
  
  mouseArea.addEventListener('auxclick', (event) => {
    event.preventDefault();
  });
  