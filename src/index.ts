import "reflect-metadata";
import {createConnection} from "typeorm";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    console.log(connection);
    await connection.close()

}).catch(error => console.log(error));
