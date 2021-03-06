import * as React from "react";
import { InflatedSchema, UUID } from "@codotype/core";
import { RelationBadge } from "../relation_editor/RelationBadge";
import { InfoTooltip } from "../info_tooltip";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// // // //

interface SchemaIncomingRelationsProps {
    inflatedSchema: InflatedSchema;
    onSelectSchema: (nextSelectedSchemaId: UUID) => void;
}

/**
 * SchemaIncomingRelations
 * @param props - see `SchemaIncomingRelationsProps`
 */
export function SchemaIncomingRelations(props: SchemaIncomingRelationsProps) {
    const { inflatedSchema } = props;

    return (
        <div className="row mt-3">
            <div className="col-lg-12">
                <p className="mb-0 text-muted">
                    <span className="d-flex align-items-center justify-content-between mb-1">
                        <strong className="m-0">Incoming Relations</strong>
                        <InfoTooltip
                            id="schema-incoming-relations"
                            placement="left"
                            message={`Relations which reference the ${inflatedSchema.identifiers.singular.label} Schema`}
                        />
                    </span>
                </p>
            </div>
            <div className="col-lg-12">
                <ul className="list-group">
                    {inflatedSchema.references.length === 0 && (
                        <li className="list-group-item">
                            <strong className="mb-0 mt-1 text-muted">
                                No Incoming Relations
                            </strong>
                            <br />
                            <p className="text-muted mb-0">
                                Relations which reference the{" "}
                                {inflatedSchema.identifiers.singular.label}{" "}
                                Schema
                            </p>
                        </li>
                    )}
                    {inflatedSchema.references.map(r => {
                        return (
                            <OverlayTrigger
                                key={r.id}
                                placement="left"
                                overlay={
                                    <Tooltip id="attribute-editor-header">
                                        {"Jump to " +
                                            r.identifiers.source.canonical
                                                .singular.label +
                                            " schema"}
                                    </Tooltip>
                                }
                            >
                                <li
                                    className="list-group-item list-group-item-action py-0 px-2"
                                    style={{ cursor: "pointer" }}
                                    key={r.id}
                                    onClick={() => {
                                        props.onSelectSchema(r.sourceSchemaId);
                                    }}
                                >
                                    <RelationBadge
                                        slim
                                        direction="in"
                                        relation={r}
                                    />
                                </li>
                            </OverlayTrigger>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
