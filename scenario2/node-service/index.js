const functions = require('@google-cloud/functions-framework');

functions.http('helloNode', (req, res) => {
  const task = req.query.task || 'building APIs';
  res.status(200).send(`Hello from Node.js! Good luck ${task}.`);
});
