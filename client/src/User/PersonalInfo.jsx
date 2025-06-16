import React, { useEffect, useState } from 'react'
import wishlistimage from './UserImages/wishlistprofile.jpg'
import { Link, useNavigate } from 'react-router-dom'
import myordericon from './UserImages/iconsMyorder.png'
import arrowpath from './UserImages/arrowpathwishlist.png'
import accountinfoicon from './UserImages/acountinfoicon.png'
import paymenticon from './UserImages/paymenticonwishlist.png'
import mystufficon from './UserImages/mystuff.png'
import logouticon from './UserImages/logout.jpg'
import profilebottomimg from './UserImages/profilepagebotttomimg.png'
import axios from 'axios'

const PersonalInfo = () => {
    const Id = sessionStorage.getItem("customerId")
    const [isEditing, setIsEditing] = useState(false);
    const [isEditEmail, setIsEditEmail] = useState(false);
    const [isEditPhone, setIsEditPhone] = useState(false);
    // const [isEditAddress, setIsEditAddress] = useState(false);
    const [showCustomer, setShowCustomer] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [editcustomer, setEditcustomer] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
       
        axios.get(`http://localhost:5000/getCustomer/${Id}`).then((response) => {

            const data = response.data;
            console.log(data);
            setShowCustomer(data)
            setName(data.customerName)
            setEmail(data.customerEmail)
            setPhone(data.customerContact)
            setAddress(data.customerAddress)
            setEditcustomer(data._id)
        })

    }, [])


    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleEditEmailClick = () => {
        setIsEditEmail(true);
    };
    const handleEditPhoneClick = () => {
        setIsEditPhone(true);
    }

    const handleSaveClick = () => {
        const data = {
            customerName: name,
            customerEmail: email,
            customerContact: phone,
            customerAddress: Address,
        }
        axios.put(`http://localhost:5000/updateCustomer/${editcustomer}`, data).then((response) => {
            console.log(response.data);
        })
        setIsEditing(false);
        setIsEditEmail(false);
        setIsEditPhone(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setIsEditEmail(false);
        setIsEditPhone(false);

    };

    const handleLogout = () =>{
        sessionStorage.clear("customerId", Id)
        navigate("/Guest/Login")
      }

    return (
        <div>
            <div className='productDetailsPagehoverPrdctNames'>
                <span className='spanRelatedPrdctNames'>Electronics</span>
                <span className='spanRelatedPrdctNames'>TVs & Appliences</span>
                <span className='spanRelatedPrdctNames'>Men</span>
                <span className='spanRelatedPrdctNames'>Women</span>
                <span className='spanRelatedPrdctNames'>Baby & Kids</span>
                <span className='spanRelatedPrdctNames'>Home & Furniture</span>
                <span className='spanRelatedPrdctNames'>Sports,Books&More</span>
                <span className='spanRelatedPrdctNames'>Flights</span>
                <span className='spanRelatedPrdctNames'>Offer Zone</span>
            </div>

            <div className='wishlistMainDiv'>
                <div >
                    <div className='welcomeDiv'>
                        <div><img src={wishlistimage} alt="img" className='wishlistimage' /></div>
                        <div className='textDivwishlist'>
                            <div style={{ fontFamily: "sans-serif", fontSize: "12px" }}>Hello,</div>
                            <div style={{ fontFamily: "sans-serif", fontSize: "16px", paddingTop: "5px", fontWeight: "bold" }}>{showCustomer.customerName}</div>
                        </div>
                    </div>

                    <div className='MyordersFullDiv'>
                        <div className='MyordersDiv'>
                            <div><img src={myordericon} alt="img" className='myordericon' /></div>
                            <Link to={'/User/Orders'} className='myOrderlink'>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "450px" }}>
                                    <div>  MY ORDERS</div>
                                    <div><img src={arrowpath} alt="img" className='arrowpath' /></div>
                                </div></Link>
                        </div>
                    </div>

                    <div className='accountinfowishlist'>
                        <div><img src={accountinfoicon} alt="img" className='accountinfoicon' /></div>
                        <div className='textaccountinfo'>ACCOUNT INFORMATION</div>
                    </div>


                    <div className='profileinfowishlist'>Profile Information</div>
                    <div className='profileinfowishlist'>Manage Addresses</div>
                    <Link to={'/User/Changepassword'} className='Userlinks'> <div className='paninfowishlist'>Change Password</div></Link>

                    <div className='Paymentswishlist'>
                        <div><img src={paymenticon} alt="img" className='accountinfoicon' /></div>
                        <div className='textaccountinfo'>PAYMENTS</div>
                    </div>

                    <div style={{ display: "flex", }}>
                        <div className='profileinfowishlist'>Gift Cards <span class="PKhkts">₹0</span></div>
                    </div>
                    <div className='profileinfowishlist'>Saved UPI</div>
                    <div className='paninfowishlist'>Saved Cards</div>

                    <div className='Mystuffwishlist'>
                        <div><img src={mystufficon} alt="img" className='accountinfoicon' /></div>
                        <div className='textaccountinfo'>MY STUFF</div>
                    </div>
                    <Link to={'/User/Coupons'} style={{ textDecoration: "none", color: "black" }}> <div className='profileinfowishlist'>My Coupons</div></Link>
                    <div className='profileinfowishlist'>My Reviews & Ratings </div>
                    <div className='Notificationsinfowishlist'>All Notifications  </div>
                    <Link to={'/User/WishList'} className='infowishlistlink'> <div className='infowishlist'>My WishList</div></Link>

                    <div className='logountdivwishlistMain'>
                        <div className='logountdivwishlist'>
                            <div><img src={logouticon} alt="img" className='logouticon' /></div>
                            <button style={{ color: "#878787", fontFamily: "sans-serif", fontSize: "16px", paddingLeft: "20px", fontWeight: "bold", }} onClick={handleLogout}>LOGOUT</button>
                        </div>
                    </div>




                    <div className='frequentvisitFullDiv'>
                        <div class="_3dhhtB">Frequently Visited:</div>
                        <div class="OrderandHelpDiv">
                            <a class="_2YCxI1" href="/account/orders">Track Order</a>
                            <a class="_2YCxI1" href="/helpcentre">Help Center</a>
                        </div>
                    </div>
                </div>
                <div>



                    <div className='myprofileFullDiv'>
                        <div style={{ paddingBottom: "56px" }}>
                            <div class="_1cyhik"><span class="_1mHr1S">Personal Information</span>
                                {!isEditing ? <button className="oKZoMV" onClick={handleEditClick}>Edit</button> : <button className="oKZoMV" onClick={handleCancelClick}>Cancel</button>}
                            </div>

                            <div class="_1TlPi6">

                                <div class="_1YVqbV">
                                    <div class="_1Jqgld">

                                        <input type="text" class="profileInputboxes" name="Name" required="" autocomplete="name" tabindex="1" value={name} onChange={(event) => setName(event.target.value)} disabled={!isEditing} />
                                    </div>
                                </div>

                                <div class="_1YVqbV">
                                    <div class="_1Jqgld">
                                        {/* <input type="text" class="profileInputboxes" name="lastName" autocomplete="name" tabindex="2" value="Joy" disabled={!isEditing} /> */}
                                        {isEditing && <button className="editBtnSave" onClick={handleSaveClick}>SAVE</button>}


                                    </div>
                                </div>

                            </div>

                            <div className='genderHeadingtextDiv'>
                                <span class="_1mHr1S">Your Address</span>
                            </div>
                            <div className='profilegenderradiobtn'>
                                <input type="text" class="profileInputboxes" name="Address" required="" autocomplete="name" tabindex="1" value={Address} onChange={(event) => setAddress(event.target.value)} disabled={!isEditing} />

                            </div>
                        </div>

                        <div style={{ paddingBottom: "46px" }}>
                            <div class="_1cyhik"><span class="_1mHr1S">Email Address</span>
                                {!isEditEmail ? <button className="oKZoMV" onClick={handleEditEmailClick}>Edit</button> : <button className="oKZoMV" onClick={handleCancelClick}>Cancel</button>}
                            </div>

                            <div class="_1TlPi6">

                                <div class="_1YVqbV">
                                    <div class="_1Jqgld">
                                        <input type="text" class="profileEmailInputboxes" name="email" autocomplete="email" required="" value={email} onChange={(event) => setEmail(event.target.value)} disabled={!isEditEmail} />
                                    </div>
                                </div>

                                <div class="_1YVqbV">
                                    <div class="_1Jqgld">
                                        {isEditEmail && <button className="editBtnSave" onClick={handleSaveClick}>SAVE</button>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ paddingBottom: "46px" }}>
                            <div class="_1cyhik"><span class="_1mHr1S">Mobile Number</span>
                                {!isEditPhone ? <button className="oKZoMV" onClick={handleEditPhoneClick}>Edit</button> : <button className="oKZoMV" onClick={handleCancelClick}>Cancel</button>}
                            </div>

                            <div class="_1TlPi6">

                                <div class="_1YVqbV">
                                    <div class="_1Jqgld">
                                        <input type="text" class="profileMobileInputboxes" name="mobileNumber" autocomplete="tel" required="" value={phone} onChange={(event) => setPhone(event.target.value)} disabled={!isEditPhone} />
                                    </div>
                                </div>

                                <div class="_1YVqbV">
                                    <div class="_1Jqgld">
                                        {isEditPhone && <button className="editBtnSave" onClick={handleSaveClick}>SAVE</button>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="_2PTLbk">FAQs</div>

                        <div style={{ paddingBottom: "24px" }}>
                            <h4 id="what-happens-when-i-update-my-email-address-or-mobile-number-">What happens when I update my email address (or mobile number)?</h4>
                            <p style={{ fontFamily: "sans-serif", fontSize: "14px" }}>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                            <h4 id="when-will-my-flipkart-account-be-updated-with-the-new-email-address-or-mobile-number-">When will my Flipkart account be updated with the new email address (or mobile number)?</h4>
                            <p style={{ fontFamily: "sans-serif", fontSize: "14px" }}>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                            <h4 id="what-happens-to-my-existing-flipkart-account-when-i-update-my-email-address-or-mobile-number-">What happens to my existing Flipkart account when I update my email address (or mobile number)?</h4>
                            <p style={{ fontFamily: "sans-serif", fontSize: "14px" }}>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                            <h4 id="does-my-seller-account-get-affected-when-i-update-my-email-address-">Does my Seller account get affected when I update my email address?</h4>
                            <p style={{ fontFamily: "sans-serif", fontSize: "14px" }}>Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
                        </div>

                        <div style={{
                            color: "#2874F0", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "bold",
                            padding: "24px 0px 0px"
                        }}>Deactivate Account</div>

                    </div>



                    <img src={profilebottomimg} alt="img" style={{ width: "895.250px", height: "162.578px", backgroundColor: "#FFFFFF", marginLeft: "16px" }} />
                </div>


            </div>
        </div>
    )
}

export default PersonalInfo