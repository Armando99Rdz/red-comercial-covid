import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { } from "dotenv/config";
import path from "path";
import routes from './routes';

// db connection
import db from './config/database';

const app = express();

app.use(morgan(process.env.MODE)); 

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.set('PORT', process.env.PORT || 5000);
app.listen(app.get('PORT'), () => {
  console.log('Server on port ' + app.get('PORT'));
});