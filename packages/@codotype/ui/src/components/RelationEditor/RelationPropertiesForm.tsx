import * as React from "react";
import { RelationDatatypeForm } from "./RelationDatatypeForm";
import {
    SchemaInput,
    RelationType,
    RELATION_META,
    sanitizeTitle,
    buildRelation,
    RelationInput,
    RelationTypes,
} from "@codotype/core";
import { RelationBadge } from "./RelationBadge";

// // // //

function getSourceLabel(props: {
    schema: SchemaInput;
    relationInput: RelationInput;
}): string {
    const { relationInput, schema } = props;
    if (relationInput.type === RelationTypes.HAS_AND_BELONGS_TO_MANY) {
        return schema.identifiers.plural.title;
    }
    return schema.identifiers.singular.title;
}

function getDestinationLabel(props: {
    schema: SchemaInput;
    relationInput: RelationInput;
}): string {
    const { relationInput, schema } = props;
    if (
        [
            RelationTypes.HAS_AND_BELONGS_TO_MANY,
            RelationTypes.TO_MANY,
            RelationTypes.HAS_MANY,
            // @ts-ignore
        ].includes(relationInput.type)
    ) {
        return schema.identifiers.plural.title;
    }
    return schema.identifiers.singular.title;
}

// // // //

/**
 * RelationPropertiesFormProps
 * CHORE - annotate remaining props
 */
interface RelationPropertiesFormProps {
    schema: SchemaInput;
    schemas: SchemaInput[];
    relationInput: RelationInput;
    onChange: (updatedRelationInput: RelationInput) => void;
    supportedRelationTypes: RelationType[];
}

/**
 * RelationPropertiesForm
 * @param props - see `RelationPropertiesFormProps`
 */
export function RelationPropertiesForm(props: RelationPropertiesFormProps) {
    const { schema, schemas, relationInput, supportedRelationTypes } = props;

    // Defines relationInput.destinationSchemaID if it's not present
    if (relationInput.destinationSchemaID === "" && schemas.length > 0) {
        props.onChange({
            ...relationInput,
            destinationSchemaID: schemas[0].id,
        });
    }

    // Locates destination schema
    const destinationSchema = schemas.find(
        s => s.id === relationInput.destinationSchemaID,
    );

    return (
        <React.Fragment>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <div className="mb-0 text-blue-500 text-center">
                        <label className="mb-0">
                            {schema.identifiers.singular.title}
                        </label>
                        <small className="form-text text-blue-500">
                            Where the relational data is stored
                        </small>
                        <input
                            type="text"
                            className="form-control border-blue-500 text-blue-500"
                            value={getSourceLabel({ schema, relationInput })}
                        />
                    </div>
                </div>

                <div className="col-span-4">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <div className="mb-0 text-center mb-0">
                                <label className="mb-0">
                                    {RELATION_META[relationInput.type].label}
                                </label>
                                <small className="form-text text-muted mb-0">
                                    {
                                        RELATION_META[relationInput.type]
                                            .description
                                    }
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="grud grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <RelationDatatypeForm
                                type={relationInput.type}
                                supportedRelationTypes={supportedRelationTypes}
                                onChangeRelationType={(
                                    updatedRelationType: RelationType,
                                ) => {
                                    props.onChange({
                                        ...relationInput,
                                        type: updatedRelationType,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-span-4">
                    <div className="mb-0 text-center">
                        <label className="mb-0 text-teal-500">
                            Related Schema
                        </label>
                        <small className="form-text text-teal-500">
                            Schema referenced by this relation
                        </small>
                        <select
                            className="form-control border-teal-500 text-teal-500"
                            value={relationInput.destinationSchemaID}
                            onChange={e => {
                                props.onChange({
                                    ...relationInput,
                                    destinationSchemaID: e.currentTarget.value,
                                });
                            }}
                        >
                            {schemas.map(s => (
                                <option key={s.id} value={s.id}>
                                    {getDestinationLabel({
                                        schema: s,
                                        relationInput,
                                    })}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <input
                        className="form-control"
                        placeholder="Source Schema Alias"
                        value={relationInput.sourceSchemaAlias}
                        onChange={e => {
                            props.onChange({
                                ...relationInput,
                                sourceSchemaAlias: sanitizeTitle(
                                    e.currentTarget.value,
                                ),
                            });
                        }}
                    />
                </div>
                <div
                    className="col-span-4 text-center"
                    style={{ visibility: "hidden" }}
                />
                <div className="col-span-4">
                    <input
                        className="form-control"
                        placeholder="Destination Schema Alias"
                        value={relationInput.destinationSchemaAlias}
                        onChange={e => {
                            props.onChange({
                                ...relationInput,
                                destinationSchemaAlias: sanitizeTitle(
                                    e.currentTarget.value,
                                ),
                            });
                        }}
                    />
                </div>
            </div>
            {destinationSchema !== undefined && (
                <div className="grid grid-cols-1 gap-4">
                    <div className="col-span-1">
                        <hr />
                    </div>
                    <div className="col-span-1 text-center">
                        <RelationBadge
                            direction="out"
                            relation={buildRelation({
                                sourceSchema: props.schema,
                                relationInput: relationInput,
                                destinationSchema: destinationSchema,
                            })}
                            slim={false}
                        />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
