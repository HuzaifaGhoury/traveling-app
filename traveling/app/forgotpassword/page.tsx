"use client"
// components/forgotpassword/Form.tsx
import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth, sendPasswordResetEmail } from '../../app/firebase';

const ForgotPasswordForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },

    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await sendPasswordResetEmail(auth, values.email);
        console.log('Password reset email sent successfully');
      } catch (error) {
        console.error('Error sending password reset email:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
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

      <button
        type='submit'
        className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300  w-80'
        disabled={loading}
      >
        {loading ? 'Sending Email...' : 'Send Password Reset Email'}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
