import React from 'react'
import Profilelogo from './shopImages/profile-icon.jpg'
import './ShopStyle.css'

const Myprofile = () => {
    return (
        <div className='profileDiv'>
            <div className='profilecontainer'>
                <h2 style={{ color: "black",marginLeft:"13px" }}>MY PROFILE</h2>
                <div className='img'><img src={Profilelogo} alt="img" style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    display: "flex",
                    marginLeft: "180px",
                    marginBottom: "20px"
                }} /></div>
                <div style={{ border: "1px solid #ccc", padding: " 12px 20px" }}>
                    <div class="floating-label-group">
                        <input type="text" id="District" class="form-control" autocomplete="off" autofocus required style={{ backgroundColor: "#ccc" }} />
                        <label class="floating-label">Name...</label>
                    </div>

                    <div class="floating-label-group">
                        <input type="text" id="District" class="form-control" autocomplete="off" autofocus required style={{ backgroundColor: "#ccc" }} />
                        <label class="floating-label">Email...</label>
                    </div>

                    <div class="floating-label-group">
                        <input type="text" id="District" class="form-control" autocomplete="off" autofocus required style={{ backgroundColor: "#ccc" }} />
                        <label class="floating-label" >Contact...</label>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Myprofile