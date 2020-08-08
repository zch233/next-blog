import {NextPage} from 'next';
import React from 'react';
import {userForm} from '../hooks/userForm';
import axios from 'axios';
import {useRouter} from 'next/router';

const SignUp: NextPage = () => {
  const router = useRouter()
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
    submit: (formData) => axios.post('/api/v1/createUser', formData).then(async () => {
      window.alert('注册成功')
      await router.push('/sign_in')
    })
  })
  return (
    <>
      <h1>注册</h1>
      {form}
    </>
  );
};
export default SignUp;
