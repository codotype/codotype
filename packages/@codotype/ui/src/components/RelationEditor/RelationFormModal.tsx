import * as React from "react";
import { RelationInput } from "@codotype/core";
import { Modal } from "../Modal";

// // // //

/**
 * RelationFormModal
 */
export function RelationFormModal(props: {
    show: boolean;
    disableSubmit: boolean;
    relationInput: RelationInput;
    children: React.ReactNode;
    onCancel: () => void;
    onSubmit: () => void;
}) {
    // Defines title based on props.isNew
    let title = "Update Relation";
    if (props.relationInput.id === "") {
        title = "Create Relation";
    }

    return (
        <Modal show={props.show} onHide={props.onCancel}>
            <div className="p-5">
                <h3 className="text-xl">{title}</h3>
                {props.children}
            </div>
            <div className="modal-footer-tw">
                <button
                    disabled={props.disableSubmit}
                    className="btn btn-lg btn-primary"
                    onClick={props.onSubmit}
                >
                    {title}
                </button>
                <button
                    className="btn btn-lg btn-light"
                    onClick={props.onCancel}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
