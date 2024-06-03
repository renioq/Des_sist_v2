const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define o esquema do usuário
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

// Encripta a senha antes de salvar o usuário
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Verifica se a senha foi modificada
  const salt = await bcrypt.genSalt(10); // Gera um salt para encriptar a senha
  this.password = await bcrypt.hash(this.password, salt); // Encripta a senha
  next();
});

// Método para comparar a senha
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compara a senha inserida com a senha encriptada
};

const User = mongoose.model('User', userSchema);

module.exports = User; 

