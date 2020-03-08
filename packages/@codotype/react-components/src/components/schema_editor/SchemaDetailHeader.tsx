import * as React from "react";
import { SchemaEditButton } from "./SchemaEditButton";
import { SchemaDeleteButton } from "./SchemaDeleteButton";
import { SchemaDeleteModal } from "./SchemaDeleteModal";
import { Schema } from "../types";
import { SchemaFormModal } from "./SchemaFormModal";

// // // //

export function SchemaDetailHeader(props: { schema: Schema }) {
    const [showDeleteModal, showModal] = React.useState(false);
    const [showingEditModal, showEditModal] = React.useState(false);
    return (
        <div className="row">
            <div className="col-lg-10">
                <h4 className="mb-0">
                    {props.schema.tokens.label} Schema
                    <SchemaEditButton onClick={() => showEditModal(true)} />
                    <SchemaFormModal
                        show={showingEditModal}
                        handleClose={() => {
                            showEditModal(false);
                        }}
                    >
                        <p>Schema Form Goes Here</p>
                    </SchemaFormModal>
                </h4>
            </div>
            <div className="col-lg-2 d-flex justify-content-end">
                <SchemaDeleteButton onClick={() => showModal(true)} />
                <SchemaDeleteModal
                    show={showDeleteModal}
                    onClose={() => showModal(false)}
                    onConfirmDelete={() => {
                        showModal(false);
                    }}
                />
            </div>
            <div className="col-lg-12">
                <hr />
            </div>
        </div>
    );
}