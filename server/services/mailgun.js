const AWS = require('aws-sdk');
const template = require('../config/template');
const keys = require('../config/keys');

AWS.config.update({
  region: keys.aws.region,
  accessKeyId: keys.aws.accessKeyId,
  secretAccessKey: keys.aws.secretAccessKey,
});

class AWSSesService {
  constructor() {
    this.ses = new AWS.SES();
  }

  async sendEmail(params) {
    return this.ses.sendEmail(params).promise();
  }
}

const awsSesService = new AWSSesService();

exports.sendEmail = async (email, type, host, data) => {
  try {
    const message = prepareTemplate(type, host, data);

    const params = {
      Source: keys.ses.sender,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: message.subject,
        },
        Body: {
          Text: {
            Data: message.text,
          },
        },
      },
    };

    return await awsSesService.sendEmail(params);
  } catch (error) {
    return error;
  }
};

const prepareTemplate = (type, host, data) => {
  let message;

  switch (type) {
    case 'reset':
      message = template.resetEmail(host, data);
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      break;

    case 'signup':
      message = template.signupEmail(data);
      break;

    case 'merchant-signup':
      message = template.merchantSignup(host, data);
      break;

    case 'merchant-welcome':
      message = template.merchantWelcome(data);
      break;

    case 'newsletter-subscription':
      message = template.newsletterSubscriptionEmail();
      break;

    case 'contact':
      message = template.contactEmail();
      break;

    case 'merchant-application':
      message = template.merchantApplicationEmail();
      break;

    case 'merchant-deactivate-account':
      message = template.merchantDeactivateAccount();
      break;

    case 'order-confirmation':
      message = template.orderConfirmationEmail(data);
      break;

    default:
      message = '';
  }

  return message;
};
