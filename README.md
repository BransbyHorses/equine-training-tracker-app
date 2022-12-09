# Equine Training Tracker Application

Next.js interface for Bransby Equine Training Tracker Application.

### Prerequisites

  * Node
  * Docker

### Getting started

  1. Git clone the repo.
  2. Git clone the Springboot API and run with Docker. See repository [README.md](https://github.com/BransbyHorses/equine-training-tracker-api).
  3. Set up an .env file as below to enable authentication with Azure AD using [NextAuth.js](https://next-auth.js.org/).
  
```bash
# env variables required for NextAuth authentication. Values taken from auth token provider.
NEXT_PUBLIC_URL=
NEXT_PUBLIC_COGNITO_CLIENT_ID=
NEXT_PUBLIC_COGNITO_CLIENT_SECRET=
NEXT_PUBLIC_COGNITO_DOMAIN=
NEXT_PUBLIC_COGNITO_ISSUER=

NEXTAUTH_URL= # canonical url of site
NEXTAUTH_SECRET= # generate random key - openssl rand -base64 32
```
### Development

<details>
<summary>
About the Equine upload tool
</summary>

Use upload-equines.js in ./devtools to populate the database with test data (requires SpringBoot api and Postgres to be running).

#### Instructions

- Ensure the api and postgres DB are running on the back-end

- Run `npm install` to add the axios library (which simplifies making http requests in node)

- To run the script from the project's root folder, type `node devtools/upload-equines.js <"fields">` into the command line.

  - `fields`: Determines if the script populates the DB with skill, category, programme and yard entries. This has to be passed the first time.


On first instance, pass "fields" to the script to add the required data. (Note: The API might throw an error if the DB contains duplicate fields - just ignore it).

```
node devtools/upload-equines.js "fields"
``` 

Then run the script without any arguments to upload 100 equines:

```
node devtools/upload-equines.js
``` 

</details>