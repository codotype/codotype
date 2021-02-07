import * as React from "react";
import {
    ConfigurationPropertyDict,
    ConfigurationGroup,
    SchemaInput,
} from "@codotype/core";
import { ConfigurationGroupPropertiesVariant } from "./ConfigurationGroupPropertiesVariant";
import { ConfigurationGroupHeader } from "./ConfigurationGroupHeader";

// // // //

/**
 * ToggleEnabled
 * @param props
 */
function ToggleEnabled(props: {
    configurationGroup: ConfigurationGroup;
    enabled: boolean;
    onChange: (updatedEnabled: boolean) => void;
}) {
    const { configurationGroup, enabled, onChange } = props;
    return (
        <div className="mt-2 px-2 py-2 flex justify-center bg-gray-800 text-white rounded">
            <div className="flex flex-col items-center">
                <p className="lead mb-0">
                    Enable {configurationGroup.content.label}
                </p>
                <p className="mb-0">
                    Click to enable the {configurationGroup.content.label}{" "}
                    configuration group.
                </p>
                <span className="mt-2">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={e => {
                            onChange(e.currentTarget.checked);
                        }}
                    />
                </span>
            </div>
        </div>
    );
}

// // // //

interface ConfigurationInputProps {
    value: ConfigurationPropertyDict;
    schemaInput?: SchemaInput;
    configurationGroup: ConfigurationGroup;
    onChange: (updatedVal: ConfigurationPropertyDict) => void;
}
// TODO - add prop here to adjust styles when rendered for a schema instead of a project..?
export function ConfigurationInput(props: ConfigurationInputProps) {
    const { configurationGroup, value, onChange } = props;
    // @ts-ignore
    // const configurationGroupValue = value[configurationGroup.identifier];

    // Log error message for invalid ConfigurationGroup
    if (
        configurationGroup.properties.length === 0 &&
        configurationGroup.sections.length === 0
    ) {
        console.error(
            "WARNING - NO CONFIGURATION GROUP PROPERTIES OR SECTIONS DEFINED",
        );
        return null;
    }

    // Handle ConfigurationGroup.allowDisable
    return (
        <div className="grid grid-cols-12 mt-4">
            <div className="col-span-12">
                {/* ConfigurationGroupHeader */}
                <ConfigurationGroupHeader
                    value={value}
                    onChange={onChange}
                    schemaInput={props.schemaInput}
                    configurationGroup={configurationGroup}
                />

                {/* Renders message to turn this feature on */}
                {configurationGroup.allowDisable && !value.enabled && (
                    <ToggleEnabled
                        enabled={value.enabled as boolean}
                        configurationGroup={configurationGroup}
                        onChange={updatedEnabled => {
                            const updatedValue = {
                                ...value,
                                enabled: updatedEnabled,
                            };
                            onChange(updatedValue);
                        }}
                    />
                )}

                {/* Renders ConfigurationGroupPropertiesVariant */}
                <ConfigurationGroupPropertiesVariant
                    value={value}
                    onChange={onChange}
                    configurationGroup={configurationGroup}
                />
            </div>
        </div>
    );
}
