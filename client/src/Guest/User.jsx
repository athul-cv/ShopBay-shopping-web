import axios from 'axios';
import React, { useEffect, useState } from 'react'
import customericon from './GuestImages/customer icon.png'
import mailicon from './GuestImages/mail icon.png'
import contacticon from './GuestImages/phone.png'
import Addressicon from './GuestImages/location.png'
import passwordicon from './GuestImages/padlock.png'
import pablosign from './GuestImages/pablo-sign-in-2.jpg'
import { ToastContainer, toast } from 'react-toastify';



const User = () => {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const [customerPhoto, setCustomerPhoto] = useState('');
  const [district, setDistrict] = useState('');
  const [showDistrict, setShowDitrict] = useState([]);
  const [place, setPlace] = useState('');
  const [showPlace, setShowPlace] = useState([]);


  const insertCustomerData = () => {
    

    const frm = new FormData();
    frm.append("customerName", customerName);
    frm.append("customerEmail", customerEmail);
    frm.append("customerContact", customerContact);
    frm.append("customerAddress", customerAddress);
    frm.append("customerPassword", customerPassword);
    frm.append("customerPhoto", customerPhoto);
    frm.append("placeId", place);


    axios.post('http://localhost:5000/Customer', frm).then((response) => {
      console.log(response.data);
      toast.success("successfully Done Registration");
      resetForm();
    })
  }

  const getDistrictwithPlace = (id) => {
    axios.get(`http://localhost:5000/districtWithPlaces/${id}`).then((response) => {
      console.log(response.data);
      const data = response.data;
      setShowPlace(data);
    })
  }

  const fetchDistricts = () => {
    axios.get('http://localhost:5000/GetDistrict').then((response) => {
      console.log(response.data);
      const data = response.data;
      setShowDitrict(data);
    })
  }

  const resetForm = () =>{
    setCustomerName('')
    setCustomerAddress('')
    setCustomerContact('')
    setCustomerEmail('')
    setCustomerPassword('')
  
  }

  useEffect(() => {
    fetchDistricts();
  }, [])

  return (
    <div className='Guestdiv'>
      <div className='guestContainerdiv'>
        <div style={{
          marginBottom: "30px"
        }}><h2>Create An Account</h2></div>

        <div class="floating-label-group" style={{ display: "flex" }}>
          <img src={customericon} alt="img" className='forminputboxicons' />
          <input type="text" id="nameGuest" value={customerName} class="form-control" autocomplete="off"  required onChange={(event) => setCustomerName(event.target.value)} />
          <label class="cstmr-floating-label">Your Name...</label>
        </div>



        <div class="floating-label-group" style={{ display: "flex" }}>
          <img src={mailicon} alt="img" className='forminputboxicons' />

          <input type="text" id="emailGuest" value={customerEmail} class="form-control" autocomplete="off" required onChange={(event) => setCustomerEmail(event.target.value)} />
          <label class="cstmr-floating-label">Your Email...</label>
        </div>

        <div class="floating-label-group" style={{ display: "flex" }}>
          <img src={passwordicon} alt="img" className='forminputboxicons' />

          <input type="password" id="pswrdcstmr" value={customerPassword} class="form-control" autocomplete="off"  required onChange={(event) => setCustomerPassword(event.target.value)} />
          <label class="cstmr-floating-label">Password</label>
        </div>

        <div class="floating-label-group" style={{ display: "flex" }}>
          <img src={contacticon} alt="img" className='forminputboxicons' />

          <input type="text" id="contactGuest" value={customerContact} class="form-control" autocomplete="off" autofocus required onChange={(event) => setCustomerContact(event.target.value)} />
          <label class="cstmr-floating-label" >Your Contact...</label>
        </div>

        <div className='cstmrAdrsDiv' style={{ display: "flex" }}>
          <img src={Addressicon} alt="img" className='forminputboxicons' />

          <textarea name="adrs" cols="16" rows="6" value={customerAddress} className='adrsinputuser' placeholder='Your Address' onChange={(event) => setCustomerAddress(event.target.value)} ></textarea>
        </div>



        <div className='cstmrslctDistrict' >
        <div >
              District:
            </div>
          <select name="District" id="slct-District" onChange={(event) => {
            setDistrict(event.target.value)
            getDistrictwithPlace(event.target.value)
          }}>
            <option value="">---Select District---</option>

            {showDistrict.map((districts, key) => (
              <option value={districts._id}>{districts.districtName}</option>
            ))}
          </select>

        </div>

        <div className='cstmrSlctPlace'>
        <div>
        Place:</div>
          <select name="Place" id="slct-Place" onChange={(event) => setPlace(event.target.value)}>

            <option value="" >---Select Place---</option>
            {showPlace.map((places, key) => (
              <option value={places._id}>{places.place}</option>
            ))}

          </select>

        </div>

        <div style={{ marginLeft: "25px" }}>
          <div style={{ marginTop: "5px" }}> Photo:</div>
          <input type="file"  onChange={(event) => setCustomerPhoto(event.target.files[0])} />
        </div>

        <div className='buttongroup'>
          <button className='cstmrsubmitbtn' onClick={insertCustomerData}>Submit</button>
          <button  className='cstmrcancelbtn' onClick={resetForm}>Cancel</button>
        </div>
      </div>

      <img src={pablosign} alt="img" style={{width:"800px",height:"680px",objectFit:"contain"}} />

      <ToastContainer
                position='bottom-center'
                autoClose='3000'
                theme='dark'
                hideProgressBar="true"
                style={{ width: '500px' }}
            />
    </div>
  )
}

export default User