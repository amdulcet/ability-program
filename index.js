// Check for browser support
if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support speech recognition. Please try Google Chrome.');
} else {
    const recognition = new webkitSpeechRecognition();
    const synth = window.speechSynthesis;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    document.getElementById('microphone-btn').onclick = () => {
        recognition.start();
    };

    // Track if recognition is currently active
    let isListening = false;

    document.addEventListener("keydown", (ev) => {
        if (ev.key === " ") {
            // If recognition is active, stop it
            if (isListening) {
                recognition.stop();
                isListening = false;
            } else {
                // If recognition is not active, start it
                recognition.start();
                isListening = true;
            }
            // Stop speaking if speech synthesis is active
            stopSpeaking();
        }
    });
6


recognition.onresult = function (event) {
    const speechResult = event.results[0][0].transcript;
    document.getElementById('results').textContent = 'You said: ' + speechResult;
    fetchYourAPIAI(speechResult).then(data => {
        document.getElementById('response').textContent = ''; // Clear previous text
        const responseText = 'Response: ' + data.text;
        typeTextWithDelay(responseText); // Type the response text with delay
        speak(data.text); // Invoke text-to-speech for the response
    });
};

function typeTextWithDelay(text) {
    const responseElement = document.getElementById('response');
    responseElement.textContent = ''; // Clear previous text
    let index = 0;
    const typingInterval = setInterval(function () {
        if (index < text.length) {
            responseElement.textContent += text[index];
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 70); // Adjust the typing speed here (milliseconds per character)
}


    recognition.onerror = function (event) {
        typeText('Error occurred in recognition: ' + event.error); // Update this line
    };
    

    recognition.onerror = function (event) {
        document.getElementById('results').textContent = 'Error occurred in recognition: ' + event.error;
    };

    // Event handler to stop recognition when speech ends
    recognition.onspeechend = () => {
        recognition.stop();
        isListening = false;
    };

    function fetchYourAPIAI(speechResult) {
        const apiKey = 'qG1htIHOU5ekGFEg6r1Mp7R8LRA7952yZS07Cc3O'
        return fetch('https://api.cohere.ai/v1/chat', {
            method: "POST",
            body: JSON.stringify({
                message: speechResult,
            }),
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        }).then(response => response.json())
        .catch(error => console.error('There was a problem with your fetch operation:', error));
    }

    function speak(text) {
        if (synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }
        if (text !== '') {
            var utterThis = new SpeechSynthesisUtterance(text);
            utterThis.onend = function (event) {
                console.log('SpeechSynthesisUtterance.onend');
            };
            utterThis.onerror = function (event) {
                console.error('SpeechSynthesisUtterance.onerror');
            };
            synth.speak(utterThis);
        }
    }

    // Function to stop speaking
    function stopSpeaking() {
        if (synth.speaking) {
            synth.cancel();
        }
    }
}
