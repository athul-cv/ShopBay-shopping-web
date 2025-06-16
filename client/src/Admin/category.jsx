import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Category = () => {
  const [Category, setCategory] = useState('');
  const [showCategory, setShowCategory] = useState([]);
  const [categoryPhoto, setCategoryPhoto] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const insertCategory = () => {

    const frm = new FormData();
    frm.append("category", Category);
    frm.append("categoryPhoto", categoryPhoto);

    if (editCategory === "") {
      axios.post('http://localhost:5000/shopCategory', frm).then((response) => {
        console.log(response.data);
        setCategory("");
        fetchCategory();

      })
    }

    else {
      axios.put(`http://localhost:5000/updateCategory/${editCategory}`, frm).then((response) => {
        console.log(response.data);
        setEditCategory("");
        setCategory("");
        fetchCategory();
      })
    }
  }

  const fetchCategory = () => {
    axios.get('http://localhost:5000/getCategory').then((response) => {
      console.log(response.data);
      const data = response.data;
      setShowCategory(data);
    })
  }

  const updateCategory = (id) => {
    axios.get(`http://localhost:5000/getCategoryById/${id}`).then((response) => {
      console.log(response.data);
      const data = response.data[0];
      setCategory(data.category);
      setEditCategory(data._id);
    })
  }

  const deleteCategory = (id) => {
    axios.delete(`http://localhost:5000/deleteCategory/${id}`).then((response) => {
      fetchCategory();
    })
  }

  useEffect(() => {
    fetchCategory();
  }, [])
  return (
    <div><div className='category'>
      <div className='containercategory'>
        <div style={{
          marginBottom: "30px"
        }}><h2>ADD CATEGORY</h2></div>

        <div className='Categoryinputdiv'>
          <div style={{ fontSize: "20px" }}>
            Category:
          </div>
          <div >
            <input type='text' name='Category' value={Category} placeholder='Category...' className='inputcategory' onChange={(event) => setCategory(event.target.value)} />
          </div>
          <div>
            <input type="file" onChange={(event) => setCategoryPhoto(event.target.files[0])} />
          </div>
        </div>

        <div className='btndis'>
          <button onClick={insertCategory}>Submit</button>
        </div>
        <div className='tabledis'>
          <table>
            <tr>
              <th>SINO.</th>
              <th> Category</th>
              <th>Photo</th>
              <th>Action</th>
              <th>update</th>
            </tr>

            {showCategory.map((categories, key) => (
              <tr>
                <td>{key + 1}</td>
                <td>{categories.category}</td>
                <td><img src={categories.Categoryimgsrc} alt='img' style={{ width: "60px", height: "60px", objectFit: "contain" }} /></td>
                <td><button onClick={() => deleteCategory(categories._id)}>Delete</button></td>
                <td><button onClick={() => updateCategory(categories._id)}>Update</button></td>
              </tr>
            ))}

          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Category