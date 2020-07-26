import React from 'react';
import {NextPage} from 'next';
import {userForm} from '../../lib/userForm';
import axios from 'axios';

const NewPost: NextPage = () => {
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
    submit: (formData) => axios.post('/api/v1/posts', formData).then(() => {
      window.alert('创建成功')
      window.location.href = '/posts'
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