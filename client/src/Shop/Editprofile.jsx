import React from 'react'
import './ShopStyle.css'

const Editprofile = () => {
    return (
        <div className='Editprofile'>
            <div className='Editprofilecontainer'>
                <h2 style={{ color: "black",}}>EDIT PROFILE</h2>
                <div style={{ border: "1px solid #ccc", padding: " 12px 20px",width:"404px",height:"186px" }}>
                    <div class="floating-label-group">
                        <input type="text" id="shopName" class="form-control" autocomplete="off" autofocus required style={{ backgroundColor: "#ccc" }} />
                        <label class="floating-label">Name...</label>
                    </div>

                    <div class="floating-label-group">
                        <input type="text" id="shopEmail" class="form-control" autocomplete="off" autofocus required style={{ backgroundColor: "#ccc" }} />
                        <label class="floating-label">Email...</label>
                    </div>

                    <div class="floating-label-group">
                        <input type="text" id="shopContact" class="form-control" autocomplete="off" autofocus required style={{ backgroundColor: "#ccc" }} />
                        <label class="floating-label" >Contact...</label>
                    </div>
                </div>
                <div className='editbtn'>
                    <button className='sbtbtnEdtPrF'>Submit</button>
                    <button className='cancelBtnEdtPRF'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Editprofile