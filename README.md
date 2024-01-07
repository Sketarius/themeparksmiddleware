# Theme Parks API Middleware Service

This project uses themeparks Node.js API
https://github.com/cubehouse/themeparks

This is simply a microservice so that you can use themeparks api from any environment you can make requests from.
Currently the middleware only works with Walt Disney World parks and could change in the future.

Operating Time requests look like:
```
http://localhost:3000/operatinghours?park=epcot&type=info
```

To use:
```
node index.json
```

park [optional]
-- epcot
-- hollywoodstudios
-- animalkingdom
-- magickingdom

type [optional]
-- info
-- ticketed-event
-- operating
