import React, { useEffect, useState } from 'react'
import infoicon from './UserImages/infoicon.png'
import safetyimg from './UserImages/safetyimg.jpg'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import axios from 'axios'
import paymentsucessImage from './UserImages/paymentSucessPage.jpg'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
    const Id = sessionStorage.getItem("customerId");
console.log(Id);
    const [showBookedProduct, setShowBookedProduct] = useState([]);
    const [priceDetails, setPriceDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [showCustomerName, setShowCustomerName] = useState([]);
    const [showCustomerAddress, setShowCustomerAddress] = useState([]);
    const [showCustomerContact, setShowCustomerContact] = useState([]);
    const [showCustomerEmail, setShowCustomerEmail] = useState([]);
    const [showDiv, setShowDiv] = useState(false)
    const [continueDivDisabled, setContinueDivDisabled] = useState(false);
    const [cartprdctSpecificationDiv, setCartprdctSpecificationDiv] = useState(false)
    const [showcardPayment, setShowCardPayment] = useState(false)
    const [getBookingId, setbookingId] = useState()
    const [isLightVisible, setLightVisible] = useState(false);
    const [isFadeVisible, setFadeVisible] = useState(false);
    const [bookingDate, setBookingDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleButtonClick = () => {
        setShowDiv(true);
        setContinueDivDisabled(true);
        setCartprdctSpecificationDiv(true);
    };

    const handleOpenCardPayment = () => {
        setShowCardPayment(true)
    }

    const handleclose = () => {
        setLightVisible(false);
        setFadeVisible(false);
    }




    const addCartProduct = () => {
        axios.get(`http://localhost:5000/cartWithBooking/${Id}`).then((response) => {
            console.log(response.data);

            const getBookingId = response.data[0]._id
            const cartLength = response.data.length;
            console.log(getBookingId);
            setbookingId(cartLength)

            const data = response.data;
            setShowBookedProduct(data);





        })
    }


    const getUser = () => {
        axios.get(`http://localhost:5000/getCustomer/${Id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setShowCustomerName(data.customerName);
            setShowCustomerAddress(data.customerAddress);
            setShowCustomerContact(data.customerContact);
            setShowCustomerEmail(data.customerEmail)
        })
    }


    const incrementCount = (id) => {

        axios.put(`http://localhost:5000/updateIncrementCart/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setPriceDetails(data.cartQuantity)
            addCartProduct()

            calculateTotal()
        })
    };

    const decrementCount = (id) => {
        axios.put(`http://localhost:5000/updateDecrementCart/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setPriceDetails(data.cartQuantity);
            addCartProduct();
            calculateTotal()
        })


    };

    const Wishlist = (prdctId) => {
        const data = {
            productId: prdctId,
            customerId: Id
        }
        axios.post(`http://localhost:5000/Wishlist`, data).then((response) => {
            console.log(response.data);
            alert(response.data.message)
        })

    }

    const removeCart = (id) => {
        axios.delete(`http://localhost:5000/deleteCart/${id}`).then((response) => {
            console.log(response.data);
            addCartProduct();
        })
    }

    const calculateTotal = () => {
        axios.get(`http://localhost:5000/CartTotal/${Id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setTotalPrice(data)
        })
    }

    const placeOrder = () => {
        var dat = {
            email: showCustomerEmail,
            customerName: showCustomerName, 
            // customerId : Id
          };

        axios.post(`http://localhost:5000/placeOrder/${Id}`,dat).then((response) => {
            console.log(response.data);
        })


        // 
        setIsLoading(true);
        setFadeVisible(true);


        setTimeout(() => {
            // Simulated payment success
            setIsLoading(false); // Hide loading animation
            setLightVisible(true);
            setFadeVisible(true);

        }, 2000);


        console.log(dat);
    }

    const calculateFutureDate = () => {
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 7);
        const options = { weekday: 'short', month: 'short', day: 'numeric' }; // Customize date format
        const formattedDate = futureDate.toLocaleDateString('en-US', options); // Format date
        setBookingDate(formattedDate);
    };

    useEffect(() => {
        addCartProduct();
        calculateTotal();
        getUser();
        calculateFutureDate();
    }, [])



    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputExpiryChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputCvvChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }


    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const handleInputFocusExpiry = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const handleInputFocusCvv = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }


    return (
        <div className='cartMaindiv'>
            <div>

                <div className='cartheadlinesdivCheckout'>
                    <div className='headlines'>
                        <div className='_3ENQxz'>1</div>
                    </div>
                    <div>
                        <div className='headlineLogin'>LOGIN
                            <svg height="10" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="_1t8m48"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" stroke="#2974f0"></path></svg>
                        </div>
                        <div>
                            <div style={{ display: "flex" }}>
                                <div>{showCustomerName}</div>
                                <div>{showCustomerContact}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='cartheadlinesdivCheckout' style={{ marginTop: "10px" }}>
                    <div className='headlines'>
                        <div className='_3ENQxz'>2</div>
                    </div>

                    <div>

                        <div className='headlineLogin'>DELIVERY ADDRESS
                            <svg height="10" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="_1t8m48"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" stroke="#2974f0"></path></svg>
                        </div>

                        <div>
                            <div>
                                <div>{showCustomerAddress}</div>

                            </div>
                        </div>



                    </div>



                </div>




                {!showDiv ?
                    <div className='orderSummaryDiv'>
                        <div className='_3ENQxzSummary'>3</div>
                        <div style={{ fontFamily: "Roboto,Arial,sans-serif", fontWeight: "600" }}>ORDER SUMMARY</div>
                    </div> :

                    <div className='cartheadlinesdivCheckout' style={{ marginTop: "10px" }}>
                        <div className='headlines'>
                            <div className='_3ENQxz'>3</div>
                        </div>
                        <div>
                            <div className='headlineLogin'>ORDER SUMMARY
                                <svg height="10" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="_1t8m48"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" stroke="#2974f0"></path></svg>
                            </div>
                            <div>
                                <div style={{ display: "flex" }}>
                                    {getBookingId} items
                                </div>
                            </div>
                        </div>
                    </div>}


                {!showDiv ?
                    <div className='cartprdctSpecificationDiv'>


                        <div style={{
                            width: "242px",
                            height: "19.594px", display: "flex",
                            position: "absolute",
                            left: "640px"
                        }}> Delivery by {bookingDate} | <div style={{ color: "#878787", marginRight: "5px", marginLeft: "3px" }}>₹40</div></div>

                        {showBookedProduct.map((cartProducts, key) => (
                            <div>
                                <div className='prdctSpecificationandImage'>
                                    <div className='pixelImage'><img src={cartProducts.productId.prdctimgsrc} alt="img" style={{ width: "112px", height: "92px", objectFit: "contain" }} /></div>
                                    <div className='pixel7aSpecifications'>
                                        <div style={{
                                            fontFamily: "Arial, Helvetica, sans-serif",
                                            fontSize: "16px"
                                        }} >{cartProducts.productId.productName}</div>


                                        <div style={{
                                            fontFamily: "Arial, Helvetica, sans-serif",
                                            fontSize: "12px", color: "#878787", marginTop: "8px"
                                        }} >Seller:IndiFlashMart</div>

                                        <div style={{ display: "flex", }}>

                                            <del style={{ color: "#878787", fontSize: "14px", margin: "22px 10px 0px 0px", fontFamily: "Arial, Helvetica, sans-serif" }}>₹43,999</del>
                                            <div style={{ fontSize: "18px bold", margin: "18px 8px 0px 0px", }}>{cartProducts.productId.productRate}</div>
                                            <div style={{ color: "#388E3C", fontSize: "14px", margin: "22px 12px 0px 0px" }}>13% Off</div>
                                            <div style={{ color: "#388E3C", fontSize: "14px", margin: "22px 0px 0px 0px" }}>2 offers applied</div> <img src={infoicon} alt="img" style={{ width: "14px", height: "14px", objectFit: "contain", margin: "18px 0px 50px 0px" }} />
                                        </div>

                                    </div>


                                </div>

                                {/* { console.log(cartProducts._id)
                           } */}
                                <div className='quatityAndRemove'>
                                    <button style={{ width: "28px", height: "28px", padding: "1px", borderRadius: "50%", border: "1px solid #e4e7ed" }} onClick={() => decrementCount(cartProducts._id)}>-</button>

                                    <div style={{ width: "46px", height: "28px", border: "1px solid #e4e7ed", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "5px", marginRight: "5px" }}>{cartProducts.cartQuantity}</div>
                                    <button style={{ width: "28px", height: "28px", padding: "1px", borderRadius: "50%", border: "1px solid #e4e7ed" }} onClick={() => incrementCount(cartProducts._id)}>+</button>
                                    <button style={{ fontSize: "16px", fontFamily: "sans-serif", marginLeft: "20px", marginRight: "10px", marginTop: "5px", border: "none", backgroundColor: "#FFFFFF" }} onClick={() => Wishlist(cartProducts.productId._id)}>WISHLIST</button>
                                    <button style={{ fontSize: "16px", fontFamily: "sans-serif", marginLeft: "10px", marginRight: "10px", marginTop: "5px", border: "none", backgroundColor: "#FFFFFF" }} onClick={() => removeCart(cartProducts._id)}>REMOVE</button>
                                </div>
                            </div>
                        ))}
                    </div> : cartprdctSpecificationDiv}

                {!showDiv ?
                    <div className='placeorderContinueDiv'>
                        <div style={{ display: "flex" }}>
                            <div style={{ fontFamily: "sans-serif", marginRight: "4px" }}> Order confirmation email will be sent to</div> <div style={{ fontWeight: "bolder", fontFamily: "sans-serif" }}>{showCustomerEmail}</div>
                        </div>
                        <button className='placeOrderbtn' onClick={handleButtonClick}>CONTINUE</button>
                    </div> : continueDivDisabled}


                <div className={showDiv ? 'paymentOptionDiv blueBackgroundPaymentOptionDiv' : 'paymentOptionDiv'}>
                    <div className='_3ENQxzSummary'>4</div>
                    <div style={{ fontFamily: "Roboto,Arial,sans-serif", fontWeight: "600" }}>PAYMENT OPTIONS</div>
                </div>

                {showDiv && (

                    <div className='cardPaymentOpening' onClick={handleOpenCardPayment}>
                        <div>
                            <input type="radio" id="" name="" value="" checked />
                            <label for="html" style={{ marginLeft: "10px", fontFamily: "Roboto,Arial,sans-serif" }}>Credit/Debit/ATM Card</label>
                            <div class="_2cAhoH">Add and secure cards as per RBI guidelines</div>
                        </div>
                    </div>

                )}


                {showcardPayment && (
                    <div className='cardPayment'>

                        <div style={{ display: "flex" }}>
                            <div style={{ margin: "16px 25px 0px 18px" }}>
                                <Cards
                                    number={state.number}
                                    expiry={state.expiry}
                                    cvc={state.cvc}
                                    name={state.name}
                                    focused={state.focus}
                                />
                            </div>
                            <div style={{ marginTop: "16px" }}>

                                <input
                                    style={{ width: "285px", height: "31px", padding: "20px 16px 0px 13px", border: "1px solid #ccc" }}
                                    type="number"
                                    name="number"
                                    placeholder="Card Number"
                                    value={state.number}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                                <div style={{ display: "flex" }}>
                                    <div>
                                        <input
                                            style={{ width: "175px", height: "28px", padding: "9px 7px 9px 16px", margin: "0px 12px 0px 0px", border: "1px solid #ccc", marginTop: "16px" }}
                                            type="number"
                                            name="expiry"
                                            placeholder="Valid Thru"
                                            value={state.expiry}
                                            onChange={handleInputExpiryChange}
                                            onFocus={handleInputFocusExpiry}
                                        />
                                    </div>

                                    <div>
                                        <input
                                            style={{ width: "97px", height: "28px", padding: "9px 7px 9px 16px", border: "1px solid #ccc", marginTop: "16px" }}
                                            type="number"
                                            name="cvc"
                                            placeholder="CVV"
                                            value={state.cvc}
                                            onChange={handleInputCvvChange}
                                            onFocus={handleInputFocusCvv}
                                        />

                                    </div>
                                </div>
                                <div>
                                    <button className='btnPayCheckOut' onClick={placeOrder}>PAY ₹{totalPrice}</button>

                                    {isLoading &&
                                        <div id="light" class="loader-white_content">
                                            <div class="loader"></div>
                                        </div>
                                    }
                                  
                                    {isLightVisible &&

                                        <div id="light" class="white_content">
                                            <div style={{ fontSize: "28",display:"flex",justifyContent:"center" }}>
                                                <img src={paymentsucessImage} alt='img' className='paymentsucessImage'></img>
                                            </div>
                                            <div className='msg1Scss'> Your Payment is Successfull</div>
                                            <div  className='msg2Scss'>Thank you for your Payment. an automated payment receipt will be sent to your registered email.</div>
                                           <div className='lnkHome'>

                                            <Link to={'/User'} className='lnkHome'>Back to Home</Link>
                                           </div>
                                        </div>}

                                    {isFadeVisible && <div id="fade" class="black_overlay"></div>}

                                </div>
                            </div>

                        </div>


                    </div>
                )}

            </div>






            <div className='orderSummary'>
                <span className='PricedetailsDiv'>PRICE DETAILS</span>
                <div className='priceAndValue'>
                    <div className='orderSummarypricediv'>Price({priceDetails} items)</div>
                    <span className="orderSummaryValueediv">{totalPrice}</span>
                </div>



                <div className='priceAndValue'>
                    <div className='orderSummarydeliverydiv'>Delivery Charges</div>
                    <span className="orderSummarydiscountdiv"><div style={{ color: "#717478" }}>₹40</div></span>
                </div>

                <div className='priceAndValue'>
                    <div className='packagingFeediv'>Secured Packaging Fee</div>
                    <span className="orderSummarydiscountdiv">₹69</span>
                </div>

                <div className='amountfulldiv'>
                    <div className='totalAmountdiv'>
                        <div className='amountTag'>Total Amount</div>
                        <div className='amount'>{totalPrice + 40 + 69}</div>
                    </div>
                </div>


                <div class="_1RVm3P">
                    <div ><img src={safetyimg} alt="img" className='safetyshieldimg' /></div>
                    <div style={{ marginLeft: "10px" }}> Safe and Secure Payments.Easy returns.100% Authentic products.</div></div>
            </div>
        </div >
    )
}


export default CheckoutPage