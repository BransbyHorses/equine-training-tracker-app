const axios = require('axios');


const yard = {"name": "Lunar House"}

const skill =  {"name": "Basic Java"}

const category = {"name": "Software Engineering"}

const programme = {"name": "Digital Development"}

const equine = {
    "name": "Claude",
    "yard": {
        "id": 1,
        "name": "Lunar House"
    },
    "category": {
        "id": 1,
        "name": "Software Engineering"
    },
    "programme": {
        "id": 1,
        "name": "Digital Development"
    },
    "skills": [
        {
            "id": 1,
            "name": "Basic Java"
        }
    ]
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
            return console.error(error);
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
    uploadData("skills", skill);
    uploadData("yards", yard);
    uploadData("categories", category);
    uploadData("programmes", programme);
    
}

function populateData(type)
{
    type == "fields" ? uploadFields() : uploadEquines();
}

populateData(process.argv[2]);