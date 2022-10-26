const axios = require('axios');


const yard = {"name": "Lunar House"}


const learnerType = {"name": "Self-led"}

const trainingProgramme = {"name": "Digital Development"}

const equineStatus = {"name": "Okay"}

const equine = {
    "name": "Claude",
    "yard": {
        "id": 1,
        "name": "Lunar House"
    },
    "learnerType": {
        "id": 1,
        "name": "Self-led"
    },
    "trainingProgrammes": [
        {
        "id": 1,
        "name": "Digital Development"
    }
    ],
    "equineStatus":  {
            "id": 1,
            "name": "Okay"
        }
}





// node devtools/upload-equines.js

function uploadData(endPoint, jsonModel) {
   return axios
         .post(`http://localhost:8080/data/${endPoint}`, jsonModel)
         .then(res => {
           console.log(`${endPoint} upload successful: ${res.status}`);
            //console.log(res);
        })
        .catch(error => {
            return console.log(error.status + " " + endPoint);
        });
};

function uploadEquines()
{
    for (i = 0; i < 100; i++)
    {
     uploadData("equines", equine);
    }
}

function uploadFields() 
{
    uploadData("yards", yard);
    uploadData("learner-types", learnerType);
    uploadData("training-programmes", trainingProgramme);
    uploadData("equine-statuses", equineStatus);
    
}

function populateData(type)
{
    type == "fields" ? uploadFields() : uploadEquines();
}

populateData(process.argv[2]);