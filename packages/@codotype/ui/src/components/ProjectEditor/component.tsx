import * as React from "react";
import { ConfigurationGroupSelector } from "./ConfigurationGroupSelector";
import { ProjectEditorHeader } from "./ProjectEditorHeader";
import { PluginMetadata, ProjectInput } from "@codotype/core";

// // // //

interface ProjectEditorProps {
    plugin: PluginMetadata;
    projectInput: ProjectInput;
    onChange: (updatedProject: ProjectInput) => void;
    onClickGenerate: () => void;
    onResetProject: () => void;
    children?: (childProps: any) => React.ReactNode;
}

export function ProjectEditor(props: ProjectEditorProps) {
    const { plugin, projectInput } = props;
    return (
        <div className="row">
            <div className="col-sm-12">
                {/* Render ProjectEditorHeader */}
                <ProjectEditorHeader
                    pluginMetadata={plugin}
                    projectInput={projectInput}
                    onChange={props.onChange}
                    onClickGenerate={props.onClickGenerate}
                    onConfirmReset={props.onResetProject}
                />

                <div className="pt-3 pb-2">
                    <hr />
                </div>

                {/* Render ConfigurationGroupSelector */}
                <ConfigurationGroupSelector
                    projectInput={projectInput}
                    pluginMetadata={plugin}
                    children={props.children}
                    onChange={(updatedProject: ProjectInput) => {
                        // Invokes props.onChange with the updated project
                        props.onChange(updatedProject);
                    }}
                />
            </div>
        </div>
    );
}
