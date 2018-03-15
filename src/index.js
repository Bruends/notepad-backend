const app = require('./config/server');

const port = 4000;
app.listen(port, () => {
  console.log(`running on localhost:${port}`);
});
