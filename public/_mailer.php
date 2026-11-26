<?php
/**
 * Shared mail helpers for the cPanel (static export) form endpoints:
 * contact.php, subscribe.php and careers.php. Every form emails RECIPIENT.
 * Not an endpoint itself: .htaccess blocks direct requests to it.
 */

const RECIPIENT = 'info@magnacap.org';
// Must be an address on the site's own domain, or mail providers flag it as spoofed.
const SENDER = 'no-reply@magnacap.org';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

function require_post(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header('Allow: POST');
        respond(405, ['ok' => false, 'error' => 'Method not allowed']);
    }
}

/** Reads a JSON request body as an array. */
function json_input(): array
{
    $data = json_decode(file_get_contents('php://input', false, null, 0, 20000) ?: '', true);
    if (!is_array($data)) {
        respond(400, ['ok' => false, 'error' => 'Invalid request']);
    }
    return $data;
}

/** Honeypot: real visitors never see or fill `website`; bots that do get a silent success. */
function reject_bots(array $data): void
{
    if (!empty($data['website'])) {
        respond(200, ['ok' => true]);
    }
}

/** A single-line field: trimmed, line breaks removed (blocks header injection), length capped. */
function line(array $data, string $key, int $max = 200): string
{
    $value = is_string($data[$key] ?? null) ? $data[$key] : '';
    return mb_substr(trim(preg_replace('/[\r\n]+/', ' ', $value)), 0, $max);
}

/** A multi-line field, trimmed and length capped. */
function text(array $data, string $key, int $max = 5000): string
{
    $value = is_string($data[$key] ?? null) ? $data[$key] : '';
    return trim(mb_substr($value, 0, $max));
}

function require_fields(bool $valid): void
{
    if (!$valid) {
        respond(422, ['ok' => false, 'error' => 'Please fill in all required fields with valid details.']);
    }
}

/** Submission time in Lagos, where MagnaCap is based. */
function submitted_at(): string
{
    return (new DateTime('now', new DateTimeZone('Africa/Lagos')))->format('j M Y, g:i A') . ' WAT';
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

/**
 * Renders the notification as [plain text, HTML].
 *
 * $mail keys:
 *  - heading:   short title, e.g. "New enquiry"
 *  - intro:     one sentence of context: who submitted what, where
 *  - fields:    label => value; a value may be [text, href] to make it a link; empty values are skipped
 *  - longLabel / long: optional free-text block (message, cover note)
 *  - action:    what to do next, e.g. "Reply to this email to answer Ada directly."
 */
function render(array $mail): array
{
    $fields = array_filter($mail['fields'], fn ($value) => (is_array($value) ? $value[0] : $value) !== '');
    $sent = 'Sent from the form on magnacap.org · ' . submitted_at();

    // Plain text, for mail apps that don't show HTML.
    $text = [$mail['heading'], '', $mail['intro'], ''];
    foreach ($fields as $label => $value) {
        $text[] = "$label: " . (is_array($value) ? $value[0] : $value);
    }
    if (($mail['long'] ?? '') !== '') {
        array_push($text, '', "{$mail['longLabel']}:", $mail['long']);
    }
    array_push($text, '', $mail['action'], '', '—', $sent);

    // HTML: table layout and inline styles, which every mail client supports.
    $font = "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;";
    $rows = '';
    foreach ($fields as $label => $value) {
        $content = is_array($value)
            ? '<a href="' . e($value[1]) . '" style="color:#4e4f6f;text-decoration:underline;">' . e($value[0]) . '</a>'
            : e($value);
        $rows .= '<tr>'
            . '<td valign="top" style="' . $font . 'padding:12px 16px 12px 0;border-top:1px solid #dcdce5;font-size:13px;line-height:20px;color:#5c5d76;white-space:nowrap;width:120px;">' . e($label) . '</td>'
            . '<td valign="top" style="' . $font . 'padding:12px 0;border-top:1px solid #dcdce5;font-size:15px;line-height:20px;color:#1f2031;word-break:break-word;">' . $content . '</td>'
            . '</tr>';
    }
    $long = '';
    if (($mail['long'] ?? '') !== '') {
        $long = '<p style="' . $font . 'margin:28px 0 8px;font-size:13px;line-height:20px;color:#5c5d76;">' . e($mail['longLabel']) . '</p>'
            . '<div style="' . $font . 'background:#f3f3f6;border-radius:6px;padding:16px 18px;font-size:15px;line-height:24px;color:#1f2031;white-space:pre-wrap;word-break:break-word;">' . e($mail['long']) . '</div>';
    }

    $html = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="color-scheme" content="light"><title>' . e($mail['heading']) . '</title></head>'
        . '<body style="margin:0;padding:0;background:#f3f3f6;">'
        // Preview line shown next to the subject in the inbox.
        . '<div style="display:none;max-height:0;overflow:hidden;">' . e($mail['intro']) . '</div>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f6;"><tr><td align="center" style="padding:32px 16px;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #dcdce5;border-radius:12px;">'
        . '<tr><td style="padding:32px 32px 8px;">'
        . '<p style="' . $font . 'margin:0 0 20px;font-size:12px;line-height:16px;letter-spacing:0.08em;text-transform:uppercase;color:#a85a1f;">'
        . '<span style="display:inline-block;width:16px;height:2px;background:#f68f44;vertical-align:middle;margin-right:8px;"></span>MagnaCap website</p>'
        . '<h1 style="' . $font . 'margin:0 0 8px;font-size:22px;line-height:28px;font-weight:600;color:#1f2031;">' . e($mail['heading']) . '</h1>'
        . '<p style="' . $font . 'margin:0 0 24px;font-size:15px;line-height:24px;color:#5c5d76;">' . e($mail['intro']) . '</p>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' . $rows . '</table>'
        . $long
        . '<p style="' . $font . 'margin:28px 0 0;padding:14px 18px;border-left:2px solid #f68f44;font-size:14px;line-height:22px;color:#1f2031;">' . e($mail['action']) . '</p>'
        . '</td></tr>'
        . '<tr><td style="padding:24px 32px 28px;">'
        . '<p style="' . $font . 'margin:0;padding-top:16px;border-top:1px solid #dcdce5;font-size:12px;line-height:18px;color:#5c5d76;">' . e($sent) . '</p>'
        . '</td></tr>'
        . '</table></td></tr></table></body></html>';

    return [implode("\r\n", $text), $html];
}

function encode_header(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

/**
 * Emails RECIPIENT with the visitor as Reply-To. Takes the render() keys plus
 * subject, replyTo and an optional attachment ['name', 'type', 'path'].
 */
function send(array $mail): void
{
    [$text, $html] = render($mail);

    $alt = 'mc_alt_' . bin2hex(random_bytes(8));
    $alternative = implode("\r\n", [
        "--$alt",
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        chunk_split(base64_encode($text)),
        "--$alt",
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        chunk_split(base64_encode($html)),
        "--$alt--",
    ]);

    $headers = [
        'From: ' . encode_header('MagnaCap Website') . ' <' . SENDER . '>',
        "Reply-To: {$mail['replyTo']}",
        'MIME-Version: 1.0',
    ];

    $attachment = $mail['attachment'] ?? null;
    if ($attachment === null) {
        $headers[] = "Content-Type: multipart/alternative; boundary=\"$alt\"";
        $message = $alternative;
    } else {
        $mixed = 'mc_mix_' . bin2hex(random_bytes(8));
        $headers[] = "Content-Type: multipart/mixed; boundary=\"$mixed\"";
        $filename = encode_header($attachment['name']);
        $message = implode("\r\n", [
            "--$mixed",
            "Content-Type: multipart/alternative; boundary=\"$alt\"",
            '',
            $alternative,
            "--$mixed",
            "Content-Type: {$attachment['type']}; name=\"$filename\"",
            'Content-Transfer-Encoding: base64',
            "Content-Disposition: attachment; filename=\"$filename\"",
            '',
            chunk_split(base64_encode(file_get_contents($attachment['path']))),
            "--$mixed--",
        ]);
    }

    // -f sets the envelope sender, which many cPanel hosts require for delivery.
    if (!mail(RECIPIENT, encode_header($mail['subject']), $message, implode("\r\n", $headers), '-f' . SENDER)) {
        respond(500, ['ok' => false, 'error' => 'Message could not be sent']);
    }
    respond(200, ['ok' => true]);
}
