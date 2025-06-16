import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import axios from 'axios';


const OtpPage = () => {
    const getOtp = sessionStorage.getItem("sendedOTP");
    const getEmail = sessionStorage.getItem("sendedEmail");
    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    const [showError, setShowError] = useState('');
    const [timer, setTimer] = useState(60); // 1 minute in seconds

   

    const checkOTP = () => {
        const otpTimestamp = sessionStorage.getItem("otpTimestamp");
        const currentTime = Date.now();
        const timeout = 1 * 60 * 1000; // 1 minute in milliseconds

        if (!getOtp || !otpTimestamp || currentTime - otpTimestamp > timeout) {
            setShowError("OTP expired! Please request a new one.");
        } else if (otp === getOtp) {
            navigate("/ForgotResetPswrd");
        } else {
            setShowError("Verification Failed! Please enter the correct OTP.");
        }
    };
    

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const regenerateOTP = () => {
        var dat = {
            email: getEmail,
          
          };
        axios.post('http://localhost:5000/sendOTP',dat )
            .then((response) => {
                console.log(response.data.Email);
                sessionStorage.setItem("sendedOTP", response.data.OTP);
                sessionStorage.setItem("otpTimestamp", Date.now());
                setShowError('');
                setTimer(60); // Reset timer to 1 minute
            })
            .catch((error) => {
                console.error("Error sending OTP:", error);
                setShowError("Failed to regenerate OTP. Please try again.");
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='OTPHOMEDIV'>
            <div className="-XmWnMOTP ">
                <div className="s2gOFdOTP">Verify Your Account</div>
                <div className="orqM3-OTP">We are sending a OTP to validate your</div>
                <div className="orqM3-OTP">email account, Hang on!</div>
                <div className='otpDiv'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        containerStyle={{ marginBottom: "40px" }} // Adjust width and height as needed
                        inputStyle={{ width: '50px', height: '50px', fontSize: '18px', margin: "0px 10px" }} // Adjust input width, height, and font size
                        renderInput={(props) => <input {...props} />}
                    />
                </div>

                <div className='OtpErrDiv'>
                {showError}
                </div>

                <div className="orqM3-OTPCntnt">A OTP sent to <b style={{ color: "black" }}>{getEmail}</b></div>
                <div className="orqM3-OTPCntnt" style={{marginTop:"6px"}}>
                    OTP expires in: {formatTime(timer)}
                </div>
                <button className='btnOTPPage' onClick={checkOTP}>Submit</button>
                 
                <div style={{marginTop:"16px"}}>
                <button className='btnreGenerateOTP' onClick={regenerateOTP}>Regenerate OTP</button>
                </div>


            </div>
        </div>
    )
}

export default OtpPage