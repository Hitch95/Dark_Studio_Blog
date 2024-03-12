import { useState } from "react";

const useConfirmationPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const requestConfirmation = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    
    const handleConfirm = async (action) => {
        await action(); // Ensure action is awaited
        setIsOpen(false); // Close the popup after action is completed
    }

    return { isOpen, requestConfirmation, handleClose, handleConfirm };
};

export default useConfirmationPopup;