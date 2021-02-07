import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faLaugh } from "@fortawesome/free-regular-svg-icons";

// // // //

/**
 * ProjectForm
 * @param props.label
 */
export function ProjectForm(props: {
    value: string;
    onChange: (updatedProjectLabel: string) => void;
    onSubmit: (updatedProjectLabel: string) => void;
}) {
    return (
        <div className="row items-center justify-center select-none">
            <div className="col-sm-12">
                <p className="mt-3 text-muted">
                    <span className="text-indigo-500">Project Name</span> is used for
                    naming things like files, folders, namespaces, and databases in your exported codebase
                    {/* <FontAwesomeIcon icon={faLaugh} /> */}
                </p>

                <p className="mt-3 text-muted">
                    <small className="mb-4 text-muted">
                        <FontAwesomeIcon icon={faLightbulb} className="mr-1" />
                    Try something simple like <code>Todo List</code>, or{" "}
                        <code>Inventory Manager</code>
                    </small>
                </p>

                <input
                    className="form-control rounded-lg py-12 font-2xl"
                    placeholder="Project Name"
                    value={props.value}
                    onChange={e => {
                        props.onChange(e.currentTarget.value);
                    }}
                    onKeyDown={e => {
                        // ENTER KEY CODE
                        if (e.keyCode === 13) {
                            props.onSubmit(e.currentTarget.value);
                        }
                    }}
                />

                <p className="mt-3 text-muted">
                    The input field will enforce proper capitalization and spacing{" "}
                    <FontAwesomeIcon icon={faLaugh} />
                </p>
            </div>
        </div>
    );
}
