import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function WithCreate() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const api = axios.create({ baseURL: 'http://localhost:3001/' });
    api.get('users/').then((r) => setUsers(r.data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>password</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default WithCreate;
