import React, { useState } from 'react'

function EditProfilePic() {
    const [image, setImage] = useState(null)
    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <img style={{ width: 45, cursor: 'pointer',position: 'absolute' }} src="https://static.thenounproject.com/png/4879835-200.png" alt="profilePicEdit" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" />


            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Upload Profile Pic</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <input type="file" accept="image/*" className='form-control' onChange={(e)=>{setImage(URL.createObjectURL(e.target.files[0]))}} />
                            {image &&  <img className='mt-3' style={{maxWidth:400}} src={image} alt="profilePic" />}
                           
                        </div>
                        <div className="modal-footer">
                            <button type="button" >Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfilePic