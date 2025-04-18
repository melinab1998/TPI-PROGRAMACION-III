import express from 'express';
import sequelize from './config/db.js';
import User from './models/User.js'; 


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

/* app.post('/users', async (req, res) => {
  try {
    const { name, lastName, email, age, mobile, password } = req.body;
    const newUser = await User.create({ name, lastName, email, age, mobile, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creando usuario', error: err.message });
  }
}); */
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a la base de datos');
    
    // Sincronizar los modelos
    sequelize.sync({ force: false })
      .then(() => {
        console.log('✅ Sincronización exitosa');
        app.listen(PORT, () => {
          console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
      })
      .catch(err => {
        console.error('❌ Error al sincronizar los modelos:', err);
      });
  })
  .catch(err => {
    console.error('❌ Error al conectar con la base de datos:', err);
  });