# Backend Typescript Application

In this application, a technical test is conducted based on the following repository:
https://github.com/remigioamc/nexu-backend-test

The purpose is to create an application to manage brands and models, including the use of a database.

The project is written in TypeScript, Express, Mongoose, and Jest.

To use the repository, follow these steps:

- First, ensure you have the latest version of Node and NPM installed on your computer.
- Then, run the next command:

```http
npm install
```

- To run the project, execute the next command:

```http
npm run dev
```

- The endpoint to use for the REST API is the following:

```http
http://localhost:8080/v1
```

The available routes are as follows:

```http
GET    /brands
GET    /brands/:id/models
POST   /brands
POST   /brands/:id/models
PUT    /models/:id
GET    /models
```

To run the tests, execute the following command:

```bash
npm run test
```

### Notes:

During the process, I had a lot of fun; I really enjoyed creating this system.

One of the challenges I faced was in configuring TypeScript, as it tends to be a bit complicated, but once you have a clear understanding of how your app should work, it’s possible to configure it properly.

The tests were challenging, but I was able to create one for general system usage.
I aimed to put effort into the MVC (Model-View-Controller) structure, which helps us achieve a well-organized programming system.

I hope you enjoy it! :)
