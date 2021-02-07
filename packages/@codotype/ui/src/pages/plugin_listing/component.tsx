import * as React from "react";
import { PluginListItem } from "../../components/PluginCard";
import { PluginMetadata } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// // // //

/**
 * PluginListPage
 */
export function PluginListPage(props: { plugins: PluginMetadata[] }) {
    const [filter, setFilter] = React.useState<string>("");

    // Filters available plugins based on `filter` state
    const filteredPlugins: PluginMetadata[] = props.plugins.filter(g => {
        if (filter === "") return true;

        // Assembles query string for local filtering
        const queryString = [
            g.techTags.join(" "),
            g.typeTags.join(" "),
            g.content.label,
            g.content.description,
            g.experience,
        ]
            .join(" ")
            .toLowerCase();

        // Filters based on queryString and filter
        return queryString.includes(filter.toLowerCase());
    });

    return (
        <div className="row mt-3 mb-5">
            <div className="col-lg-12 flex justify-between items-center">
                <h2>Plugins</h2>
            </div>
            <div className="col-lg-12">
                <p className="mb-0 text-muted">
                    Instantly generate your next codebase using any of the
                    following Codotype Plugins
                </p>
            </div>

            <div className="col-lg-12">
                <hr />
            </div>

            <div className="col-lg-12">
                <div className="row mb-2">
                    <div className="col-lg-9">
                        <input
                            type="text"
                            className="form-control form-control-lg mb-2"
                            placeholder="Filter Plugins"
                            value={filter}
                            onChange={e => setFilter(e.currentTarget.value)}
                        />
                    </div>

                    <div className="col-lg-3 pl-0">
                        <button
                            className="btn btn-lg w-full btn-outline-warning"
                            onClick={() => {
                                setFilter("");
                            }}
                        >
                            <FontAwesomeIcon icon={faTimes} className="mr-2" />
                            Clear Filter
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        {filteredPlugins.map(g => (
                            <PluginListItem key={g.identifier} plugin={g} />
                        ))}
                    </div>

                    <div className="col-lg-12">
                        <div className="card card-body">
                            <FontAwesomeIcon size="2x" icon={faInfoCircle} />
                            <p className="lead mb-0 mt-2">
                                Looking for something we don't support?
                                <br />
                                Vote for&nbsp;
                                <a
                                    href="https://github.com/codotype/feature-requests/issues"
                                    target="_blank"
                                >
                                    upcoming features
                                </a>
                                &nbsp;or open a&nbsp;
                                <a
                                    href="https://github.com/codotype/feature-requests/issues/new"
                                    target="_blank"
                                >
                                    new request
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
