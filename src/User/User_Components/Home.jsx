import React from 'react'

function Home() {
    const banner = 'https://i.pinimg.com/1200x/45/cf/a8/45cfa8e8fef45c356253cf9938a4cc9c.jpg'
    const Logo = 'https://cdn-icons-png.flaticon.com/512/2720/2720641.png'

    return (
        <div >
            <img style={{ zIndex: -1 }} className='w-100 position-absolute top-0' src={banner} alt="banner" />
            <div className="text-center px-5">
                <img className='Logo' src={Logo} alt="Logo" />
            </div>
        </div>
    )
}

export default Home