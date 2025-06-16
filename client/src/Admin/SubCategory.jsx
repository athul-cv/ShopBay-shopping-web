import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SubCategory = () => {
  const [Subcategory, setSubCategory] = useState('');
  const [showSubcategory, setShowSubCategory] = useState([]);
  const [Category, setCategory] = useState('');
  const [showCategory, setShowCategory] = useState([]);
  const [editSubcategory, setEditSubcategory] = useState('');
  const [subCategoryImg, setSubcategoryImg] = useState('');

  const insertSubCategory = () => {

    const frm = new FormData();
    frm.append("subCategoryName", Subcategory);
    frm.append("categoryId", Category);
    frm.append("subCategoryPhoto", subCategoryImg);
    
  

    if (editSubcategory === "") {
      axios.post('http://localhost:5000/subcategory', frm).then((response) => {
        console.log(response.data);
        setSubCategory("");
        fetchSubCategory();
      })
    }

    else {
      axios.put(`http://localhost:5000/updateSubCategory/${editSubcategory}`, frm).then((response) => {
        console.log(response.data);
        setSubCategory("");
        setEditSubcategory("");
        fetchSubCategory();
      })
    }
  }

  const fetchSubCategory = () => {
    axios.get('http://localhost:5000/subCategoryWithCategory').then((response) => {
      console.log(response.data);
      const data = response.data;
      setShowSubCategory(data);
    })
  }

  const fetchCategory = () => {
    axios.get('http://localhost:5000/getCategory').then((response) => {
      console.log(response.data);
      const data = response.data;
      setShowCategory(data)
    })
  }

  const updateSubCategory = (id) => {
    axios.get(`http://localhost:5000/getSubCategoryById/${id}`).then((response) => {
      console.log(response.data);
      const data = response.data[0];
      setCategory(data.categoryId);
      setSubCategory(data.subCategoryName);
      setEditSubcategory(data._id);
    })
  }

  const deleteSubCategory = (id) => {
    axios.delete(`http://localhost:5000/deleteSubCategory/${id}`).then((response) => {
      fetchSubCategory();
    })
  }

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, [])
  return (
    <div className='SubCategory'>
      <div className='containerSubCat'>
        <div style={{
          marginBottom: "30px"
        }}><h2>ADD SUBCATEGORY</h2></div>

        <div className='inputdivSubCategory'>
          <div style={{ fontSize: "20px" }}>
            Category:
          </div>
          <div >
            <select name="SubCategory" id="selectCategory" onChange={(event) => setCategory(event.target.value)}>

              <option value="">---select---</option>
              {showCategory.map((Categories, key) => (
                <option value={Categories._id}>{Categories.category}</option>
              ))}


            </select>
          </div>
          <div style={{ padding: "5px" }}>
            <div style={{ fontSize: "20px" }}>
              SubCategory:
            </div>
            <input type='text' name='cate' value={Subcategory} placeholder='Subcategory' className='inputsubcategory' onChange={(event) => setSubCategory(event.target.value)} />
          </div>

          <input type="file" onChange={(event)=>setSubcategoryImg(event.target.files[0])} />
        </div>


        <div className='btndis'>
          <button onClick={insertSubCategory}>Submit</button>
        </div>
        <div className='tabledis'>
          <table>
            <tr>
              <th>SINO.</th>
              <th> Category</th>
              <th>Subcategory</th>
              <th>SubcategoryImg</th>
              <th>Action</th>
              <th>Update</th>
            </tr>
            {showSubcategory.map((subCategories, key) => (
              <tr>
                <td>{key + 1}</td>
                <td>{subCategories.categoryId.category}</td>
                <td>{subCategories.subCategoryName}</td>
                <td><img src={subCategories.subCategoryimgsrc} alt='img' style={{ width: "60px", height: "60px", objectFit: "contain" }} /></td>
                <td><button className='districtDltBtn' onClick={() => deleteSubCategory(subCategories._id)}>Delete</button></td>
                <td><button className='districtUpdatebtn' onClick={() => updateSubCategory(subCategories._id)}>Update</button></td>
              </tr>
            ))}

          </table>
        </div>
      </div>
    </div>
  )
}

export default SubCategory