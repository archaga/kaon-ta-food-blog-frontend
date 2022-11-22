import axios from 'axios';
import { getDomain } from './domain';
import { getUserToken } from './helpers';

export async function createPost(title, description, image) {
  const formData = new FormData();

  formData.append('title', title);
  formData.append('description', description);
  formData.append('image', image);

  return axios.post(
    `${process.env.REACT_APP_API_PROTOCOL}${getDomain()}.${process.env.REACT_APP_API_URL}/posts`,
    formData,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  );
}

export async function getPosts(page, size) {
  return axios.get(`${process.env.REACT_APP_API_PROTOCOL}${getDomain()}.${process.env.REACT_APP_API_URL}/posts`, {
    params: {
      'page[number]': page,
      'page[size]': size,
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
  });
}

export async function getPost(id) {
  return axios.get(`${process.env.REACT_APP_API_PROTOCOL}${getDomain()}.${process.env.REACT_APP_API_URL}/posts/${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
  });
}

export async function deletePost(id) {
  return axios.delete(
    `${process.env.REACT_APP_API_PROTOCOL}${getDomain()}.${process.env.REACT_APP_API_URL}/posts/${id}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  );
}

export async function updatePost(id, title, description) {
  return axios.put(
    `${process.env.REACT_APP_API_PROTOCOL}${getDomain()}.${process.env.REACT_APP_API_URL}/posts/${id}`,
    {
      title,
      description,
    },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  );
}
