import { useState, useEffect, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { FaCirclePlus } from "react-icons/fa6";
import styles from "./ImageUpload.module.scss";

const ImageUpload = ({ onUpload, resetUploadImage }) => {
    // eslint-disable-next-line no-unused-vars
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);

    useEffect(() => {
        if (resetUploadImage) {
            setUploadedImageUrl("");
            setUploadSuccess(false);
        }
    }, [resetUploadImage]);

    const handleUpload = useCallback((result) => {
        const url = result.info.secure_url;
        setUploadedImageUrl(url);
        setUploadSuccess(true);
        onUpload(url);
    }, [onUpload]);

    const handleOpenWidget = (open) => {
        if (open) open();
    };

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
            {({ open }) => (
                <section onClick={() => handleOpenWidget(open)} className={styles.image_upload}>
                    <button 
                        type="button" 
                        aria-pressed={uploadSuccess}
                        style={uploadSuccess ? { outline: "2px solid #49b07d" } : {}}
                    >
                        {uploadSuccess ? "Image uploaded successfully!" : "Add image"}
                        {!uploadSuccess && <FaCirclePlus aria-hidden="true" />}
                    </button>
                </section>
            )}
        </CldUploadWidget>
    );
};

export default ImageUpload;
