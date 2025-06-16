import axios from 'axios';
import React, { useEffect, useState } from 'react'
import regimg from './GuestImages/shopreg.jpg'

const Shop = () => {
  const [ShopName, setShopName] = useState('');
  const [shopContact, setShopContact] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setaddress] = useState('');
  const [District, setDistrict] = useState('');
  const [showDistrict, setShowDitrict] = useState([]);
  const [showPlace, setShowPlace] = useState([]);
  const [Place, setPlace] = useState('');
  const [Photo, setPhoto] = useState([]);
  const [Proof, setProof] = useState([]);
  const [Password, setPassword] = useState('');



  const insertShopData = () => {

    const frm = new FormData();
    frm.append("shopName", ShopName);
    frm.append("shopEmail", Email);
    frm.append("ShopContact", shopContact);
    frm.append("shopAddress", Address);
    frm.append("placeId", Place);
    frm.append("shopPhoto", Photo);
    frm.append("shopProof", Proof);

    frm.append("shopPassword", Password);

    axios.post('http://localhost:5000/Shop', frm).then((response) => {
      console.log(response.data);

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
      const data = response.data;
      setShowDitrict(data);
    })
  }

  const resetform = () => {
    setShopName('');
    setShopContact('')
    setEmail('')
    setaddress('')
    setDistrict('')
    setPlace('')
    setPassword('')
  }

  useEffect(() => {
    fetchDistricts()
  }, [])

  return (
    <div className='shopmaindiv'>
      <div className='ShopContainer'>
        <div style={{
          marginBottom: "30px"
        }}><h2>SHOPPING PAGE</h2></div>

        <div className='inputboxdiv'>

          <div class="floating-label-group" >
            <input type="text" id="nameGuest" value={ShopName} class="form-control" autocomplete="off" required onChange={(event) => setShopName(event.target.value)} />
            <label class="shop-floating-label">Shop Name...</label>
          </div>

          <div class="floating-label-group" >
            <input type="text" id="emailShop" value={Email} class="form-control" autocomplete="off" required onChange={(event) => setEmail(event.target.value)} />
            <label class="shop-floating-label">Shop Email...</label>
          </div>


          <div class="floating-label-group">
            <input type="text" id="cntctShop" class="form-control" value={shopContact} autocomplete="off" autofocus required onChange={(event) => setShopContact(event.target.value)} />
            <label class="shop-floating-label" >ShopContact...</label>
          </div>


          <div className='cstmrAdrsDiv'>

            <textarea name="adrs" cols="16" rows="6" value={Address} className='addrsShop' placeholder='Shop Address' onChange={(event) => setaddress(event.target.value)} ></textarea>
          </div>

          <div class="floating-label-group" >
            <input type="password" id="pswrdGuest" value={Password} class="form-control" autocomplete="off" required onChange={(event) => setPassword(event.target.value)} />
            <label class="shop-floating-label">Password</label>
          </div>


          <div id='filesChoose'>
            <div>Proof:</div>
            <input type="file" onChange={(event) => setProof(event.target.files[0])} />
          </div>

          <div id='filesChoose' style={{ marginBottom: "20px" }}>
            <div > Photo:</div>
            <input type="file" onChange={(event) => setPhoto(event.target.files[0])} />
          </div>


          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <div >
              District:
            </div>

            <select name="District" id="shop-slct-District" onChange={(event) => {
              setDistrict(event.target.value);
              getDistrictwithPlace(event.target.value)
            }}>
              <option value="">---Select District---</option>
              {showDistrict.map((districts, key) => (
                <option value={districts._id}>{districts.districtName}</option>
              ))}
            </select>

          </div>

          <div>
            Place:</div>
          <div>
            <select name="Place" id="shop-slct-Place" onChange={(event) => setPlace(event.target.value)}>
              <option>---Select Place---</option>

              {
                showPlace.map((places, key) => (
                  <option value={places._id}>{places.place}</option>

                ))
              }
            </select>

          </div>
          <div className='buttongroup'>
            <button className='cstmrsubmitbtn' onClick={insertShopData}>Submit</button>
            <button className='cstmrcancelbtn' onClick={resetform} >Cancel</button>
          </div>
        </div>
      </div>
      <img src={regimg} alt="img" style={{ width: "750px", height: "850px", objectFit: 'contain' }} />
    </div>
  )
}

export default Shop