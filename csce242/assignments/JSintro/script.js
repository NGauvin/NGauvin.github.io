document.addEventListener('DOMContentLoaded', () => {

  // speech bubble toggle
  const speechCard = document.getElementById('speech-card');
  const speechBubble = document.getElementById('speech-bubble');

  const toggleSpeechBubble = () => {
    speechBubble.classList.toggle('hidden');
  };

  speechCard.addEventListener('click', toggleSpeechBubble);


  // beverage dropdown selection
  const beverageSelect = document.getElementById('beverage-select');
  const beverageOutput = document.getElementById('beverage-output');

  const handleBeverageChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      beverageOutput.textContent = `${selectedValue}: Nice Choice!`;
    }
  };

  beverageSelect.addEventListener('change', handleBeverageChange);


  // click image to add sticker
  const imageWrapper = document.getElementById('image-wrapper');

  const addSticker = (event) => {
    // get click position inside wrapper
    const rect = imageWrapper.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // make sticker span
    const sticker = document.createElement('span');
    sticker.classList.add('sticker');
    sticker.textContent = '🌞';

    // set position absolute
    sticker.style.left = `${x}px`;
    sticker.style.top = `${y}px`;

    imageWrapper.appendChild(sticker);
  };

  imageWrapper.addEventListener('click', addSticker);

});