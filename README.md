# Equine Training Tracker Application

Application for tracking the time spent training and rehabilitating equines at Bransby Horses Home.

### Getting started
Make sure you have cloned the back end application and got it running. See [here](https://github.com/BransbyHorses/equine-training-tracker-api) for details.

Once you have that up and running clone this repo by finding the directory you want to use on the command line and typing the following;
`git clone https://github.com/BransbyHorses/equine-training-tracker-api.git`
Then cd into that folder
`cd equine-training-tracker-app`
and then run
`npm run dev`

### Equine upload tool

Use upload-equines.js in devtools to populate the database with a given number of equines, alongside the fields that are required to make an equine (skill, category, programme and yard). 

## Instructions

- Ensure the api and postgres DB are running on the back-end

- Run `npm install` to add the axios library (which simplifies making http requests in node)

- To run the script from the project's root folder, type `node devtools/upload-equines.js <"fields">` into the command line.

    - `fields`: Determines if the script populates the DB with skill, category, programme and yard entries. This has to be passed the first time.

## Usage examples

On first instance, pass "fields" to the script to add the required data. (Note: The API might throw an error if the DB contains duplicate fields - just ignore it).

```
node devtools/upload-equines.js "fields"
``` 

Then run the script without any arguments to upload 100 equines:

```
node devtools/upload-equines.js
``` 

### Testing

We are running two test frameworks. Playwright runs our e2e tests, while unit tests are run using Jest. As you will see in the package.json file, there are two commands which will run tests. 

Executing the follwing command

```
npm run test
```

will run the unit tests, or anything in the `__tests__` folder. 

Running 

```
npm run test:e2e
```

will run the e2e tests. Please note, that the project needs to be running ( `npm run dev` ) before running the e2e tests. 

It is reccomended that you run both these tests before pushing any code to the main branch. If you run into any errors either amend your code or, where appropriate, amend the test. Alternatively, if you are writing a new path/journey within the app, or adding a new component or utility, please add a test in order to maintain a robust codebase. 
  