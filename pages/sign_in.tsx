import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import Axios from 'axios'

const Errors = (props: {errors:string[]}) => <div>{props.errors.join('，')}</div>

const SignIn: NextPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
  });
  const onChange = useCallback((e, type) => {
    setFormData({...formData, [type]: e.target.value})
  }, [formData]);
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    Axios.post('/api/v1/signIn', formData).then(data => {
      console.log(data)
    }).catch(err => {
      setErrors(err.response.data)
    })
  }, [formData]);
  return (
    <>
      <h1>登陆</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            帐号：
            <input type="text" value={formData.username} onChange={(e) => onChange(e, 'username')}/>
          </label>
          <Errors errors={errors.username} />
        </div>
        <div>
          <label>
            密码：
            <input type="text" value={formData.password} onChange={(e) => onChange(e, 'password')}/>
          </label>
          <Errors errors={errors.password} />
        </div>
        <input type="submit"/>
      </form>
    </>
  );
};
export default SignIn;
