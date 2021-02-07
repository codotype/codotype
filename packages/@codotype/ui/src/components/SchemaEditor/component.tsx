import * as React from "react";
import { SchemaSelector } from "./SchemaSelector";
import { SchemaDetail } from "./SchemaDetail";
import { SchemaNewButton } from "./SchemaNewButton";
import { DragDropContext } from "react-beautiful-dnd";
import { SchemaFormModal } from "./SchemaFormModal";
import { SchemaForm } from "./SchemaForm";
import {
    TokenPluralization,
    UUID,
    CreatedByValues,
    PluginMetadata,
    buildDefaultConfiguration,
    SchemaInput,
    Primatives,
    ProjectInput,
    RelationInput,
    validateSchema,
} from "@codotype/core";
import { reorder } from "../AttributeEditor/reorder";

// // // //

interface EditorState {
    projectInput: ProjectInput;
    lastUpdatedAt: null | number;
}

/**
 * SchemaEditorLayout
 * @param props.projectInput
 * @param props.pluginMetadata
 * @param props.onChange
 */
export function SchemaEditorLayout(props: {
    projectInput: ProjectInput;
    pluginMetadata: PluginMetadata;
    onChange: (updatedProjectInput: ProjectInput) => void;
}) {
    const { projectInput } = props;
    const { schemas } = projectInput;
    const [showModal, setShowModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [
        newTokenPluralization,
        setNewTokenPluralization,
    ] = React.useState<TokenPluralization | null>(null);
    const [state, setState] = React.useState<EditorState>({
        projectInput: props.projectInput,
        lastUpdatedAt: null,
    });
    const [selectedSchemaId, setSelectedSchemaId] = React.useState<UUID | null>(
        null,
    );

    // Update state.projectInput.schemas when schemas changes
    React.useEffect(() => {
        setState({ ...state, projectInput: { ...projectInput, schemas } });
    }, [schemas]);

    // Invoke props.onChange when state.projectInput.schemas has updated
    React.useEffect(() => {
        props.onChange({
            ...props.projectInput,
            schemas: state.projectInput.schemas,
        });
    }, [state.lastUpdatedAt]);

    // Sets selectedSchemaId if none is defined
    if (state.projectInput.schemas[0] && selectedSchemaId == null) {
        setSelectedSchemaId(state.projectInput.schemas[0].id);
        return null;
    }

    // Defines selectedSchema
    const selectedSchema:
        | SchemaInput
        | undefined = state.projectInput.schemas.find((s: SchemaInput) => {
        return s.id === selectedSchemaId;
    });

    // Defines handler for creating new schemas
    function createNewSchema() {
        // Short-circuit if newTokenPluralization is null
        if (newTokenPluralization === null) {
            return;
        }

        const errors = validateSchema({
            schemaCollection: schemas,
            tokenPluralization: newTokenPluralization,
        });

        // Short-circuit if
        if (errors.length > 0) {
            return;
        }

        // Defines new schema
        const newSchema: SchemaInput = new Primatives.Schema({
            attributes: [
                ...props.pluginMetadata.schemaEditorConfiguration.newSchemaDefaults.attributes.map(
                    a => {
                        return {
                            ...a,
                        };
                    },
                ),
            ],
            locked: false,
            createdBy: CreatedByValues.user,
            identifiers: newTokenPluralization,
            configuration: buildDefaultConfiguration(
                props.pluginMetadata.schemaEditorConfiguration
                    .configurationGroups,
            ),
        });

        // ProjectInput.relations
        const defaultRelations =
            props.pluginMetadata.schemaEditorConfiguration.defaultRelations;
        const updatedRelations = [
            ...state.projectInput.relations,
            ...defaultRelations.map(r => {
                // Return new relation where destinationSchemaID is the newly created SchemaInput
                if (r.destinationSchemaID === "") {
                    return {
                        ...r,
                        destinationSchemaID: newSchema.id,
                    };
                }

                // Return new relation where sourceSchemaID is the newly created SchemaInput
                return {
                    ...r,
                    sourceSchemaID: newSchema.id,
                };
            }),
        ];

        // Defines updated schemas, including NEW schema
        const updatedSchemas: SchemaInput[] = [
            ...state.projectInput.schemas,
            newSchema,
        ];

        // Updates state.projectInput.schemas with the latest schemas
        setState({
            ...state,
            lastUpdatedAt: Date.now(),
            projectInput: {
                ...state.projectInput,
                schemas: updatedSchemas,
                relations: updatedRelations,
            },
        });

        // Select the newly created schema
        setSelectedSchemaId(newSchema.id);

        // Clears newTokenPluralization
        setShowModal(false);
        setNewTokenPluralization(null);
    }

    // Defines handler for updating existing schemas
    function updateExistingSchema() {
        // Short-circuit if newTokenPluralization is null
        if (newTokenPluralization === null) {
            return;
        }

        if (!selectedSchema) {
            return;
        }

        // Defines updatedSchema
        const updatedSchema: SchemaInput = {
            ...selectedSchema,
            identifiers: newTokenPluralization,
        };

        const errors = validateSchema({
            schemaCollection: schemas,
            tokenPluralization: newTokenPluralization,
        });

        // Short-circuit if
        if (errors.length > 0) {
            return;
        }

        // Defines updated schemas, including NEW schema
        const updatedSchemas: SchemaInput[] = state.projectInput.schemas.map(
            (s: SchemaInput) => {
                if (s.id === updatedSchema.id) {
                    return updatedSchema;
                }
                return s;
            },
        );

        // Updates state.projectInput.schemas with the latest schemas
        setState({
            ...state,
            lastUpdatedAt: Date.now(),
            projectInput: {
                ...state.projectInput,
                schemas: updatedSchemas,
            },
        });

        // Closes edit modal
        setShowEditModal(false);

        // Clears newTokenPluralization
        setNewTokenPluralization(null);
    }

    // Last check to ensure that selectedSchema _can_ be defined
    // NOTE - this should be simpler + combined with the above
    if (selectedSchema === undefined && state.projectInput.schemas.length > 0) {
        setSelectedSchemaId(state.projectInput.schemas[0].id);
    }

    // Show empty state
    if (selectedSchemaId === null || selectedSchema === undefined) {
        // return <SchemaEditorEmptyState />;
        return (
            <div className="flex px-4 py-4 justify-center items-center">
                <div className="col-sm-8">
                    <div className="card card-body shadow-xl">
                        <div className="row items-center justify-center">
                            <div className="col-lg-12">
                                <h4>New Schema</h4>

                                <SchemaForm
                                    label={""}
                                    onChange={updatedTokens => {
                                        setNewTokenPluralization(updatedTokens);
                                    }}
                                    onKeydownEnter={() => {
                                        createNewSchema();
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 text-right mt-2">
                            <button
                                className="btn btn-lg btn-primary"
                                disabled={
                                    newTokenPluralization === null ||
                                    newTokenPluralization.singular.title === ""
                                }
                                onClick={() => {
                                    createNewSchema();
                                }}
                            >
                                Create Schema
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Defines onDragEnd callback for <DragDropContext />
    function onDragEnd(result: any) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const updatedSchemas = reorder<SchemaInput>(
            state.projectInput.schemas,
            result.source.index,
            result.destination.index,
        );

        setState({
            ...state,
            lastUpdatedAt: Date.now(),
            projectInput: {
                ...state.projectInput,
                schemas: updatedSchemas,
            },
        });
    }

    // Render schema editor layout
    return (
        <div className="grid grid-cols-12 mt-4 gap-4">
            <div className="col-span-4">
                <SchemaNewButton
                    onClick={() => {
                        if (showModal === false) {
                            setShowModal(true);
                        }
                    }}
                />

                {/* Render SchemaForm + SchemaFormModal for CREATE Schema */}
                <SchemaFormModal
                    renderNewTitle
                    show={showModal}
                    handleClose={() => {
                        setShowModal(false);
                    }}
                    onSubmit={() => {
                        createNewSchema();
                    }}
                    errors={validateSchema({
                        schemaCollection: schemas,
                        tokenPluralization: newTokenPluralization,
                    })}
                >
                    <SchemaForm
                        label={""}
                        onChange={updatedTokens => {
                            setNewTokenPluralization(updatedTokens);
                        }}
                        onKeydownEnter={() => {
                            createNewSchema();
                        }}
                    />
                </SchemaFormModal>

                <DragDropContext onDragEnd={onDragEnd}>
                    <SchemaSelector
                        schemaInputs={state.projectInput.schemas}
                        selectedSchemaId={String(selectedSchemaId)}
                        onChange={(updatedSelectedSchema: SchemaInput) => {
                            setSelectedSchemaId(updatedSelectedSchema.id);
                        }}
                    />
                </DragDropContext>
            </div>
            <div className="col-span-8 pl-3 lg:pl-0 mt-4 lg:mt-0">
                <div className="card card-body shadow">
                    <SchemaDetail
                        schema={selectedSchema}
                        projectInput={props.projectInput}
                        pluginMetadata={props.pluginMetadata}
                        onSelectSchema={(nextSelectedSchemaId: UUID) => {
                            setSelectedSchemaId(nextSelectedSchemaId);
                        }}
                        onChangeRelations={(
                            updatedRelations: RelationInput[],
                        ) => {
                            props.onChange({
                                ...props.projectInput,
                                relations: updatedRelations,
                            });
                        }}
                        onChange={(updatedSchema: SchemaInput) => {
                            // Defines updatedSchemas to include `updatedSchema`
                            const updatedSchemas: SchemaInput[] = state.projectInput.schemas.map(
                                (s: SchemaInput) => {
                                    if (s.id === selectedSchemaId) {
                                        return updatedSchema;
                                    }
                                    return s;
                                },
                            );

                            // Updates local state
                            setState({
                                ...state,
                                lastUpdatedAt: Date.now(),
                                projectInput: {
                                    ...state.projectInput,
                                    schemas: updatedSchemas,
                                },
                            });
                        }}
                        onClickEdit={() => {
                            setShowEditModal(true);
                        }}
                        onConfirmDelete={() => {
                            // Defines updatedSchemas without `selectedSchema`
                            const updatedSchemas: SchemaInput[] = state.projectInput.schemas.filter(
                                (s: SchemaInput) => {
                                    return s.id !== selectedSchemaId;
                                },
                            );

                            // Removes any relations that reference the deleted schema
                            const updatedRelations: RelationInput[] = state.projectInput.relations.filter(
                                r => {
                                    return (
                                        r.destinationSchemaID !==
                                            selectedSchemaId &&
                                        r.sourceSchemaID !== selectedSchemaId
                                    );
                                },
                            );

                            // Updates state
                            props.onChange({
                                ...props.projectInput,
                                schemas: updatedSchemas,
                                relations: updatedRelations,
                            });

                            // Sets selectedSchemaId to null
                            setSelectedSchemaId(null);
                        }}
                    />
                </div>

                {/* Render SchemaForm + SchemaFormModal for UPDATE Schema */}
                <SchemaFormModal
                    show={showEditModal}
                    handleClose={() => {
                        setShowEditModal(false);
                    }}
                    onSubmit={() => {
                        updateExistingSchema();
                    }}
                    errors={validateSchema({
                        schemaCollection: schemas,
                        tokenPluralization: newTokenPluralization,
                    })}
                >
                    <SchemaForm
                        label={selectedSchema.identifiers.singular.title}
                        onChange={updatedTokens => {
                            setNewTokenPluralization(updatedTokens);
                        }}
                        onKeydownEnter={() => {
                            updateExistingSchema();
                        }}
                    />
                </SchemaFormModal>
            </div>
        </div>
    );
}
