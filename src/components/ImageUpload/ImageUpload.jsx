import { useCallback } from "react";
import Image from "next/image";
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
        >
            {function ({ open }) {
                return (
                    <div onClick={() => open && open()} className={styles.image_upload}>
                        <div>
                            Click to upload
                        </div>
                    </div>
                );
            }}
        </CldUploadWidget>
    );
};

export default ImageUpload;
