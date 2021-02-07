import * as React from "react";
import classnames from "classnames";
import { Draggable } from "react-beautiful-dnd";
import { AttributeListItemLabel } from "./AttributeListItemLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    DATATYPE_META,
    AttributeAddon,
    AttributeInput,
    CreatedByValues,
} from "@codotype/core";
import { faTrashAlt, faLock } from "@fortawesome/free-solid-svg-icons";

// // // //

/**
 * AttributeListItem
 * @param attribute
 * @param props.index
 * @param onClickEdit
 * @param onClickDelete
 */
export function AttributeListItem(props: {
    attribute: AttributeInput;
    addons: AttributeAddon[];
    index: number;
    onClickEdit: (attributeToBeEdited: AttributeInput) => void;
    onClickDelete: (attributeToDelete: AttributeInput) => void;
}) {
    const { attribute } = props;
    return (
        <Draggable draggableId={String(attribute.id)} index={props.index}>
            {provided => (
                <li
                    className={classnames(
                        "cursor-pointer flex justify-between group bg-white dark:text-gray-200 dark:bg-gray-900 hover:bg-gray-200 border-l-4 py-2 px-2 text-gray-900 font-light",
                        {
                            "border-green-500":
                                attribute.createdBy === CreatedByValues.plugin,
                            "border-gray-500":
                                attribute.createdBy !== CreatedByValues.plugin,
                        },
                    )}
                    onClick={() => {
                        // Don't allow editing if Attribute.locked is true
                        if (attribute.locked) {
                            return;
                        }
                        props.onClickEdit(attribute);
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="col-sm-10">
                        <AttributeListItemLabel
                            attribute={attribute}
                            addons={props.addons}
                            datatype={
                                // @ts-ignore
                                DATATYPE_META[attribute.datatype]
                            }
                        />
                    </div>

                    {attribute.locked && (
                        <div className="text-right justify-end opacity-0 group-hover:opacity-100">
                            <span
                                className="badge bg-gray-500"
                                title="This Attribute is auto-generated - it may not be edited or removed."
                            >
                                {/* <i className="fa fa-fw fa-lock" /> */}
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                        </div>
                    )}

                    {!attribute.locked && (
                        <div className="opacity-0 group-hover:opacity-100">
                            <button
                                className="px-0 py-0 text-gray-500 hover:text-red-500 p-1 focus:outline-none transition-colors duration-150 ease-in-out"
                                onClick={e => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    props.onClickDelete(attribute);
                                }}
                            >
                                <FontAwesomeIcon
                                    className="mx-2"
                                    icon={faTrashAlt}
                                />
                            </button>
                        </div>
                    )}
                </li>
            )}
        </Draggable>
    );
}
