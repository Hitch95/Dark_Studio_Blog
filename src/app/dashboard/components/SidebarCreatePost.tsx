'use client';

import { useState } from 'react';
import { Field } from '@base-ui-components/react/field';
import { Form } from '@base-ui-components/react/form';

import Button from '@/components/Button/Button';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import styles from '../posts.module.css';

const SidebarCreatePost = () => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetUploadImage, setResetUploadImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const title = e.target[0].value;
  //     const description = e.target[1].value;
  //     const content = e.target[2].value;
  //     const image = uploadedImage;

  //     if (!title || !description || !image || !content) {
  //         setError("Please fill in all the fields");
  //         return;
  //     }

  //     try {
  //         await fetch("/api/posts", {
  //             method: "POST",
  //             body: JSON.stringify({
  //                 title,
  //                 description,
  //                 image,
  //                 content,
  //                 user: userData,
  //             }),
  //         });
  //         mutate();
  //         e.target.reset();
  //         setError(null)
  //         setUploadedImage(null);
  //         setResetUploadImage(prev => !prev);
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };

  return (
    <>
      <Form
        className={styles.form}
        errors={error}
        onSubmit={async (event) => {
          event.preventDefault();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        <h3>Add New Post</h3>
        <Field.Root name='title' className={styles.field}>
          <Field.Label className={styles.label}>Title</Field.Label>
          <Field.Control
            type='text'
            required
            placeholder='Title'
            className={styles.input}
          />
          <Field.Error className={styles.error} />
        </Field.Root>

        <Field.Root name='content' className={styles.field}>
          <Field.Label className={styles.label}>Content</Field.Label>
          <Field.Control
            type='text'
            required
            placeholder='Content'
            className={styles.input}
          />
          <Field.Error className={styles.error} />
        </Field.Root>
        <textarea
          placeholder='Description'
          className={styles.textArea}
          cols={30}
          rows={10}
        ></textarea>
        <ImageUpload
          onUpload={setUploadedImage}
          resetUploadImage={resetUploadImage}
        />
        <Button text={'Send'}></Button>
      </Form>
    </>
  );
};

export default SidebarCreatePost;
