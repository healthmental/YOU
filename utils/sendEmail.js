const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

const sendEmail = async (email, subject, text) => {
  sendSmtpEmail = {
    sender: { email: "healthmental2022@email.com" },
    to: [{ email }],
    subject,
    textContent: text,
  };
  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

module.exports = sendEmail;
