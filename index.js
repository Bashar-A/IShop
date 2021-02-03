const createApp = require('./app');
const keys = require('./keys')

const PORT = process.env.PORT || 3030

createApp()
  .then((app) => {
    app.listen(PORT);
    console.log(`API is listening on ${keys.BASE_URL}:${PORT}`);
  });
