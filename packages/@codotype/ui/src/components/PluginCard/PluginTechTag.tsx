import * as React from "react";

// // // //

export function PluginTechTag(props: { tag: string }) {
    const { tag } = props;
    return (
        <span className="badge bg-gray-300 dark:bg-gray-800 dark:text-gray-200">
            {tag}
        </span>
    );
}
