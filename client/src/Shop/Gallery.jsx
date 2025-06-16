import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Gallery = () => {
    const {id} = useParams();
    console.log(id);
    const [addPhoto, setAddPhoto] = useState('');
   
    const [showPhoto, setShowPhoto] = useState([]);

    const insertPhotosToGallery = () => {

        const frm = new FormData();
        frm.append("galleryImage", addPhoto);
        frm.append("productId", id);

        axios.post('http://localhost:5000/Gallery/', frm).then((response) => {
            console.log(response.data);

        })

    }

    const fetchGallery = () => {
        axios.get('http://localhost:5000/getGallery').then((response) => {
            console.log(response.data);
            const data = response.data;
            setShowPhoto(data);
        })
    }

    const deleteImage = (id) => {
        axios.delete(`http://localhost:5000/deleteGallery/${id}`).then((response) => {
            console.log(response.data);
            fetchGallery();
        })
    }
    useEffect(() => {
        fetchGallery();
      }, []);

    return (
        <div>
            <div>
                <h2>GALLERY</h2>
            </div>


            <div className='fileImgDiv'>
                <input type="file" multiple className='fileInput' onChange={(event) => setAddPhoto(event.target.files[0])} />
                <div className='fileText'>Drag your files here or click in this area.</div>
                <button type="submit" className='fileButton' onClick={insertPhotosToGallery} >Upload</button>
            </div>



            <div className='GalleryTable'>
                <div class="table-wrapper">
                    <table class="fl-table" style={{ marginTop: "30px" }}>
                        <thead>
                            <tr>
                                <th>SINO.</th>
                                <th> Images</th>
                                <th>DELETE</th>

                            </tr>
                        </thead>
                        <tbody>
                            {showPhoto.map((galleryImages, key) => (
                               
                               
                                <tr>
                    
                                    <td>{key + 1}</td>
                                    <td><img src={galleryImages.Galleryimgsrc} alt='img' style={{ width: "60px", height: "60px", objectFit: "contain" }} /></td>
                                    
                                    <td><button className='districtDltBtn' onClick={() => deleteImage(galleryImages._id)}>Delete</button></td>

                                    { 
                                    console.log(galleryImages)
                                      }
                               

                                </tr>

                                
                            ))}




                        </tbody>
                    </table>
                    {
                        console.log(addPhoto)
                    }
                </div>
            </div>
        </div>
    )
}

export default Gallery