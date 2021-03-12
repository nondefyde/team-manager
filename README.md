# The Team Manager API

## Description
Api web service for The Team Manager

## Local Setup

### Requirements

- Ensure you have Node.JS installed on your system

### Getting Started
- Clone the repository `git clone  git@gitlab.com:codelittinc/node-rest-interview-project-emmanuel-okafor.git`
- Change into the directory `cd node-rest-interview-project-emmanuel-okafor`
- Install all required dependencies with `yarn install`
- create .evn file or duplicate env.local file and replace with the configuration environment below
```
APP_NAME=TeamManager
API_KEY=TeamManagerKey

SERVICE_URL=http://127.0.0.1:8000/v1

DB_URL=mongodb+srv://vway:vway_1@cluster0-xyjj9.mongodb.net/team
DB_TEST_URL=mongodb+srv://vway:vway_1@cluster0-xyjj9.mongodb.net/team-test

```

- Start the application locally `npm run dev`
- Start the application with docker `docker-compose up`. But make sure you have docker installed locally

### Testing
- Run Test with `npm test` command

### API Documentation Link
- [view the api documentation](https://documenter.getpostman.com/view/171959/TVKHUFWt?version=latest)
- Postman collection link : https://www.getpostman.com/collections/593c0e52c940b1ac2605
