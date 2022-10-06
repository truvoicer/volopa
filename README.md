# Home Challenge App

## Description
The goals of this task were to:

* Fix currency rate checker
* Implement user authentication 
* Implement token management
* Implement session authentication

## Structure
### Components
1. App.js    
Main app wrapped by a Redux provider to allow state management globally for session, currency and app data
2. RateChecker/index.js    
Where most of the logic for the converter sits
3. WalletBreakdown/.index.js    
Currency list is fetched from the API here and stored in Redux currency state, so it can be accessed globally
4. Auth/index.js   
Handles authentication and session management

## Credentials
``` 
email: admin@email.com
password: password

DB_HOST=volopa-db
DB_PORT=3306
DB_DATABASE=volopadb
DB_USERNAME=volopabuser
DB_PASSWORD=password
```
## How to Run/Build

The frontend and api are all dockerized and reside in the same repo.

### Frontend
#### Production
```
git clone git@github.com:truvoicer/volopa.git

cd ./volopa

//Build containers
docker-compose -p volopa up -d --build

//Initialise database tables
docker exec -it volopa-api php artisan migrate:fresh --force

//Insert sample data to database
docker exec -it volopa-api php artisan db:seed --force

//Can be accessed on this url
http://localhost:3000
```

#### Development
```
git clone git@github.com:truvoicer/volopa.git

cd ./volopa

//Build containers
docker-compose -p volopa up -d --build  

//Initialise database tables
docker exec -it volopa-api php artisan migrate:fresh --force
//Insert sample data to database
docker exec -it volopa-api php artisan db:seed --force

cd ./volopa-app

npm i 
npm start 

//Can be accessed on this url
http://localhost:3000
```

## Testing

### API
```
cd ./volopa/volopa-api

docker exec -it volopa-api php artisan test --testsuite=Unit

```

### Frontend
```
cd ./volopa/volopa-app

npm test

```


## API Commands
Populate database with user, currency and currency rates
```
docker exec -it volopa-api php artisan migrate:fresh
docker exec -it volopa-api php artisan db:seed
```