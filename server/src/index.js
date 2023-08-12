const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(taskRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
