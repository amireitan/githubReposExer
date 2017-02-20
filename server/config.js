
const CLIENT_ID = '7902cbd772f3b7a31ed1';
const CLIENT_SECRET = 'e3aec5116b89c6d92ef4d455960032e0fb1dfb21';

//Configuration for app authentication
ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      clientId: CLIENT_ID,
      secret: CLIENT_SECRET,
      loginStyle: "popup"
    }
  }
);
