import React, { useContext, useEffect, useRef, useState } from 'react'
import { baseUrlContext } from '../../store/context';
import axios from 'axios'
import Swal from 'sweetalert2';

function EditProfile(props) {
    const { addUser } = props
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState(!addUser ? '' : 'password');
    const [adminStatus, setAdminStatus] = useState(false)
    const inputFocus = useRef(null)
    const { baseUrlAPI } = useContext(baseUrlContext)

    function handleSubmit(e) {
        //code to edit profile here
        try {
            e.preventDefault()
            setName(name.trimEnd());
            setEmail((email).toLowerCase().trimEnd())
            if (addUser) return handleAddProfile()  // if add user component use add user function

            console.log(name, email, phone, password, adminStatus)   //test mode

        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleAddProfile() {
        //code to add new user here
        try {
            // console.log('add user =>',name, email, phone, password, adminStatus)   //test mode

            const url = baseUrlAPI + '/register';    //Signup API endpoint
            const data = { email, name, phone, password, admin: adminStatus };

            await axios.post(url, data)               //check from database
                .then(response => {
                    if (response.data.error) throw Error(response.data.error)  //if any error throw error 
                    // console.log('Response:', response.data);          // all the user data received 
                    addUser();

                    Swal.fire({
                        icon: 'success',
                        title: "New user created successfully",
                        text: "Default password : 'password'",

                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#staticBackdrop').modal('hide');  // Close the modal when SweetAlert is confirmed
                        }
                    });
                })
                .catch(error => {
                    // console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: error.message,
                    })
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
            {!addUser && <img style={{ width: 25, cursor: 'pointer' }} src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="EditUser" data-bs-toggle="modal" data-bs-target="#staticBackdrop" />}
            {addUser &&
                <button className='d-flex ps-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <p className='my-auto mx-2'>ADD USER</p> <img style={{ width: 35, cursor: 'pointer' }} src="https://cdn-icons-png.flaticon.com/512/7351/7351512.png" alt="AddUser" />
                </button>
            }

            {/* <!-- Modal --> */}
            <div className="modal fade text-start" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
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

                                    {!addUser && <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" name="password" className="form-control" placeholder="Enter password" id="password"
                                            // pattern="^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=|]).{6,}$" 
                                            required minLength='6' value={password} onChange={(input) => setPassword(input.target.value)} />
                                    </div>}

                                    {addUser && <div className="mb-3">
                                        <label htmlFor="AdminStatus" className="form-label">User Status</label>
                                        <select className='form-control' onChange={(input) => setAdminStatus(input.target.value)}>
                                            <option value="true">Admin</option>
                                            <option value="false">User</option>
                                        </select>
                                    </div>}

                                    <div className="text-center my-4">
                                        {!addUser && <button type="submit" className=" w-50" >Update</button>}
                                        {addUser && <button type="submit" className=" w-50" >Add User</button>}
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

export default EditProfile