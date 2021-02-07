import { pluginReadme } from "../../../components/MarkdownRenderer/__tests__/test_state";
import {
    ProjectInput,
    Datatypes,
    CreatedByValues,
    PluginMetadata,
    testState,
    // makeIdentifier,
    // ATTRIBUTE_ADDON_REQUIRED,
    // ATTRIBUTE_ADDON_NULLABLE,
    // ATTRIBUTE_ADDON_PRIMARY_KEY,
    RelationTypes,
    PropertyTypes,
    Primatives,
    GroupLayoutVariants,
    PropertyLayoutVariants,
    StringPropertyTransformations,
    PropertyPreviewLayoutVariant,
    PropertyPreviewActionTypes,
    PropertyPreviewConstraintTypes,
    buildDefaultProjectInput,
    buildTokenCasing,
    buildTokenPluralization,
    buildDefaultConfiguration,
    AttributeAddon,
    AddonPropertyInlineIcons,
    ConfigurationGroup,
    ConfigurationProperty,
} from "@codotype/core";

// // // //
// React + Next + TS Website Starter

// // // //
// Landing Page
const landingPageConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        identifier: "home",
        content: {
            label: "Landing Page",
            description: "Configure the landing page of your website",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "pricingSection",
                content: {
                    label: "Pricing Section",
                    description: "Include Pricing section on your landing page",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
            new Primatives.ConfigurationProperty({
                identifier: "contactSection",
                content: {
                    label: "Contact Section",
                    description: "Include Contact section on your landing page",
                    icon: "",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
        ],
    },
);

// // // //
// Analytics
const analyticsConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        identifier: "analytics",
        content: {
            label: "Analytics",
            description: "Configure the analytics of your website",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "googleAnalytics",
                content: {
                    label: "Include Google Analytics",
                    description: "Include Google Analytics in your website",
                    icon:
                        "https://cdn.iconscout.com/icon/free/png-512/google-analytics-2038788-1721678.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
            new Primatives.ConfigurationProperty({
                identifier: "hotjar",
                content: {
                    label: "Hotjar Analytics",
                    description: "Include Hotjar Analytics in your website",
                    icon:
                        "https://cdn2.hubspot.net/hubfs/2069462/Hotjar_Flame-1-1.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
        ],
    },
);

// // // //
// Tooling
const toolingConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        identifier: "tooling",
        content: {
            label: "Tooling",
            description: "Configure the tooling of your codebase",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "jest",
                content: {
                    label: "Include Jest",
                    description:
                        "Include Jest environment and snapshot tests for all your components",
                    icon:
                        "https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
            new Primatives.ConfigurationProperty({
                identifier: "prettier",
                content: {
                    label: "Include Prettier",
                    description:
                        "Include Prettier .rc files and npm script for code formattting",
                    icon:
                        "https://seeklogo.com/images/P/prettier-logo-D5C5197E37-seeklogo.com.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
                defaultValue: true,
            }),
            new Primatives.ConfigurationProperty({
                identifier: "storybook",
                content: {
                    label: "Include Storybook",
                    description:
                        "Include Storybook environment and stories for all your components",
                    icon:
                        "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
        ],
    },
);

// // // //
// SEO
const seoConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        identifier: "seo",
        content: {
            label: "SEO",
            description: "Configure the SEO of your website",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "sitemap",
                content: {
                    label: "Sitemap",
                    description:
                        "Include dynamic sitemap with your exported code",
                    // icon: "https://blog.atj.me/assets/sitemap.png",
                    icon:
                        "https://i.pinimg.com/originals/8e/d4/21/8ed42172785c5f144d5df49998c00cd7.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
            new Primatives.ConfigurationProperty({
                identifier: "jsonLD",
                content: {
                    label: "Include JSON-LD Metadata",
                    description:
                        "Include JSON-LD metadata for each of your pages",
                    icon:
                        // "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/JSON_vector_logo.svg/1200px-JSON_vector_logo.svg.png",
                        // "https://www.innocreate.com/wp-content/uploads/2017/07/jsonlogo-300x300.png",
                        "https://dinacon.ch/wp-content/uploads/sites/4/2018/05/rdf-icon-with-shadow.png",
                    documentation: "",
                },
                type: PropertyTypes.BOOLEAN,
            }),
        ],
    },
);

// // // //
// Hosting
const hostingConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        identifier: "hosting",
        content: {
            label: "Hosting",
            description: "Configure the hosting of your website",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "platform",
                content: {
                    label: "Platform",
                    description: "How would you like to host your website?",
                    icon:
                        // "https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-512.png",
                        "https://cdn4.iconfinder.com/data/icons/colicon/24/cloud-512.png",
                    documentation: "",
                },
                type: PropertyTypes.DROPDOWN,
                defaultValue: "vercel",
                dropdownOptions: [
                    { label: "Vercel", value: "vercel" },
                    { label: "Netlify", value: "netlify" },
                    { label: "Docker", value: "docker" },
                    { label: "GitHub Pages", value: "github_pages" },
                    { label: "None", value: "none" },
                ],
            }),
        ],
    },
);

// // // //
// Export Plugin
export const NextJsWebsiteStarterPlugin: PluginMetadata = new Primatives.Plugin(
    {
        id: "react-next-ts-website-starter",
        project_path: "react-next-ts-starter",
        content: {
            label: "React + Next + TypeScript Website Starter",
            description: "React + Next + TypeScript Website Starter",
            icon:
                "https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png",
            documentation: pluginReadme,
        },
        configurationGroups: [
            landingPageConfigurationGroup,
            toolingConfigurationGroup,
            seoConfigurationGroup,
            analyticsConfigurationGroup,
            hostingConfigurationGroup,
        ],
    },
);
