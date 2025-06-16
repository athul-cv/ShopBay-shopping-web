import React from 'react'

const Editprofile = () => {
  return (
    <div className='userEditrpofile'>
       <div className='Editprofilecontainer'>
                <h2 style={{ color: "black" }}>Edit Profile</h2>
                <div className='profileArea'>
                    Name:
                    <input type="text" style={{ background: "transparent", border: "1px solid black", borderRadius: "5px", width: "350px", height: "30px",color:"black" }} />
                </div>

                <div className='profileArea' >
                    Email:
                    <input type="text" style={{ background: "transparent", border: "1px solid black", borderRadius: "5px", width: "350px", height: "30px",color:"black" }} />
                </div>

                <div className='profileArea'>
                    Contact:
                    <input type="text" style={{ background: "transparent", border: "1px solid black", borderRadius: "5px", width: "350px", height: "30px",color:"black" }} />
                </div>

                <div className='editbtn'>
                    <button>Submit</button>
                    <button>Cancel</button>
                </div>
            </div>
    </div>
  )
}

export default Editprofile