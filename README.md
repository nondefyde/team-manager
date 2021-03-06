## Instructions

The goal of this exercise is to create an API Client + Server using Node using the REST arquitecture.

### The Task

In this task, we are building the full stack of an application that helps us managing our team using REST.

#### Features and Requirements
- A member has a name and a type the late one can be an employee or a contractor - if it's a contractor, the duration of the contract needs to be saved, and if it's an employee we need to store their role, for instance: Software Engineer, Project Manager and so on.
- A member can be tagged, for instance: C#, Angular, General Frontend, Seasoned Leader and so on. (Tags will likely be used as filters later, so keep that in mind)

We need to offer a REST CRUD for all the information above.

#### Notes:

1. You can use any Node framework
2. Make sure to provide a tutorial on how to run your application
3. Feel free to use any database

#### Bonus points:

1. If you add automated tests
2. If you provide a Docker image

## F.A.Q.

### How do you evaluate the exercise?
Our evaluation is based on many aspects, such as general approach adopted, quality of code, use of best practices, capabilities to keep the code simple and maintainable.

### How can I deliver the exercise?
To deliver the exercise, you should clone this repository and work on a new branch. When you'll consider it completed, just push the branch and open a Pull Request.


# The Team Manager API Implementation

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

### API Documentation AND Link
- [view the api documentation](https://documenter.getpostman.com/view/171959/Tz5p7ySE)
- Postman collection link : https://www.getpostman.com/collections/34205c70983c75d83321
- Postman environment variables BASE_URL `http://localhost:8000/v1` and API_KEY `TeamManagerKey`

### Endpoints
**NOTE**
population querystring is a reserved api keyword that helps 
return an object instead of the identifier by performing an implicit lookup or join.
The exhaustive population schema structure can be found here [here](https://mongoosejs.com/docs/populate.html)`

### Create Contractor
```
curl --location --request POST '{{BASE_URL}}/members?population=[%22profile%22]' \
--header 'x-api-key: {{API_KEY}}' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "contractor@test.com",
	"firstName": "Emeka",
	"lastName": "Tolu",
	"profileType": "Contractor",
	"profile": {
		"startDate": "2021-04-04",
		"endDate": "2021-06-04"
	}
}'

```


### Create Employer 
```
curl --location --request POST '{{BASE_URL}}/members?population=[%22profile%22]' \
--header 'x-api-key: {{API_KEY}}' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "employee1@test.com",
	"firstName": "Emmanuel",
	"lastName": "Okafor",
	"profileType": "Employee",
	"profile": {
		"role": "Software Engineer"
	}
}'

```

### Find Members

```
curl --location --request GET '{{BASE_URL}}/members?population=[%22profile%22]' \
--header 'x-api-key: {{API_KEY}}' \
```


#### Get a Member

```
curl --location --request GET '{{BASE_URL}}/members/{_id}?population=[%22profile%22]' \
--header 'x-api-key: {{API_KEY}}' \

```


#### Update a Members 
Note: `To update Contractor or Employee profile`
the profile attribute within the payload will be responsible for that`

```
curl --location --request GET '{{BASE_URL}}/members/{_id}?population=[%22profile%22]' \
--header 'x-api-key: {{API_KEY}}' \

```

### Delete a Members

```
curl --location --request DELETE '{{BASE_URL}}/members/{_id}' \
--header 'x-api-key: {{API_KEY}}' \
```

### Seed data
querystring
- size: an integer to indicate the number of data to seed
- purge: a boolean field determines if the database will be purged before seeding
```K
curl --location --request GET '{{BASE_URL}}/members/seed?size=4&purge=true' \
--header 'x-api-key: {{API_KEY}}' \
--header 'Content-Type: application/json' \
```
