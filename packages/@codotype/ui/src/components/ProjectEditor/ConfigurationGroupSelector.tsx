import * as React from "react";
import { ConfigurationInput } from "../ConfigurationInput";
import { SchemaEditorLayout } from "../SchemaEditor";
import {
    ProjectInput,
    PluginMetadata,
    ConfigurationGroup,
    ConfigurationPropertyDict,
} from "@codotype/core";
import { PluginStart } from "../PluginStart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

// // // //

export function ConfigurationGroupTab(props: {
    label: string;
    active: boolean;
    pinned?: boolean;
    onClick: () => void;
}) {
    const { label } = props;
    const btnClassName: string[] = [
        "flex flex-grow items-center justify-center mr-2 shadow-sm px-3 py-2 focus:outline-none rounded-full",
    ];

    if (props.active) {
        btnClassName.push("bg-gray-500 text-white");
    } else {
        btnClassName.push(
            "border-gray-500 text-gray-500 bg-transparent border-gray-500 border",
        );
    }

    return (
        <button
            className={btnClassName.join(" ")}
            onClick={e => {
                e.currentTarget.blur();
                props.onClick();
            }}
        >
            {props.pinned && <FontAwesomeIcon icon={faPlay} className="mr-2" />}
            {label}
        </button>
    );
}

/**
 * ConfigurationGroupSelector
 * @param props.projectInput
 * @param props.pluginMetadata
 * @param props.onChange
 */
export function ConfigurationGroupSelector(props: {
    projectInput: ProjectInput;
    pluginMetadata: PluginMetadata;
    onChange: (updatedProject: ProjectInput) => void;
    children?: (childProps: any) => React.ReactNode;
}) {
    const { pluginMetadata } = props;
    // Gets default ConfigurationGroup to render
    const defaultConfigurationGroup: ConfigurationGroup | undefined =
        pluginMetadata.configurationGroups[0];

    // If there is no default ConfigurationGroup, return null
    if (!defaultConfigurationGroup) {
        return null;
    }

    // Stores the currently selected ConfigurationGroup
    const [
        selectedConfigurationGroup,
        selectConfigurationGroup,
    ] = React.useState<ConfigurationGroup>(defaultConfigurationGroup);

    // Defines a flag indicating whether or not the SchemaEditor is enabled for props.pluginMetadata
    // If false, schemas will not be selectable
    const {
        configurationGroups,
        supportedDatatypes,
        supportedRelationTypes,
    } = pluginMetadata.schemaEditorConfiguration;
    const enableSchemaEditor: boolean =
        configurationGroups.length > 0 ||
        supportedDatatypes.length > 0 ||
        supportedRelationTypes.length > 0;

    // NOTE - enable/disable this if schemas aren't supported
    const [viewingSchemas, setViewingSchemas] = React.useState<boolean>(
        enableSchemaEditor,
    );

    // NOTE - enable/disable this if schemas aren't supported
    const [viewingReadme, setViewingReadme] = React.useState<boolean>(false);

    // Defines default component for ConfigurationInput
    const defaultComponent = (
        <ConfigurationInput
            configurationGroup={selectedConfigurationGroup}
            value={
                props.projectInput.configuration[
                    selectedConfigurationGroup.identifier
                ]
            }
            onChange={(updatedVal: ConfigurationPropertyDict) => {
                // Defines updatd project with latest configuration value
                const updatedProject: ProjectInput = {
                    ...props.projectInput,
                    configuration: {
                        ...props.projectInput.configuration,
                        [selectedConfigurationGroup.identifier]: updatedVal,
                    },
                };

                // Invokes props.onChange with updated project
                props.onChange(updatedProject);
            }}
        />
    );

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="flex flex-row mt-1 mb-1">
                    <ConfigurationGroupTab
                        pinned
                        onClick={() => {
                            setViewingReadme(true);
                            setViewingSchemas(false);
                        }}
                        active={viewingReadme}
                        label={"Start"}
                    />

                    {enableSchemaEditor && (
                        <ConfigurationGroupTab
                            onClick={() => {
                                setViewingReadme(false);
                                setViewingSchemas(true);
                            }}
                            active={viewingSchemas}
                            label={"Data Model"}
                        />
                    )}

                    {/* Renders the navigation for selecting a ConfigurationGroup */}
                    {pluginMetadata.configurationGroups.map(
                        (configurationGroup: ConfigurationGroup) => {
                            return (
                                <ConfigurationGroupTab
                                    key={configurationGroup.identifier}
                                    onClick={() => {
                                        setViewingSchemas(false);
                                        setViewingReadme(false);
                                        selectConfigurationGroup(
                                            configurationGroup,
                                        );
                                    }}
                                    active={
                                        configurationGroup.identifier ===
                                            selectedConfigurationGroup.identifier &&
                                        !viewingSchemas &&
                                        !viewingReadme
                                    }
                                    label={configurationGroup.content.label}
                                />
                            );
                        },
                    )}
                </div>
            </div>
            <div className="col-lg-12">
                {!viewingSchemas &&
                    !viewingReadme &&
                    props.children !== undefined && (
                        <>
                            {props.children({
                                defaultComponent,
                                selectedConfigurationGroup,
                                value:
                                    props.projectInput.configuration[
                                        selectedConfigurationGroup.identifier
                                    ],
                                onChange: (
                                    updatedVal: ConfigurationPropertyDict,
                                ) => {
                                    // Defines updatd project with latest configuration value
                                    const updatedProject: ProjectInput = {
                                        ...props.projectInput,
                                        configuration: {
                                            ...props.projectInput.configuration,
                                            [selectedConfigurationGroup.identifier]: updatedVal,
                                        },
                                    };

                                    // Invokes props.onChange with updated project
                                    props.onChange(updatedProject);
                                },
                            })}
                        </>
                    )}

                {/* Renders the ConfigurationInput */}
                {!viewingSchemas && !viewingReadme && !props.children && (
                    <>{defaultComponent}</>
                )}

                {/* Render README tab */}
                {viewingReadme && (
                    <div className="mt-4 card card-body shadow-sm">
                        <PluginStart plugin={props.pluginMetadata} />
                    </div>
                )}

                {/* Render SchemaEditorLayout */}
                {viewingSchemas && enableSchemaEditor && (
                    <SchemaEditorLayout
                        projectInput={props.projectInput}
                        pluginMetadata={pluginMetadata}
                        onChange={(updatedProjectInput: ProjectInput) => {
                            // Invokes props.onChange with updated project
                            props.onChange(updatedProjectInput);
                        }}
                    />
                )}
            </div>
        </div>
    );
}
