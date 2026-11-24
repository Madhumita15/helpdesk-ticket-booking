const transporter = require("../config/mail.config");

class SendEmail {
  static async sendEmailCredentials(user, password) {
    try {
      const loginUrl = `http://localhost:5173/login`;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Your Account Has Been Created - Login Credentials",
        html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Created</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        ">

          <div style="
            background-color: #4f46e5;
            padding: 25px;
            text-align: center;
          ">
            <h1 style="
              color: #ffffff;
              margin: 0;
            ">
              Welcome to Our Platform
            </h1>
          </div>

          <div style="padding: 35px;">

            <h2>
              Hello ${user.name},
            </h2>

            <p style="
              font-size: 16px;
              line-height: 1.6;
            ">
              Your account has been created successfully by the administrator.
            </p>

            <p>
              Please use the following credentials to log in:
            </p>

            <div style="
              background-color: #f8f9fa;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
            ">

              <p>
                <strong>Email:</strong>
                ${user.email}
              </p>

              <p>
                <strong>Temporary Password:</strong>
                ${password}
              </p>

            </div>

            <div style="
              text-align: center;
              margin: 30px 0;
            ">

              <a
                href="${loginUrl}"
                style="
                  display: inline-block;
                  background-color: #4f46e5;
                  color: #ffffff;
                  padding: 12px 25px;
                  border-radius: 6px;
                  text-decoration: none;
                  font-weight: bold;
                "
              >
                Login to Your Account
              </a>

            </div>

            <p style="
              color: #555555;
              line-height: 1.6;
            ">
              For security purposes, please log in and
              <strong>change your temporary password immediately.</strong>
            </p>

            <p style="
              color: #555555;
              line-height: 1.6;
            ">
              If you did not expect this account to be created,
              please contact the administrator.
            </p>

            <p style="margin-top: 30px;">
              Thank you,<br>
              <strong>Admin Team</strong>
            </p>

          </div>

          <div style="
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #888888;
            font-size: 12px;
          ">
            This is an automated email. Please do not reply.
          </div>

        </div>

      </body>
      </html>
    `,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SendEmail;
