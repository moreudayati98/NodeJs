
<h1>Dependency injection and refactoring</h1>

We could have written same app in single file where we create http server and endpoints, listen on port, create db connection. This would have worked well, however it would be difficult to unit test so refactoring and dependency injection is used.

Refactoring code for 
1. creating http server endpoints in ./app.js
2. Creating database connection in ./database.js
3. Listening on server port in ./server.js

Dependency injection
In server.js we're injecting database into app by passing it as parameter to app module. The server.js file expects an app object on import and app file expects db object as parameter. Hence app.js is modified as function which accepts db object and returns app object.
