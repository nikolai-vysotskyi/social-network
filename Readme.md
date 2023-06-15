# Project start instructions:

First of all, make sure you have Docker and Docker Compose installed on your computer.

Here are the deployment instructions for the project:

**Preparation**

1. Open a terminal and navigate to the root directory of your project (where the `client` and `server` directories are located).
2. If you haven't already copied `.env` from `.env.example` in the `./client/` and `./server/` directories, do it now:

```bash
cp ./client/.env.example ./client/.env
cp ./server/.env.example ./server/.env
```
3. Assign any string as the value for the JWT_SECRET variable in the `./server/.env` file. This will be used as the token salt (you can use random numbers and Latin letters).

**Starting the server**

1. Navigate to the `./server/` directory:

```bash
cd ./server/
```

2. Run Docker Compose:

```bash
docker-compose up --build
```

This command will create and start containers for your server application and MariaDB database. It will also build your application using the specified `Dockerfile`.

**Starting the client**

1. Open a new terminal or terminal tab and navigate to the `./client/` directory:

```bash
cd ../client/
```

2. Run Docker Compose:

```bash
docker-compose up --build
```

This command will create and start a container for your client application. It will also build your application using the specified `Dockerfile`.

**Conclusion**

Now you should have two sets of containers running - one for the client application running on port `3002`, and another for the server application with the MariaDB database running on port `3005`.

You should be able to open the client application in a browser by navigating to `http://localhost:3002`, and the server application at `http://localhost:3005`.

Note: For convenience, you can run the Docker Compose commands with the `-d` flag to start the containers in detached mode:

```bash
docker-compose up -d --build
```