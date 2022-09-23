const axios = require('axios');

const endPoints = [
    "disruptions",
    "learner-types",
    "programmes",
]

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

async function uploadData(endPoint, jsonModel) {
   return axios
         .post(`http://localhost:8080/data/${endPoint}`, jsonModel)
         .then(res => {
           return`statusCode: ${res.status}`;
            //console.log(res);
        })
        .catch(error => {
            return console.error(error);
        });
};

async function uploadEquines() 
{
    console.log(await uploadData("skills", skill));
    console.log(await uploadData("yards", yard));
    console.log(await uploadData("categories", category);
    uploadData("programmes", programme);
    for (i = 0; i < 100; i++)
    {
        console.log("i");
    }
}

uploadEquines();