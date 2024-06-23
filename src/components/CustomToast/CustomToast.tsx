import React from 'react';
import './CustomToast.css';
import { Toast } from 'react-bootstrap';
import { CustomToastProps } from '../../interface/ToastState';

const CustomToast: React.FC<CustomToastProps> = ({ show, message, onClose, type, delay = 5000 }) => {
    return (
        <Toast
            show={show}
            onClose={onClose}
            delay={type === 'success' ? (delay ? delay : 5000) : undefined}
            autohide={type === 'success'}
            className={`custom-toast ${type === "success" ? "custom-toast-success" : "custom-toast-error"}`}
        >
            <Toast.Header className={type === "success" ? "custom-toast-header-success" : "custom-toast-header-error"}>
                <strong className="mr-auto">{type === "success" ? "Success" : "Error"}</strong>
            </Toast.Header>
            <Toast.Body
            className={`custom-toast-body`}>{message}</Toast.Body>
        </Toast>
    );
};

export default CustomToast;
