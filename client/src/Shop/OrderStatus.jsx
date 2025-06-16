import React, { useEffect, useState } from 'react'
import imgSample from './shopImages/epson1.jpg'
import axios from 'axios'

const OrderStatus = () => {
    const shopId = sessionStorage.getItem("shopId");
    const [showProduct, setShowProduct] = useState([]);
    const [showorderedCustomer, setShoworderedCustomer] = useState([]);

    const ChangeStatus = (status,bkId) => {
        axios.post(`http://localhost:5000/chageStatus/${status}/${bkId}`).then((response) => {
            console.log(response.data);
            getOrderedBooking();
        })
    }

    const getProductsByShop = () => {
        axios.get(`http://localhost:5000/cartWithOrderStatus/${shopId}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setShowProduct(data);

        })
    }

    const getOrderedBooking = () => {
        axios.get('http://localhost:5000/getOrderedBooking').then((response) => {
            console.log(response.data);
            const data = response.data;
            setShoworderedCustomer(data);

        })
    }


    useEffect(() => {
        getProductsByShop();
        getOrderedBooking();
    }, [])
    return (
        <div >
            {showorderedCustomer.map((orderedCustomer, key) => (


                <div style={{ display: "flex", gap: "28px" }} className='orderStatusShopDiv'>

                    <div className='MyorderImageShop'>
                        <div>{orderedCustomer.customerId.customerName}  </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span>{orderedCustomer.customerId.customerAddress}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div >{orderedCustomer.customerId.customerEmail}</div>,
                        <div >{orderedCustomer.customerId.customerContact}</div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>

                        {orderedCustomer.__v === 1 ? (
                            <button className='chageStatusbtn' onClick={() => ChangeStatus(2, orderedCustomer._id)}>OrderConfirmed</button>
                        ) : orderedCustomer.__v === 2 ? (
                            <button className='chageStatusbtn' onClick={() => ChangeStatus(3, orderedCustomer._id)}>Shipped</button> 

                        ) : orderedCustomer.__v === 3 ? (
                            <button className='chageStatusbtn' onClick={() => ChangeStatus(4, orderedCustomer._id)}>OutForDelivery</button>

                        ) : orderedCustomer.__v === 4 ? (
                            <button className='chageStatusbtn' onClick={() => ChangeStatus(5, orderedCustomer._id)}>Delivered</button>

                        ) : "completed"
                        }
                    </div>


                </div>
            ))}
        </div>
    )
}

export default OrderStatus