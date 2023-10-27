import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrlContext } from '../../store/context';
import axios from 'axios';
import Swal from 'sweetalert2';

function Admin_Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInput = useRef(null)
  const navigate = useNavigate()
  const Logo = 'https://cdn-icons-png.flaticon.com/512/2720/2720641.png'
  const { baseUrlAPI } = useContext(baseUrlContext)


  useEffect(() => {
    function focusInput() {  //focus on email input field
      emailInput.current.focus();
    }
    focusInput()
  }, [navigate])

  const handleLogin = async (event) => {      //Submit the Login data and redirect to Home
    try {
      event.preventDefault()
      setEmail((email).toLowerCase().trimEnd())

      // console.log(email, password)   //test mode

      //check from database
      const url = baseUrlAPI + '/admin/login';    // Verify Login API endpoint
      const data = { email, password };

      await axios.post(url, data)               //check from database
        .then(response => {
          // console.log('Response:', response.data);                   // all the user data received
          if (response.data.error) throw Error(response.data.error)  //if any error throw error 
          navigate('/admin/dashboard')                                          // Login Success 
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


  const backgroundImageStyle = {
    backgroundImage: `url('https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-2692.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div className='py-5' style={backgroundImageStyle}>

      <div className="row mx-5 p-4">
        <div className="col-12 col-md-4 p-4"></div>
        <div className="col-12 col-md-4 p-4 box mt-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 20 }}>
          <div className="text-center">
            <img width="50em" className='Logo' src={Logo} alt='Logo'></img> <h4>ADMIN LOGIN</h4>
          </div>

          <div className="p-3">
            <form className="formData" onSubmit={handleLogin}>
              <div className="col-12 px-2">

                <div className="mb-3">
                  <label htmlFor="email" ref={emailInput} className="form-label">Email address</label>
                  <input type="email" name="email" className="form-control" id="email" pattern="^(?=.*[@])(?=.*[.]).{5,}$"
                    placeholder="Enter email ID" required
                    value={email} onChange={(input) => setEmail(input.target.value)} />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" placeholder="Enter password"
                    id="password" required
                    // pattern="^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=|]).{6,}$" 
                    value={password} onChange={(input) => setPassword(input.target.value)} />
                </div>

                <div className="text-center mb-2">
                  <button type="submit" className="w-50 my-1">Login</button>
                </div>
                <p className="text-center">Not Admin? <span onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>User Login</span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin_Login