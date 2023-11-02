import React, { useEffect } from 'react'
import EditUserData from './EditUserData'
import EditProfilePic from './EditProfilePic'
import { useSelector } from 'react-redux'
import { baseUrlAPI } from '../../store/context'

function Profile() {
    const { userData } = useSelector((state) => state.user)
    console.log(userData)
    const imageURL = userData.profilePic ? userData.profilePic : null

    useEffect(() => {
        // console.log(userData)
    }, [userData])


    return (
        <div className='conatiner'>
            <div className="row mx-0">

                <div className="col-sm-6  pt-3 pb-5">
                    <div className="mx-5">
                        <EditProfilePic />
                        <img className='w-100' src={imageURL ? baseUrlAPI + '\\' + imageURL : "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"} alt="Profile-Photo" />
                    </div>

                </div>

                <div className="col-sm-4 pb-5 pt-3">
                    <div className='card p-3 mx-3 bg-light' style={{ borderRadius: 10 }}>
                        <h3>User Details</h3> <hr />
                        <div className="text-end">
                            <EditUserData title='Edit Details' />
                        </div>
                        <br />
                        <p><span className='fw-bold'>User ID : </span>  {userData ? userData._id : ''}</p>
                        <p><span className='fw-bold'>Name : </span> {userData ? userData.name : ''}</p>
                        <p><span className='fw-bold'>Email : </span>  {userData ? userData.email : ''}</p>
                        <p><span className='fw-bold'>Phone : </span>  {userData ? userData.phone : ''}</p>

                    </div> <br />
                </div>
            </div>
        </div>
    )
}

export default Profile