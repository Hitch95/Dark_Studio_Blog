import { useState, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { FaCirclePlus } from "react-icons/fa6";
import styles from "./ImageUpload.module.scss";

const ImageUpload = ({ onUpload }) => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleUpload = useCallback((result) => {
        setUploadedImageUrl(result.info.secure_url);
        setUploadSuccess(true);
        onUpload(result.info.secure_url);
    }, [onUpload]);

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="selxvulx"
            options={{
                maxFiles: 1
            }}
            role="form"
            aria-label="Image upload"
        >
            {function ({ open }) {
                return (
                    <section onClick={() => open && open()} className={styles.image_upload} aria-labelledby="upload image">
                        <button 
                            type="button" 
                            aria-pressed={uploadSuccess}
                            style={uploadSuccess ? { outline: "2px solid #49b07d" } : {}}
                        >
                            {
                                !uploadSuccess ? (
                                    <>
                                        Add image
                                        <FaCirclePlus aria-hidden="true" />
                                    </>
                                ) : (
                                    <>
                                        Image uploaded successfully!
                                    </>
                                )
                            }
                        </button>
                    </section>
                );
            }}
        </CldUploadWidget>
    );
};

export default ImageUpload;
