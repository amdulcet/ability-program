document.addEventListener('DOMContentLoaded', function() {
  // List of available pages
  var pages = [
      'about.html',
      'service.html',
      'contact.html',
      'youtube.html',
      'Library.html',
      'news.html',
      'guide.html'
  ];

  document.addEventListener('keydown', function(event) {
      // Check if the Enter key is pressed
      if (event.key === 'Enter') {
          event.preventDefault(); // Prevent default form submission behavior
          
          // Randomly select one of the available pages
          var randomPage = pages[Math.floor(Math.random() * pages.length)];
          
          // Redirect to the randomly selected page
          window.location.href = randomPage;
      }
  });
});
