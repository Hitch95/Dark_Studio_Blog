import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import styles from "./ImageUpload.module.scss";

const ImageUpload = ({ onUpload }) => {
    const handleUpload = useCallback((result) => {
        console.log("Secure URL from Cloudinary:", result.info.secure_url);
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
                    <section onClick={() => open && open()} className={styles.image_upload} aria-labelledby="uploadLabel">
                        {/* Une icône d'upload devrait être ici */}
                        <button type="button">Click to upload</button>
                    </section>
                );
            }}
        </CldUploadWidget>
    );
};

export default ImageUpload;
