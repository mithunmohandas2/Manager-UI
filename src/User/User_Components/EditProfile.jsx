import React, { useEffect, useRef, useState } from 'react'

function EditProfile(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const inputFocus = useRef(null)

    function handleProfileEdit(e) {
        //code to edit profile here
        try {
            e.preventDefault()
            setName(name.trimEnd());
            setEmail((email).toLowerCase().trimEnd())

            console.log(name, email, phone, password)   //test mode


        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        function focusInput() {   //focus on name input field
            inputFocus.current.focus();
        }
        focusInput()
    },[])

    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            {/* <button type="button" className="w-25"> Edit */}
            <img style={{ width: 25 , cursor:'pointer'}} src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="Edit"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" />
            {/* </button> */}

            {/* <!-- Modal --> */}
            <div className="modal fade text-start" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog" >
                    <div className="modal-content bg-light" style={{ borderRadius: 10 }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{props.title?props.title:'Enter Details'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           
                        <form className="formData px-4" onSubmit={handleProfileEdit}>
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

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Enter password" id="password"
                                    // pattern="^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=|]).{6,}$" 
                                    required minLength='6' value={password} onChange={(input) => setPassword(input.target.value)} />
                            </div>

                            <div className="text-center my-4">
                                <button type="submit" className=" w-50">Update</button>
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