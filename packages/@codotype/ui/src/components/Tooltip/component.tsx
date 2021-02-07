import * as React from "react";
import classnames from "classnames";

// // // //

export function Tooltip(props: {
    children: React.ReactNode;
    tooltipContent: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
}) {
    // TODO - add right + bottom + top positions
    const { children, tooltipContent, position = "right" } = props;

    const [shown, setShown] = React.useState<boolean>(false);
    function handleMouseEnter() {
        setShown(true);
    }
    function handleMouseLeave() {
        setShown(false);
        // Debug
        // setShown(true);
    }

    // If not shown
    if (shown === false) {
        return (
            <div
                className="relative flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
        );
    }

    // Define styles for caret + wrapper
    let wrapperStyle = {};
    let caretStyle = {};

    // Handle props.position
    if (position === "left") {
        wrapperStyle = { right: "100%", opacity: 1, marginRight: "15px" };
        caretStyle = { right: "-6px", transform: "rotate(45deg)" };
    } else if (position === "right") {
        wrapperStyle = { left: "100%", opacity: 1, marginLeft: "15px" };
        caretStyle = { left: "-6px", transform: "rotate(45deg)" };
    }

    const caret = (
        <div
            className={classnames("h-3 w-3 absolute bg-gray-800", {
                // "bg-black": position === "right",
                // "bg-gray-800": position === "left",
            })}
            style={caretStyle}
        />
    );

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="absolute whitespace-no-wrap bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center z-50 flex-grow"
                style={wrapperStyle}
            >
                {position === "right" && (
                    <>
                        {tooltipContent}
                        {caret}
                    </>
                )}
                {position === "left" && (
                    <>
                        {caret}
                        {tooltipContent}
                    </>
                )}
            </div>
            {children}
        </div>
    );
}
