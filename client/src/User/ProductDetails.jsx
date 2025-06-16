import React, { useEffect, useState } from 'react'
import memmoryCard from './UserImages/memmcard1.jpg'
import assuredlogo from './UserImages/flipkartAssuredlogo.png'
import ratingstar from './UserImages/ratingstar.png'
import tag from './UserImages/tag.png'
import wishlistIcon from './UserImages/wishlistIcon.svg'
import sandisklogo from './UserImages/sandisklogo.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const percentage = 20;

    const navigate = useNavigate()

    const { id } = useParams();

    const [showHeart, setShowHeart] = useState(false);

    const [showProduct, setShowProduct] = useState([]);
    const [showGallery, setShowGallery] = useState([]);
    const [review, setReview] = useState([]);
    const [bookingDate, setBookingDate] = useState('');
    const [pincode, setPincode] = useState('');
    const [result, setResult] = useState(null);

    // const [customerBookingId,SetcustomerBookingId] = useState('');
    // const [bookingDate,setBookingDate] = useState('');

    const Id = sessionStorage.getItem("customerId");

    const wishlistedPrdct = () => {
        axios.get(`http://localhost:5000/getWishlistPrdct/${id}`).then((response) => {
            console.log(response.data);
            setShowHeart(response.data)
        })
    }
    const fetchProduct = () => {
        axios.get(`http://localhost:5000/getProductwithId/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data[0];
            setShowProduct(data);
            // console.log(parseInt(showProduct.productRate)+40+69);
        })
    }

    const fetchGallery = () => {
        axios.get(`http://localhost:5000/galleryWithProduct/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setShowGallery(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const AddToCart = () => {

        const currentDateAndTime = moment().format("DD MMM YY");
        const futureDateAndTime = moment().add(7, 'days').format("DD MMM YY");
        const futureDayName = moment().add(4, 'days').format("dddd");

        console.log("Future Day Name:", futureDayName);


        const data = {
            customerId: Id,
            bookingDate: currentDateAndTime,
            deliveryDate: futureDateAndTime,
            dayName: futureDayName
            // bookingTotalAmount:showProduct.productRate + 40 + 69

        }
        axios.post('http://localhost:5000/Booking', data).then((response) => {
            console.log(response.data);
            const bookingData = {
                bookingId: response.data._id,
                productId: id,
            }
            axios.post('http://localhost:5000/Cart', bookingData).then((response) => {
                console.log(response.data.message);
                toast.success(response.data.message);
                setTimeout(() => navigate("/User/PageCart"), 2000)


            })
        })
    }




    const buyNow = () => {
        const currentDateAndTime = moment().format("DD MMM YY");
        const futureDateAndTime = moment().add(7, 'days').format("DD MMM YY");
        const futureDayName = moment().add(4, 'days').format("dddd");

        console.log("Future Day Name:", futureDayName);


        const data = {
            customerId: Id,
            bookingDate: currentDateAndTime,
            deliveryDate: futureDateAndTime,
            dayName: futureDayName
            // bookingTotalAmount:showProduct.productRate + 40 + 69

        }
        axios.post('http://localhost:5000/Booking', data).then((response) => {
            console.log(response.data);
            const bookingData = {
                bookingId: response.data._id,
                productId: id,
            }
            axios.post('http://localhost:5000/Cart', bookingData).then((response) => {
                console.log(response.data.message);

            })
            axios.post(`http://localhost:5000/buyNowStatusChange/${Id}`).then((response) => {
                console.log(response.data);
            })

        })
    }

    const Wishlist = (prdctId) => {
        const data = {
            productId: prdctId,
            customerId: Id
        }
        axios.post(`http://localhost:5000/Wishlist`, data).then((response) => {
            console.log(response.data);
            toast.success(response.data)
        })
        setShowHeart(!showHeart); // Toggle the value of showHeart
    }

    const getRateAndReview = () => {
        axios.get(`http://localhost:5000/getReview/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setReview(data);


            const sumOfRatings = response.data.sumOfRatings;
            const totalReviewsCount = response.data.totalReviewsCount;

            // Calculate average rating out of 5
            let averageRatingOutOf5 = 0;
            if (totalReviewsCount !== 0) {
                averageRatingOutOf5 = (sumOfRatings / totalReviewsCount) * (5 / 100);
            }

            // Now you can use the averageRatingOutOf5 variable as needed
            console.log('Average Rating (out of 5):', averageRatingOutOf5);

        })
    }

    const calculateFutureDate = () => {
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 7);
        const options = { weekday: 'short', month: 'short', day: 'numeric' }; // Customize date format
        const formattedDate = futureDate.toLocaleDateString('en-US', options); // Format date
        setBookingDate(formattedDate);
    };

    const checkPincode = async () => {
        var data = {
            userPincode: pincode
        }
        console.log(pincode);
        axios.post('http://localhost:5000/checkPincode', data).then((response) => {
            console.log(response.data);
            const data = response.data;
            setResult(data.serviceable ? 'Delivery Available' : 'Delivery Not Available');
        })
    }

    useEffect(() => {
        fetchProduct();
        fetchGallery();
        getRateAndReview();
        calculateFutureDate();
        wishlistedPrdct();
    }, [])
    return (
        <div className='productDetailsMainDiv'>

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





            <div style={{ display: "flex", backgroundColor: "white" }}>
                <div className='carousel-container'>

                    <div className='wishlistIconDivPrdctdtls'>
                        <div className='wishlistIconDiv2Prdctdtls'>
                            <button onClick={() => Wishlist(showProduct._id)}>
                                {showHeart ? (

                                    <svg xmlns="http://www.w3.org/2000/svg" class="N1bADF" width="16" height="16" viewBox="0 0 20 16">
                                        <path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="#ff4343" class="x1UMqG" stroke="#FFF" fill-rule="evenodd" opacity=".9"></path>
                                    </svg>
                                ) : (
                                    <img src={wishlistIcon} alt="img" />
                                )}
                            </button>
                        </div>
                    </div>

                    <Carousel showArrows={false} showStatus={false} showIndicators={false} axis={'horizontal'} style={{ display: 'flex' }}>

                        <div className='prdctDetailImagediv'>
                            <img src={showProduct.prdctimgsrc} alt='img' style={{ objectFit: "contain", height: "426px" }} />
                        </div>
                        {
                            showGallery.map((galleryImg, key) => (
                                <div className='prdctDetailSubImagediv'>
                                    <img src={galleryImg.Galleryimgsrc} alt='img' style={{ objectFit: "contain" }} />
                                </div>

                            ))
                        }




                    </Carousel>




                    <div className='buyButtons'>
                        <button className='btnAddcart' onClick={AddToCart}>ADD TO CART</button>
                        <ToastContainer

                            position='bottom-center'
                            autoClose='5000'
                            theme='dark'
                            hideProgressBar="true"

                        />
                        <Link to={`/User/BuyNowCheckout/${showProduct._id}`} className='Userlinks'><button className='btnBuynow' onClick={buyNow}>BUY NOW</button></Link>
                    </div>
                </div>


                <div style={{ margin: "10px", flex: 5, height: "717.562px", overflowY: "scroll", scrollbarWidth: "none" }}>

                    <div style={{
                        fontSize: "18px",
                        color: "#black",
                        fontFamily: "Roboto,Arial,sans-serif",
                        paddingTop: "10px"
                    }}> {showProduct.ProductDescription}</div>

                    <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                        <div style={{
                            width: "39.47px",
                            height: "19px",
                            backgroundColor: "green",
                            color: "white",
                            padding: "2px 4px 2px 6px",
                            borderRadius: "3px",
                            marginRight: "10px",
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: "center",
                            fontFamily: "Roboto,Arial,sans-serif"
                        }}>4.4 <img src={ratingstar} alt="img" className='ratingstar' /></div>

                        <div style={{
                            color: "#878787",
                            marginRight: "10px",
                            fontFamily: "Roboto,Arial,sans-serif"
                        }}>40,193 Ratings & 3,077 Reviews</div>
                        <div><img src={assuredlogo} alt="img" className='flipkartAssuredlogo' /></div>
                    </div>

                    <div style={{
                        fontSize: "14px",
                        color: "#388e3c",
                        fontFamily: "Roboto,Arial,sans-serif",
                        fontWeight: 500,
                        marginTop: "15px",
                        marginBottom: "10px"
                    }}
                    ><b>special price</b></div>

                    <div style={{ display: "flex", alignItems: "center" }}>

                        <div style={{ fontFamily: "Roboto,Arial,sans-serif", fontSize: "28px" }}>{showProduct.productRate}</div>

                        <div style={{ fontSize: "16px", marginLeft: "12px", color: "#878787", fontFamily: "Roboto,Arial,sans-serif" }}><del>₹1800</del></div>
                        <div style={{ fontSize: "16px", marginLeft: "12px", color: "#388e3c", letterSpacing: "1px", fontFamily: "Roboto,Arial,sans-serif" }}>51%off</div>
                    </div>

                    <div style={{ fontSize: "16px", fontWeight: "500", fontFamily: "Roboto,Arial,sans-serif", marginTop: "15px" }}>Available offers</div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",

                        marginTop: "10px",
                        fontFamily: "Roboto,Arial,sans-serif",
                        fontSize: "14px"
                    }}> <img src={tag} alt="img" className='tagImageflipcart' />  Bank Offer10% off on HDFC Bank Credit Card EMI Transactions, up to ₹1,500 on orders of ₹7,500 and aboveT&C</div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                        fontSize: "14px",
                        fontFamily: "Roboto,Arial,sans-serif"
                    }}> <img src={tag} alt="img" className='tagImageflipcart' />  Bank Offer10% Instant Discount on PNB Credit Cards, up to ₹1500, on orders of ₹5,000 and aboveT&C</div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",

                        marginTop: "10px",
                        fontFamily: "Roboto,Arial,sans-serif",
                        fontSize: "14px"
                    }}> <img src={tag} alt="img" className='tagImageflipcart' />  Bank Offer10% off on Bank of Baroda Credit Card Txns, up to ₹1,500 on orders of ₹5,000 and aboveT&C</div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",

                        marginTop: "10px",
                        fontFamily: "Roboto,Arial,sans-serif",
                        fontSize: "14px"
                    }}> <img src={tag} alt="img" className='tagImageflipcart' />  Special PriceGet extra 3% off (price inclusive of cashback/coupon)T&C</div>

                    <div style={{
                        fontFamily: "Roboto,Arial,sans-serif",
                        fontSize: "14px",
                        color: "#2874F0",
                        marginTop: "10px"
                    }}>View 7 more Offers</div>



                    <div>
                        <div className='pincodeAndDeliveryDate'>

                            <div style={{ fontFamily: "Roboto,Arial,sans-serif", color: "#878787", fontSize: "14px", marginTop: "10px", width: "110px" }}>Delivery</div>

                            <div>
                                <div className='inputStyleDiv' >
                                    <input class="_36yFo0" placeholder="Enter Delivery Pincode" type="text" maxlength="6" id="pincodeInputId" value={pincode} onChange={(e) => setPincode(e.target.value)}></input>
                                    <button className='pincodecheckbtn' onClick={checkPincode}>Check</button>
                                </div>
                                {result && <div style={{ fontFamily: "Roboto,Arial,sans-serif", fontSize: "14px", marginTop: "2px" }}>{result}</div>}

                                {result &&
                                    <div style={{ fontFamily: "Roboto,Arial,sans-serif", fontSize: "12px" }}>Delivery by {bookingDate}|<del style={{ color: "#388e3c" }}>Free<del style={{ color: "#9e9e9e" }}>₹40</del></del></div>
                                }
                            </div>
                        </div>
                    </div>

                    <div style={{ border: "1px solid #e4e7ed", marginTop: "24px" }}>
                        <div class="_3HKIdy">
                            <div class="_2QKOHZ">Ratings &amp; Reviews</div>
                            <div class="_3cH4s3">
                                <Link to={`/User/WriteReview/${showProduct._id}`} className='Userlinks' >

                                    <button class=" _1q9yVr" type="submit">
                                        <span>Rate Product</span>
                                    </button>
                                </Link>
                            </div>

                        </div>

                        <div className='viewRatings'>
                            <div className='ratingCount'>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "48.797px" }}>
                                    <div className='_2yxeXv'>4.3</div>
                                    <div class="_2yxeXvstar">★</div>
                                </div>

                                <div class="col-12-12">
                                    <span>3,45,607 Ratings </span>
                                    <span style={{ display: "flex", justifyContent: "center" }}>&amp;</span>
                                </div>

                                <div class="col-12-12">
                                    <span>38,442 Reviews</span>
                                </div>

                            </div>

                            <div className='RatingBars'>



                                <div style={{ display: "flex" }}>
                                    <div class="side">
                                        <div style={{ width: "35px", fontSize: "14px", fontFamily: "Roboto, Arial, sans-serif" }}>5 ★</div>
                                    </div>
                                    <div class="middle">
                                        <div class="bar-container">
                                            <div class="bar-5"></div>
                                        </div>
                                    </div>
                                    <div class="side right">
                                        <div className='RatingBarCount'> 150</div>
                                    </div>
                                </div>

                                <div style={{ display: "flex" }}>
                                    <div class="side">
                                        <div style={{ width: "35px", fontSize: "14px", fontFamily: "Roboto, Arial, sans-serif" }}>4 ★</div>
                                    </div>
                                    <div class="middle">
                                        <div class="bar-container">
                                            <div class="bar-4"></div>
                                        </div>
                                    </div>
                                    <div class="side right">
                                        <div className='RatingBarCount'>63</div>
                                    </div>
                                </div>

                                <div style={{ display: "flex" }}>
                                    <div class="side">
                                        <div style={{ width: "35px", fontSize: "14px", fontFamily: "Roboto, Arial, sans-serif" }}>3 ★</div>
                                    </div>
                                    <div class="middle">
                                        <div class="bar-container">
                                            <div class="bar-3"></div>
                                        </div>
                                    </div>
                                    <div class="side right">
                                        <div className='RatingBarCount'>15</div>
                                    </div>
                                </div>

                                <div style={{ display: "flex" }}>
                                    <div class="side">
                                        <div style={{ width: "35px", fontSize: "14px", fontFamily: "Roboto, Arial, sans-serif" }}>2 ★</div>
                                    </div>
                                    <div class="middle">
                                        <div class="bar-container">
                                            <div class="bar-2"></div>
                                        </div>
                                    </div>
                                    <div class="side right">
                                        <div className='RatingBarCount'>6</div>
                                    </div>
                                </div>

                                <div style={{ display: "flex" }}>
                                    <div class="side">
                                        <div style={{ width: "35px", fontSize: "14px", fontFamily: "Roboto, Arial, sans-serif" }}>1 ★</div>
                                    </div>
                                    <div class="middle">
                                        <div class="bar-container">
                                            <div class="bar-1"></div>
                                        </div>
                                    </div>
                                    <div class="side right">
                                        <div className='RatingBarCount'>20</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {review.map((reviewData, key) => (


                        <div className='showReviewsAndRatingsDiv'>
                            <div style={{ display: "flex" }}>
                                <div class="_3LWZlK">
                                    <div>{reviewData.reviewRating}</div>
                                    <div>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" className="_1wB99o" />
                                    </div>


                                </div>
                                <div className="_2-N8zTTitle">{reviewData.reviewTitle}</div>
                            </div>

                            <div className='ReviewDivRow'>
                                <div style={{
                                    lineheight: "1.4",
                                    fontsize: "14px",
                                    color: " #212121"
                                }}>
                                    {reviewData.reviewContent}
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div className='BuyerDetailsDiv'>
                                    <div className="_2sc7ZR">{reviewData.customerId.customerName}</div>
                                    <svg width="14" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" class="_2a1p_T">
                                        <g><circle cx="6" cy="6" r="6" fill="#878787"></circle>
                                            <path stroke="#FFF" stroke-width="1.5" d="M3 6l2 2 4-4" fill="#878787"></path>
                                        </g>
                                    </svg>
                                    <p class="_2mcZGG">
                                        <span>Certified Buyer</span>
                                        <span>, {reviewData.customerId.placeId.districtId.districtName}</span>
                                    </p>
                                    <p class="_2sc7ZRDate">{reviewData.reviewDateTime}</p>
                                </div>


                                <div className='likeAndDislikediv'>
                                    <div className='likeBtnDiv'>
                                        <img width="15" height="15" src="https://img.icons8.com/material-rounded/24/878787/thumb-up.png" alt="thumb-up" />                                <div className="_3c3Px5">25</div>
                                    </div>

                                    <div className='likeBtnDiv'>
                                        <img width="15" height="15" src="https://img.icons8.com/material-rounded/24/878787/thumbs-down.png" alt="thumbs-down" />
                                        <div className="_3c3Px5">25</div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}




                </div>
            </div>


        </div >
    )
}

export default ProductDetails