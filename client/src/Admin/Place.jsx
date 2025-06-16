import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Place = () => {
  const [Place, setPlace] = useState('');
  const [district, setDistrict] = useState('');
  const [showDistrict, setShowDitrict] = useState([]);
  const [showPlace, setShowPlace] = useState([]);
  const [editPlace, setEditPlace] = useState('');

  const insertPlace = () => {
    const data = {
      place: Place,
      districtId: district
    }

    if (editPlace === "") {
      axios.post('http://localhost:5000/Place', data).then((response) => {
        console.log(response.data);
        setPlace("");
        fetchPlace();
      })
    }
    else {
      axios.put(`http://localhost:5000/updatePlace/${editPlace}`, data).then((response) => {
        console.log(response.data);
        setPlace('');
        fetchPlace()
        setEditPlace("");
      })
    }
  }

  const fetchPlace = () => {
    axios.get('http://localhost:5000/placeWithDistrict').then((response) => {
      const data = response.data;
      console.log(data);
      setShowPlace(data);
    })
  }

  const fetchDistricts = () => {
    axios.get('http://localhost:5000/getDistrict').then((response) => {
      const data = response.data;
      setShowDitrict(data);
      fetchPlace();

    })
  }

  const updatePlace = (id) => {
    axios.get(`http://localhost:5000/getPlacesById/${id}`).then((response) => {
      console.log(response.data);
      const data = response.data[0];
      setPlace(data.place)
      setDistrict(data.districtId)
      setEditPlace(data._id);
      

    })
  }
  const deletePlace = (id) => {
    axios.delete(`http://localhost:5000/deletePlace/${id}`).then((response) => {
      fetchPlace()
    })
  }

  useEffect(() => {
    fetchPlace();
    fetchDistricts();
  }, [])


  return (
    <div className='place'>
      <div className='containerplace'>
        <div style={{
          marginBottom: "30px"
        }}><h2>ADD PLACE</h2></div>
        <div className='palceinputboxs'>
          <div >
            District:
          </div>
          <div >
            <select name="District" id="selectdistrict" onChange={(event) => setDistrict(event.target.value)}>
              <option>---Select District Here---</option>
              {showDistrict.map((districts, key) => (

                <option value={districts._id}>{districts.districtName}</option>

              ))}


            </select>
          </div>

          <div >
            <div style={{ fontSize: "20px" }}>
              Place:
            </div>
            <input type='text' name='Place' value={Place} placeholder='Place...' className='inputplace' onChange={(event) => setPlace(event.target.value)} />
          </div>

        </div>

        <div className='btndis'>
          <button onClick={insertPlace}>Submit</button>
        </div>

        <div className='tabledis'>
          <table>
            <tr>
              <th>SINO.</th>
              <th> District</th>
              <th>Place</th>
              <th>Action</th>
              <th>Upadte</th>

            </tr>

            {showPlace.map((places, key) => (
              <tr>
                <td>{key + 1}</td>
                <td>{places.place}</td>
                <td>{places.districtId.districtName}</td>
                <td><button className='districtDltBtn' onClick={() => deletePlace(places._id)}>Delete</button></td>
                <td><button className='districtUpdatebtn' onClick={() => updatePlace(places._id)}>Upadte</button></td>
              </tr>
            ))}

          </table>
        </div>
      </div>
    </div>
  )
}

export default Place