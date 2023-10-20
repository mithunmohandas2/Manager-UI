import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const emailInput = useRef(null)
  const Logo ='https://cdn-icons-png.flaticon.com/512/2720/2720641.png'

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

      console.log(email, password)   //test mode
      
      //check from database
     

    } catch (error) {
      console.log(error.message);
    }

  }


  const backgroundImageStyle = {
    backgroundImage: `url('https://i1.wp.com/www.dsims.org.in/wp-content/uploads/sites/3/2019/12/LeadersInMaking-1.jpg?fit=1350%2C587&ssl=1')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div className='py-4' style={backgroundImageStyle}>

      <div className="row mx-5 p-4 ">
        <div className="col-12 col-md-4 p-4"></div>
        <div className="col-12 col-md-4 p-4 box mt-4" style={{backgroundColor:'honeydew', borderRadius:20}}>
          <div className="text-center">
            <img width="141em" src={Logo} alt='Logo'></img>
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
                  <button type="submit" className="btn btn-primary w-50 my-1">Login</button>
                </div>
                <p className="text-center">Dont have an account? <span onClick={() => navigate("/signup")} style={{ cursor: 'pointer' }}>Signup</span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
