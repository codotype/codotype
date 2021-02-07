import * as React from "react";
import { Tooltip } from "../Tooltip";
import {
    Relation,
    AddonPropertyInlineIcons,
    SchemaInput,
    RelationAddon,
    PropertyTypes,
} from "@codotype/core";
import { Draggable } from "react-beautiful-dnd";
import { RelationBadge } from "./RelationBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
    faTrashAlt,
    faSnowflake,
    faAsterisk,
    faStar,
    faTag,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";

// // // //

// Maps AddonPropertyInlineIcon to associated FontAwesome IconDefinition
const mapAddonIconToFontAwesome: {
    [key in AddonPropertyInlineIcons]: IconDefinition | null;
} = {
    [AddonPropertyInlineIcons.none]: null,
    [AddonPropertyInlineIcons.snowflake]: faSnowflake,
    [AddonPropertyInlineIcons.asterisk]: faAsterisk,
    [AddonPropertyInlineIcons.star]: faStar,
    [AddonPropertyInlineIcons.tag]: faTag,
    [AddonPropertyInlineIcons.check]: faCheck,
};

/**
 * RelationListItem
 * @param props.relation
 * @param props.index
 * @param onClickEdit
 * @param onClickDelete
 */
export function RelationListItem(props: {
    relation: Relation;
    index: number;
    selectedSchema: SchemaInput;
    schemas: SchemaInput[];
    addons: RelationAddon[];
    onClickEdit: (relationToBeEdited: Relation) => void;
    onClickDelete: (relationToDelete: Relation) => void;
}) {
    const { relation } = props;
    return (
        <Draggable draggableId={String(relation.id)} index={props.index}>
            {provided => (
                <li
                    className="cursor-pointer flex justify-between group bg-white dark:bg-gray-900 dark:text-gray-200 hover:bg-gray-200 border-indigo-500 border-l-4 py-2 px-2 text-gray-900 font-light"
                    ref={provided.innerRef}
                    onClick={() => {
                        // Don't allow editing if Attribute.locked is true
                        if (relation.locked) {
                            return;
                        }
                        props.onClickEdit(relation);
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="flex">
                        <RelationBadge
                            slim
                            direction="out"
                            relation={relation}
                        />
                        {/* Render Addon badges */}
                        {props.addons
                            .filter(
                                a =>
                                    relation.type !== null &&
                                    a.supportedRelationTypes.includes(
                                        relation.type,
                                    ),
                            )
                            .map(addon => {
                                const icon =
                                    mapAddonIconToFontAwesome[
                                        addon.property.inlineIcon
                                    ];
                                if (icon === null) {
                                    return null;
                                }

                                if (
                                    relation.addons[
                                        addon.property.identifier
                                    ] === undefined
                                ) {
                                    return null;
                                }

                                // Return null for boolean addon with falsey property
                                if (
                                    addon.property.propertyType ===
                                        PropertyTypes.BOOLEAN &&
                                    relation.addons[
                                        addon.property.identifier
                                    ] === false
                                ) {
                                    return null;
                                }

                                return (
                                    <Tooltip
                                        position="right"
                                        tooltipContent={
                                            <>{addon.property.content.label}</>
                                        }
                                    >
                                        <span className="ml-2 badge bg-gray-300">
                                            <FontAwesomeIcon icon={icon} />
                                        </span>
                                    </Tooltip>
                                );
                            })}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100">
                        <button
                            className="px-0 py-0 text-gray-500 hover:text-red-500 p-1 focus:outline-none transition-colors duration-150 ease-in-out"
                            onClick={e => {
                                e.stopPropagation();
                                e.preventDefault();
                                props.onClickDelete(relation);
                            }}
                        >
                            <FontAwesomeIcon
                                className="mx-2"
                                icon={faTrashAlt}
                            />
                        </button>
                    </div>
                </li>
            )}
        </Draggable>
    );
}
