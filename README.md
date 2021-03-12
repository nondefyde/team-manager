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

### API Documentation AND Link
- [view the api documentation](https://documenter.getpostman.com/view/171959/Tz5p7ySE)
- Postman collection link : https://www.getpostman.com/collections/f30dfd764b6d1a0df351
- Postman environment variables BASE_URL `http://localhost:8000/v1` and API_KEY `TeamManagerKey`

###Endpoints
#####Note: population querystring is a reserved api keyword that helps 
return an object instead of the identifier by performing an implicit lookup or join.
The exhaustive population schema structure can be found here [here](https://mongoosejs.com/docs/populate.html)`

Create Contractor
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


Create Employer 
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

Find Members

```
curl --location --request GET '{{BASE_URL}}/members?population=[%22profile%22]' \
--header 'x-api-key: {{API_KEY}}' \
```


Get a Members

```
curl --location --request GET '{{BASE_URL}}/members/{_id}?population=[%22profile%22]' \
--header 'x-api-key: {{API_KEY}}' \

```


Update a Members 
######Note: To update Contractor or Employee profile, 
the profile attribute within the payload will be responsible for that`

```
curl --location --request GET '{{BASE_URL}}/members/{_id}?population=[%22profile%22]' \
--header 'x-api-key: {{API_KEY}}' \

```

Delete a Members

```
curl --location --request DELETE '{{BASE_URL}}/members/{_id}' \
--header 'x-api-key: {{API_KEY}}' \
```
