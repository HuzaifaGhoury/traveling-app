"use client"

import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import signupimg from '../../public/Images/signupimg.jpg';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../../app/firebase';
import { useRouter } from 'next/navigation';
import SignInForm from '../signin/page'

const AuthPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const router = useRouter();

  const signUpSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
  });

  const validationSchema = isSignUp ? signUpSchema : null;

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        if (isSignUp) {
          const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
          console.log('User signed up:', userCredential.user);
          router.push('/home');
        } else {
          const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
          console.log('User signed in:', userCredential.user);
          router.push('/home');
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);  
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    formik.resetForm();
    // Set the URL based on isSignUp
    const pathname = isSignUp ? '/signup' : '/signin';
    window.history.replaceState({}, '', pathname);
  }, [isSignUp]);
  
  return (
    <div className='bg-gray-200 w-screen h-screen flex items-center justify-center'>
      <div className='w-9/12 h-5/6 flex shadow-lg bg-white rounded-lg overflow-hidden'>
        <div className='w-6/12'>
          <Image src={signupimg} alt='signupbg' objectFit='cover' className='w-full h-full' />
        </div>
        <div className='w-6/12 p-8'>
          <p className='text-center text-2xl font-mono font-bold underline mb-4'>
            {isSignUp ? 'SIGN UP!' : 'SIGN IN!'}
          </p>
          {isSignUp ? (
            <form className='flex flex-col gap-4 pl-16 mt-7' onSubmit={formik.handleSubmit}>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='border border-gray-300 p-2 pl-9 rounded-2xl focus:outline-none focus:ring focus:border-blue-300 w-80'
                />
                <FaUser className='absolute left-3 top-3 text-gray-500' />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className='text-red-500 -mt-2'>{formik.errors.username}</p>
              )}

              <div className='relative'>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='border border-gray-300 p-2 pl-9 rounded-2xl focus:outline-none focus:ring focus:border-blue-300 w-80'
                />
                <FaEnvelope className='absolute left-3 top-3 text-gray-500' />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className='text-red-500 -mt-2'>{formik.errors.email}</p>
              )}

              <div className='relative'>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder='Password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='border border-gray-300 p-2 pl-9 rounded-2xl focus:outline-none focus:ring focus:border-blue-300  w-80'
                />
                <FaLock className='absolute left-3 top-3 text-gray-500' />
                <div
                  className='absolute   right-20 top-3 text-gray-500 cursor-pointer'
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className='text-red-500  -mt-2'>{formik.errors.password}</p>
              )}

              <div className='relative'>
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='border border-gray-300 p-2 pl-9 rounded-2xl focus:outline-none focus:ring focus:border-blue-300 w-80 '
                />
                <FaLock className='absolute left-3 top-3 text-gray-500' />
                <div
                  className='absolute right-20 top-3 text-gray-500 cursor-pointer'
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className='text-red-500 -mt-2'>{formik.errors.confirmPassword}</p>
              )}

              <button
                type='submit'
                className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300  w-80'
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
          ) : (
            <SignInForm />
          )}
          <p className='text-center mt-4'>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
            <span
              className='text-blue-500 cursor-pointer'
              onClick={() => setIsSignUp((prev) => !prev)}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;