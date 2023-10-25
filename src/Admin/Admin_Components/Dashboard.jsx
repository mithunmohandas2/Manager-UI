import React, { useContext, useEffect, useState } from 'react'
import { baseUrlContext } from '../../store/context';
import axios from 'axios';
import EditProfile from '../../User/User_Components/EditProfile';


function Dashboard() {
    const [users, setUsers] = useState(null)
    const { baseUrlAPI } = useContext(baseUrlContext)
    const url = baseUrlAPI + '/admin/loadUsers';    // Get all users API endpoint

    useEffect(() => {
        async function getUserData() {
            await axios.get(url)
                .then(response => {
                    console.log('Response:', response.data);                   // all users data received
                    if (response.data.error) throw Error(response.data.error)  //if any error throw error 
                    setUsers(response.data)                                          // Login Success 
                })
                .catch(error => {
                    // console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: error.message,
                    })
                });
        }
        getUserData()     //function invoke

    }, [])


    return (
        <div>
            <h3 className='text-center my-4'>User Management</h3>

            <table className="my-5 table table-striped container">
                <thead>
                    <tr className='text-center'>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">User-ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => {
                       
                        return (
                            <tr key={user._id} className='text-center'>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td className='row mx-0  p-2' >
                                <button className='col-5 mx-1' ><EditProfile title='Edit user details' /></button>
                                <button className='col-5 mx-1'><img style={{width:28}} src="https://cdn.iconscout.com/icon/free/png-256/free-delete-4095676-3389247.png?f=webp" alt="Delete" /></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Dashboard