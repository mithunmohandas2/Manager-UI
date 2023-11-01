import React, { useContext, useEffect, useState } from 'react'
import { baseUrlContext } from '../../store/context';
import axios from 'axios';
import EditProfile from '../../User/User_Components/EditProfile';
import EditUserData from '../../User/User_Components/EditUserData';
import Swal from 'sweetalert2';

function Dashboard() {
    const [users, setUsers] = useState(null);
    const { baseUrlAPI } = useContext(baseUrlContext);
    const url = baseUrlAPI + '/admin/loadUsers';    // Get all users API endpoint
    const searchUrl = baseUrlAPI + '/admin/userSearch';    // search Users API endpoint
    const [searchData, setSearchData] = useState("");
    const [newUser, setNewUser] = useState(false);
    const [editUserData, setEditUserData] = useState(null);

    useEffect(() => {
        async function getUserData() {
            await axios.get(url)
                .then(response => {
                    if (response.data.error) throw Error(response.data.error)  //if any error throw error 
                    // console.log('Response:', response.data);                   // all users data received (test)
                    setUsers(response.data)
                })
                .catch(error => {
                    Swal.fire({ icon: 'error', title: error.message })
                });
        }
        getUserData()     //function invoke
    }, [newUser])

    async function handleSearchUser() {
        await axios.post(searchUrl, { searchData })
            .then(response => {
                // console.log('Response:', response.data);                   // search users data received (test)
                if (response.data.error) throw Error(response.data.error)  //if any error throw error 
                setUsers(response.data)                                          // Login Success 
            })
            .catch(error => {
                Swal.fire({ icon: 'error', title: error.message })
                if (error.message === 'Token misssing, Please login again' || error.message === 'invalid token') {
                    Nav
                }
            });
    }

    const handleNewUserChange = () => {
        setNewUser(!newUser);
    };

    const deleteUser = async (user) => {
        // console.log(user)
        Swal.fire({
            title: `Do you want to delete ${user.name} (${user.admin ? 'admin' : "user"})?`,
            text: 'Once deleted, cannot be reverted',
            showDenyButton: true, showCancelButton: true, showConfirmButton: false, denyButtonText: `Delete`
        })
            .then((result) => {
                if (result.isDenied) {  // confirmation recieved for deletion
                    deleteHelper(user)
                }
            })
    };

    async function deleteHelper(user) {
        await axios.post(baseUrlAPI + '/admin/deleteUser', { _id: user._id })
            .then(response => {
                if (response.data.error) throw Error(response.data.error)  //if any error throw error 
                // console.log('Response:', response.data);                   // delete users data received (test)
                Swal.fire(`${user.name} (${user.admin ? 'admin' : "user"}) deleted!`, '', 'success')
                setNewUser(!newUser);
            })
            .catch(error => {
                Swal.fire({ icon: 'error', title: error.message, })
            });
    }

    const editHelper = async (user) => {
        if (user) {
            setEditUserData(user)
            console.log(editUserData)
            $('#editUserModal').modal('show');
        }
    };

    return (
        <div>
            <h3 className='text-center my-4'>User Management</h3>
            <div className="container">
                <EditProfile addUser={handleNewUserChange} />
                <div className="text-end mt-3">
                    <div className="d-flex">
                        <input type="text" className='form-control w-25' value={searchData} onChange={(e) => setSearchData(e.target.value)} />
                        <button style={{ borderRadius: 0 }} onClick={handleSearchUser} >Search</button>
                    </div>
                </div>
            </div>

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
                                <td>{user.name} {user.admin ? <span className='fw-bold' style={{ fontSize: 13 }}>(ADMIN)</span> : ''}
                                </td>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td className='row mx-0  p-2' >
                                    <button className='col-5 mx-1' onClick={() => editHelper(user)}><img style={{ width: 25, cursor: 'pointer' }} src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="EditUser"/></button>
                                    <button className='col-5 mx-1' onClick={() => deleteUser(user)} ><img style={{ width: 28 }} src="https://cdn.iconscout.com/icon/free/png-256/free-delete-4095676-3389247.png?f=webp" alt="Delete" /></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


            {editUserData && <EditUserData admin userData={editUserData} />}
        </div>
    )
}

export default Dashboard