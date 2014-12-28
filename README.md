# Job Finder (Demo)
-------------------

This is a very simple getting started project that I created while learning many new web technologies.
Special Thanks to *pluralsight* for the awesome tutorial *Building Web Apps with Node.js*

## Technologies Involved

This tutorial combines several emerging technologies -

- Node.JS
- Express
- AngularJS
- Promise API using bluebird
- MongoDB (Mongoose)
- BDD Testing using mocha, chai, karma, phantomjs, supertest
- CI with Codeship
- SCM with Git (Github)
- Automatic deployment to Heroku using Codeship (https://morning-oasis-5150.herokuapp.com/)

## How to run
Although running JobFinder demo application should not be tough, you need to make some changes as described below:

You will need to modify the ```private/server.js``` and update your database credentials.
Also, you will need to export the following environment variables -

**IP**                  -   This is the IP where the application will start listening on
**PORT**                -   This is the PORT where the application will bind to
**PRIVATE_PASSWORD**    -   This is the secret key that you will need to decrypt the encrypted database credentials


Now run the application using the following steps -

- Clone the git repo
- Run the tests using ``` npm test ```
- Run the application using ``` npm start ```

## Contact Me
You can find me @me_sohailalam (Twitter) or https://linkedin.com/in/alamsohail (LinkedIn)