import * as jsonServer from 'json-server';
import * as path from 'path';
import * as fs from 'fs';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);

server.get('/features', (req, res) => {
  const { role } = req.query;
  const db = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8')
  );

  // Filter features by role
  const features = db.features.find((feature: any) => feature.role === role);
  if (features) {
    res.jsonp(features); // Return the feature data for the specific role
  } else {
    res.status(404).json({ message: 'Role not found' });
  }
});

server.post('/features', (req, res) => {
  const { role, features } = req.body;
  const db = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8')
  );

  // Check if the role exists, if so update, otherwise add a new entry
  const existingRole = db.features.find(
    (feature: any) => feature.role === role
  );
  if (existingRole) {
    existingRole.features = features;
  } else {
    db.features.push({ role, features });
  }

  // Write updated data back to the db.json file
  fs.writeFileSync(
    path.join(__dirname, 'db.json'),
    JSON.stringify(db, null, 2)
  );

  res.status(201).json({ message: 'Features saved successfully!' });
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});