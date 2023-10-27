import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrlContext } from '../../store/context';
import axios from 'axios'
import Swal from 'sweetalert2';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate()
  const inputFocus = useRef(null)
  const Logo = 'https://cdn-icons-png.flaticon.com/512/2720/2720641.png'
  const { baseUrlAPI } = useContext(baseUrlContext)


  useEffect(() => {
    function focusInput() {   //focus on name input field
      inputFocus.current.focus();
    }
    focusInput()
  }, [Navigate])

  const handleSignup = async (event) => {     //Submit the signup data and redirect to login
    try {
      event.preventDefault()
      setName(name.trimEnd());
      setEmail((email).toLowerCase().trimEnd())

      // console.log(name, email, phone, password)   //test mode

      const url = baseUrlAPI + '/register';    //Signup API endpoint
      const data = { email, name, phone, password };

      await axios.post(url, data)               //check from database
        .then(response => {
          console.log('Response:', response.data);                   // all the user data received
          if (response.data.error) throw Error(response.data.error)  //if any error throw error 
          Swal.fire({
            icon: 'success',
            title: "Signup successful",
            text:"Please Login to continue"
          })
          Navigate('/login')                                          // signup Success 
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
      res.json({ error: error.message })
    }
  }

  const backgroundImageStyle = {
    backgroundImage: `url('https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-29208.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div className='py-4' style={backgroundImageStyle}>
      <div className="row mx-5 p-4 ">
        <div className="col-12 col-md-4 p-4"></div>
        <div className="col-12 col-md-4 p-4 box mt-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 20 }}>
          <div className="text-center">
            <img width="120em" src={Logo} alt='Logo' className='Logo' />
          </div>


          <div className="px-3 pb-3">
            <form className="formData" onSubmit={handleSignup}>
              <div className="col-12 px-2">

                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Name</label>
                  <input type="text" placeholder="Enter your full name" pattern="[A-Za-z ]*" minLength="3"
                    name="name" className="form-control" id="name" required ref={inputFocus}
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

                <div className="text-center mb-2">
                  <button type="submit" className="w-50">Signup</button>
                </div>
                <p className="text-center">Already have account? <span onClick={() => Navigate("/login")} style={{ cursor: 'pointer' }}>Login</span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup