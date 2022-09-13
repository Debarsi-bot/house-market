import {useNavigate, useLocation} from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function Navbar(){
    // useNavigation is a hook which gives access to navigation object
    const navigate = useNavigate()
    //useLocation: This hook returns the location object used by the react-router. This object represents the current URL and is immutable. Whenever the URL changes, the useLocation() hook returns a newly updated location object
    const location = useLocation()

    //take a path as argument, sees if the argument path is equal to the path we are on 
    const pathMatchRoute = (route) =>{
        //The location.pathname property returns a string containing the path of the URL for the location, which is an empty string if there is no path.
        return (route === location.pathname)
    }
    
    return (
        <footer className='navbar'>
            <nav className='navbarNav'>
                <ul className='navbarListItems'>
                    <li className='navbarListItem' onClick={()=>{
                        navigate('/')
                    }}>
                        <ExploreIcon 
                            //adjust fill color according to the path we are on
                            //if we are in the explore page, we want the explore icon to be seen as active and so set to a darker color
                            fill={pathMatchRoute('/') ? '#2c2c2c' : "#8f8f8f"} 
                            width = '36px' 
                            height='36px'
                        />
                        <p 
                        className={pathMatchRoute('/') 
                            ? 'navbarListItemNameActive'
                            : 'navbarListItemName'
                        }>
                            Explore
                        </p>
                    </li>

                    <li className='navbarListItem' onClick={()=>{
                        navigate('/offers')
                    }}>
                        <OfferIcon 
                            fill={pathMatchRoute('/offers') ? '#2c2c2c' : "#8f8f8f"} 
                            width = '36px' 
                            height='36px' 
                        />
                     
                     <p 
                        className={pathMatchRoute('/offers') 
                            ? 'navbarListItemNameActive'
                            : 'navbarListItemName'
                        }>
                            Offers
                        </p>
                    </li>

                    <li className='navbarListItem' onClick={()=>{
                        navigate('/profile')
                    }}>
                        <PersonOutlineIcon 
                            fill={pathMatchRoute('/profile') ? '#2c2c2c' : "#8f8f8f"} 
                            width = '36px' 
                            height='36px' 
                        />
                        <p 
                        className={pathMatchRoute('/profile') 
                            ? 'navbarListItemNameActive'
                            : 'navbarListItemName'
                        }>
                            Profile
                        </p>
                    </li>
                </ul>
            </nav>
        </footer>

    )
}

export default Navbar