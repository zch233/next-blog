import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import axios from 'axios'
import {withSession} from '../lib/withSesstion';
import {User} from '../src/entity/User';
import {userForm} from '../lib/userForm';
import queryString from 'query-string';


const SignIn: NextPage<{user: User}> = (props) => {
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
    ],
    initFormData: { username: '', password: '' },
    submit: (formData) => axios.post('/api/v1/signIn', formData).then(() => {
      window.alert('登陆成功')
      const redirect = queryString.parse(window.location.search).redirect
      window.location.href = redirect.toString() || '/posts'
    })
  })
  return (
    <>
      {props.user?.username}
      <h1>登陆</h1>
      {form}
    </>
  );
};
export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('user');
  return {
    props: {
      user: JSON.parse(JSON.stringify(user || {}))
    }
  };
});
