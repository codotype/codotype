import * as React from "react";
import { Modal } from "../Modal";

// // // //

/**
 * ProjectFormModal
 * @param props.show
 * @param props.children
 * @param props.handleClose
 */
export function ProjectFormModal(props: {
    show: boolean;
    children: React.ReactNode;
    disabled: boolean;
    handleClose: () => void;
    onSubmit: () => void;
}) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <div className="p-5">
                <h3 className="text-2xl select-none">Project Name</h3>

                {props.children}
            </div>
            <div className="modal-footer-tw">
                <button
                    className="btn btn-lg btn-primary"
                    onClick={props.onSubmit}
                    disabled={props.disabled}
                >
                    Update Project Name
                </button>
                <button
                    className="btn btn-lg btn-light bg-white"
                    onClick={props.handleClose}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
