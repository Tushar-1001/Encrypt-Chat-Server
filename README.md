## Encrypt chat server
### key features
- This project consists of 4 APIs, User registration, User Login, Send messages and Get messages.
- Application have a simple encryption and decryption functionality to store the messages exchanged between the users. 
- Messages cannot be readable directly from the database. It should be only readable from the application when any of the users enter the secret key.
- Make sure the encryption is based on logic not directly using any of the libraries. 
- Used JWT for authentication and authorization, also assigned **iat** and **exp** to the JWT token. Sended token to the header as `x-api-key`.
- Created a branch named `Project/ChatServer` and followed all the naming convention in order to convey my work efficiently.
 ### Models
 - User Model
 ```JavaScript
{
    name : {String,required},
    contacts: { [String],required },
    phone: { String, required, unique },
    secretKey : { String, required },
    timestamps : {createdAt, updatedAt}
}
 ```
- Message Model
```JavaScript
{
    sender: {String, required },
    text: {  String,  required},
    recipient: {  String, required},
    timestamps : {createdAt, updatedAt}
}
```
## User APIs 
### POST /registerUser
- Create a user document from request body. Request body must contain Name, contacts, phone and secretkey.
- HTTP status code *201* for successful registration , *400* for any server error.
- __Response format__
```yaml
{
    "status": true,
    "message": "User created successfully",
    "data": {
        "name": "John Doe",
        "contacts": ["abc","xyz","pqr"],
        "phone": "7141456986",
        "secretkey": "123xyz00@"
        "_id": "6162876abdcb70afeeaf9cf5",
        "createdAt": "2021-10-10T06:25:46.051Z",
        "updatedAt": "2021-10-10T06:25:46.051Z",
        "__v": 0
    }
}
```
- Postman sample
 ![A Postman collection sample](assets/registerUser.jpg)
### POST /login
- Allow an user to login only with their phone and secretKey.
- On a successful OTP sended note send the response message as shown below.
- __Response format__
```yaml
{
    "status": true,
    "message": "User login successful.",
    data : [
        userId : "6162876abdcb70afeeaf9cf5",
        token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjA0MDUwZDliZWQzMTU3YTc3MTk2YTIiLCJpYXQiOjE2NDQ0MzA3NDgsImV4cCI6MTY0NDUxNzE0OH0.cCcWwWEmKTyihzUjeJWcRefFfxz2fgDgw-oJaRimK7w"
    ]
}
```
- Postman sample
 ![A Postman collection sample](assets/login.jpg)

## Messages APIs 
### POST /sendMessage
- A sender can send messgaes to a recipient, who must be present in the sender's contacts.
- __Response format__
```JSON
{
    "status": true,
    "message": "Message sent successfully.",
    "data": {
        "sender": "abc",
        "text": "~9z",
        "recipient": "xyz",
        "_id": "620fa36024b96c9d0aa3d927",
        "createdAt": "2022-02-18T13:47:12.493Z",
        "updatedAt": "2022-02-18T13:47:12.493Z",
        "__v": 0
    }
}
```
- Postman sample
 ![A Postman collection sample](assets/sendMessage.jpg)
### GET/getMessage/:userId
- Recipients can fetch all their messages by using the query filters and putting the sender's name into it.
- __Response format__
```JSON
{
    "status": true,
    "message": "3 messages from nik",
    "data": {
        "from": "nik",
        "msg": [
            "oh bhai",
            "hi !",
            "hello vishal"
        ]
    }
}
```
- Postman sample
 ![A Postman collection sample](assets/getMessage.jpg)


 - MongoDB sample
 ![A MongoDB collection sample](assets/Slide5.jpg)
 ![A MongoDB collection sample](assets/Slide6.jpg)