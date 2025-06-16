import React, { useEffect, useState } from 'react'
import axios from 'axios'

const District = () => {
  const [district, setDistrict] = useState('');
  const [showDistrict, setShowDitrict] = useState([]);
  const [editDistrict, setEditDistrict] = useState('');

  const insertData = () => {
    const data = {
      districtName: district
    }

    if (editDistrict === "") {
      axios.post('http://localhost:5000/district', data).then((response) => {
        console.log(response);
        setDistrict("");
        fetchDistricts();
      })
    }

    else {
      axios.put(`http://localhost:5000/upadteDistrict/${editDistrict}`, data).then((response) => {
        fetchDistricts();
        setDistrict("");
        setEditDistrict("");
      })
    }

  }

  const fetchDistricts = () => {
    axios.get('http://localhost:5000/getDistrict').then((response) => {
      console.log(response.data);
      const data = response.data;
      setShowDitrict(data);
    })
  }

  const updateDistrict = (id) => {
    axios.get(`http://localhost:5000/GetDistrict/${id}`).then((response) => {
      console.log(response.data[0].districtName);
      const data = response.data[0];
      setDistrict(data.districtName);
      setEditDistrict(data._id)
    })
  }

  const deleteDistrict = (id) => {
    axios.delete(`http://localhost:5000/deleteDistrict/${id}`).then((response) => {
      console.log(response.data);
      fetchDistricts();
    })
  }

  useEffect(() => {
    fetchDistricts()

  }, [])

  return (
    <div className='district'>

      <div className='containerdis'>
        <div style={{
          marginBottom: "30px"
        }}><h2>ADD DISTRICT</h2></div>


        <div class="floating-label-groupAdmin">
          <input type="text" id="District" value={district} class="form-control" autocomplete="off" autofocus required onChange={(event) => setDistrict(event.target.value)} />
          <label class="floating-label">District...</label>
        </div>

        <div className='btndis'>
          <button style={{ width: "100px", height: "30px", border: "none", borderRadius: "5px", backgroundColor: "#ccc" }} onClick={insertData}>Submit</button>
        </div>

        <div className='tabledis'>
          <table style={{ borderCollapse: 'collapse', width: "500px" }}>
            <tr>
              <th>SINO.</th>
              <th>District Name</th>
              <th>Action</th>
              <th>Upadte</th>
            </tr>



            {showDistrict.map((districts, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{districts.districtName}</td>
                <td><button className='districtDltBtn' onClick={() => deleteDistrict(districts._id)}>Delete</button></td>
                <td><button className='districtUpdatebtn' onClick={() => updateDistrict(districts._id)}>Update</button></td>
              </tr>
            ))}



          </table>
        </div>
      </div>
    </div>

  )
}

export default District