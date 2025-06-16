import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import homelogo from './UserImages/images.png'
import searchicon from './UserImages/searchicon.svg'
import loginicon from './UserImages/loginicon.svg'
import seller from './UserImages/seller.svg'
import menu from './UserImages/menu.svg'
import { Badge, IconButton, styled } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios'


const StyledBadge = styled(Badge)(({ theme }) => ({
  color: "black",
  '& .MuiBadge-badge': {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',

  },
}));

const Head = () => {
  const Id = sessionStorage.getItem("customerId");
  const [cartlength, setCartLength] = useState([]);
  const [search, setSearch] = useState([]);
  const [name, setName] = useState('');
  const [productDetails, setProductDetails] = useState([]);
  const [WishlistLen,setWishlistLen] = useState([]);

  const searchedProduct = useNavigate();
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const addCartProduct = () => {
    axios.get(`http://localhost:5000/cartWithBooking/${Id}`).then((response) => {
      console.log(response.data);

      const cartLength = response.data.length;
      setCartLength(cartLength)

    })
  }

  const allProducts = () => {
    axios.get(`http://localhost:5000/getProduct`).then((response) => {
      console.log(response.data);
      const data = response.data;
      setProductDetails(data);
    })
  }

  const getWishlist = () =>{
    axios.get(`http://localhost:5000/getWishlist/${Id}`).then((response) => {
        console.log(response.data);
        console.log(response.data.length);
        const wishlistLength = response.data.length;
        setWishlistLen(wishlistLength);
        

    })
}
  const searchBTNnaction = () => {
    axios.get(`http://localhost:5000/searchingProducts/${search}`).then((response) => {
      console.log(response.data);
      const data = response.data[0];
      console.log(data._id);
      searchedProduct(`/User/ProductDetails/${data._id}`)

    })
  }

  const handleLogout = () =>{
    sessionStorage.clear("customerId")
    navigate("/Guest/Login")
  }

  const checkAuthentication = () => {
    // Check if user-related data exists in session storage or any other storage
    const userId = sessionStorage.getItem("customerId");
    // Return true if the user is authenticated, false otherwise
    return !!userId;
  };

  useEffect(() => {
    getWishlist();
    addCartProduct();
    allProducts();
    axios.get(`http://localhost:5000/getCustomer/${Id}`).then((response) => {

      const data = response.data;
      console.log(data);
      setName(data.customerName)

    })
     // Check if the user is authenticated on the initial load
     const isAuthenticated = checkAuthentication();

     if (!isAuthenticated) {
       // Redirect to the login page if the user is not authenticated
       navigate("/Guest/Login");
     }
   
  }, [navigate])

  return (
    <div className='homeHead'>
      <div className='logoSearch'>
        <img src={homelogo} alt='img' style={{ width: "160px", height: "100px", objectFit: "contain" }} />
        <div className='searchdiv'>
          <button className='searchiconbtn' ><img src={searchicon} alt='img' className='searchicon'></img></button>
          <input type='search' name='search' className='searchbox' list="idpassedtosearch" placeholder='Search for Products, Brands and More'
            onKeyUp={(e) => setSearch(e.target.value)}

            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                // Call a function or perform an action when Enter key is pressed
                // For example, you can trigger a search function here
                searchBTNnaction();
              }
            }}

          ></input>
          <datalist id="idpassedtosearch" >
            {productDetails.map((row, key) => (
              <option key={key} >{row.productName}</option>
            ))}
          </datalist>
        </div>

        <div className={`dropdown ${menuOpen ? 'menu-open' : ''}`}>
          <div className='Userlinks'>

            <button className="dropbtn"> <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" alt="loginiconimg" className='linklogos' />{name}</button>
          </div>
          <div className="dropdown-content">

            <Link to={'/User/PersonalInfo'} className='Userlinks'>
              <div class="_3pKU-e">
              <img class="SFnind" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" alt="My Profile" width="24" height="24"/>
                <div>My Profile</div>
              </div>
            </Link>

            <Link to={'/User/WishList'} className='Userlinks'>
              <div class="_3pKU-e">
                <img class="SFnind" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIwLjI0OUMxMiAyMC4yNDkgMi42MjUgMTQuOTk5IDIuNjI1IDguNjI0MDNDMi42MjUgNy40OTcwNSAzLjAxNTQ2IDYuNDA0ODggMy43Mjk5NiA1LjUzMzM0QzQuNDQ0NDUgNC42NjE3OSA1LjQzODg0IDQuMDY0NzIgNi41NDM5MyAzLjg0MzdDNy42NDkwMyAzLjYyMjY4IDguNzk2NTcgMy43OTEzNyA5Ljc5MTMxIDQuMzIxMDZDMTAuNzg2MSA0Ljg1MDc2IDExLjU2NjUgNS43MDg3NCAxMiA2Ljc0OTAzVjYuNzQ5MDNDMTIuNDMzNSA1LjcwODc0IDEzLjIxMzkgNC44NTA3NiAxNC4yMDg3IDQuMzIxMDZDMTUuMjAzNCAzLjc5MTM3IDE2LjM1MSAzLjYyMjY4IDE3LjQ1NjEgMy44NDM3QzE4LjU2MTIgNC4wNjQ3MiAxOS41NTU1IDQuNjYxNzkgMjAuMjcgNS41MzMzNEMyMC45ODQ1IDYuNDA0ODggMjEuMzc1IDcuNDk3MDUgMjEuMzc1IDguNjI0MDNDMjEuMzc1IDE0Ljk5OSAxMiAyMC4yNDkgMTIgMjAuMjQ5WiIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=" alt="Wishlist (2)" width="24" height="24" />
                <div>Wishlist ({WishlistLen})</div>
              </div>
            </Link>

            <Link to={'/User/Orders'} className='Userlinks'>
              <div class="_3pKU-e">
                <img class="SFnind" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/orders-bfe8c4.svg" alt="Orders" width="24" height="24" />
                <div>My Orders</div>
              </div>
            </Link>

            <Link to={'/User/Coupons'} className='Userlinks'>
              <div class="_3pKU-e">
              <img class="SFnind" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/coupons-083172.svg" alt="Coupons" width="24" height="24"/>
                <div>Coupons</div>
              </div>
            </Link>

            
              <div class="_3pKU-e">
              <img class="SFnind" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logout-e63ddf.svg" alt="Logout" width="24" height="24"/>
               <button onClick={handleLogout}>Logout</button>
              </div>
           



          </div>
        </div>

        <div className='Userlinks'>

          <Link to={'/User/PageCart'} className='Userlinks'>
            <IconButton aria-label='cart'>
              <StyledBadge badgeContent={cartlength} color="warning">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>

        <div className='Userlinks'>

          <button className="BecomeaSeller"><img src={seller} alt="sellerimg" className='linklogos' />Become a Seller</button>
        </div>

        <div className='Userlinks'>

          <button className="extramenu" onClick={toggleMenu}><img src={menu} alt="menuimg" className='linklogos' /></button>
        </div>

      </div>



    </div>
  )
}

export default Head