export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - Online Bookstore</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f7f7f7;
      color: #4A4A4A;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #f7f7f7 ;
      padding: 30px;
      text-align: center;
      color: #3b82f6;
    }
    .email-header img {
      max-width: 100%;
      height: auto;
      margin-bottom: 20px;
      border-radius: 8px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: bold;
    }
    .email-body {
      padding: 30px;
    }
    .email-body p {
      margin: 0 0 20px;
      font-size: 16px;
      color: #4A4A4A;
    }
    .verification-code {
      display: block;
      background-color: #f7f7f7 ;
      color: #3b82f6;
      padding: 15px 30px;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 4px;
      border-radius: 5px;
      margin: 20px 0;
      text-align: center;
    }
    .email-footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #9B9B9B;
      background-color: #f7f7f7;
    }
    .email-footer a {
      color: #3b82f6;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <img src="https://res.cloudinary.com/dph5haogn/image/upload/v1727519008/Best-Website-Welcome-Message-Examples_qxefau.png" alt="Online Bookstore Image">
      <h1>Verify Your Email</h1>
    </div>
    <div class="email-body">
      <p>Dear Book Lover,</p>
      <p>Thank you for joining our online bookstore! Please use the verification code below to verify your email address:</p>
      <div class="verification-code">
        {verificationCode}
      </div>
      <p>This code will expire in 15 minutes. Please enter it on the verification page to complete your registration.</p>
      <p>If you didn’t sign up for an account, feel free to ignore this email.</p>
      <p>Happy Reading,<br>The Online Bookstore Team</p>
    </div>
    <div class="email-footer">
      <p>This is an automated message. If you need help, please <a href="#">contact us</a>.</p>
      <p>&copy; 2024 Online Bookstore. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful - Online Bookstore</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f7f7f7;
      color: #4A4A4A;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #f7f7f7;
      padding: 30px;
      text-align: center;
      color: #3b82f6;
    }
    .email-header img {
      max-width: 100%;
      height: auto;
      margin-bottom: 20px;
      border-radius: 8px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: bold;
    }
    .email-body {
      padding: 30px;
    }
    .email-body p {
      margin: 0 0 20px;
      font-size: 16px;
      color: #4A4A4A;
    }
    .email-footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #9B9B9B;
      background-color: #f7f7f7;
    }
    .email-footer a {
      color: #3b82f6;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <img src="https://res.cloudinary.com/dph5haogn/image/upload/v1727519008/Best-Website-Welcome-Message-Examples_qxefau.png" alt="Online Bookstore Image">
      <h1>Password Reset Successful</h1>
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>Your password has been successfully reset. You can now log in to your account using your new password. If this was not you, please contact our support team immediately.</p>
      <p>If you have any concerns or questions, feel free to reach out to our support team for assistance.</p>
      <p>Best regards,<br>The Online Bookstore Team</p>
    </div>
    <div class="email-footer">
      <p>If you did not reset your password, please <a href="#">contact support</a> immediately.</p>
      <p>&copy; 2024 Online Bookstore. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Online Bookstore</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f7f7f7;
      color: #4A4A4A;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #f7f7f7;
      padding: 30px;
      text-align: center;
      color: #3b82f6;
    }
    .email-header img {
      max-width: 100%;
      height: auto;
      margin-bottom: 20px;
      border-radius: 8px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: bold;
    }
    .email-body {
      padding: 30px;
    }
    .email-body p {
      margin: 0 0 20px;
      font-size: 16px;
      color: #4A4A4A;
    }
    .reset-button {
      display: inline-block;
      background-color: #3b82f6;
      color: #f7f7f7;
      padding: 12px 25px;
      font-size: 16px;
      font-weight: bold;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
      text-align: center;
    }
    .email-footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #9B9B9B;
      background-color: #f7f7f7;
    }
    .email-footer a {
      color: #3b82f6;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <img src="https://res.cloudinary.com/dph5haogn/image/upload/v1727519008/Best-Website-Welcome-Message-Examples_qxefau.png" alt="Online Bookstore Image">
      <h1>Password Reset</h1>
    </div>
    <div class="email-body">
      <p>Dear Reader,</p>
      <p>We received a request to reset the password for your online bookstore account. If you did not make this request, simply ignore this email.</p>
      <p>To reset your password, click the button below:</p>
      <div style="text-align: center;">
        <a href="{resetURL}" class="reset-button">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>Best regards,<br>The Online Bookstore Team</p>
    </div>
    <div class="email-footer">
      <p>This is an automated message. If you need assistance, please <a href="#">contact us</a>.</p>
      <p>&copy; 2024 Online Bookstore. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

`;
