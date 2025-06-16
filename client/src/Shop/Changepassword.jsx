import React from 'react'
import './ShopStyle.css'

const Changepassword = () => {
    return (
        <div className='changepsswrd'>
            <div className='changepsswrdcontainer'>
                <h2 style={{ color: "black" }}>CHANGE PASSWORD</h2>
                <div style={{ border: "1px solid #ccc", padding: " 12px 20px" }}>
                    <div class="floating-label-group">
                        <input type="text" id="District" class="form-control" autocomplete="off" autofocus required style={{ backgroundColor: "#ccc" }} />
                        <label class="floating-label">CurrentPassword...</label>
                    </div>

                    <div class="floating-label-group">
                        <input type="text" id="District" class="form-control" autocomplete="off" autofocus required style={{ backgroundColor: "#ccc" }} />
                        <label class="floating-label">NewPassword...</label>
                    </div>

                    <div class="floating-label-group">
                        <input type="text" id="District" class="form-control" autocomplete="off" autofocus required style={{ backgroundColor: "#ccc" }} />
                        <label class="floating-label">Re-Password...</label>
                    </div>
                </div>

                <div className='editbtn'>
                    <button className='chngPassbtnSubmit'>Submit</button>
                    <button className='chngPassbtncancel'>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default Changepassword