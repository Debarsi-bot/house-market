import { useState, useEffect} from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import {doc, updateDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'


function Profile() {
  const auth = getAuth()
  console.log(auth)
  //when value of changeDetails is false, the user is not changing the details and true when user is in the process of changing a detail
  const [changeDetails, setChangeDetails] = useState(false)
  //the edit form needs to be initialyy filled with the user name and email of the user that is logged in
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  //destructure the name and email from the formData state variable
  const {name, email} = formData
  const navigate = useNavigate()
  //when this function is invoked, the user signs out ,
  //firebase deletes the access token used by Firebase to confirm the users' identity
  //user is then redirected to the home page
  const onLogout = () =>{
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async() =>{
    try{
      if(auth.currentUser.displayName !== name){
        //update display name in firebase
        await updateProfile(auth.currentUser,{
          displayName:name
        })
        //update in firestore database
        const userRef = doc(db, 'Users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name
        })
      }
    } catch(error){
        toast.error('Could not update Profile')
    }
  }

  const onChange = (e)=>{
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id]:  e.target.value,
    }))
  }
  return (
    <div className='profile'>
      <header classname = "profileheader">
        <p className='pageHeader'>My Profile</p>
        <button type = 'button' className='logOut' onClick = {onLogout}>Logout</button>
      </header> 
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={() =>{
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}>
            {changeDetails ? 'done':'change '}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input 
              type="text" 
              id="name"
              className={!changeDetails ? 'profileName' :'profileNameActive'}
              disabled = {!changeDetails}
              value = {name}
              onChange = {onChange}
            />
          </form>
        </div>
        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt="home"/>
          <p>Sell or rent your home</p>
          <img src = {arrowRight} alt="arrow right"/>
        </Link>
      </main>
    </div>
  )
}

export default Profile