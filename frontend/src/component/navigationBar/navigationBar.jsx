import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <div>
        <ul className="flex bg-gradient-to-r from-violet-500 to-wite-900 pt-2 pb-2 pl-12">
            <li className="mr-6">
                
            </li>
            <li className="mr-6">
                <Link className="text-gray-900 hover:text-amber-100" to='/home' >Home</Link>            
            </li>
            <li className="mr-6">
                <Link className="text-gray-900 hover:text-amber-100" to='/near-earth-object' >Near Earth</Link>            
            </li>
            <li className="mr-6">
                <Link className="text-gray-900 hover:text-amber-100" to='/mars-rover-curiosity' >Mars Curiosity</Link>            
            </li>
            <li className="mr-6">
                <Link className="text-gray-900 hover:text-amber-100" to='/ste-data' >Stalite</Link>            
            </li>
        </ul>
    </div>

  )
}

export default NavigationBar