import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom'
// import myordericon from './UserImages/iconsMyorder.png'
// import arrowpath from './UserImages/arrowpathwishlist.png'
// import accountinfoicon from './UserImages/acountinfoicon.png'
// import paymenticon from './UserImages/paymenticonwishlist.png'
// import mystufficon from './UserImages/mystuff.png'
// import logouticon from './UserImages/logout.jpg'

const ForgotResetPswrd = () => {
    const getEmail = sessionStorage.getItem("sendedEmail");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate()

    const findCustomer = () => {

        if (newPassword === confirmNewPassword) {

            var data = {
                email: getEmail,
                newPassword: newPassword
            };
            axios.post('http://localhost:5000/getCustomerWithEmail', data).then((response) => {
                console.log(response.data);
            })
            navigate("/Guest/Login")
        }

    }
    useEffect(() => {

    }, [])
    return (
        <div className='forgotResetHomeContainer'>
            <div className='ResetPswrdFullDiv'>
                <div className="resetPswrd ">
                    RESET YOUR PASSWORD
                </div>
                <div style={{ marginTop: "20px", fontSize: "14px", fontFamily: "sans-serif" }}>
                    Enter your new password for <b>{getEmail}</b>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className='resetpaswrdInputarea'>
                        <div style={{width:"320px"}}>
                            <input type={showNewPassword ? "text" : "password"} id="Pswrd" name="Pswrd" required placeholder='password' className='resetpaswrdInputareaPswrd' onChange={(event) => setNewPassword(event.target.value)} />
                            <div style={{ textAlign: "left",marginBottom:"10px",}}>
                                <input type='checkbox' onChange={(event) => setShowNewPassword(event.target.checked)} />Show Password
                            </div>
                        </div>

                        <div style={{width:"320px"}}>
                            <input type="password" id="Pswrd" name="Pswrd" required placeholder='confirmpassword' className='resetpaswrdInputareaPswrd' onChange={(event) => setConfirmNewPassword(event.target.value)} />
                        </div>

                        <button className='resetPBTn' onClick={findCustomer}>Submit</button>
                    </div>

                </div>

            </div>


        </div>

    )
}

export default ForgotResetPswrd