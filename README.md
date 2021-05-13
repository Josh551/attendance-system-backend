# attendance-system-backend

## Getting Started

To get the Node server running locally:

* Install [Dependencies](https://nodejs.org/en/)
* Clone this repo
* `npm install` to install all required packages.
* Install MongoDB Community Edition [instructions](https://docs.mongodb.com/manual/installation/#tutorials) or type `mongod` to start the MongoDB process.
* `npm run prog` runs the app in the development mode. Listens on http://localhost:5000. Server can be restarted by pressing 'rs' in command line.

## Environment Variables

* NODE_ENV- Determines the nature of the build.
* PORT- Determines which port it running on.
* MONGO_URI- Determines mongo url used.
* JWT_SECRET- Determines JSON Object used to verify JWT of client.
* EMAIL- Determines email of the adminstrator.
* PASSWORD- Determines password of the adminstrator.
* CLIENT_ID- Determines public identifier used for OAuth verification in third-party apps.
* CLIENT_SECRET- Determines the secret key used for authorization.
* ACCESS_TOKEN - Determines the token that grants access to the Google API.
* REQUEST_TOKEN - Determines the token used for connecting OAuth to the thrid-party app.
* OTP_KEY - Determines secret key used to verrify authenticity of Client.

