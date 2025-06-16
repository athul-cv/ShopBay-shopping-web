import React, { useEffect, useState } from 'react'
import wishlistimage from './UserImages/wishlistprofile.jpg'
import { Link } from 'react-router-dom'
import myordericon from './UserImages/iconsMyorder.png'
import arrowpath from './UserImages/arrowpathwishlist.png'
import accountinfoicon from './UserImages/acountinfoicon.png'
import paymenticon from './UserImages/paymenticonwishlist.png'
import mystufficon from './UserImages/mystuff.png'
import logouticon from './UserImages/logout.jpg'
import axios from 'axios'


const Changepassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const Id = sessionStorage.getItem("customerId");

  useEffect(() => {

    axios.get(`http://localhost:5000/getCustomer/${Id}`).then((response) => {
      // console.log(response.data);
      const data = response.data;
      setLogPassword(data);
    })
  }, [])




  const changePassword = async () => {
    // if (logPassword.customerPassword !== oldPassword) {
    //   setError('Old password is incorrect.');
    //   return;
    // }

    if (newPassword != confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

      if (newPassword === confirmNewPassword) {
        logPassword.customerPassword = newPassword;

        var data = {
          logedpswrd: logPassword,
          oldpaswrd : oldPassword,
        }
        axios.put(`http://localhost:5000/updateCustomer/${Id}`, data).then((response) => {
          console.log(response.data);
          setError(response.data);
          setUpdateMessage();
        })
    }

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
            <div style={{ fontFamily: "sans-serif", fontSize: "16px", paddingTop: "5px", fontWeight: "bold" }}>{logPassword.customerName}</div>
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
            <div style={{ color: "#878787", fontFamily: "sans-serif", fontSize: "16px", paddingLeft: "20px", fontWeight: "bold", }}>LOGOUT</div>
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


      <div className='myprofileFullDiv'>
        <div className='chngPswrdtxtDiv'>Change Password</div>
        <div style={{ fontFamily: "sans-serif" }}>Old Password:</div>
        <div class="_1YVqbV">
          <div class="_1Jqgld">

            <input type={showPassword ? "text" : "password"} class="oldpswrdInputboxes" onChange={(event) => setOldPassword(event.target.value)} />
            <input type='checkbox' onChange={(event) => setShowPassword(event.target.checked)} />Show Password
          </div>
        </div>
        <div style={{ marginTop: "8px", marginBottom: "16px", fontFamily: "sans-serif" }}>Your password must be atleast six characters and cannot contain spaces.</div>
        <div style={{ fontFamily: "sans-serif" }}>New Password:</div>
        <div class="_1YVqbV">
          <div class="_1Jqgld">

            <input type={showNewPassword ? "text" : "password"} class="oldpswrdInputboxes" onChange={(event) => setNewPassword(event.target.value)} />
            <input type='checkbox' onChange={(event) => setShowNewPassword(event.target.checked)} />Show Password
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <div style={{ fontFamily: "sans-serif" }}> Confirm New Password:</div>
          <div class="_1YVqbV">
            <div class="_1Jqgld">

              <input type="text" class="oldpswrdInputboxes" onChange={(event) => setConfirmNewPassword(event.target.value)} />

            </div>
          </div>
        </div>
        <button className='btnsetPswrd' onClick={changePassword}>Set Password</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {updateMessage && <p style={{ color: 'green' }}>{updateMessage}</p>}
      </div>







    </div>
  </div>
)
}

export default Changepassword