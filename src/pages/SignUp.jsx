import { useState } from 'react'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import {db} from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
  })
  const { name, email, password } = formData

  const onChange = (e) =>{
    setFormData((prevState) =>({
      //prevState holds the value of formData before setFormData was triggered
      ...prevState,
      [e.target.id] : e.target.value

    }))
  }

  const onSubmit = async(e) =>{
    e.preventDefault()
    try{
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      //creating a new user in our Firebase project
      updateProfile(auth.currentUser, {
        displayName:name,
      })
      //add user to firebase database
      //copy the formData 
      const formDataCopy = {...formData}
      //password is not to be submitted in database , so we delete it frpm the object
      delete formDataCopy.password
      //add a new property of timestamp which will be the timestap of when a new user is created
      //the timestamp property is not going to be changed later and is set up once during sign-up 
      formDataCopy.timeStamp = serverTimestamp()
      // Add a new document in collection "users"
      //setDoc returns a promise
      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      //navigate to home page after registration 
      navigate('/')
    }catch(error){
      toast.error("Could Not complete registration")
    }
  }

  const navigate = useNavigate()
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />

          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              //if showPassword is set show the password as text else show in the form of password
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <Link to='/sign-in' className='registerLink'>
          Sign In  Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp