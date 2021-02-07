import { RelationPropertiesForm } from "./RelationPropertiesForm";
import {
    RelationInput,
    RelationType,
    SchemaInput,
    RelationAddon,
} from "@codotype/core";
import * as React from "react";
import { RelationAddonForm } from "./RelationAddonForm";

// // // //

/**
 * RelationFormProps
 * `relationInput` - the `Attribute` currently being edited
 * `supportedRelationTypes` - the unique IDs of supported datatypes made available in the form
 */
interface RelationFormProps {
    selectedSchema: SchemaInput;
    schema: SchemaInput;
    schemas: SchemaInput[];
    relations: RelationInput[];
    relationInput: RelationInput;
    relationAddons: RelationAddon[];
    supportedRelationTypes: RelationType[];
    onChange: (updatedRelationInput: RelationInput) => void;
}

/**
 * RelationForm
 * @param props - see `RelationFormProps`
 */
export function RelationForm(props: RelationFormProps) {
    const { relationInput, supportedRelationTypes } = props;

    if (supportedRelationTypes[0] && !relationInput.type) {
        props.onChange({ ...relationInput, type: supportedRelationTypes[0] });
        return null;
    }

    const hasRelationAddons =
        props.relationAddons.filter(a =>
            a.supportedRelationTypes.includes(relationInput.type),
        ).length > 0;

    return (
        <div className="grid grid-cols-1">
            <div className="col-span-1">
                <RelationPropertiesForm
                    relationInput={props.relationInput}
                    supportedRelationTypes={props.supportedRelationTypes}
                    schema={props.schema}
                    schemas={props.schemas}
                    onChange={(updatedRelationInput: RelationInput) => {
                        props.onChange({
                            ...relationInput,
                            ...updatedRelationInput,
                            addons: {}, // TODO - reset with valid default value, instead of just clearing the entire value
                        });
                    }}
                />
            </div>
            {hasRelationAddons && (
                <div className="col-span-1">
                    <hr />
                    <RelationAddonForm
                        relationInput={relationInput}
                        addons={props.relationAddons}
                        value={relationInput.addons}
                        relationCollection={props.relations}
                        onChange={updatedAddonsValue => {
                            props.onChange({
                                ...relationInput,
                                addons: updatedAddonsValue,
                            });
                        }}
                    />
                </div>
            )}
        </div>
    );
}
