import React from 'react'
import './style.css'
import users from './customers.png'
import moneyicon from './icons8-money-50.png'
import profiticon from './icons8-profitability-64.png'
import walleticon from './wallet.png'
import budjeticon from './budjet.png'




const Home = () => {
  return (
    <div >
      <div className='main-div'>
        <div className='card1'>
          <div className="cardcontent">
            <img src={users} alt='img' className='image' />
            <h2 className='text'>222</h2>
          </div>
        </div>
        <div className='card2'>
          <img src={moneyicon} alt='img' className='image' />
          <h2 className='text'>$100</h2>
        </div>
        <div className='card7'>
          <img src={profiticon} alt='img' className='image' />
          <h2 className='text'>$1000</h2>
        </div>
        <div className='card8'>
          <img src={walleticon} alt='img' className='image' />
          <h2 className='textwallet'>-$75</h2>
        </div>

      </div>

      <div>
        <div className='second1-div'>
          <div className='second2-div'>
            <div className='second-div'>
              <div className='card3'>

              </div>
              <div className='card4'></div>
            </div>
            <div className='card5'>

            </div>
          </div>

          <div className='card6'>
            
           

          </div>
        </div>

      </div>



    </div>
  )
}

export default Home