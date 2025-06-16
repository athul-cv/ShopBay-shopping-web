import React, { useEffect, useState } from 'react'
import grocery from './UserImages/products.jpg'
import mobile from './UserImages/mobiles(1).jpg'
import fashion from './UserImages/fashion.jpg'
import electronics from './UserImages/electronics.jpg'
import home from './UserImages/home.jpg'
import apliences from './UserImages/aplliences.jpg'
import travel from './UserImages/travel.jpg'
import toys from './UserImages/toys.jpg'
import twowheelers from './UserImages/twowheeler.jpg'
import slide1 from './UserImages/slide1.jpg'
import slide2 from './UserImages/slide2.jpg'
import slide3 from './UserImages/slide3.jpg'
import slide4 from './UserImages/slide4.jpg'
import slide5 from './UserImages/slide5.jpg'
import printer from './UserImages/printer.jpg'
import usb from './UserImages/usb.jpg'
import camera from './UserImages/camera.jpg'
import sdcard from './UserImages/sdusb.jpg'
import keyboard from './UserImages/keyboard.jpg'
import flightadd from './UserImages/addflight.jpg'
import gearcycle from './UserImages/gearcycle.jpg'
import electriccycle from './UserImages/electriccycle.jpg'
import gym from './UserImages/gym.jpg'
import yoga from './UserImages/yogamat.jpg'
import remotecar from './UserImages/remotecar.jpg'
import trycycle from './UserImages/ridions.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel'



