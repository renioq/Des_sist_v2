import React, { useState } from 'react';
import axios from 'axios';

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  //Função de cadastro do usuário
  const handleRegister = () => {
    axios.post('http://localhost:3000/api/users/register', { username, email, password })
      .then(response => {
        setMessage('Usuário registrado com sucesso!');
        setUsername('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        setMessage('Erro ao registrar usuário. Tente novamente.');
        console.error(error);
      });
  };

  //Design da tela
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card my-5">
            <div className="card-body">
              <h3 className="card-title text-center">Cadastro</h3>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label htmlFor="name">Nome Completo:</label>
                  <input type="text" className="form-control" id="name" placeholder="Digite seu nome completo" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" id="email" placeholder="Digite seu email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Senha:</label>
                  <input type="password" className="form-control" id="password" placeholder="Digite sua senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Cadastrar</button>
                {message && <p className="text-center mt-3">{message}</p>}
                <p className="text-center mt-3">Já tem uma conta? <a href="login">Login</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
