import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faDownload,
    faReply,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faLaugh } from "@fortawesome/free-regular-svg-icons";
import { CopyToClipboard } from "../CopyToClipboard";

// // // //

export function BuildFinished(props: {
    responseType: "S3_DOWNLOAD" | "LOCAL_PATH";
    downloadUrl?: string;
    filepath?: string;
    onClickBackToEditor: () => void;
}) {
    const [copyMessage, setCopyMessage] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (copyMessage === false) {
            return;
        }

        setTimeout(() => {
            setCopyMessage(false);
        }, 1000);
    }, [copyMessage]);

    return (
        <div
            className="flex flex-col items-center h-full justify-center p-5 select-none"
            style={{ minHeight: "26rem" }}
        >
            {/* Header */}
            <div className="text-center">
                <p className="lead mb-1">
                    Thank you for using{" "}
                    <strong style={{ fontWeight: "bolder" }}>Codotype</strong>
                </p>

                <p className="lead mb-1">
                    <FontAwesomeIcon
                        icon={faHeart}
                        size="lg"
                        className="text-red-500"
                    />
                </p>

                <small className="text-gray-600">
                    Your project has successfully been generated - horay!
                </small>
                <br />
                <small className="text-gray-600 mt-3">
                    Download your starter code and follow the instructions in{" "}
                    <span className="font-semibold">README.md</span>
                </small>
            </div>

            {/* <!-- Local Plugin --> */}
            {/* TODO - use ResponseTypes enum from @codotype/core */}
            {props.filepath && props.responseType === "LOCAL_PATH" && (
                <div className="row flex justify-center mt-3">
                    <div className="col-sm-12 text-center">
                        <small className="text-blue-500">
                            Your codebase is in the following local directory:
                        </small>
                        <p className="lead mb-0">
                            {/* TODO - add tooltip */}
                            <CopyToClipboard
                                text={props.filepath}
                                onCopy={() => {
                                    setCopyMessage(true);
                                }}
                            >
                                {({ copyToClipboard }) => (
                                    <button
                                        className="btn btn-sm btn-dark"
                                        onClick={() => {
                                            copyToClipboard();
                                        }}
                                    >
                                        {copyMessage && (
                                            <span>Copied to clipboard</span>
                                        )}

                                        {!copyMessage && (
                                            <span>{props.filepath}</span>
                                        )}
                                    </button>
                                )}
                            </CopyToClipboard>
                        </p>
                    </div>
                </div>
            )}

            {/* <!-- S3 Zip Download --> */}
            {/* TODO - use ResponseTypes enum from @codotype/core */}
            {props.responseType === "S3_DOWNLOAD" && props.downloadUrl && (
                <div className="row flex justify-center mt-3">
                    <a
                        href={props.downloadUrl}
                        target="_blank"
                        className="btn w-full btn-success"
                    >
                        <FontAwesomeIcon icon={faDownload} className="mr-2" />
                        Download ZIP
                    </a>
                </div>
            )}

            <div className="row flex justify-center mt-3">
                <div className="col-sm-12 text-center">
                    <p className="mb-1">
                        <i className="far fa-lightbulb" />
                        Remember, iteration is key
                    </p>

                    <small className="text-gray-600">
                        Make changes and <strong>re-generate</strong> your
                        Project as many times as you like{" "}
                        <FontAwesomeIcon icon={faLaugh} />
                    </small>
                </div>

                <div className="col-sm-12 col-md-4 mt-2">
                    <button
                        className="btn w-full"
                        onClick={props.onClickBackToEditor}
                    >
                        <FontAwesomeIcon icon={faReply} className="mr-2" />
                        Back to Editor
                    </button>
                </div>
            </div>

            <hr />

            {/* FOOTER */}
            <div className="row flex justify-center">
                <div className="col-lg-12 text-center">
                    <p className="mb-0">Support Codotype</p>
                    <small className="text-gray-600">
                        Give us a{" "}
                        <FontAwesomeIcon
                            icon={faStar}
                            className="mr-1 text-yellow-400"
                        />
                        on{" "}
                        <a
                            href="https://github.com/codotype/codotype"
                            target="_blank"
                            className="text-blue-400"
                        >
                            GitHub
                        </a>{" "}
                        and follow us on{" "}
                        <a
                            href="https://twitter.com/codotype"
                            target="_blank"
                            className="text-blue-500"
                        >
                            <FontAwesomeIcon
                                icon={fab.faTwitter}
                                className="mr-1"
                            />
                            Twitter
                        </a>
                    </small>
                </div>
            </div>
        </div>
    );
}