const Home = () => {

  const [showPrdct, setShowPrdct] = useState([]);
  const [showCategory, setShowCategory] = useState([]);
  const [ShowSubCategory, setShowSubCategory] = useState([]);


  // const fetchProduct = () => {
  //   axios.get('http://localhost:5000/subCategoryWithProduct').then((response) => {
  //     console.log(response.data);
  //     const data = response.data;
  //     setShowPrdct(data);

  //   })
  // }

  const fetchCategory = async () => {
    const response = await axios.get('http://localhost:5000/getCategory');
    const categoriesData = response.data;

    const updatedShowSubCategory = await Promise.all(categoriesData.map(async (category) => {
      const subCategoryResponse = await axios.get(`http://localhost:5000/subCategoryWithCategoryHome/${category._id}`);
      const subCategoryData = subCategoryResponse.data;

      return { 'category': category.category, 'subCategory': subCategoryData };
    }));

    setShowSubCategory(updatedShowSubCategory);
  }







  useEffect(() => {
    fetchCategory();
    // fetchProduct();
    // fetchSubCategory();
  }, [])



  return (

    <div>
      <div className='homemainDiv'>


        <div className='linkimage' >
          <div className='imageDiv'>
            <img src={grocery} alt="img" className='productsimage' />

            <div className={'Grocery-dropdown'}>

              <div className='GroceryUserlinks'>
                <button className={'Grocery-dropbtn'}>Grocery</button>
              </div>
              {/* <div className={"productsdropdown-content"} >
                <div className='productHoverItems'  >
                  <div style={{ marginLeft: "18px", width: "100%" }}>
                    <div className='prdctNameDiv' >Home Furnishings</div>
                    <div className='prdctNameDiv' >furniture Studio</div>
                    <div className='prdctNameDiv'>living Room Furniture</div>
                    <div className='prdctNameDiv'>Kitchen & Dining</div>
                    <div className='prdctNameDiv'>Home Decor </div>
                    <div className='prdctNameDiv'>Lightings & Electricals </div>
                    <div className='prdctNameDiv'>Cleaning & And Bath </div>
                    <div className='prdctNameDiv'>Tools & Utility </div>
                  </div>

                </div>
              </div> */}
            </div>

          </div>
        </div>


        <Link to={`/User/Mobiles/${"6825a95261c5bb798e465f14"}`} className='Userlinks'>
          <div className='linkimage'>
            <div className='imageDiv'>
              <img src={mobile} alt="img" className='productsimage' />

              <button className="Mobile-dropbtn">Mobile</button>

            </div>
          </div>
        </Link>

        <div className='linkimage'>
          <div className='Grocery-dropdown'>
            <div className='imageDiv'>
              <img src={fashion} alt="img" className='productsimage' />

              
              <Link to={`/User/Mobiles/${"6825ae5d772f8e6d7767ef64"}`} className='Userlinks'>
              <div className='GroceryUserlinks'>
                <button className="HeadprdctNamesFashion">Fashion</button>
              </div>

              <div className="productsdropdown-content">
                {/* <div className='productHoverItems' >
                  <div style={{ marginLeft: "18px", width: "100%" }}>
                    <div className='prdctNameDiv' >Mens Top Wear</div>
                    <div className='prdctNameDiv' >Womens Western</div>
                    <div className='prdctNameDiv'>Men Footwear</div>
                    <div className='prdctNameDiv'>Womens Footwear</div>
                    <div className='prdctNameDiv'>Watches & Accessories </div>
                    <div className='prdctNameDiv'>Kids </div>
                    <div className='prdctNameDiv'>Essentials </div>
                    <div className='prdctNameDiv'>Winter </div>
                  </div>

                </div> */}
              </div>
              </Link>
            </div>
          </div>
        </div>

        <div className='linkimage'>
          <div className='imageDiv'>
            <img src={electronics} alt="img" className='productsimage' />
            <div className='Grocery-dropdown'>

              <div className='GroceryUserlinks'>
                <button className="HeadprdctNamesElectronics">Electronics</button>
              </div>

              {/* <div className="productsdropdown-content">
                <div className='productHoverItems' >
                  <div style={{ marginLeft: "18px", width: "100%" }}>
                    <div className='prdctNameDiv' >Audio</div>
                    <div className='prdctNameDiv' >Electronics GST Store</div>
                    <div className='prdctNameDiv'>Camera & Accessories</div>
                    <div className='prdctNameDiv'>Computer Peripherals</div>
                    <div className='prdctNameDiv'>Gaming</div>
                    <div className='prdctNameDiv'>Mobile Accessories</div>
                    <div className='prdctNameDiv'>Smart Wearables</div>
                    <div className='prdctNameDiv'>Storage </div>
                  </div>

                </div>
              </div> */}

            </div>
          </div>
        </div>

        <div className='linkimage'>
          <div className='imageDiv'>
            <img src={home} alt="img" className='productsimage' />
            <div className='Grocery-dropdown'>

              <div className='GroceryUserlinks'>
                <button className="HeadprdctNamesHomeFurniture">Home&Furniture</button>
              </div>

              {/* <div className="productsdropdown-content">
                <div className='productHoverItems' >
                  <div style={{ marginLeft: "18px", width: "100%" }}>
                    <div className='prdctNameDiv' >Home Furnishings</div>
                    <div className='prdctNameDiv' >furniture Studio</div>
                    <div className='prdctNameDiv'>living Room Furniture</div>
                    <div className='prdctNameDiv'>Kitchen & Dining</div>
                    <div className='prdctNameDiv'>Home Decor </div>
                    <div className='prdctNameDiv'>Lightings & Electricals </div>
                    <div className='prdctNameDiv'>Cleaning & And Bath </div>
                    <div className='prdctNameDiv'>Tools & Utility </div>
                  </div>

                </div>
              </div> */}

            </div>
          </div>
        </div>
        <Link to={`/User/Appliences/${"6825a9e861c5bb798e465f1f"}`} className='Userlinks'>
        <div className='linkimage'>
          <div className='imageDiv'>
            <img src={apliences} alt="img" className='productsimage' />
            <span className='HeadprdctNamesAppliences'>Appliences</span>
          </div>
        </div>
</Link>
        <div className='linkimage'>
          <div className='imageDiv'>
            <img src={toys} alt="img" className='productsimage' />
            <div className='Grocery-dropdown'>

              <div className='GroceryUserlinks'>
                <button className="HeadprdctNamesTOYS">TOYS</button>
              </div>

              {/* <div className="productsdropdown-content">
                <div className='productHoverItems' >
                  <div style={{ marginLeft: "18px", width: "100%" }}>
                    <div className='prdctNameDiv' >Beauty & Personal Care</div>
                    <div className='prdctNameDiv' >furniture Studio</div>
                    <div className='prdctNameDiv'>living Room Furniture</div>
                    <div className='prdctNameDiv'>Kitchen & Dining</div>
                    <div className='prdctNameDiv'>Home Decor </div>
                    <div className='prdctNameDiv'>Lightings & Electricals </div>
                    <div className='prdctNameDiv'>Cleaning & And Bath </div>
                    <div className='prdctNameDiv'>Tools & Utility </div>
                  </div>

                </div>
              </div> */}

            </div>
          </div>
        </div>

        <div className='linkimage'>
          <div className='imageDiv'>
            <img src={twowheelers} alt="img" className='productsimage' />
            <div className='Grocery-dropdown'>
           
            <Link to={`/User/Mobiles/${"6825c39d11ab953d5575e938"}`} className='Userlinks'>
              <div className='GroceryUserlinks'>
                <button className="HeadprdctNamesTwoHwheelers">TwoHwheelers</button>
              </div>

              {/* <div className="productsdropdown-content">
                <div className='productHoverItems' >
                  <div style={{ marginLeft: "18px", width: "100%" }}>
                    <div className='prdctNameDiv' >Petrol Vehicle</div>
                    <div className='prdctNameDiv' >Electric Vehicle </div>
                  </div>

                </div>
              </div> */}
              </Link>
            </div>
          </div>
        </div>

        <div className='linkimage'>
          <div className='imageDiv'>
            <img src={travel} alt="img" className='productsimage' />
            <span className='HeadprdctNamesTRAVEL'>TRAVEL</span>
          </div>
        </div>

      </div>

      <div className='scrollingimage'>

        <Carousel showThumbs={false} showIndicators={false} showStatus={false} showArrows={false} autoPlay={true} infiniteLoop={true}>
          <div>
            <img src={slide1} alt="img" className='slideimage' />
          </div>
          <div>
            <img src={slide2} alt="img" className='slideimage' />
          </div>
          <div>
            <img src={slide3} alt="img" className='slideimage' />
          </div>
          <div>
            <img src={slide4} alt="img" className='slideimage' />
          </div>
          <div>
            <img src={slide5} alt="img" className='slideimage' />
          </div>
        </Carousel>


      </div>
      {/* <div style={{ display: "flex" }}> */}
        <div>
          {ShowSubCategory.map((Categories, key) => (

            <div className='productsection'>


              <div className='headandprdctimages'>
                <div className='prdctheading'>
                  <div style={{
                    marginLeft:"22px",
                    fontSize: "24px",
                    fontFamily: "inter_semi_bold,fallback-inter_semi_bold"
                  }}><b>{Categories.category}</b></div>

                </div>



                <div className='electronicprdcts'>

                  {Categories.subCategory.map((subcategory, key) => (

                    <Link to={`/User/Relatedproducts/${subcategory._id}`} className='Userlinks'>
                      <div className='priceandimage'>
                        <div className='imagediv'>
                          <img src={subcategory.subCategoryimgsrc} alt="img" className='eletronicsprdctimages' />
                        </div>
                        <div className='pricenamediv'>
                          <div style={{ display: "flex", justifyContent: "center", }}>{subcategory.subCategoryName}</div>
                        </div>

                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* <div className='add'>
          <img src={flightadd} alt="img" className='addflight' />
        </div> */}

      </div>

    // </div>

  )
}

export default Home