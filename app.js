const express = require('express');
const bodyParser = require('body-parser');
const { conectDB, sequelize } = require('./data/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')
const app = express();
const port = 3000;
conectDB();

sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos')
})

// Middleware
//app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Routes
app.use('/', userRoutes);
app.use('/productos', productRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
