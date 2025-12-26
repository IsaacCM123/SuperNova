const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

/* 📂 Servir archivos estáticos */
app.use(express.static(__dirname));

/* 🔗 Conexión a MongoDB Atlas */
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

/* 📦 Esquema */
const RegistroSchema = new mongoose.Schema({
  hhhnombre: String,
  hhhedad: String,
  hhhcomentario: String
});

const Registro = mongoose.model("Registro", RegistroSchema);

/* 📥 Crear registro */
app.post("/sacky", async (req, res) => {
  const registro = new Registro(req.body);
  await registro.save();
  res.json({ mensaje: "Guardado!!!!!!!!!!!" });
});

/* 📤 Obtener registros */
app.get("/sacky", async (req, res) => {
  const sacky = await Registro.find();
  res.json(sacky);
});

/* 🌐 Ruta principal */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* 🚀 Servidor */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
