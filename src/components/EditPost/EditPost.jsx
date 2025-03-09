'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useSession } from "next-auth/react";
import { updatePost } from '../../app/api/utils/api';

const EditPost = ({ post, onSave }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const router = useRouter();
  const { id } = router.query;

  const handleSave = async () => {
    try {
      await updatePost(id, { title, description });
      onSave();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.textArea}
        cols="30"
        rows="10"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSave} className={styles.button}>
        Save
      </button>
    </form>
  );
};

export default EditPost;
