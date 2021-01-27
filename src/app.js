import express from 'express';
import routes from './routes';
import { errMsg } from './utils/response';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((err, req, res, next) => {
  // This check makes sure this is a JSON parsing issue
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return errMsg(res, "Invalid JSON payload passed.")
  }
  next();
});

app.use('/', routes);

app.listen(3000, () => {
  console.log(`app is running on port 3000`)
})