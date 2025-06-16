import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import moment from 'moment'



const WriteReview = () => {
    const { id } = useParams();

    const Id = sessionStorage.getItem("customerId");

    const [rating, setRating] = useState(0);
    const [reviewDesc, setReviewDesc] = useState('');
    const [ReviewTitle, setReviewTitle] = useState('');
    
    
   

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
    }

    const addRateAndReview = () => {

        const currentDateAndTime = moment().format("MMM YY"); 

        const data = {
            reviewRating: rating,
            customerId: Id,
            productId: id,
            reviewTitle: ReviewTitle,
            reviewContent: reviewDesc,
            reviewDateTime:currentDateAndTime,

        }

        axios.post('http://localhost:5000/Review', data).then((response) => {
            console.log(response.data);
            setReviewDesc('')
            setReviewTitle('')
            setRating(0)

        })


    }

    // Optinal callback functions
    // const onPointerEnter = () => console.log('Enter')
    // const onPointerLeave = () => console.log('Leave')
    // const onPointerMove = (value, index) => console.log(value, index)
    return (
        <div  >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "32px", }}>

                <div className='ratingDiv'>
                    <div className='_2sxtk'>Rate This Product</div>

                    <div className='RatingStarDiv'>
                        <Rating
                            onClick={handleRating}
                            // onPointerEnter={onPointerEnter}
                            // onPointerLeave={onPointerLeave}
                            // onPointerMove={onPointerMove}
                            
                        /* Available Props */
                        />
                    </div>

                </div>

            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center",}}>

                <div className='ReviewprdctDiv'>
                    <div className='_2sxtk' style={{ margin: "0px 0px 20px" }}>Review this Product</div>

                    <div className='ReviewWriteprdctDiv'>
                        <div className='_24yZfu'>
                            <div>Description</div>
                            <div>Description cannot be empty</div>
                        </div>
                        <textarea rows="8" placeholder="Description..." class="_3kRe7w" value={reviewDesc} spellcheck="false" onChange={(event) => setReviewDesc(event.target.value)}></textarea>

                    </div>

                    <div className='reviewTitleDiv'>
                        <div className='_24yZfuTitl'>
                            <div style={{ margin: "0px 0px 5px" }}>Title(Optional)</div>
                            <input type='text' placeholder="Review title..." class="_3kRe7w" value={ReviewTitle} onChange={(event) => setReviewTitle(event.target.value)}></input>

                        </div>
                    </div>


                </div>



            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center",marginBottom:"32px"  }}>
                <div className='btnSubmitDiv'>
                    <button class="UoOCF0" onClick={addRateAndReview}>Submit</button>
                </div>
            </div>


        </div>
    )
}

export default WriteReview