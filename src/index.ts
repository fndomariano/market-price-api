import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express()
const port = 3000


app.use(bodyParser.json())
app.use(routes)


app.listen(port, () => {
  console.log(`Server running...`)
})

