import React, { useContext, useEffect, useState } from 'react'
import { baseUrlContext } from '../../store/context';
import axios from 'axios';
import EditProfile from '../../User/User_Components/EditProfile';
// import AdminEditUserData from './AdminEditUserData'
import Swal from 'sweetalert2';

function Dashboard() {
    const [users, setUsers] = useState(null);
    const { baseUrlAPI } = useContext(baseUrlContext);
    const url = baseUrlAPI + '/admin/loadUsers';    // Get all users API endpoint
    const searchUrl = baseUrlAPI + '/admin/userSearch';    // search Users API endpoint
    const [searchData, setSearchData] = useState("");
    const [newUser, setNewUser] = useState(false);
    const [editUserData, setEditUserData] = useState(null);

    //user Data edit
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [adminStatus, setAdminStatus] = useState('');

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
            // console.log(editUserData)
            // $('#editUserModal').modal('show');
            setName(user.name)
            setEmail(user.email)
            setPhone(user.phone)
            setAdminStatus(user.admin)
            setPassword(user.password)
            

            Swal.fire({
                title: `Edit ${user.name} (${user.admin ? 'admin' : "user"})?`,
                html: `
                <form class="formData px-4" onsubmit="handleSubmit(event)">
                <div class="col-12 px-2">
                    <div class="mb-3">
                        <label for="firstName" class="form-label">Name</label>
                        <input type="text" placeholder="Enter your full name" pattern="[A-Za-z ]*" minlength="3" name="firstName" class="form-control" required value="${name}" oninput="setName(this.value.trimStart())">
                    </div>
            
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" name="email" class="form-control"  pattern="^(?=.*[@])(?=.*[.]).{5,}$" placeholder="Enter email ID" required value="${email}" oninput="setEmail(this.value.trimStart())">
                    </div>
            
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone number</label>
                        <input type="tel" name="phone" class="form-control" pattern="[0-9]*" minlength="10" placeholder="Enter contact number" required value="${phone}" oninput="setPhone(this.value.trimStart())">
                    </div>
            
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Enter password" required minlength="6" value="${password}" oninput="setPassword(this.value)">
                    </div>
            
                    <div class="mb-3">
                        <label for="AdminStatus" class="form-label">User Status</label>
                        <select class="form-control" onchange="setAdminStatus(this.value)">
                            <option value="true">Admin</option>
                            <option value="false">User</option>
                        </select>
                    </div>
            
                    <div class="text-center my-4">
                        <button type="button" class="w-50">Update</button>
                    </div>
                </div>
            </form>
            
                `,
                showCancelButton: false, showConfirmButton: false, confirmButtonText: `Edit`
            })
                .then((result) => {
                    if (result.isDenied) {  // confirmation recieved for deletion
                        //edit functionality
                    }
                })
        };
    };


    async function handleSubmit(event) {
        //code to edit profile 
        try {
            e.preventDefault()
            setName(name.trimEnd());
            setEmail((email).toLowerCase().trimEnd())

            const url = baseUrlAPI + `/admin/updateUser/${_id}`;    //Edit User API endpoint
            const data = { _id, email, name, phone, admin: adminStatus, password };
            console.log(data)   //test mode
            console.log(url)    //test mode

            // await axios.put(url, data)               //check from database
            //     .then(response => {
            //         if (response.data.error) throw Error(response.data.error)  //if any error throw error 
            //         console.log('Response:', response.data);          // all the user data received 

            //         Swal.fire({
            //             icon: 'success',
            //             title: "User data updated successfully",
            //             text: " ",

            //         }).then((result) => {
            //             if (result.isConfirmed) {
            //                 $('#editUserModal').modal('hide');  // Close the modal when SweetAlert is confirmed
            //             }
            //         });
            //     })
            //     .catch(error => {
            //         Swal.fire({ icon: 'error', title: error.message, })
            //     });

        } catch (error) {
            console.log(error.message);
        }
    }

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
                        <th scope="col">Photo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => {

                        return (
                            <tr key={user._id} className='text-center'>
                                <th scope="row">{index + 1}</th>
                                <td><img className='' style={{ width: 45 }} src={user.profilePic ? baseUrlAPI + '\\' + user.profilePic : "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"} alt="Profile-Photo" /></td>
                                <td>{user.name}  </td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td style={{ fontSize: 13 }}>{user.admin ? <span className='fw-bold'>ADMIN</span> : 'USER'}</td>
                                <td className='row mx-0  p-2' >
                                    <button className='col-5 mx-1' onClick={() => editHelper(user)}><img style={{ width: 25, cursor: 'pointer' }} src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="EditUser" /></button>
                                    <button className='col-5 mx-1' onClick={() => deleteUser(user)} ><img style={{ width: 28 }} src="https://cdn.iconscout.com/icon/free/png-256/free-delete-4095676-3389247.png?f=webp" alt="Delete" /></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


            {/* {editUserData && <AdminEditUserData admin userData={editUserData} />} */}
        </div>
    )
}

export default Dashboard