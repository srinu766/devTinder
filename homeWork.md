- Create a repository   ✅
- Initialize the repository ✅
- node_modules, package.json, package-lock.json ✅
- Install express   ✅
- Create a server       ✅
- Listen post 7777  ✅
- Write request handlers for /test, /hello   ✅
- Install nodemon and update scripts inside package.json     ✅
- what are dependencies  ✅
- what is the use of -g while install  ✅
- Difference between caret vs tilde  ✅



- Initialize git
- .gitignore
- Create a Repo on github
- Push all code to remote origin
- Play with routes and route extensions ex. /hello, /, hello/2, /xyz
- Order of the routes matter a lot

- Install Postman app and make a workspace/collection > test API call 
- Write to logic  handle GET, POST, PATCH, PUT, DELETE and text then in postman
- Explore routing and  use of  ?, +, * ,() in the routes
- Use of regex  in routes  /a/, /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes 

- Multiple  Route Handlers - Play with the  code
- next()
- next function and error along  with res.send()
- app()

- what is middleware 
- how express JS basically handles request behind the scene
- diff between app.use() vs ap.all()     
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for user 
- Error handling using a  app.use("/", (err, req, res,next)


- Create a free cluster mongoDB (mongo atlas)
- Install mongoose library 
- Connect your application to the Database  "Connection-URL"/devTinder 
- Call the connectDB function aand connect the  databse before starting application on 7777 port
- create userSchema and user model
- Create POST /signup api for add database
- Push some documets using API from post man
- Error handling using try / catch
- What is JSON vs JavaScript Object
- Add the express.json() middle ware to our app
- Make Your signup API dynamic to receive data from  the end user
- User.findOne with duplicate email ids, which object returned
- API - Get user by email
- API - Feed API - Get/feed - get all the users from the database
- API - get apii by user 
- Difference between PATCH vs PUT
- API - Update a user
- Explore the Mongoose Docs for Model API 
- What are options in model.findOneandUpdate method, explore more about it
- API - Update the user WIth email id


- Explore shematypes options from  the documents
- add required , unique, lowercase, min, milength, trim 
- add default
- Create a custom validate function for gender
- Improve the DB schema PUT all appropiate validations on each feild i schema
- Add timestamps to the userSchema
- Add API level validations on patch request & signup post api
- Data sanitizing add API validation for each feild 
- Install validator
- Explore validator library and use validator  functions for password, email, photoURL
- NEVER TRUST req.body
- NEVER TRUST req.body
- valiadte data in signup api and create a helper function in utils
- Install bcrypt package
- Create password hash using bcrypt.hash and save the password in DB
- create login API
- Compare passwords and throw errors if email,password is not valid
-
- install cookie-parser
- just send dummy cookie for user
- create GET /profile API and check if you the cookie back
- In login API, create e JWT token
-
- install jsonwebtoken
- In login API, after email, password validation, create a JWT token and send it to user in side cookie
- read the cookie inside your profile API and find the logged in user
- userAuth middleware
- Add the userAuth middleware in profile API, sendConnectionRequest API
- Set the expriry of JWT token and cookies to 7 days
- Create userShema methods to getJWT()
- Create userShema methods to getJWT()
- 


- Explore tinder APIs  
- Create a list all API you think of in Dev Tinder on platform
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth,profile, request routers
- create authRoter, profileRouter, requestRouter 
- import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password => forgot password
- Make you validate all data in every post patch APIs

- Create Connection Request Schema 
- Send connection request API
- Proper validations of data
- Think about all corner cases of data
- $or query and $and query in mongoDB read about this
- Schema.pre("save") function
- Read more about indexes in MongoDB
- Why do we need index 
- what is advantage and disadvatages creating indexes
- Read the article about compond indexes
- ALWAYS THINK ABOUT CORNER CASES

- write proper validation for this POST : /request/review/:status/:requestedId
- thought process - POST vs GET
- Read about ref and populate 
- Create GET api -  /user/connection/received

- Logic for API feed
- Explore the $nin, $and, $ne and othher quesry parametors
- Pagination

