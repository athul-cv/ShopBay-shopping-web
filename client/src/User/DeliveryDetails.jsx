import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Step, Stepper } from 'react-form-stepper';
import questionMarkImg from './UserImages/question-mark-48.png'

const DeliveryDetails = () => {
    const { id } = useParams();
    console.log(id);
    const Id = sessionStorage.getItem("customerId");

    const [showCustomerName, setShowCustomerName] = useState([]);
    const [showCustomerAddress, setShowCustomerAddress] = useState([]);
    const [showCustomerContact, setShowCustomerContact] = useState([]);
    const [showStatus, setShowStatus] = useState([]);
    const [showProduct, setShowProduct] = useState([]);




    const getUser = () => {
        axios.get(`http://localhost:5000/getCustomer/${Id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setShowCustomerName(data.customerName);
            setShowCustomerAddress(data.customerAddress);
            setShowCustomerContact(data.customerContact);

        })
    }

    const fetchProduct = () => {
        axios.get(`http://localhost:5000/getBookedProducts/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setShowProduct(data);
        })
    }

    const fetchStatus = () => {
        axios.get(`http://localhost:5000/getOrderStatus/${id}`).then((response) => {
            console.log(response.data);
            const Status = response.data.__v;
            console.log(Status);
            setShowStatus(Status)
        })
    }

    useEffect(() => {
        getUser();
        fetchProduct();
        fetchStatus();
    }, [])

    return (
        <div style={{ padding: "32px 83px" }}>
            <div className='firstDivAdd'>
                <div className='addInnerDiv'>
                    <div className='addDivhead'>
                        Delivery Address
                    </div>
                    <div className='addNamediv'>
                        {showCustomerName}
                    </div>
                    <div className='addressdiv'>
                        {showCustomerAddress}
                    </div>
                    <div className='DAddPhnDiv'>
                        Phone number
                    </div>
                    <div style={{ lineHeight: "28px" }}>
                        {showCustomerContact}
                    </div>


                </div>

            </div>

            <div className='containerStepper'>
                <div style={{fontSize:"18px",fontWeight:"600",fontFamily:"sans-serif"}}>Delivery Status</div>
                <div>
                    <Stepper activeStep={showStatus} connectorStateColors={'true'}
                        styleConfig={{ completedBgColor: "#26A541", completedTextColor: "#26A541", size: "12px", labelFontSize: "12px", }}
                        connectorStyleConfig={{ completedColor: "#26A541", size: "3px", }}

                    >

                        <Step label={showStatus >= 1 ? "order Confirmed" : ""} />
                        <Step label={showStatus >= 2 ? "shipped" : ""} />
                        <Step label={showStatus >= 3 ? "Out for delivery" : ""} />
                        <Step label={showStatus >= 4 ? "Delivered" : ""} />
                    </Stepper>
                </div>
            </div>

            {showProduct.map((deliveredProducts, key) => (

                <div className='SecondDivAdd'>

                    <div className='imgdescDiv'>
                        <div className='prdctImdDiv'>
                            <img src={deliveredProducts.productId.prdctimgsrc} alt='img' className='prdctImdDiv' />
                        </div>

                        <div className='ImgDescDiv'>
                            <div>
                                <div style={{ fontSize: "14px", maxHeight: "50px", overflow: "hidden", marginLeft: "16px" }}>{deliveredProducts.productId.ProductDescription}</div>
                                <div style={{ display: "flex", marginLeft: "16px" }}>
                                    <div style={{ marginTop: "35px", marginRight: "5px", fontSize: "16px" }}>{deliveredProducts.productId.productRate}</div>
                                    <div className='VO74C'>1 offer Applied</div>
                                    <div class="Bv11UC">
                                        <span class="questionImgDescDiv">?</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



                    <div>
                        <div style={{ display: "flex" }}>
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYnIGhlaWdodD0nMTknIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiPgoJPGcgZmlsbD0nbm9uZSc+CgkJPHBvbHlnb24gaWQ9IlNoYXBlIiBmaWxsPSIjMjg3NEYxIiBwb2ludHM9IjkgMTIuMDYyNSAxMy42Mzc1IDE1LjQzNzUgMTEuODYyNSA5Ljk4NzUgMTYuNSA2LjY4NzUgMTAuODEyNSA2LjY4NzUgOSAxLjA2MjUgNy4xODc1IDYuNjg3NSAxLjUgNi42ODc1IDYuMTM3NSA5Ljk4NzUgNC4zNjI1IDE1LjQzNzUiIC8+CgkJPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjAgMCAxOCAwIDE4IDE4IDAgMTgiIC8+Cgk8L2c+Cjwvc3ZnPg==" class="_1dki8b" />
                            <Link to={`/User/WriteReview/${deliveredProducts.productId._id}`} className='Userlinks' > <div className='RatiingDiv'>Rate & Review product</div></Link>
                        </div>

                        <div style={{ display: "flex" }}>
                            <img src={questionMarkImg} class="_1dki8bQues" />
                            <div className='helpDiv'>Need Help ?</div>
                        </div>
                    </div>


                </div>
            ))}

           
        </div>
    )
}

export default DeliveryDetails