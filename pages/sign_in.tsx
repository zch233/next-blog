import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { withSession } from '../lib/withSesstion';
import { User } from '../src/entity/User';
import { userForm } from '../hooks/userForm';
import queryString from 'query-string';
import { useRouter } from 'next/router';

const SignIn: NextPage<{ user: User }> = (props) => {
  const router = useRouter();
  const { form } = userForm({
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
    url: '/api/v1/signIn',
    afterSubmit: async err => {
      if (err) return;
      window.alert('登陆成功!');
      const redirect = queryString.parse(window.location.search).redirect;
      await router.push(redirect?.toString() || '/posts');
    },
    submitContent: <><input type="submit"/><input onClick={ () => router.push('/sign_up') } type="button" value="立即注册"/></>
  });
  return (
    <>
      { props.user && `${props.user.username}，您已登录` }
      <h1>登陆</h1>
      { form }
    </>
  );
};
export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('user') || '';
  return {
    props: {
      user,
    },
  };
});
