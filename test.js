document.addEventListener('DOMContentLoaded', function() {
    // Check if the SpeechRecognition API is supported by the browser
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      
      // Set continuous to true to allow continuous speech recognition
      recognition.continuous = true;
      
      var allowSpeechInput = false; // Flag to indicate whether speech input is allowed
      
      document.addEventListener('keydown', function(event) {
        // Check if the Enter key is pressed
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent default form submission behavior
          allowSpeechInput = !allowSpeechInput; // Toggle the flag
          
          if (allowSpeechInput) {
            recognition.start(); // Start speech recognition
            console.log('Speech input enabled.');
          } else {
            recognition.stop(); // Stop speech recognition
            console.log('Speech input disabled.');
          }
        }
      });
      
      recognition.onresult = function(event) {
        // Get the last spoken phrase from the recognition result
        var lastResult = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
        // Check if the last spoken phrase contains specific keywords and redirect accordingly
        if (lastResult.includes('home')) {
          window.location.href = 'home.html'; // Redirect to home page
        } else if (lastResult.includes('about')) {
          window.location.href = 'about.html'; // Redirect to about page
        } else if (lastResult.includes('service')) {
          window.location.href = 'service.html'; // Redirect to service page
        } else if (lastResult.includes('contact')) {
          window.location.href = 'contact.html'; // Redirect to contact page
        } else {
          alert('No matching keyword found.'); // Alert if no matching keyword found
        }
      };
      
      recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
      };
    } else {
      alert('Speech recognition not supported by your browser.');
    }
  });
  