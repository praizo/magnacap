<?php
/** Market-report sign-up (/insights): emails the subscription request to info@magnacap.org. */

require __DIR__ . '/_mailer.php';

require_post();
$data = json_input();
reject_bots($data);

$first = line($data, 'firstName');
$last = line($data, 'lastName');
$email = line($data, 'email', 254);
require_fields($first !== '' && $last !== '' && ($data['consent'] ?? '') === 'yes' && filter_var($email, FILTER_VALIDATE_EMAIL));

send([
    'subject' => "Market reports subscription: $first $last",
    'heading' => 'New market reports subscriber',
    'intro' => "$first $last signed up for MagnaCap's market reports on the Insights page.",
    'fields' => [
        'Name' => "$first $last",
        'Email' => [$email, "mailto:$email"],
        'Consent' => 'Agreed to receive market reports by email',
    ],
    'action' => "Add $first to the market reports mailing list. The site doesn't do this automatically.",
    'replyTo' => $email,
]);
