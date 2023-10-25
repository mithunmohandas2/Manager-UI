import React from 'react'
import EditProfile from './EditProfile'
import EditProfilePic from './EditProfilePic'

function Profile() {
    return (
        <div className='conatiner'>
            <div className="row mx-0">

                <div className="col-sm-6  pt-3 pb-5">
                    <div className="mx-5">
                    <EditProfilePic></EditProfilePic>
                        <img className='w-100' src="https://www.thinkingheads.com/wp-content/uploads/2019/11/will-smith-speaker-entertainment-actor-thinking-heads.jpg" alt="Profile-Photo" />
                    </div>

                </div>

                <div className="col-sm-4 pb-5 pt-3">
                    <div className='card p-3 mx-3 bg-light' style={{ borderRadius: 10 }}>
                        <h3>User Details</h3> <hr />
                        <div className="text-end">
                            <EditProfile title='Edit Details'/>
                        </div>

                        <p><span className='fw-bold'>User ID : </span> 1121</p>
                        <p><span className='fw-bold'>Name : </span> Brad Pitt</p>
                        <p><span className='fw-bold'>Email : </span> Brad Pitt@gmail.com</p>
                        <p><span className='fw-bold'>Phone : </span> 77864467576</p>

                    </div> <br />
                </div>
            </div>
        </div>
    )
}

export default Profile