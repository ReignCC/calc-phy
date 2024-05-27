
document.getElementById('calculate').addEventListener('click', function() {
  const force = parseFloat(document.getElementById('force').value);
  const time = parseFloat(document.getElementById('time').value);
  const timeUnit = document.getElementById('time-unit').value;
  const answerDiv = document.getElementById('answer');

  if (isNaN(force) || isNaN(time)) {
    document.getElementById('result').innerText = 'Please enter valid numbers for force and time.';
    return;
  }

  const impulse = force * time;
  const unit = 'N' + timeUnit;

  document.getElementById('result').innerText = `Impulse: ${impulse} ${unit}\n\nSolution:\nI = (F)(t)\nI = (${force}N)(${time}${timeUnit})\nI = ${impulse} ${unit}`;

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
  doc.save('impulse_result.pdf');
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