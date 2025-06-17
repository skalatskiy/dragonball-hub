# Dragonball Hub

This is a technical challenge proposed by Hubtype, build by Alexander Skalatskiy.


## How to run it

Mainly you could just run the dev command to see how it is working:

```
npn run dev
```

Which usually serves the app on http://localhost:5173

remember to run `npm install` command before to make it happens:

```
npn install
```

## Docker

However, I also prepared a docker compose to make it even easier (as long as you know how to use docker).
Just assure that you have a docker engine up and running and execute this command:

```
docker-compose up --build
```

The app should be present on http://localhost:3000


## About files structure

I really like to adapt the files structure depending on the scale of a project, where readability, maintenance and ease to find for what you are looking for should be mandatory. That means the fewer layers of depth, the better.


Usually, on large enterprise projects where there are many features or complex business logic to manage, I split the folders based on those features or business entities. And inside each one, his own services, schemas, components, utils or whatever folder separation is required.

For smaller ones like this one, where there is only one main entity which is Character, I leave it all at source level split by types: components, pages, schemas, services, etc.



