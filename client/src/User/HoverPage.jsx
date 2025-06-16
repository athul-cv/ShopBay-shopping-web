import React from 'react'

const HoverPage = () => {
  return (
    <div 
    style={{
  
    }}
    >
      
      <div class="floating-label-group">
			<input type="text" id="username" class="form-control" autocomplete="off" autofocus required />
				<label class="floating-label">Username</label>
			</div>
      

      <div class="floating-label-group">
			<input type="password" id="password" class="form-control" autocomplete="off" required />
			<label class="floating-label">Password</label>
			</div>
    </div>
  )
}

export default HoverPage