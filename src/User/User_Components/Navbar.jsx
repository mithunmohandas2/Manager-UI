import React from 'react';
function Navbar() {
  const Logo ='https://cdn-icons-png.flaticon.com/512/2720/2720641.png'

  return (
      <nav className="navbar top-0 py-3 bg-light">
        <div className="container">
          <a className="navbar-brand Logo d-flex">
          <img style={{width:50}} src={Logo} alt="logo" />
           <h1 className='ps-3'>MANAGER</h1>
          </a>
          <button className='btn btn-primary'>Logout</button>
        </div>
      </nav>
  )
}

export default Navbar;
