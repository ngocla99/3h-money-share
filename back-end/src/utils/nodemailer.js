const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: '60991351bc30c6',
    pass: 'b218271ee32df1'
  }
})

const sendNotiSignupSuccess = (email) => {
  transporter.sendMail({
    from: 'admin@nemo.com',
    to: email,
    subject: 'Signup succeeded ✔',
    html: '<h1>You successfully signed up!</h1>'
  })
}

const sendResetToken = (email, token) => {
  transporter.sendMail({
    from: 'admin@nemo.com',
    to: email,
    subject: 'Password reset 🔁',
    html: `
        <p>Your requeseted a password reset</p>
        <p>Click this <a href="${process.env.APP_URL}/reset/${token}">link</a> to set a new password</p>
    `
  })
}

const sendGroupInvation = ({ user, group, to, token }) => {
  const acceptInvitationAPI = `${process.env.APP_URL}/groups/accept-invitation?token=${token}`
  transporter.sendMail({
    from: 'admin@nemo.com',
    to,
    subject: `Invitation to join ${group.name}`,
    html: `
        <div style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff">
        <span
        style="
            color: transparent;
            display: none;
            height: 0px;
            max-height: 0px;
            max-width: 0px;
            opacity: 0;
            overflow: hidden;
            width: 0px;
        "
        >Your invitation to money-share</span
        >
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%">
        <tbody>
            <tr>
            <td align="center" valign="top" style="vertical-align: top; line-height: 1; padding: 48px 32px">
                <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="600"
                class="m_-737320860897364645container"
                style="width: 600px"
                >
                <tbody>
                    <tr>
                    <td align="left" valign="top" style="vertical-align: top; line-height: 1; padding: 16px 32px">
                        <p
                        style="
                            padding: 0px;
                            margin: 0px;
                            font-family: Helvetica, Arial, sans-serif;
                            color: #000000;
                            font-size: 24px;
                            line-height: 36px;
                        "
                        >
                        money-share
                        </p>
                    </td>
                    </tr>
                </tbody>
                </table>
                <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="600"
                class="m_-737320860897364645container"
                style="width: 600px; border-collapse: separate"
                >
                <tbody>
                    <tr>
                    <td
                        align="left"
                        valign="top"
                        bgcolor="#fff"
                        style="vertical-align: top; line-height: 1; background-color: #ffffff; border-radius: 0px"
                    >
                        <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="100%"
                        style="width: 100%; border-collapse: separate"
                        >
                        <tbody>
                            <tr>
                            <td
                                align="left"
                                valign="top"
                                bgcolor="#ffffff"
                                style="
                                vertical-align: top;
                                line-height: 1;
                                padding: 32px 32px 48px;
                                background-color: #ffffff;
                                border-radius: 0px;
                                "
                            >
                                <h1
                                align="left"
                                style="
                                    padding: 0px;
                                    margin: 0px;
                                    font-style: normal;
                                    font-family: Helvetica, Arial, sans-serif;
                                    font-size: 32px;
                                    line-height: 39px;
                                    color: #000000;
                                    font-weight: bold;
                                "
                                >
                                Your invitation
                                </h1>
                                <p
                                align="left"
                                style="
                                    padding: 0px;
                                    margin: 16px 0px 0px;
                                    font-family: Helvetica, Arial, sans-serif;
                                    color: #000000;
                                    font-size: 14px;
                                    line-height: 21px;
                                "
                                >
                                ${user.name} has invited you to join the ${group.name} organization on money-share.
                                </p>
                                <table
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                width="auto"
                                style="
                                    width: auto;
                                    font-size: 14px;
                                    font-weight: normal;
                                    background-color: #6c47ff;
                                    color: #ffffff;
                                    border-radius: 8px;
                                    border-collapse: separate;
                                    margin: 32px 0px 0px;
                                "
                                >
                                <tbody>
                                    <tr>
                                    <td
                                        align="center"
                                        valign="top"
                                        bgcolor="#6c47ff"
                                        style="
                                        vertical-align: top;
                                        line-height: 1;
                                        text-align: center;
                                        font-family: Helvetica, Arial, sans-serif;
                                        border-radius: 8px;
                                        "
                                    >
                                        <a
                                        href="${acceptInvitationAPI}"
                                        style="
                                            display: inline-block;
                                            box-sizing: border-box;
                                            text-decoration: none;
                                            margin: 0px;
                                            font-family: Helvetica, Arial, sans-serif;
                                            font-size: 14px;
                                            font-weight: normal;
                                            background-color: #6c47ff;
                                            color: #ffffff;
                                            border-radius: 8px;
                                            border: 1px solid #6c47ff;
                                            padding: 15px 24px;
                                        "
                                        target="_blank"
                                        data-saferedirecturl="https://www.google.com/url?q=${acceptInvitationAPI}"
                                        >
                                        Accept invitation
                                        </a>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                                <p
                                style="
                                    padding: 0px;
                                    margin: 16px 0px 0px;
                                    font-family: Helvetica, Arial, sans-serif;
                                    color: #000000;
                                    font-size: 14px;
                                    line-height: 21px;
                                "
                                >
                                If you're having trouble with the above button,
                                <a
                                    href="${acceptInvitationAPI}"
                                    style="
                                    text-decoration: underline;
                                    color: #6c47ff;
                                    font-size: 14px;
                                    font-family: Helvetica, Arial, sans-serif;
                                    font-weight: normal;
                                    line-height: 1.5;
                                    "
                                    target="_blank"
                                    data-saferedirecturl="https://www.google.com/url?q=${acceptInvitationAPI}"
                                    >click here</a
                                >.
                                </p>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
        </tbody>
        </table>
        <div class="yj6qo"></div>
        <div class="adL"></div>
    </div>  
    `
  })
}

module.exports = { transporter, sendNotiSignupSuccess, sendResetToken, sendGroupInvation }
