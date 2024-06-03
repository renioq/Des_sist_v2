const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'Usuário já registrado' });
  } else {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, 'secrectKey', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const addUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  const user = await User.create({ username, email, password, isAdmin });
  res.status(201).json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.findByIdAndDelete(req.param.id);
    res.json({ message: 'Usuário removido' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, isAdmin } = req.body;

  const user = await User.findById(id);

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

module.exports = { registerUser, loginUser, getAllUsers, addUser, updateUser, deleteUser };