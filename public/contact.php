<?php
/** Contact form (/contact): emails the enquiry to info@magnacap.org. */

require __DIR__ . '/_mailer.php';

require_post();
$data = json_input();
reject_bots($data);

$name = line($data, 'name');
$email = line($data, 'email', 254);
$message = text($data, 'message');
require_fields($name !== '' && $message !== '' && filter_var($email, FILTER_VALIDATE_EMAIL));

$organisation = line($data, 'organisation');
$phone = line($data, 'phone', 50);
$first = explode(' ', $name)[0];

send([
    'subject' => "Website enquiry from $name",
    'heading' => 'New enquiry',
    'intro' => "$name" . ($organisation !== '' ? " from $organisation" : '')
        . ' sent a message through the contact form on magnacap.org.',
    'fields' => [
        'Name' => $name,
        'Organisation' => $organisation,
        'Email' => [$email, "mailto:$email"],
        'Phone' => $phone !== '' ? [$phone, 'tel:' . preg_replace('/[^\d+]/', '', $phone)] : '',
    ],
    'longLabel' => 'Message',
    'long' => $message,
    'action' => "Reply to this email to answer $first directly.",
    'replyTo' => $email,
]);
