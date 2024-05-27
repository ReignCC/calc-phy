// You may find that some of the variables here are of similar name to the ones from impulse. The reason why is because I first started creating the Impulse side then moved on to Momentum. So, in order not to take much time, I just copied the same HTML, CSS, and JS of Impulse to Momentum. Then just changed some calculations and some conversion scenarios. 

document.getElementById('calculate').addEventListener('click', function() {
  var force = parseFloat(document.getElementById('force').value);
  const time = parseFloat(document.getElementById('time').value);
  var massUnit = document.getElementById('force-unit').value;
  const timeUnit = document.getElementById('time-unit').value;
  const answerDiv = document.getElementById('answer');

  if (isNaN(force) || isNaN(time)) {
    document.getElementById('result').innerText = 'Please enter valid numbers for force and time.';
    return;
  }

// If the unit is g, it first converts the value of mass from grams to kilograms

  if (massUnit == 'g') {
    force /= 1000; 
    massUnit = 'kg'; 
  }

  const impulse = force * time;
  const unit = massUnit + timeUnit;

  document.getElementById('result').innerText = `Momentum: ${impulse} ${unit}\n\nSolution:\nP = (m)(v)\nP = (${force}${massUnit})(${time}${timeUnit})\nP = ${impulse} ${unit}`;

  answerDiv.style.display = 'block';
});

const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
document.head.appendChild(script);

document.getElementById('download-pdf').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const resultText = document.getElementById('result').innerText;
  if (!resultText) {
    alert('Please calculate the impulse first.');
    return;
  }

  doc.text(resultText, 10, 10);
  doc.save('calc-phy_momentum.pdf');
});

document.getElementById('copy-to-clipboard').addEventListener('click', function() {
  const resultText = document.getElementById('result').innerText;
  if (!resultText) {
    alert('Please calculate the impulse first.');
    return;
  }
  
  const textarea = document.createElement('textarea');
  textarea.value = resultText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  alert('Result copied to clipboard!');
});