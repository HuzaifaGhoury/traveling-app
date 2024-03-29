"use client"
import React, { useState , useEffect } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from '../firebase';
import { useRouter } from 'next/navigation';
import ForgotPasswordForm from '../forgotpassword/page'; // Import the ForgotPasswordForm component

const SignInForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to manage the visibility of ForgotPasswordForm
  const router = useRouter();

  const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, values.email, values.password);
        console.log('User signed in successfully');
        router.push('/home');
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

  const handleForgotPassword = () => {
    setShowForgotPassword(true); // Show ForgotPasswordForm
  };

  useEffect(() => {
    formik.resetForm();
    // Set the URL based on whether the user is signing in or signing up
    const pathname = showForgotPassword ? '/forgot-password' : '/signin';
    window.history.replaceState({}, '', pathname);
  }, [showForgotPassword]);

  return (
    <>
      {!showForgotPassword && ( // Render SignInForm only if showForgotPassword is false
        <form className='flex flex-col gap-4 pl-16 mt-7' onSubmit={formik.handleSubmit}>
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
              className='absolute right-20 top-3 text-gray-500 cursor-pointer'
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className='text-red-500  -mt-2'>{formik.errors.password}</p>
          )}

          <button
            type='submit'
            className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300  w-80'
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      )}
      {!showForgotPassword && ( // Render "Forgot Password" link only if showForgotPassword is false
        <p className='text-center mt-4'>
          <span className='text-blue-500 cursor-pointer' onClick={handleForgotPassword}>
            Forgot Password
          </span>
        </p>
      )}
      {showForgotPassword && <ForgotPasswordForm />} {/* Render ForgotPasswordForm if showForgotPassword is true */}
    </>
  );
};

export default SignInForm;
