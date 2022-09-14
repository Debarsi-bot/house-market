import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'

function CreateListing() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  })

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  useEffect(() =>{
    if(isMounted){
      onAuthStateChanged(auth, (user) =>{
        //user is logged in 
        if(user){
          setFormData({...formData, userRef:user.uid})
        }
        //user is not logged in
        else{
          navigate('/sign-in')
        }
      })
    }
    return ()=>{
      isMounted.current = false
    }
  },[isMounted])

  if(loading){
    return <Spinner />
  }
  return (
    <div>CreateListing</div>
  )
}

export default CreateListing