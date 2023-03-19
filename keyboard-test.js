const keyMap = [
    // Row 1
    { key: '`', code: 'Backquote' },
    { key: '1', code: 'Digit1' },
    { key: '2', code: 'Digit2' },
    { key: '3', code: 'Digit3' },
    { key: '4', code: 'Digit4' },
    { key: '5', code: 'Digit5' },
    { key: '6', code: 'Digit6' },
    { key: '7', code: 'Digit7' },
    { key: '8', code: 'Digit8' },
    { key: '9', code: 'Digit9' },
    { key: '0', code: 'Digit0' },
    { key: '-', code: 'Minus' },
    { key: '=', code: 'Equal' },
    { key: 'BKSP', code: 'Backspace', class: 'large-key' },
    // Row 2
    { key: 'Tab', code: 'Tab', class: 'medium-key' },
    { key: 'Q', code: 'KeyQ' },
    { key: 'W', code: 'KeyW' },
    { key: 'E', code: 'KeyE' },
    { key: 'R', code: 'KeyR' },
    { key: 'T', code: 'KeyT' },
    { key: 'Y', code: 'KeyY' },
    { key: 'U', code: 'KeyU' },
    { key: 'I', code: 'KeyI' },
    { key: 'O', code: 'KeyO' },
    { key: 'P', code: 'KeyP' },
    { key: '[', code: 'BracketLeft' },
    { key: ']', code: 'BracketRight' },
    // Row 3
    { key: 'Caps', code: 'CapsLock', class: 'medium-key' },
    { key: 'A', code: 'KeyA' },
    { key: 'S', code: 'KeyS' },
    { key: 'D', code: 'KeyD' },
    { key: 'F', code: 'KeyF' },
    { key: 'G', code: 'KeyG' },
    { key: 'H', code: 'KeyH' },
    { key: 'J', code: 'KeyJ' },
    { key: 'K', code: 'KeyK' },
    { key: 'L', code: 'KeyL' },
    { key: ';', code: 'Semicolon' },
    { key: "'", code: 'Quote' },
    { key: '#', code: 'Backslash' },
    { key: 'Enter', code: 'Enter', class: 'large-key' },
    // Row 4
    { key: 'Shift', code: 'ShiftLeft', class: 'large-key' },
    { key: '\\', code: 'IntlBackslash' },
    { key: 'Z', code: 'KeyZ' },
    { key: 'X', code: 'KeyX' },
    { key: 'C', code: 'KeyC' },
    { key: 'V', code: 'KeyV' },
    { key: 'B', code: 'KeyB' },
    { key: 'N', code: 'KeyN' },
    { key: 'M', code: 'KeyM' },
    { key: ',', code: 'Comma' },
    { key: '.', code: 'Period' },
    { key: '/', code: 'Slash' },
    { key: 'Shift', code: 'ShiftRight', class: 'large-key' },
    // Row 5
    { key: 'Ctrl', code: 'ControlLeft', class: 'medium-key' },
    { key: 'Meta', code: 'MetaLeft', class: 'medium-key' },
    { key: 'Alt', code: 'AltLeft', class: 'medium-key' },
    { key: 'Space', code: 'Space', class: 'large-key' },
    { key: 'Alt', code: 'AltRight', class: 'medium-key' },
    { key: 'Menu', code: 'ContextMenu', class: 'medium-key' },
    { key: 'Ctrl', code: 'ControlRight', class: 'medium-key' },
  ];
  
  function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    let row;
  
    keyMap.forEach((key, index) => {
      if (index === 0 || index === 14 || index === 28 || index === 42 || index === 56) {
        row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '5px';
        row.style.marginBottom = '5px';
        keyboard.appendChild(row);
      }
  
      const keyElement = document.createElement('div');
      keyElement.textContent = key.key;
      keyElement.classList.add('key');
      keyElement.dataset.code = key.code;
  
      if (key.class) {
        keyElement.classList.add(key.class);
      }
  
      row.appendChild(keyElement);
    });
  }
  
  createKeyboard();
  
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Tab') {
      event.preventDefault();
    }
    
    if (event.code !== 'ControlLeft' || !event.altKey) {
      const keyElement = keyboard.querySelector(`[data-code="${event.code}"]`);
      if (keyElement) {
        keyElement.classList.add('pressed');
      }
    }
  });
  
  document.addEventListener('keyup', (event) => {
    const keyElement = keyboard.querySelector(`[data-code="${event.code}"]`);
    if (keyElement) {
      keyElement.classList.remove('pressed');
      
      if (event.code !== 'ControlLeft' || !event.altKey) {
        if (keyElement.classList.contains('active')) {
          keyElement.classList.remove('active');
        } else {
          keyElement.classList.add('active');
        }
      }
    }
  });
  
  
  
  document.addEventListener('blur', () => {
    const pressedKeys = keyboard.querySelectorAll('.pressed');
    pressedKeys.forEach((keyElement) => {
      keyElement.classList.remove('pressed');
    });
  });
  