import * as React from "react";
import {
    ConfigurationGroup,
    GroupLayoutVariants,
    ConfigurationPropertyDict,
} from "@codotype/core";
import { MarkdownRenderer } from "../MarkdownRenderer";
import { ConfigurationGroupPropertiesInput } from "./ConfigurationGroupPropertiesInput";

// // // //

/**
 * ConfigurationGroupPropertiesDocs
 * Handle DOCS_3x9 + DOCS_4x8 + DOCS_6x6 GroupLayoutVariants values
 * @param props.configurationGroup
 */
export function ConfigurationGroupPropertiesDocs(props: {
    configurationGroup: ConfigurationGroup;
    value: ConfigurationPropertyDict;
    onChange: (updatedVal: ConfigurationPropertyDict) => void;
}) {
    const { configurationGroup, value } = props;
    const { layoutVariant } = configurationGroup;

    // Get column spans based on `ConfigurationGroup.layoutVariant`
    let docsColumn: number = 3;
    let inputsColumn: number = 9;
    if (layoutVariant === GroupLayoutVariants.DOCS_4x8) {
        docsColumn = 4;
        inputsColumn = 8;
    } else if (layoutVariant === GroupLayoutVariants.DOCS_6x6) {
        docsColumn = 6;
        inputsColumn = 6;
    }

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className={`col-span-${docsColumn} border-right`}>
                <MarkdownRenderer
                    source={configurationGroup.content.documentation}
                />
            </div>
            <div className={`col-span-${inputsColumn}`}>
                <div className="row">
                    <div className="col-lg-12">
                        <ConfigurationGroupPropertiesInput
                            value={value}
                            onChange={props.onChange}
                            properties={configurationGroup.properties}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
