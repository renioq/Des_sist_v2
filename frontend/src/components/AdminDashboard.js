import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  // Estado para armazenar a lista de usuários
  const [users, setUsers] = useState([]);
  // Estado para mensagens de feedback
  const [message, setMessage] = useState('');
  // Estado para novo usuário a ser adicionado
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', isAdmin: false });
  // Estado para edição de usuário
  const [editUser, setEditUser] = useState(null);

  // Busca todos os usuários ao carregar o componente
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
      axios.get('http://localhost:3000/api/users/admin/users', {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      })
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          setMessage('Erro ao buscar usuários.');
          console.error(error);
        });
    } else {
      setMessage('Não autorizado');
    }
  }, []);

  // Funçaõ de adição de usuário
  const handleAddUser = () => {
    axios.post('http://localhost:3000/api/users/admin/users', newUser, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` }
    })
      .then(response => {
        setMessage('Usuário adicionado com sucesso!');
        setUsers([...users, response.data]);
        setNewUser({ username: '', email: '', password: '', isAdmin: false });
      })
      .catch(error => {
        setMessage('Erro ao adicionar usuário. Tente novamente.');
        console.error(error);
      });
  };

  // Função de exclusão de usuário
  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:3000/api/users/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` }
    })
      .then(() => {
        setMessage('Usuário excluído com sucesso!');
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(error => {
        setMessage('Erro ao excluir usuário. Tente novamente.');
        console.error(error);
      });
  };

  // Função de atualização de usuário
  const handleEditUser = () => {
    axios.put(`http://localhost:3000/api/users/admin/users/${editUser._id}`, editUser, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` }
    })
      .then(response => {
        setMessage('Usuário atualizado com sucesso!');
        setUsers(users.map(user => (user._id === editUser._id ? response.data : user)));
        setEditUser(null);
      })
      .catch(error => {
        setMessage('Erro ao atualizar usuário. Tente novamente.');
        console.error(error);
      });
  };

  // Design da tela
  return (
    <div className="container">
      <header className="my-4">
        <h1 className="h2">Painel Administrativo</h1>
      </header>
      {message && <div className="alert alert-info">{message}</div>}
      <section>
        <h2>Usuários Recentes</h2>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Data de Registro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={() => setEditUser(user)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user._id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mt-4">
        <h2>{editUser ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          editUser ? handleEditUser() : handleAddUser();
        }}>
          <div className="form-group">
            <label htmlFor="username">Nome Completo:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={editUser ? editUser.username : newUser.username}
              onChange={(e) => {
                const value = e.target.value;
                editUser ? setEditUser({ ...editUser, username: value }) : setNewUser({ ...newUser, username: value });
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={editUser ? editUser.email : newUser.email}
              onChange={(e) => {
                const value = e.target.value;
                editUser ? setEditUser({ ...editUser, email: value }) : setNewUser({ ...newUser, email: value });
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={editUser ? editUser.password : newUser.password}
              onChange={(e) => {
                const value = e.target.value;
                editUser ? setEditUser({ ...editUser, password: value }) : setNewUser({ ...newUser, password: value });
              }}
              required
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isAdmin"
              checked={editUser ? editUser.isAdmin : newUser.isAdmin}
              onChange={(e) => {
                const checked = e.target.checked;
                editUser ? setEditUser({ ...editUser, isAdmin: checked }) : setNewUser({ ...newUser, isAdmin: checked });
              }}
            />
            <label className="form-check-label" htmlFor="isAdmin">Administrador</label>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            {editUser ? 'Atualizar Usuário' : 'Adicionar Usuário'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminDashboard;