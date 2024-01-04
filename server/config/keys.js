module.exports = {
  app: {
    name: 'Ssp Trends',
    apiURL: `${process.env.BASE_API_URL}`,
    serverURL: process.env.BASE_SERVER_URL,
    clientURL: process.env.BASE_CLIENT_URL,
    domainURL: process.env.BASE_DOMAIN_URL,
    
  },
  port: process.env.PORT || 3000,
  database: {
    url: process.env.MONGO_URI
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: '30d'
  },
  mailchimp: {
    key: process.env.MAILCHIMP_KEY,
    listKey: process.env.MAILCHIMP_LIST_KEY
  },
  ses: {
    sender: process.env.SES_EMAIL_SENDER, 
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME
  }
};
