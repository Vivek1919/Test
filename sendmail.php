<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and sanitize the input
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST["phone"], FILTER_SANITIZE_STRING);
    $query = filter_var($_POST["query"], FILTER_SANITIZE_STRING);

    // Set the email recipient and subject
    $to = "venketesh1918@gmail.com";
    $subject = "New Contact Form Submission";

    // Set the email message body
    $message = "Name: $name\n\n";
    $message .= "Email: $email\n\n";
    $message .= "Phone: $phone\n\n";
    $message .= "Query: $query\n\n";

    // Set the email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
