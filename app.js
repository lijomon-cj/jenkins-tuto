const express = require('express');
const http = require('http');
const app = express();
app.use(
  express.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(express.json({ limit: '100mb' }));
app.all('*', (req, res, next) => {
  return responseUtil.forbidden(
    res,
    `Can't ${req.method} ${req.originalUrl} on this server`
  );
});
app.get('/', (req, res) => res.sendStatus(200));
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
// Start server
server.listen(PORT, (err) => {
  if (err) {
    console.log(`Error starting server ${err}`);
  } else {
    console.log(
      `Server listening at port ${PORT} in ${process.env.NODE_ENV} mode`
    );
  }
});
