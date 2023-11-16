"use client";

// pages/index.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchPosts } from "../store/postsSlice";
import Link from "next/link";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : error ? (
        <p>erorr {error}</p>
      ) : (
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.url}`}>
                <h3>{post.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
