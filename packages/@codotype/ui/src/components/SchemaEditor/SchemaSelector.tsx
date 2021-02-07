import * as React from "react";
import { SchemaInput } from "@codotype/core";
import classnames from "classnames";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "../Tooltip";

// // // //

export function SchemaSelectorItem(props: {
    schemaInput: SchemaInput;
    selected: boolean;
    index: number;
    onClick: (selectedSchema: SchemaInput) => void;
}) {
    return (
        <Draggable
            draggableId={String(props.schemaInput.id)}
            index={props.index}
        >
            {(provided, snapshot) => (
                <li
                    className={classnames(
                        "cursor-pointer bg-white dark:bg-gray-900 dark:text-gray-200 select-none hover:bg-gray-200 border-l-8 py-4 px-4",
                        {
                            "text-gray-900 font-semibold border-indigo-500":
                                props.selected,
                            "text-gray-600 font-light border-gray-500": !props.selected,
                            rounded: snapshot.isDragging,
                        },
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => {
                        props.onClick(props.schemaInput);
                    }}
                >
                    <div className="row items-center flex flex-row justify-between">
                        <span className="flex">
                            {props.schemaInput.identifiers.singular.title}
                        </span>

                        {/* Renders warning tooltip */}
                        {!props.schemaInput.attributes.length && (
                            <Tooltip
                                position="right"
                                tooltipContent={
                                    <>Schema requires at least one attribute</>
                                }
                            >
                                <FontAwesomeIcon
                                    className="text-warning"
                                    icon={faExclamationCircle}
                                />
                            </Tooltip>
                        )}
                    </div>
                </li>
            )}
        </Draggable>
    );
}

export function SchemaSelector(props: {
    schemaInputs: SchemaInput[];
    selectedSchemaId: string;
    onChange: (selectedSchema: SchemaInput) => void;
}) {
    return (
        <div className="shadow rounded-2xl overflow-hidden">
            <Droppable droppableId="schema-list">
                {(provided: any) => {
                    return (
                        <ul
                            className="list-group rounded-none"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {props.schemaInputs.map(
                                (s: SchemaInput, index: number) => {
                                    return (
                                        <SchemaSelectorItem
                                            index={index}
                                            key={s.id}
                                            schemaInput={s}
                                            selected={
                                                s.id === props.selectedSchemaId
                                            }
                                            onClick={props.onChange}
                                        />
                                    );
                                },
                            )}
                            {provided.placeholder}
                        </ul>
                    );
                }}
            </Droppable>
        </div>
    );
}
