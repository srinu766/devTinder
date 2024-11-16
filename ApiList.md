# DevTinder APIs

##  authRouter
- POST /signup
- POST /login
- POST /logout

##  profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

##  connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignore/:userId

             or 

- POST /request/send/status/:userId    - used



- POST /request/review/accepeted/:userId
- POST /request/review/rejected/:userId

                 or
        
- POST /request/review/status/:userId     - used



##  userRouter
- GET /user/connection
- GET /user/requests
- GET /user/feed - Get you the profiles of other users on platform


status : ignore, interested, accepeted, rejected
