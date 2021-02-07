import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "../Tooltip";

// // // //

interface SortableListHeaderProps {
    label: string;
    onClick: () => void;
    tooltip?: string;
    rounded?: boolean;
}

/**
 * SortableListHeader
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `SortableListHeaderProps`
 */
export function SortableListHeader(props: SortableListHeaderProps) {
    const { tooltip = "", rounded = true } = props;

    return (
        <Tooltip position="right" tooltipContent={<>{tooltip}</>}>
            <button
                className={classnames(
                    "bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 text-lg w-full",
                    {
                        "rounded-tl-2xl rounded-tr-2xl": rounded,
                    },
                )}
                onClick={e => {
                    e.currentTarget.blur();
                    props.onClick();
                }}
            >
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faPlus} />
                    <p className="d-block mb-0 ml-2">{props.label}</p>
                </div>
            </button>
        </Tooltip>
    );
}
