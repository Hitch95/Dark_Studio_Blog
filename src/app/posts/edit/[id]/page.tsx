// "use client"

// import React, { useState, useEffect, useContext } from "react";
// import styles from "./page.module.css";
// import { useRouter } from "next/navigation";
// // import { UserContext } from "../../../../context/UserContext";
// import toast from "react-hot-toast";

// const Edit = ({ params }) => {
//     // const { userData } = useContext(UserContext);
//     const { id } = params;
//     const [data, setData] = useState({
//         title: "",
//         content: "",
//         description: "",
//     });
//     const [shouldRedirect, setShouldRedirect] = useState(false);
//     const router = useRouter();

//     // Fetch data for the post
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`);
//                 if (!res.ok) {
//                     throw new Error("Post not found");
//                 }
//                 const post = await res.json();
//                 console.log(post);
//                 setData(post);
//             } catch (error) {
//                 console.error("Error fetching post:", error);
//             }
//         };

//         if (id) {
//             fetchData();
//         }
//     }, [id]);

//     const handleSubmit = async () => {
//         const res = await fetch(`http://localhost:3000/api/posts/${data.id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ ...data, user: userData }),
//         });
//         console.log(res);
//         if (!res.ok) {
//             toast.error("Failed to update post");
//             throw new Error("Failed to update post");
//         }
//         else {
//             toast.success("Post updated successfully");
//             // alert("Post Updated Successfully");
//             setShouldRedirect(true);
//         }
//     };

//     // Redirect after update
//     useEffect(() => {
//         if (shouldRedirect) {
//             router.push(`/posts/${data.id}`);
//         }
//     }, [shouldRedirect, router, data.id]);

//     return (
//         <div>
//             {(userData && userData?.id === data?.user_id) || userData?.isAdmin ?
//                 <form className={styles.new} >
//                     <h1>Edit  Post</h1>
//                     <input onChange={(e) => { setData({ ...data, title: e.target.value }) }} value={data?.title} type="text" placeholder="Title" className={styles.input} />
//                     <input onChange={(e) => { setData({ ...data, content: e.target.value }) }} value={data?.content} type="text" placeholder="Content" className={styles.input} />

//                     <textarea onChange={(e) => { setData({ ...data, description: e.target.value }) }} value={data?.description}
//                         placeholder="Description"
//                         className={styles.textArea}
//                         cols="30"
//                         rows="10"
//                         type="text"
//                     >
//                     </textarea>
//                     <button type='button' onClick={handleSubmit} className={styles.button}>Edit Post</button>
//                 </form>
//                 : <span>You are Not Authorized to Edit this Post Or The Post Not Exists</span>
//             }
//         </div>
//     )
// }

// export default Edit
