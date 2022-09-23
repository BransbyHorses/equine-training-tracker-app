
// node devtools/upload-equines.js

async function createDataDependencies(endPoint, nameString) {
    newEntry = {"name": endPoint}
    console.log(process.env);
    fetch(`http://localhost:8080/data/${endPoint}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(newEntry)
    })
    .then(response => {
        response.json(); 
    })
    .then(data => props.router.push(`/${endPoint}`))
    .catch(rejected => {
        console.log(rejected);
    });
};

createDataDependencies("disruption", "bad weather")