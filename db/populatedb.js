import {Client} from "pg";


const SQL = `
CREATE TABLE IF NOT EXISTS keyboards (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    stock INT,
    brand TEXT,
    size INT,
    switch_type TEXT,
    connection_type TEXT
);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();