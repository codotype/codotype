import * as React from "react";
import { SchemaPreview } from "./SchemaPreview";
import { AttributeEditor } from "../AttributeEditor";
import { RelationEditor } from "../RelationEditor";
import { SchemaDetailHeader } from "./SchemaDetailHeader";
import {
    inflateSchema,
    Schema,
    PluginMetadata,
    UUID,
    SchemaInput,
    AttributeInput,
    ConfigurationValue,
    ProjectInput,
    buildRelations,
    RelationInput,
} from "@codotype/core";
import { ConfigurationGroupSelector } from "./ConfigurationGroupSelector";
import { SchemaIncomingRelations } from "./SchemaIncomingRelations";

// // // //

interface SchemaDetailProps {
    schema: SchemaInput;
    projectInput: ProjectInput;
    pluginMetadata: PluginMetadata;
    onChange: (updatedSchema: SchemaInput) => void;
    onClickEdit: () => void;
    onConfirmDelete: () => void;
    onSelectSchema: (nextSelectedSchemaId: UUID) => void;
    onChangeRelations: (updatedRelations: RelationInput[]) => void;
}

/**
 * SchemaDetail
 * @param props - see `SchemaDetailProps`
 */
export function SchemaDetail(props: SchemaDetailProps) {
    const inflatedSchema: Schema = inflateSchema({
        schemaInput: props.schema,
        relations: buildRelations({
            schemaInputs: props.projectInput.schemas,
            relationInputs: props.projectInput.relations,
        }),
    });

    const { schemaEditorConfiguration } = props.pluginMetadata;

    return (
        <div className="grid grid-cols-1 select-none">
            <div className="col-sm-12">
                <SchemaDetailHeader
                    projectInput={props.projectInput}
                    schemaInput={props.schema}
                    onClickEdit={props.onClickEdit}
                    onConfirmDelete={props.onConfirmDelete}
                />
            </div>

            <div className="col-sm-12">
                <ConfigurationGroupSelector
                    schemaInput={props.schema}
                    configuration={props.schema.configuration}
                    configurationGroups={
                        schemaEditorConfiguration.configurationGroups
                    }
                    onChange={(updatedConfiguration: ConfigurationValue) => {
                        props.onChange({
                            ...props.schema,
                            configuration: updatedConfiguration,
                        });
                    }}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            {/* Only render AttributeEditor if there are supported Datatypes */}
                            {schemaEditorConfiguration.supportedDatatypes
                                .length > 0 && (
                                <AttributeEditor
                                    attributes={props.schema.attributes}
                                    supportedDatatypes={
                                        schemaEditorConfiguration.supportedDatatypes
                                    }
                                    addons={
                                        schemaEditorConfiguration.attributeAddons
                                    }
                                    onChange={(
                                        updatedAttributes: AttributeInput[],
                                    ) => {
                                        // Defines updated schema
                                        const updatedSchema: SchemaInput = {
                                            ...props.schema,
                                            attributes: updatedAttributes,
                                        };

                                        // Passes into `props.onChange`
                                        props.onChange(updatedSchema);
                                    }}
                                />
                            )}

                            {/* Only render RelationEditor if there are supported relations */}
                            {schemaEditorConfiguration.supportedRelationTypes
                                .length > 0 && (
                                <RelationEditor
                                    selectedSchema={props.schema}
                                    relationReferences={
                                        inflatedSchema.relations
                                    }
                                    relationAddons={
                                        schemaEditorConfiguration.relationAddons
                                    }
                                    schemas={props.projectInput.schemas}
                                    relations={props.projectInput.relations}
                                    supportedRelationTypes={
                                        props.pluginMetadata
                                            .schemaEditorConfiguration
                                            .supportedRelationTypes
                                    }
                                    onChange={(
                                        updatedRelations: RelationInput[],
                                    ) => {
                                        props.onChangeRelations(
                                            updatedRelations,
                                        );
                                    }}
                                />
                            )}
                        </div>
                        <div className="col-span-1">
                            <SchemaPreview
                                schemaInput={props.schema}
                                projectInput={props.projectInput}
                            />
                            <SchemaIncomingRelations
                                inflatedSchema={inflatedSchema}
                                onSelectSchema={props.onSelectSchema}
                            />
                        </div>
                    </div>
                </ConfigurationGroupSelector>
            </div>
        </div>
    );
}
