import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Função de Login 
  const handleLogin = () => {
    axios.post('http://localhost:3000/api/users/login', { email, password })
      .then(response => {
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        setMessage('Login realizado com sucesso!');
        // Redirecionar para a página de administração ou a página desejada
        window.location.href = '/admin';
      })
      .catch(error => {
        setMessage('Erro ao realizar login. Tente novamente.');
        console.error(error);
      });
  };

  // Design da tela
  return (
  <body> 
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card my-5">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" id="email" placeholder="Digite seu email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Senha:</label>
                  <input type="password" className="form-control" id="password" placeholder="Digite sua senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                <p className="text-center mt-3">Não tem uma conta? <a href="register">Cadastre-se</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  );
};

export default Login;
