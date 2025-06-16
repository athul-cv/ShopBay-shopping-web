import React, { useEffect, useState } from 'react'
import wishlistIcon from './UserImages/wishlistIcon.svg'
// import wishlistColorIcon from './UserImages/wishlistColorIcon.svg'
import assuredlogo from './UserImages/flipkartAssuredlogo.png'
import ratingstar from './UserImages/ratingstar.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ComponentMobile = ({productsdtlsW}) => {
    console.log(productsdtlsW);

    const productId = (productsdtlsW._id);
    console.log(productId);
    const Id = sessionStorage.getItem("customerId");

    const [showHeart, setShowHeart] = useState(false);


    const wishlistedPrdct = () => {
        axios.get(`http://localhost:5000/getWishlistPrdct/${productId}`).then((response) => {
            console.log(response.data);
            setShowHeart(response.data)
        })
    }

    const Wishlist = (prdctId) => {
        console.log(prdctId);
        const data = {
            productId: prdctId,
            customerId: Id
        }
        axios.post(`http://localhost:5000/Wishlist`, data).then((response) => {
            console.log(response.data);
        })
        setShowHeart(!showHeart); // Toggle the value of showHeart
        if (!showHeart) {
            deleteWishlist(prdctId); // Call deleteWishlist only if showHeart was true before toggling
        }
    }

    const deleteWishlist = (prdctId) => {
        console.log(prdctId);
        axios.delete(`http://localhost:5000/deleteWishlist/${prdctId}`).then((response) => {
            console.log(response.data);
        })
    }


    const truncateText = (text, maxWords) => {
        const words = text.split(' ');
        if (words.length <= maxWords) {
          return text;
        }
        return words.slice(0, maxWords).join(' ');
      }

    useEffect(() => {
        wishlistedPrdct();
    }, [])
    return (
        <div>
            <div className='prdctcards'>
                {/* {
                    console.log(productsdtls)
                } */}

                <div className='wishlistIconDiv'>
                    <div className='wishlistIconDiv2'>
                        <button onClick={() => Wishlist(productsdtlsW._id)}>
                            {!showHeart ? (
                                <img src={wishlistIcon} alt="img" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" class="N1bADF" width="16" height="16" viewBox="0 0 20 16">
                                    <path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="#ff4343" class="x1UMqG" stroke="#FFF" fill-rule="evenodd" opacity=".9"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className='imgdiv'>
                    <Link to={`/User/ProductDetails/${productsdtlsW._id
                        }`} className='Userlinks'><img src={productsdtlsW.prdctimgsrc} alt="img" className='imagestyling' /></Link>
                </div>

                <div style={{ padding: "10px" }}>

                    <div style={{ fontSize: "14px" }}>{truncateText(productsdtlsW.ProductDescription, 7) + '...'}</div>



                    <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                        <div style={{
                            width: "39.47px",
                            height: "19px",
                            backgroundColor: "green",
                            color: "white",
                            padding: "2px 4px 2px 6px",
                            borderRadius: "3px",
                            marginRight: "5px"
                        }}>4.4 <img src={ratingstar} alt="img" className='ratingstar' /></div>

                        <div style={{
                            width: "70px", height: "17", padding: "0px 0px 0px 8px",
                            backgroundColor: "#878787", marginRight: "5px",
                        }}>(1,02,116)</div>
                        <div><img src={assuredlogo} alt="img" className='flipkartAssuredlogo' /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComponentMobile