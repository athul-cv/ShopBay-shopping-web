import React from 'react'
import wishlistimage from './UserImages/wishlistprofile.jpg'
import { Link } from 'react-router-dom'
import myordericon from './UserImages/iconsMyorder.png'
import arrowpath from './UserImages/arrowpathwishlist.png'
import accountinfoicon from './UserImages/acountinfoicon.png'
import paymenticon from './UserImages/paymenticonwishlist.png'
import mystufficon from './UserImages/mystuff.png'
import logouticon from './UserImages/logout.jpg'

const Coupons = () => {
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
                            <div style={{ fontFamily: "sans-serif", fontSize: "16px", paddingTop: "5px", fontWeight: "bold" }}>Abi Joy</div>
                        </div>
                    </div>

                    <div className='MyordersFullDiv'>
                        <div className='MyordersDiv'>
                            <div><img src={myordericon} alt="img" className='myordericon' /></div>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "450px" }}>
                                <div><Link to={'/User/Orders'} className='myOrderlink'>MY ORDERS</Link></div>
                                <div><img src={arrowpath} alt="img" className='arrowpath' /></div>
                            </div>
                        </div>
                    </div>

                    <div className='accountinfowishlist'>
                        <div><img src={accountinfoicon} alt="img" className='accountinfoicon' /></div>
                        <div className='textaccountinfo'>ACCOUNT INFORMATION</div>
                    </div>


                    <Link to={'/User/PersonalInfo'} className='Userlinks'>  <div className='profileinfowishlist'>Profile Information</div></Link>
                    <div className='profileinfowishlist'>Manage Addresses</div>
                    <div className='paninfowishlist'>PAN Card Information</div>

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
                    <div className='profileinfowishlist'>My Coupons</div>
                    <div className='profileinfowishlist'>My Reviews & Ratings </div>
                    <div className='Notificationsinfowishlist'>All Notifications  </div>
                    <div className='infowishlist'><Link to={'/User/WishList'} className='infowishlistlink'>My WishList</Link>  </div>

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

                <div className='wishlistitemsDiv'>
                    <div className='Couponsitemshead'>Available Coupons</div>




                    <div className='couponsAddArea'>
                        <div className='couponsDiv'>
                            <div className='couponsDetailsDiv'>
                                <div style={{
                                    color: "#26A541",
                                    fontSize: "16px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "bold"
                                }}>Get Extra 20% Off</div>

                                <div style={{
                                    color: "#878787",
                                    fontSize: "14px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "500"
                                }}>Valid till 31 Jan, 2024 </div>
                            </div>

                            <div className='couponsDetailsDiv2'>
                                <div class="Rp7nDO">Get extra 20% off on 1 item(s) (price inclusive of cashback/coupon)</div>

                                <div style={{
                                    color: "#2874F0",
                                    fontSize: "14px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "600",
                                    margin: "0px 0px 0px 5px"
                                }}>View T&C </div>

                            </div>
                        </div>

                        <div className='couponsDiv'>
                            <div className='couponsDetailsDiv'>
                                <div style={{
                                    color: "#26A541",
                                    fontSize: "16px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "bold"
                                }}>Get Extra 15% Off</div>

                                <div style={{
                                    color: "#878787",
                                    fontSize: "14px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "500"
                                }}>Valid till 31 Jan, 2024 </div>
                            </div>

                            <div className='couponsDetailsDiv2'>
                                <div class="Rp7nDO">Get extra 15% off on 1 item(s) (price inclusive of cashback/coupon)</div>

                                <div style={{
                                    color: "#2874F0",
                                    fontSize: "14px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "600",
                                    margin: "0px 0px 0px 5px"
                                }}>View T&C </div>

                            </div>

                        </div>

                        <div className='couponsDiv'>
                            <div className='couponsDetailsDiv'>
                                <div style={{
                                    color: "#26A541",
                                    fontSize: "16px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "bold"
                                }}>Flat 1200 Off</div>

                                <div style={{
                                    color: "#878787",
                                    fontSize: "14px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "500"
                                }}>Valid till 31 Jan, 2024 </div>
                            </div>

                            <div className='couponsDetailsDiv2'>
                                <div class="Rp7nDO">Get extra ₹1200 off on 1 items (price inclusive of cashback/coupon)</div>

                                <div style={{
                                    color: "#2874F0",
                                    fontSize: "14px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "600",
                                    margin: "0px 0px 0px 5px"
                                }}>View T&C </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div >
    )
}


export default Coupons