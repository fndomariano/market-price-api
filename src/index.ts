import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes'

const app = express()
const port = 3000


app.use(routes)


app.listen(port, () => {
  console.log(`Server running...`)
})

