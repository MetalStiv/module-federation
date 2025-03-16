import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IConfirmationDialogProps {
    showText: string,
    btnAcceptText: string,
    btnDeclineText: string,
    question: string,
    action: () => void
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({ showText, btnAcceptText,
    btnDeclineText, question,  action}) => {
    const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleAccept = () => {
        action()
        handleClose()
    }
    
    return (
        <>
            <Button onClick={handleOpen} variant='outline-danger'>{showText}</Button>

            <Modal
                show={modalIsOpen}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {question}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {btnDeclineText}
                    </Button>
                    <Button variant="primary" onClick={handleAccept}>{btnAcceptText}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmationDialog;