# Notepad api

### installing and running:
a simple RESTFUL API with node, express, mongoDB, JWT and Bcrypt

first check if you have `node > 8` and `MongoDB` installed and `MongoDB` Running

then install the dependencies with:
`yarn` or `npm install`

and start the server with one of the commands:
`yarn start` or `npm start`

the server will listen in `localhost:3000`

### auth endpoints:

##### register user:
> POST  &nbsp;&nbsp; /auth/register

and send body with the Json in this format:

```
{
    email: String,
    password: String
}
```

##### Return the JWT Token:
> POST  /auth/authenticate

and send the body with the json in this format:

```
{
    email: String,
    password: String
}
```

### Notes endpoints:
#### only with token

need a header with the token from auth route in this format:

```
    Authorization: Bearer <TokenHash>
```

##### return all notes from user:
> GET &nbsp;&nbsp; /notes

##### add note
> POST &nbsp;&nbsp; /notes

and send the body with the json in this format:

```
{
    title: String, (required)
    text: String
}
```

##### update note:
> PUT &nbsp;&nbsp; /notes

and send the body with the json in this format:

```
{
    id: String, (required)
    title: String, (required)
    text: String
}
```

##### delete Note
> DELETE &nbsp;&nbsp; /notes

and send the body with the json in this format:

```
{
    id: String (required)
}
```
