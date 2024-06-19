document.addEventListener('DOMContentLoaded', function() {
  // Check if the SpeechSynthesis API is supported by the browser
  if ('speechSynthesis' in window) {
    var synth = window.speechSynthesis;

    // Get the current page URL
    var currentPageUrl = window.location.href.toLowerCase(); // Make sure to convert URL to lowercase for consistent comparison
    
    // Define default text
    var defaultText = 'You are on this page now.';

    // Check the current page URL and adjust the text accordingly
    var utteranceText;
    if (currentPageUrl.includes('home')) {
      utteranceText = 'You are now on the home page. Would you wish to ask your AI anything, I recommend you to press any key and feel free to ask. Do you wanna go to another page, press the space bar key.';
    } else if (currentPageUrl.includes('about')) {
      utteranceText = 'You are now on the about page. Who We Are: Welcome to ABILITY, where we strive to empower individuals with disabilities through innovative technology solutions. Our team is dedicated to making the internet more accessible and inclusive for everyone. Our Mission: Our mission is to break down barriers and provide equal opportunities for individuals with disabilities to access information and participate fully in the digital world. We believe in leveraging the power of technology to create positive change in people\'s lives. Our Team: We are a diverse team of engineers, designers, and accessibility experts passionate about making a difference. With our combined expertise and dedication, we work tirelessly to develop cutting-edge solutions that empower and enrich the lives of our users. Why Choose Us: At ABILITY, we prioritize user experience, accessibility, and innovation. We understand the unique challenges faced by individuals with disabilities, and we are committed to providing solutions that enhance their quality of life. With our user-centered approach and commitment to excellence, you can trust us to deliver exceptional results.';
    } else if (currentPageUrl.includes('service')) {
      utteranceText = 'You are now on the service page. Voice-Enabled Internet Browsing: Our voice-enabled internet browsing feature allows users to navigate the web hands-free. Simply speak commands and our AI assistant will assist you in accessing information, reading web pages, and more. Natural Language Understanding: With our natural language understanding technology, our AI assistant can comprehend and respond to your queries in conversational English. Ask questions, make requests, and interact with the internet effortlessly. Music Playback: Enjoy your favorite music tracks from YouTube with our built-in music playback feature. Simply ask our AI assistant to play a song, artist, or genre, and sit back and relax as it fills your space with music.';
    } else if (currentPageUrl.includes('contact')) {
      utteranceText = ' You are now on the contact page. Come to it whenever you feel like you want to send a message to the Ability owners. We are here to help you with any further modifications and assistance to make your program the best for your learning. Here is a quick guide to contact us: Press the space bar button on your keyboard and speak the name of your e-mail. Press the space bar button for the second time if you are ready to speak your message, speak your message. Thirdly, press the space bar again and give a confirmation response just like "yes". With those few steps, your message will reach us directly. Thank you.';
    } else if (currentPageUrl.includes('youtube')) {
      utteranceText = 'You are now on the YouTube page. Press any key different from the space bar key and speak the name of the song you want to listen to.';
    } else if (currentPageUrl.includes('library')) {
      utteranceText = 'You are now on the library page. Press any key different from the space bar key and give a command of what you want to do with the library.';
    } else if (currentPageUrl.includes('guide')) {
      utteranceText = 'You are now on the guide page.';
    } else {
      utteranceText = defaultText;
    }

    // Create a SpeechSynthesisUtterance object with the adjusted text
    var utterance = new SpeechSynthesisUtterance(utteranceText);

    // Speak the utterance when the page loads
    synth.speak(utterance);

    // Function to stop speech synthesis
    function stopSpeech() {
      // Cancel the speech synthesis
      synth.cancel();
    }

    // Add a keydown event listener to stop the speech when space bar or enter key is pressed
    document.addEventListener('keydown', function(event) {
      // Check if the space bar or enter key is pressed
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault(); // Prevent default space bar behavior (e.g., scrolling)
        
        // Stop speech synthesis
        stopSpeech();
      }
    });
  } else {
    alert('Speech synthesis not supported by your browser.');
  }
});
