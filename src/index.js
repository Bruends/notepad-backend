const app = require('./config/server');

const port = 3000;
app.listen(port, () => {
  console.log(`running on localhost:${port}`);
});
