const nodemailer = require("nodemailer");

async function send_register_mail(email, name) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: email,
      subject: "Thank you for registering with DataPlace",
      html: `
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                Welcome to DataPlace
                                            </h1>
                                            <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                                Hi ${name},<br>
                                                Your account has been created on the DataPlace Platform. You can now login to your account and start using the platform.
                                                We are happy to have you on board. Please feel free to contact us if you have any queries. <br />
                                                
                                                <a href="http://localhost:3000/login" style="background:#20e277;text-decoration:none !important; display:inline-block; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                                    Login to Platform
                                                </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                              </table>
                          </td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                                    &copy; <strong>DataPlace</strong>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        `,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email Sent");
      }
    }
  );
}

async function send_otp_mail(email, otp) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP to Reset Password for DataPlace",
      html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">
                        DataPlace
                    </a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>
                    We heard that you lost your DataPlace password. Sorry about that!
                    But don't worry! You can use the following OTP to reset your password
                    OTP is valid for 5 minutes
                </p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
                    ${otp}
                </h2>
                <p style="font-size:0.9em;">Regards,<br />DataPlace Team</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>DataPlace</p>
                    <p>Platform for placements Data</p>
                    <p>India</p>
                </div>
            </div>
        </div>
    `,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email Sent");
      }
    }
  );
}

async function send_password_reset_mail(email) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: email,
      subject: "Successfully Reset Password for DataPlace",
      html: `
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                You have successfuly reset your password for the DataPlace Account
                                            </h1>
                                            <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                If it was not you please reply to this email immediately. So that we can take necessary action.
                                                We are always here to help you. If you have any questions, just reply to this email—we're always happy to help out.    
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                    </table>
                </td>
            </tr>
        </table>`,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email Sent");
      }
    }
  );
}


async function send_block_mail(email, reason) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Account has been blocked for DataPlace",
      html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">
                DataPlace
              </a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>
              We are sorry to inform you that your account has been <strong>blocked</strong> for DataPlace. The block is due to some violation of our terms and conditions.
              The <strong>reason being is mentioned below</strong>, please read it carefully. Still if you have any queries please feel free to <strong>contact us</strong>.
            </p>
            <p style="color:#5b83da;font-weight:600">
              ${reason}
            </p>
            <p style="color:#000000;font-weight:600">
              For the time you are blocked, you will not be able to access analytics, jobs and Upload Section. <br/>
              <span style="color:#25e685;font-weight:550">If you want to get unblocked, please write back to us in query section</span>
            </p>
            <p style="font-size:1.3em;font-weight:700;">Regards,<br />DataPlace Team</p>
            <hr style="border:none;border-top:1px solid #eee" />
          </div>
        </div>
      `,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email Sent");
      }
    });
}


async function send_unblock_mail(email) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Account has been unblocked for DataPlace",
      html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">
                DataPlace
              </a>
            </div>
            <p>
              Hey, we are happy to inform you that your account has been unblocked for DataPlace. You can now access all the features of DataPlace.
            </p>
            <p style="color:#5b83da;font-weight:600">
              But please try to follow our terms and conditions so that you don't get blocked again. 😀
            </p>
            <p style="font-size:1.3em;font-weight:700;">Regards,<br />DataPlace Team</p>
            <hr style="border:none;border-top:1px solid #eee" />
          </div>
        </div>
      `
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email Sent");
      }
    });
}


module.exports = {
  send_register_mail,
  send_otp_mail,
  send_password_reset_mail,
  send_block_mail,
  send_unblock_mail,
};
