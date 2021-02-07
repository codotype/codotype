import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faQuestionCircle,
    faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
// import Link from "next/link";

// // // //

export function AppNavbar(props: { homeUrl?: string }) {
    return (
        <nav className="bg-gray-300 dark:bg-gray-900 dark:text-gray-200">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* <!-- Mobile menu button--> */}
                        <button
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* <!-- Icon when menu is closed. -->
                              Heroicon name: menu
                              Menu open: "hidden", Menu closed: "block"
                            --> */}
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* <!-- Icon when menu is open. -->
                              Heroicon name: x
                              Menu open: "block", Menu closed: "hidden"
                            --> */}
                            <svg
                                className="hidden h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block lg:hidden h-8 w-auto"
                                src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                                alt="Codotype Logo"
                            />
                            <div className="hidden lg:flex items-center h-8 w-auto">
                                <img
                                    className="h-8 w-auto"
                                    src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                                    alt="Codotype Logo"
                                />
                                <span className="ml-3 text-2xl font-semibold">
                                    Codotype
                                </span>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 dark:text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        <FontAwesomeIcon
                                            icon={faQuestionCircle}
                                            className="mr-1"
                                        />
                                        About
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-900 dark:text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        <FontAwesomeIcon
                                            icon={faBook}
                                            className="text-teal-500 mr-2"
                                        />
                                        Docs
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-900 dark:text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        <FontAwesomeIcon
                                            icon={faDollarSign}
                                            className="text-green-500 mr-2"
                                        />
                                        Donate
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-900 dark:text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTwitter}
                                            className="text-blue-500 mr-2"
                                        />
                                        Twitter
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-900 dark:text-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        <FontAwesomeIcon
                                            icon={faGithub}
                                            className="mr-2"
                                        />
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*
                        <!--
                          Mobile menu, toggle classes based on menu state.

                          Menu open: "block", Menu closed: "hidden"
                        --> */}
            <div className="hidden sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-900 hover:text-gray-700" --> */}
                    <a
                        href="#"
                        className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="text-gray-900 dark:text-gray-200 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                    >
                        <FontAwesomeIcon
                            icon={faBook}
                            className="text-teal-500 mr-1"
                        />
                        Docs
                    </a>
                    <a
                        href="#"
                        className="text-gray-900 dark:text-gray-200 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Projects
                    </a>
                    <a
                        href="#"
                        className="text-gray-900 dark:text-gray-200 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Calendar
                    </a>
                </div>
            </div>
        </nav>
    );
}
