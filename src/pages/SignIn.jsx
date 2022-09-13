import { useState } from 'react'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

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
      //signInWithEmailAndPassword return a promise
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      // console.log(userCredential)
      if(userCredential.user){
        //naviaget to home page once sign is succesfull
        navigate('/')
      }
    } catch(error){
      //if wrong password is provide we get a 400 Bad Request
      toast.error('Invalid User Credentials')
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

          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <Link to='/sign-up' className='registerLink'>
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn