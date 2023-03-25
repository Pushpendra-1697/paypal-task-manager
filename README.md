# paypal-task-manager

# Tech Stack
# Client side:
React, Redux, Chakra-ui used for styling & modal creation, react-router-dom@6, axios and redux-thunk used for handling backend asyn routes(HTTP requests)
chart.js & react-chartjs-2 library used for creating the Pie-Chart & Line-Chart
jwt-decode used for decode the token which comes from google Oauth by clientID
react-beautiful-dnd library used for drag & drop functionality

these all npm dependencies are available in package.json because It contains all information about project & package-lock.json is JSON formate file which have detailed explaination and these all dependencies

# Server side:
nodeJS (server programming environment), express.js, mongodb, mongoose for connect to mongodb and server, dotenv for access the .env file, cors external middleware handling the cors origin error, jsonwebtoken by jwt.io library used for creating a token for authentication purpose by the help of sign() function, Hashing for encrypting the password used in to make secure password which is not visible to all by the help of some limited salt-rounds and bcrypt library used for get original password so I can compair it by compare function at the login time.

# Some Project Screenshots below & Deploy/live Links: 
Cyclic.sh backend URL: https://dull-ruby-chiton-gown.cyclic.app/

Vercel Frontend URL: https://paypal-plum.vercel.app

![Screenshot (163)](https://user-images.githubusercontent.com/104748364/227704466-33077826-8db6-471e-ada3-3b6ea85fd296.png)

![Screenshot (164)](https://user-images.githubusercontent.com/104748364/227704473-ad559b7a-9a62-4612-bc94-4753a7cde1f8.png)

![Screenshot (165)](https://user-images.githubusercontent.com/104748364/227704486-96f37a42-9950-49e0-a262-3e151ba4f015.png)

![Screenshot (166)](https://user-images.githubusercontent.com/104748364/227704495-f134b202-03d1-49dd-9580-69b82bb01403.png)
