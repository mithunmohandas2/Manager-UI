import React, { useContext, useEffect, useRef, useState } from 'react'
import { baseUrlContext } from '../../store/context';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'


function EditUserData(props) {
    const { userData } = useSelector((state) => state.user)
    const { admin } = props
    console.log(userData)
    const _id = userData ? userData._id : ''
    const [name, setName] = useState(userData ? userData.name : '');
    const [email, setEmail] = useState(userData ? userData.email : '');
    const [phone, setPhone] = useState(userData ? userData.phone : '');
    const [password, setPassword] = useState('');
    const [adminStatus, setAdminStatus] = useState(userData ? userData.admin : false)
    const inputFocus = useRef(null)
    const { baseUrlAPI } = useContext(baseUrlContext)

    async function handleSubmit(e) {
        //code to edit profile 
        try {
            e.preventDefault()
            setName(name.trimEnd());
            setEmail((email).toLowerCase().trimEnd())

            const url = baseUrlAPI + `/admin/updateUser/${_id}`;    //Edit User API endpoint
            const data = { _id, email, name, phone, password, admin: adminStatus };
            console.log(data)   //test mode
            console.log(url)    //test mode

            await axios.put(url, data)               //check from database
                .then(response => {
                    if (response.data.error) throw Error(response.data.error)  //if any error throw error 
                    console.log('Response:', response.data);          // all the user data received 

                    Swal.fire({
                        icon: 'success',
                        title: "User data updated successfully",
                        text: " ",

                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#staticBackdrop').modal('hide');  // Close the modal when SweetAlert is confirmed
                        }
                    });
                })
                .catch(error => {
                    Swal.fire({ icon: 'error', title: error.message, })
                });

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        function focusInput() {   //focus on name input field
            inputFocus.current.focus();
        }
        focusInput()
    }, [])

    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            {!admin && <img style={{ width: 25, cursor: 'pointer' }} src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="EditUser" data-bs-toggle="modal" data-bs-target="#editUserModal" />}

            {/* <!-- Modal --> */}
            <div className="modal fade text-start" id="editUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog" >
                    <div className="modal-content bg-light" style={{ borderRadius: 10 }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{props.title ? props.title : 'Enter Details'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className="formData px-4" onSubmit={handleSubmit} >
                                <div className="col-12 px-2">

                                    <div className="mb-3">
                                        <label htmlFor="text" className="form-label">Name</label>
                                        <input type="text" placeholder="Enter your full name" pattern="[A-Za-z ]*" minLength="3"
                                            name="firstName" className="form-control" id="firstName" required ref={inputFocus}
                                            value={name} onChange={(input) => setName(input.target.value.trimStart())} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" name="email" className="form-control" id="email" pattern="^(?=.*[@])(?=.*[.]).{5,}$"
                                            placeholder="Enter email ID" required
                                            value={email} onChange={(input) => setEmail(input.target.value.trimStart())} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="number" className="form-label">Phone number</label>
                                        <input type="tel" name="phone" className="form-control" id="phone" pattern="[0-9]*"
                                            minLength="10" placeholder="Enter contact number" required
                                            value={phone} onChange={(input) => setPhone(input.target.value.trimStart())} />
                                    </div>

                                    {!admin && <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" name="password" className="form-control" placeholder="Enter password" id="password"
                                            // pattern="^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=|]).{6,}$" 
                                            required minLength='6' value={password} onChange={(input) => setPassword(input.target.value)} />
                                    </div>}

                                    {admin && <div className="mb-3">
                                        <label htmlFor="AdminStatus" className="form-label">User Status</label>
                                        <select className='form-control' onChange={(input) => setAdminStatus(input.target.value)}>
                                            <option value="true">Admin</option>
                                            <option value="false">User</option>
                                        </select>
                                    </div>}

                                    <div className="text-center my-4">
                                        <button type="submit" className=" w-50" >Update</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUserData