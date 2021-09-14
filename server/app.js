import express from 'express';
import cors from 'cors';
import routes from './routes/item';

const app = express();
const port = 3011;

app.use(express.json());

app.use(cors({
  origin: '*'
}));

routes(app);

app.use((req, res, next) => {
  res.status(500);
  if (req.accepts('json')) {
    res.send({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
