<?php
// Retrieve email and message from POST request
$email = $_POST['email'];
$message = $_POST['message'];

// Set up the email headers
$headers = "From: Your Name <your_email@example.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send the email
$to = "ingeritresor@gmail.com"; // Change this to the recipient email address
$subject = "New Message from Contact Form";
$body = "Email: $email\n\nMessage: $message";

// Check if mail is sent successfully
if (mail($to, $subject, $body, $headers)) {
    // If mail is sent successfully, return success response
    echo "success";
} else {
    // If there is an error in sending mail, return error response
    echo "error";
}
?>
