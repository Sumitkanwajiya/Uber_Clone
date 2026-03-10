import dotenv from 'dotenv';
import app from './app.js';
import http from 'http';
import connectDB from './db/db.js';


dotenv.config();


connectDB();

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});