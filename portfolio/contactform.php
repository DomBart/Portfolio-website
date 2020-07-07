<?php
if (isset($_POST['submit'])) {
$name = $_POST['name'];
$subject = $_POST['subject'];
$mailFrom = $_POST['mail'];
$message = $_POST['message'];

$mailTo = "dom@work.lt"; //mano pasto adresas
$headers = "From: ".$mailFrom;
$txt = "You have received an e-mail from ".$name.".\n\n".$message;
mail($mailTo, $subject, $txt, $headers);
$message = "Message sent!";
echo "<script type='text/javascript'>alert('$message');</script>";
header("Refresh:0.5; url=index.html?mailsent#contact");
}
?>
