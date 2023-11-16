"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchPosts } from "../../../store/postsSlice";

const Post = ({ params }: { params: any }) => {
  const id = params;
  const userId = id.userId;

  const dispatch: AppDispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    // Extract userId from the URL
    if (userId) {
      dispatch(fetchPosts());
    }
  }, [dispatch]);

  // Assuming fetchPosts updates the Redux state with posts
  const userPosts = data.filter((post) => post.url === userId);

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : error ? (
        <p>error: {error}</p>
      ) : (
        <ul>
          {userPosts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.brief}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Post;
