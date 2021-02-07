import * as React from "react";
import {
    ConfigurationPropertyDict,
    ConfigurationGroup,
    GroupLayoutVariants,
    SchemaInput,
} from "@codotype/core";
import { DocumentationModal } from "../DocumentationModal";

// // // //

/**
 * shouldRenderDocumentationModal
 * Determines whether or not the DocumentationModal should render for this ConfigurationGroup
 * Depends on the LayoutVariant
 * @param configurationGroup
 */
export function shouldRenderDocumentationModal(
    configurationGroup: ConfigurationGroup,
): boolean {
    const { layoutVariant, content } = configurationGroup;

    // Return false if documentation is not defined
    if (!content.documentation) {
        return false;
    }

    // Return false for DOCS_* layout variants
    if (
        [
            GroupLayoutVariants.DOCS_3x9,
            GroupLayoutVariants.DOCS_4x8,
            GroupLayoutVariants.DOCS_6x6,
        ].includes(layoutVariant)
    ) {
        return false;
    }

    // Return true for all others
    return true;
}

// // // //

/**
 * ConfigurationGroupHeader
 * Renders the header for the ConfigurationInput component
 * @param props.configurationGroup
 */
export function ConfigurationGroupHeader(props: {
    configurationGroup: ConfigurationGroup;
    schemaInput?: SchemaInput;
    value: ConfigurationPropertyDict;
    onChange: (updatedVal: ConfigurationPropertyDict) => void;
}) {
    const { configurationGroup, onChange, value } = props;

    const enableDocumentationModal = shouldRenderDocumentationModal(
        configurationGroup,
    );

    const renderSmaller: boolean = props.schemaInput !== undefined;

    return (
        <div className="mb-2">
            <div className="flex items-center mb-2">
                {!renderSmaller && (
                    <h4 className="mb-0 mr-2 text-2xl">
                        {props.configurationGroup.content.label}
                    </h4>
                )}

                {renderSmaller && (
                    <p className="lead mb-0 mr-2">
                        {props.configurationGroup.content.label}
                    </p>
                )}

                {enableDocumentationModal && (
                    <DocumentationModal
                        header={props.configurationGroup.content.label}
                        documentation={
                            props.configurationGroup.content.documentation
                        }
                    />
                )}

                {/* <br className="d-none d-sm-block d-md-none" /> */}

                {!renderSmaller && (
                    <p className="lead ml-2 text-muted mb-0">
                        {props.configurationGroup.content.description}
                    </p>
                )}

                {renderSmaller && (
                    <p className="ml-2 text-muted mb-0">
                        {props.configurationGroup.content.description}
                    </p>
                )}

                {configurationGroup.allowDisable && (
                    <input
                        type="checkbox"
                        // @ts-ignore
                        checked={value.enabled}
                        onChange={e => {
                            const updatedValue = {
                                ...value,
                                enabled: e.currentTarget.checked,
                            };
                            onChange(updatedValue);
                        }}
                    />
                )}
            </div>
            <hr />
        </div>
    );
}
