import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../components/Page';
import { BlogPostCard } from '../sections/@dashboard/blog';
import { getPost } from '../services/post';

export default function BlogView() {
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    let subscribe = true;

    console.log({ id });
    getPost(id).then((res) => {
      if (res?.data && subscribe) {
        console.log({ res });
        setPost(res.data);
      }
    });

    return () => {
      subscribe = false;
    };
  }, [id]);

  return <Page title="Blog">{post && <BlogPostCard key={post.id} post={post} expanded />}</Page>;
}
