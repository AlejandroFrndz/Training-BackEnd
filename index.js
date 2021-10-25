const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

if (!require('dotenv').config()) {
  console.error('Error configurating process environment');
  exit(-1);
}
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

//Configure Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Connect to Mongo
mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server up and running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error('Error while connecting to MongoDB ' + err);
  });

mongoose.connection.once('open', () => {
  console.log('MongoDB service started');
});

//Configure Routes
const charactersRoutes = require('./routes/api/characters');
const episodesRoutes = require('./routes/api/episodes');

app.use('/api/characters', charactersRoutes);
app.use('/api/episodes', episodesRoutes);
