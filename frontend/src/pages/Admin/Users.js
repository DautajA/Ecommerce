import React ,{useState, useEffect}from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([]);

  // get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/auth/all-users');
      setUsers(data?.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Layout title={'Dashboard - All Users'}>
    <div className='container-fluid mt-3 pt-3'>
      <div className='row'>
             <div className='col-md-3'><AdminMenu/></div>
             <div className='col-md-9'>
               <h1 className='admin-part text-center'>All Users</h1>
               {users.length > 0 ? (
              <div className="border shadow">
              <table className='table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user._id}>
                      <td>{i + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p className='text-center'>No users found.</p>
            )}
          </div>
        </div>
    </div>
    </Layout>
  )
}

export default Users
