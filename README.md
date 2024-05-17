# Pet Management API

This project is a CRUD API for managing pet owners and their pets. It allows you to perform various operations such as creating, reading, updating, and deleting owners and their pets.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- SQLite

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/0xhajar/apptweak-pets-api.git

2. **Install the dependencies**

   npm install

3. **Set up the database**

   The application automatically checks if the database file exists. If it does not, it creates the database and runs the necessary SQL script to set up the schema.

4. **Create the .env file**

   Rename the .envexample file to .env and set the path to your db file.

5. **Running the API**

   Start the server with the following command:
   npm start

   By default, the server will run on http://localhost:3000.


### API Endpoints

| URI              | HTTP Method | Operation                              |
|------------------|-------------|----------------------------------------|
| **/owners**      | GET         | READ ALL : Get a list of all owners    |
| **/owners/{id}** | GET         | READ ONE : Get details of a specific owner by ID, with all his pets' info |
| **/owners**      | POST        | INSERT ONE : Insert a new owner        |
| **/owners/{id}** | PUT         | UPDATE ONE : Update details of a specific owner by ID, and all his pets |
| **/owners/{id}** | DELETE      | DELETE ONE : Delete a specific owner by ID, and all his pets |
| **/pets**        | GET         | READ ALL : Get a list of all pets      |
| **/pets/{id}**   | GET         | READ ONE : Get details of a specific pet by ID, with his owner's info |
| **/pets**        | POST        | REGISTER ONE : Register a new pet, and associate it with its owner.         |
| **/pets/{id}**   | PUT         | UPDATE ONE : Update details of a specific pet by ID |
| **/pets/{id}**   | DELETE      | DELETE ONE : Delete a specific pet by ID |

