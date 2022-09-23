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

On first instance, pass "fields" to the script to add the required data:

```
node devtools/upload-equines.js "fields"
``` 

Then run the script without any arguments to upload 100 equines:

```
node devtools/upload-equines.js
``` 


  