import React from 'react';
import {NextPage} from 'next';
import {userForm} from '../../hooks/userForm';
import axios from 'axios';
import {useRouter} from 'next/router';

const NewPost: NextPage = () => {
  const router = useRouter()
  const {form} = userForm({
    fields: [
      {
        label: '标题',
        key: 'title',
        inputType: 'text',
      },
      {
        label: '内容',
        key: 'content',
        inputType: 'textarea',
      },
    ],
    initFormData: {title: '', content: ''},
    submit: (formData) => axios.post('/api/v1/posts', formData).then(async () => {
      window.alert('创建成功')
      await router.push('/posts')
    }),
  });
  return (
    <div>
      <h1>创作：</h1>
      {form}
    </div>
  );
};

export default NewPost;