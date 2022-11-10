const axios = require('axios');


const yards = [
    {"name": "Animal Reception Centre"},
    {"name": "Barlings"},
    {"name": "Main Yard"},
    {"name": "Peter Hunt"},
    {"name": "Riding Barn"},
    {"name": "Visitor Centre"},
    {"name": "Wakelands"}
]


const learnerTypes = [
    {"name": "Handled youngster <4yrs"},
    {"name": "Unhandled youngster <4yrs"},
    {"name": "Unhandeled/semi-feral <4yrs"},
    {"name": "Unhandleable/extremely fearful/known trauma"},
    {"name": "Handled on the farm"},
    {"name": "Previous skills but new to farm"},
    {"name": "Ridden potential"},
    {"name": "Ridden tickover"},
    {"name": "Companion tickover"},
    {"name": "Sanctuary tickover"},
    {"name": "Sanctuary frequent handling"}
]

const trainingCategories = [
    {"name": "Revision", "description": "Description of revision"},
    {"name": "Rehab", "description": "Description of rehab"},
    {"name": "Specific phobia rehab", "description": "Description of specific phobia rehab"},
    {"name": "Maintenance", "description": "Description of maintenance"},
    {"name": "Ridden preliminary", "description": "Description of ridden preliminary"},
    {"name": "Ridden backing", "description": "Description of ridden backing"},
    {"name": "Ridden further ed", "description": "Description of ridden further ed"}
]


const equineStatuses = [
    {"name": "In training"},
    {"name": "Presented to rehoming scheme"},
    {"name": "Categorised as sanctuary"},
    {"name": "Disruptions"},
]

const equine = {
    "id": 0,
    "name": "Testquine",
    "yard": {
        "id": 2,
        "name": "Barlings"
    },
    "equineStatus": null,
    "trainingProgrammes": [],
    "learnerType": {
        "id": 8,
        "name": "Handled youngster <4yrs"
    },
    "healthAndSafetyFlags": [],
    "disruptions": []
}





function uploadData(endPoint, jsonModels) {
 for (let i = 0; i < jsonModels.length; i++ ) 
 {
    makePostRequest(endPoint, jsonModels[i]);
 }
};

function makePostRequest(endPoint, jsonModel) {
    return axios
    .post(`http://localhost:8080/data/${endPoint}`, jsonModel)
    .then(res => {
      console.log(`${endPoint} upload successful: ${res.status}`);
       //console.log(res);
   })
   .catch(error => {
       return console.log(error.status + " " + endPoint);
   });
}

function uploadEquines()
{
    for (i = 0; i < 100; i++)
    {
     makePostRequest("equines", equine);
    }
}

function uploadFields() 
{
    uploadData("yards", yards);
    uploadData("learner-types", learnerTypes);
    uploadData("equine-statuses", equineStatuses);
    uploadData("training-categories", trainingCategories);
    
}

function populateData(type)
{
    type == "fields" ? uploadFields() : uploadEquines();
}

populateData(process.argv[2]);