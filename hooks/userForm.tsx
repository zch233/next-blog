import React, { ReactChild, useCallback, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

interface Field<T> {
  label: string;
  key: keyof T;
  inputType: 'text' | 'textarea' | 'password';
}

interface UserFormOptions<T> {
  initFormData: T,
  fields: Field<T>[]; // keyof
  submitContent?: ReactChild;
  url: string;
  method?: 'get' | 'post';
  afterSubmit?: (err: AxiosError, data?: AxiosResponse) => Promise<void>;
}

const Errors: React.FC<{ errors: string[] }> = (props) => <div>{ props.errors.join('，') }</div>;

export function userForm<T> (userFormOptions: UserFormOptions<T>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { initFormData, fields, submitContent, method = 'post', url, afterSubmit } = userFormOptions;
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    (Object.keys(initFormData) as [keyof T]).map((key) => (e[key] = []));
    return e;
  });
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setLoading(true);
    const flag = true;
    axios.request({
      url,
      data: formData,
      method,
    }).then(data => afterSubmit && afterSubmit(null, data)).finally(() => setLoading(false)).catch(async (err: AxiosError) => {
      afterSubmit && await afterSubmit(err);
      const response = err.response;
      if (response.status === 422) {
        setErrors(response.data);
      } else if (response.status === 401) {
        window.alert('请登录');
        await router.push(`/sign_in?redirect=${ encodeURIComponent(window.location.pathname) }`);
      }
    });
  }, [formData]);
  const onChange = useCallback((e, type: keyof T) => {
    setFormData({ ...formData, [type]: e.target.value });
  }, [formData]);
  const form = loading ? <h1>Loading...</h1> : (
    <form onSubmit={ onSubmit }>
      { fields.map(field => (
        <div key={ field.key.toString() }>
          <label>
            { field.label }：
            { field.inputType === 'textarea' ?
              <textarea value={ formData[field.key].toString() } onChange={ (e) => onChange(e, field.key) }/> :
              <input type={ field.inputType } value={ formData[field.key].toString() }
                     onChange={ (e) => onChange(e, field.key) }/>
            }
          </label>
          <Errors errors={ errors[field.key] }/>
        </div>
      )) }
      { submitContent || <input type="submit"/> } <a href={void(0)} onClick={() => router.back()}><button type={'button'}>返回</button></a>
    </form>
  );
  return { form };
}