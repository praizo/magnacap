<?php
/** Career application (/careers): emails the application with the CV attached to info@magnacap.org. */

require __DIR__ . '/_mailer.php';

const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_TYPES = [
    'pdf' => 'application/pdf',
    'doc' => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

require_post();
$data = $_POST;
reject_bots($data);

$first = line($data, 'firstName');
$last = line($data, 'lastName');
$email = line($data, 'email', 254);
$note = text($data, 'note');
require_fields($first !== '' && $last !== '' && $note !== '' && ($data['consent'] ?? '') === 'yes' && filter_var($email, FILTER_VALIDATE_EMAIL));

$cv = $_FILES['cv'] ?? null;
if (!$cv || $cv['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($cv['tmp_name'])) {
    respond(422, ['ok' => false, 'error' => 'Please attach your CV.']);
}
$extension = strtolower(pathinfo($cv['name'], PATHINFO_EXTENSION));
if (!isset(CV_TYPES[$extension]) || $cv['size'] > MAX_CV_BYTES) {
    respond(422, ['ok' => false, 'error' => 'Your CV must be a PDF or Word file under 5 MB.']);
}

$linkedin = line($data, 'linkedin', 300);
$phone = line($data, 'phone', 50);
send([
    'subject' => "Career application: $first $last",
    'heading' => 'New career application',
    'intro' => "$first $last applied to join MagnaCap through the Careers page. Their CV is attached.",
    'fields' => [
        'Name' => "$first $last",
        'Email' => [$email, "mailto:$email"],
        'Phone' => $phone !== '' ? [$phone, 'tel:' . preg_replace('/[^\d+]/', '', $phone)] : '',
        'LinkedIn' => filter_var($linkedin, FILTER_VALIDATE_URL) && preg_match('#^https?://#i', $linkedin) ? [$linkedin, $linkedin] : '',
        'CV' => "CV - $first $last.$extension (attached)",
    ],
    'longLabel' => 'Cover note',
    'long' => $note,
    'action' => "Reply to this email to contact $first about their application.",
    'replyTo' => $email,
    'attachment' => [
        // Only the extension is kept from the visitor's filename.
        'name' => "CV - $first $last.$extension",
        'type' => CV_TYPES[$extension],
        'path' => $cv['tmp_name'],
    ],
]);
