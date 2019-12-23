# HeiKa Week 1
## Homework 1 : GET/PUT/POST/DELETE request handler
### Author: Allen Huang

#### **DESCRIPTION**: using Express.js framework, to handle simple GET/PUT/POST/DELETE request from url
    
    GET: `/:filename` will Get the content of the file, if the file does not existed in the database, then return error code 404

    POST: `/:filename` will Create the file with the content, if the file existed, then return error code 500, bad request
    
    PUT: `/:filename` will Find the file in the database, and add the content to the end of the file, if the file does not existed, then return code 404
    
    DELETE: `/:filename` will find the file in the database and delete it, if can not located the file, then return error 404

#### How to use:

Start the sever:
```
node express.js
```

In the postman APP or in the browser (Suggesting: Chrome) :

enter url :
```
http://localhost:8080/filename
```
the file name can be any