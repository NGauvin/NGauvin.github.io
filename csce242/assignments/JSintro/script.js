// Wait for DOM content to load before executing JS
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Speech Feature ---
  const speechCard = document.getElementById('speech-card');
  const speechBubble = document.getElementById('speech-bubble');

  // Toggle CSS speech bubble visibility when column is clicked
  const toggleSpeechBubble = () => {
    speechBubble.classList.toggle('hidden');
  };

  speechCard.addEventListener('click', toggleSpeechBubble);


  // --- 2. Beverage Feature ---
  const beverageSelect = document.getElementById('beverage-select');
  const beverageOutput = document.getElementById('beverage-output');

  // Update beverage display output
  const handleBeverageChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      beverageOutput.textContent = `${selectedValue}: Nice Choice!`;
    }
  };

  beverageSelect.addEventListener('change', handleBeverageChange);


  // --- 3. Sticker Feature ---
  const imageWrapper = document.getElementById('image-wrapper');

  // Add emoji sticker at exact click coordinates inside wrapper
  const addSticker = (event) => {
    // Get container dimensions and offset coordinates
    const rect = imageWrapper.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Create new sticker span element
    const sticker = document.createElement('span');
    sticker.classList.add('sticker');
    sticker.textContent = '🌞';

    // Position sticker absolutely within relative parent container
    sticker.style.left = `${x}px`;
    sticker.style.top = `${y}px`;

    imageWrapper.appendChild(sticker);
  };

  imageWrapper.addEventListener('click', addSticker);

});