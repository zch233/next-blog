import {NextPage} from 'next';
import React from 'react';
import {userForm} from '../lib/userForm';
import axios from 'axios';

const SignUp: NextPage = () => {
  const {form} = userForm({
    fields: [
      {
        label: '帐号',
        inputType: 'text',
        key: 'username',
      },
      {
        label: '密码',
        inputType: 'password',
        key: 'password',
      },
      {
        label: '确认密码',
        inputType: 'password',
        key: 'passwordConfirmation',
      },
    ],
    initFormData: { username: '', password: '', passwordConfirmation: '' },
    submit: (formData) => axios.post('/api/v1/createUser', formData).then(() => window.alert('注册成功'))
  })
  return (
    <>
      <h1>注册</h1>
      {form}
    </>
  );
};
export default SignUp;
