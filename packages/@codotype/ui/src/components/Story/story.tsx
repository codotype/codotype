import * as React from "react";
import classnames from "classnames";
import { AppNavbar } from "../navbar";
import "./tailwind.css";

// // // //

interface StoryProps {
    children: React.ReactNode;
}

export function Story(props: StoryProps) {
    // const [dark, setDark] = React.useState(false);
    const [dark, setDark] = React.useState(true);
    return (
        <div
            className={classnames({
                dark: dark,
            })}
        >
            <AppNavbar />
            <div
                className="px-32 pb-5 pt-5 h-full dark:bg-gray-800 bg-gray-200 dark:text-gray-200"
                // style={{
                //     backgroundColor: "#f5f6f9",
                // }}
            >
                <button
                    onClick={() => {
                        setDark(!dark);
                    }}
                >
                    Toggle Dark
                </button>
                <div className="grid grid-cols-1">
                    <div className="col-span-1">{props.children}</div>
                </div>
            </div>
        </div>
    );
}
