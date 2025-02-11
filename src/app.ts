// filepath: /C:/Users/anata/OneDrive/Documentos/GitHub/tatame-control-api/src/app.ts
import express, { Request, Response } from 'express';
import client from './infra/config/dbConnection';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    client.query('SELECT $1::int AS number', ['1'], (err, result) => {
        if (err) {
            console.error('error running query', err);
            res.status(500).send('Error running query');
        } else {
            res.send(`Query result: ${result.rows[0].number}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});