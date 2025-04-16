import 'dotenv/config';
import express from 'express';

const app = express();

app.use(express.json());

console.log('Hello Node');
console.log('Environment:', process.env.NODE_ENV);

export default app;
