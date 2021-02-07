import * as React from "react";
import { storiesOf } from "@storybook/react";
import { WebRuntime } from "../component";
import { Story } from "../../../components/Story";
import { RuntimeProvider } from "../../../components/RuntimeProvider";
import { ProjectEditor } from "../../../components/ProjectEditor";
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
} from "@codotype/core";
import { pluginReadme } from "../../../components/MarkdownRenderer/__tests__/test_state";
import { NextJsWebsiteStarterPlugin } from "./test_state";
import { ConfigurationGroupHeader } from "../../../components/ConfigurationInput";
const {
    cdkPluginMeta,
    dummyPluginMetadata: dummyPluginMetadataOriginal,
} = testState;

const dummyPluginMetadata: PluginMetadata = {
    ...dummyPluginMetadataOriginal,
    configurationGroups: [
        ...dummyPluginMetadataOriginal.configurationGroups.map(c => {
            if (c.content.label !== "API Examples") {
                return c;
            }
            return {
                ...c,
                layoutVariant: GroupLayoutVariants.LIST,
            };
        }),
    ],
};

// // // //

const ATTRIBUTE_ADDON_UNIQUE: AttributeAddon = {
    supportedDatatypes: [Datatypes.STRING],
    property: {
        content: {
            label: "Unique",
            icon: "",
            description: "Whether or not the value is unique",
            documentation: "",
        },
        identifier: "unique",
        exclusive: false,
        required: false,
        inlineIcon: AddonPropertyInlineIcons.snowflake,
        propertyType: PropertyTypes.BOOLEAN,
        defaultValue: false,
        dropdownOptions: [],
        validations: [],
        transformations: [],
    },
};

const relationAddons = [
    {
        supportedRelationTypes: [RelationTypes.TO_ONE],
        property: ATTRIBUTE_ADDON_UNIQUE.property,
    },
];

const ApiActionsProperty = new Primatives.ConfigurationProperty({
    identifier: "actions",
    content: {
        label: "Actions",
    },
    type: PropertyTypes.COLLECTION,
    preview: {
        rules: [
            {
                constraint: {
                    dataProperty: "function_name",
                    type: PropertyPreviewConstraintTypes.equals,
                    value: "",
                },
                action: {
                    type: PropertyPreviewActionTypes.literal,
                    template: "",
                },
            },
            {
                constraint: {
                    dataProperty: "route",
                    type: PropertyPreviewConstraintTypes.equals,
                    value: "",
                },
                action: {
                    type: PropertyPreviewActionTypes.literal,
                    template: "",
                },
            },
            {
                constraint: {
                    dataProperty: "scope",
                    type: PropertyPreviewConstraintTypes.equals,
                    value: "COLLECTION",
                },
                action: {
                    type: PropertyPreviewActionTypes.stringTemplate,
                    template:
                        "{{data.verb}} /api/schema-scope/{{data.route}} -> {{data.function_name}}",
                },
            },
            {
                constraint: {
                    dataProperty: "scope",
                    type: PropertyPreviewConstraintTypes.equals,
                    value: "MODEL",
                },
                action: {
                    type: PropertyPreviewActionTypes.stringTemplate,
                    template:
                        "{{data.verb}} /api/schema-scope/:id/{{data.route}} -> {{data.function_name}}",
                },
            },
        ],
        variant: PropertyPreviewLayoutVariant.CODE_DARK,
    },
    properties: [
        new Primatives.ConfigurationProperty({
            content: {
                label: "Verb",
                description: "Verify",
            },
            identifier: "verb",
            defaultValue: "GET",
            type: PropertyTypes.DROPDOWN,
            layoutVariant: PropertyLayoutVariants.COL_6,
            dropdownOptions: [
                { value: "GET", label: "GET" },
                { value: "POST", label: "POST" },
                { value: "PUT", label: "PUT" },
                { value: "DELETE", label: "DELETE" },
            ],
        }),
        new Primatives.ConfigurationProperty({
            content: {
                label: "Route",
                description: "Route",
            },
            identifier: "route",
            defaultValue: "verify",
            type: PropertyTypes.STRING,
            layoutVariant: PropertyLayoutVariants.COL_6,
            transformations: [
                StringPropertyTransformations.nonumbers,
                StringPropertyTransformations.trimwhitespace,
                StringPropertyTransformations.removewhitespace,
            ],
        }),
        new Primatives.ConfigurationProperty({
            content: {
                label: "Function Name",
                description: "function_name",
            },
            identifier: "function_name",
            defaultValue: "verify",
            layoutVariant: PropertyLayoutVariants.COL_6,
            type: PropertyTypes.STRING,
            transformations: [
                StringPropertyTransformations.camelcase,
                StringPropertyTransformations.nonumbers,
                StringPropertyTransformations.nosymbols,
                StringPropertyTransformations.trimwhitespace,
            ],
        }),
        new Primatives.ConfigurationProperty({
            content: {
                label: "Scope",
                description: "scope",
            },
            identifier: "scope",
            defaultValue: "COLLECTION",
            layoutVariant: PropertyLayoutVariants.COL_6,
            type: PropertyTypes.DROPDOWN,
            dropdownOptions: [
                { value: "COLLECTION", label: "Collection" },
                { value: "MODEL", label: "Model" },
            ],
        }),
    ],
});

const NestedCollectionProperty = {
    ...ApiActionsProperty,
    identifier: "nested_api_actions",
    properties: [
        ...ApiActionsProperty.properties,
        {
            ...ApiActionsProperty,
            layoutVariant: PropertyLayoutVariants.CARD_COL_12,
        },
    ],
};

const pluginExample01: PluginMetadata = {
    ...dummyPluginMetadata,
    identifier: "chrome_extension_plugin_03", // unique ID for the plugin
    schemaEditorConfiguration: {
        ...dummyPluginMetadata.schemaEditorConfiguration,
        attributeAddons: [
            ATTRIBUTE_ADDON_UNIQUE,
            // ATTRIBUTE_ADDON_REQUIRED,
            // ATTRIBUTE_ADDON_NULLABLE,
            // ATTRIBUTE_ADDON_PRIMARY_KEY,
        ],
        relationAddons: [...relationAddons],
        configurationGroups: [
            {
                ...dummyPluginMetadata.configurationGroups[0],
                layoutVariant: GroupLayoutVariants.LIST,
            },
        ],
    },
};

const projectExample01: ProjectInput = {
    ...buildDefaultProjectInput(pluginExample01),
    identifiers: buildTokenCasing("Movie Reviews"),
    schemas: [
        new Primatives.Schema({
            identifiers: buildTokenPluralization("User"),
            attributes: [
                new Primatives.AttributeInput({
                    identifiers: buildTokenCasing("ID"),
                    datatype: Datatypes.UUID,
                }),
                new Primatives.AttributeInput({
                    identifiers: buildTokenCasing("Email"),
                    datatype: Datatypes.STRING,
                }),
                new Primatives.AttributeInput({
                    identifiers: buildTokenCasing("First Name"),
                    datatype: Datatypes.STRING,
                }),
                new Primatives.AttributeInput({
                    identifiers: buildTokenCasing("Last Name"),
                    datatype: Datatypes.STRING,
                }),
            ],
            configuration: buildDefaultConfiguration(
                pluginExample01.schemaEditorConfiguration.configurationGroups,
            ),
        }),
        new Primatives.Schema({
            identifiers: buildTokenPluralization("Director"),
            attributes: [
                new Primatives.AttributeInput({
                    identifiers: buildTokenCasing("ID"),
                    datatype: Datatypes.UUID,
                }),
                new Primatives.AttributeInput({
                    identifiers: buildTokenCasing("First Name"),
                    datatype: Datatypes.STRING,
                }),
                new Primatives.AttributeInput({
                    identifiers: buildTokenCasing("Last Name"),
                    datatype: Datatypes.STRING,
                }),
            ],
            configuration: buildDefaultConfiguration(
                pluginExample01.schemaEditorConfiguration.configurationGroups,
            ),
        }),
        new Primatives.Schema({
            identifiers: buildTokenPluralization("Movie"),
            attributes: [
                new Primatives.AttributeInput({
                    identifiers: buildTokenCasing("ID"),
                    datatype: Datatypes.UUID,
                }),
                new Primatives.AttributeInput({
                    identifiers: buildTokenCasing("Title"),
                    datatype: Datatypes.STRING,
                }),
            ],
            configuration: buildDefaultConfiguration(
                pluginExample01.schemaEditorConfiguration.configurationGroups,
            ),
        }),
    ],
};

const stories: Array<[string, PluginMetadata]> = [
    ["w/ schemas", dummyPluginMetadata],
    [
        "w/ schemas + schema configuration groups",
        {
            ...dummyPluginMetadata,
            identifier: "chrome_extension_plugin_03", // unique ID for the plugin
            schemaEditorConfiguration: {
                ...dummyPluginMetadata.schemaEditorConfiguration,
                attributeAddons: [
                    ATTRIBUTE_ADDON_UNIQUE,
                    // ATTRIBUTE_ADDON_REQUIRED,
                    // ATTRIBUTE_ADDON_NULLABLE,
                    // ATTRIBUTE_ADDON_PRIMARY_KEY,
                ],
                relationAddons: [...relationAddons],
                configurationGroups: [
                    {
                        ...dummyPluginMetadata.configurationGroups[0],
                        layoutVariant: GroupLayoutVariants.LIST,
                    },
                ],
            },
        },
    ],
    [
        "w/ exampleProjects",
        {
            ...pluginExample01,
            exampleProjects: [projectExample01],
        },
    ],
    [
        "w/ schemas + default attributes",
        {
            ...dummyPluginMetadata,
            identifier: "chrome_extension_plugin_04", // unique ID for the plugin
            schemaEditorConfiguration: {
                ...dummyPluginMetadata.schemaEditorConfiguration,
                attributeAddons: [
                    ATTRIBUTE_ADDON_UNIQUE,
                    // ATTRIBUTE_ADDON_REQUIRED,
                    // ATTRIBUTE_ADDON_NULLABLE,
                    // ATTRIBUTE_ADDON_PRIMARY_KEY,
                ],
                relationAddons: [...relationAddons],
                newSchemaDefaults: {
                    relations: [],
                    attributes: [
                        {
                            id: "UUID-Attribute",
                            identifiers: {
                                title: "ID",
                                snake: "id",
                                camel: "id",
                                pascal: "Id",
                                kebab: "id",
                            },
                            addons: {
                                // [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true,
                            },
                            datatype: Datatypes.UUID,
                            locked: true,
                            createdBy: CreatedByValues.plugin,
                            internalNote: "",
                        },
                    ],
                },
            },
        },
    ],
    [
        "AWS CDK Starter",
        {
            ...cdkPluginMeta,
            content: {
                ...cdkPluginMeta.content,
                documentation: pluginReadme,
            },
            configurationGroups: [
                {
                    ...testState.ComponentBuilderConfigurationGroup,
                    layoutVariant: GroupLayoutVariants.LIST,
                },
                testState.SideBySideConfigurationGroup,
                {
                    ...testState.SideBySideConfigurationGroup,
                    content: {
                        ...testState.SideBySideConfigurationGroup.content,
                        label: "API Actions",
                    },
                    identifier: "api_actions",
                    properties: [ApiActionsProperty],
                },
                {
                    ...testState.SideBySideConfigurationGroup,
                    content: {
                        ...testState.SideBySideConfigurationGroup.content,
                        label: "Nested API Actions",
                    },
                    identifier: "nested_api_actions",
                    properties: [NestedCollectionProperty],
                },
            ],
            identifier: "chrome_extension_plugin_05", // unique ID for the plugin
            schemaEditorConfiguration: {
                supportedRelationTypes: [
                    RelationTypes.TO_ONE,
                    RelationTypes.TO_MANY,
                ],
                supportedDatatypes: [
                    Datatypes.STRING,
                    Datatypes.DATE,
                    Datatypes.DATETIME,
                    Datatypes.INT,
                    Datatypes.FLOAT,
                    Datatypes.STRING_ARRAY,
                ],
                configurationGroups: [
                    new Primatives.ConfigurationGroup({
                        content: {
                            label: "Meta",
                            description:
                                "Define additional metadata for this Schema",
                        },
                        identifier: "meta",
                        layoutVariant: GroupLayoutVariants.LIST,
                        properties: [
                            new Primatives.ConfigurationProperty({
                                content: {
                                    label: "Internal Note",
                                    description:
                                        "Write an internal note describing this schema",
                                },
                                identifier: "internal_note",
                                defaultValue: "",
                                layoutVariant: PropertyLayoutVariants.COL_12,
                                type: PropertyTypes.STRING,
                            }),
                        ],
                    }),
                    new Primatives.ConfigurationGroup({
                        content: {
                            label: "API Actions",
                            description: "Define individual REST api actions.",
                            documentation:
                                "This is documentation for the API Actions configuration group",
                        },
                        identifier: "api_actions",
                        layoutVariant: GroupLayoutVariants.LIST,
                        properties: [ApiActionsProperty],
                    }),
                    new Primatives.ConfigurationGroup({
                        content: {
                            label: "GraphQL API",
                            description:
                                "Configure the GraphQL API for this Schema",
                        },
                        identifier: "graphql_api",
                        layoutVariant: GroupLayoutVariants.LIST,
                        properties: [
                            new Primatives.ConfigurationProperty({
                                type: PropertyTypes.BOOLEAN,
                                defaultValue: true,
                                identifier: "generate_crud_api",
                                content: {
                                    label: "Generate CRUD API",
                                    description:
                                        "Generate a CRUD API with GraphQL for this resource",
                                },
                                layoutVariant:
                                    PropertyLayoutVariants.CARD_COL_12,
                            }),
                            new Primatives.ConfigurationProperty({
                                content: {
                                    label: "DynamoDB table name",
                                    description:
                                        "Define the name of the DynamoDB table for this",
                                },
                                identifier: "dynamodb_table_name",
                                defaultValue: "",
                                type: PropertyTypes.STRING,
                                layoutVariant:
                                    PropertyLayoutVariants.CARD_COL_12,
                            }),
                            ApiActionsProperty,
                        ],
                    }),
                ],
                attributeAddons: [
                    ATTRIBUTE_ADDON_UNIQUE,
                    // ATTRIBUTE_ADDON_NULLABLE,
                    // ATTRIBUTE_ADDON_PRIMARY_KEY,
                    // {
                    //     ...ATTRIBUTE_ADDON_REQUIRED,
                    //     supportedDatatypes: [
                    //         Datatypes.STRING,
                    //         Datatypes.DATE,
                    //         Datatypes.DATETIME,
                    //         Datatypes.INT,
                    //         Datatypes.FLOAT,
                    //         Datatypes.STRING_ARRAY,
                    //     ],
                    // },
                    // {
                    //     ...ATTRIBUTE_ADDON_REQUIRED,
                    //     label: "Mock Data",
                    //     identifier: "mock_data_type",
                    //     description:
                    //         "Type of Mockaroo mock data to use for this field",
                    //     propertyType: PropertyTypes.DROPDOWN,
                    //     dropdownOptions: [
                    //         {
                    //             value: "name",
                    //             label: "Name",
                    //             description: "First + Last",
                    //         },
                    //         {
                    //             value: "zipcode",
                    //             label: "Zipcode",
                    //             description: "Zipcode",
                    //         },
                    //     ],
                    //     supportedDatatypes: [
                    //         Datatypes.STRING,
                    //         Datatypes.DATE,
                    //         Datatypes.DATETIME,
                    //         Datatypes.INT,
                    //         Datatypes.FLOAT,
                    //         Datatypes.STRING_ARRAY,
                    //     ],
                    // },
                ],
                relationAddons: [...relationAddons],
                newSchemaDefaults: {
                    relations: [
                        {
                            id: "USER-RELATION-ID",
                            type: RelationTypes.TO_ONE,
                            destinationSchemaAlias: "Creator",
                            sourceSchemaAlias: "",
                            createdBy: CreatedByValues.plugin,
                            sourceSchemaID: "USER_SCHEMA",
                            destinationSchemaID: "USER_SCHEMA",
                            locked: true,
                            internalNote: "",
                            addons: {},
                        },
                    ],
                    attributes: [
                        {
                            id: "UUID-Attribute",
                            identifiers: {
                                title: "ID",
                                snake: "id",
                                camel: "id",
                                pascal: "Id",
                                kebab: "id",
                            },
                            addons: {
                                // [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true,
                            },
                            datatype: Datatypes.UUID,
                            locked: true,
                            createdBy: CreatedByValues.plugin,
                            internalNote: "",
                        },
                    ],
                },
                defaultRelations: [],
                defaultSchemas: [
                    {
                        id: "USER_SCHEMA",
                        identifiers: {
                            singular: {
                                title: "User",
                                snake: "user",
                                camel: "user",
                                pascal: "User",
                                kebab: "user",
                            },
                            plural: {
                                title: "Users",
                                snake: "users",
                                camel: "users",
                                pascal: "Users",
                                kebab: "users",
                            },
                        },
                        locked: true,
                        createdBy: CreatedByValues.plugin,
                        internalNote: "",
                        attributes: [
                            {
                                id: "UUID-Attribute",
                                identifiers: {
                                    title: "ID",
                                    snake: "id",
                                    camel: "id",
                                    pascal: "Id",
                                    kebab: "id",
                                },
                                addons: {
                                    // [ATTRIBUTE_ADDON_REQUIRED.identifier]: true,
                                    // [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true,
                                    // [ATTRIBUTE_ADDON_UNIQUE.identifier]: true,
                                },
                                datatype: Datatypes.STRING,
                                locked: true,
                                createdBy: CreatedByValues.plugin,
                                internalNote: "The uniqie ID of the user",
                            },
                            {
                                id: "Email-Attribute",
                                identifiers: {
                                    title: "Email",
                                    snake: "email",
                                    camel: "email",
                                    pascal: "Email",
                                    kebab: "email",
                                },
                                addons: {
                                    // [ATTRIBUTE_ADDON_REQUIRED.identifier]: true,
                                    // [ATTRIBUTE_ADDON_UNIQUE.identifier]: true,
                                },
                                datatype: Datatypes.STRING,
                                locked: true,
                                createdBy: CreatedByValues.plugin,
                                internalNote: "The email of the user",
                            },
                        ],
                        configuration: {},
                    },
                ],
            },
        },
    ],
    ["Concepts/Next.js Website Starter", NextJsWebsiteStarterPlugin],
];

// // // //

const storyCollection = storiesOf("Pages/WebRuntime", module);

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        return (
            <Story>
                <WebRuntime plugin={story[1]}>
                    {({ plugin, projectInput, setProject, clearProject }) => (
                        <RuntimeProvider>
                            {({ generateCode }) => (
                                <React.Fragment>
                                    <ProjectEditor
                                        plugin={plugin}
                                        projectInput={projectInput}
                                        onClickGenerate={() => {
                                            generateCode({
                                                projectInput,
                                                plugin,
                                            });
                                        }}
                                        onResetProject={clearProject}
                                        onChange={(
                                            updatedProject: ProjectInput,
                                        ) => {
                                            setProject(updatedProject);
                                        }}
                                    >
                                        {({
                                            defaultComponent,
                                            value,
                                            selectedConfigurationGroup,
                                            onChange,
                                        }) => {
                                            console.log(
                                                selectedConfigurationGroup,
                                            );

                                            if (
                                                selectedConfigurationGroup.identifier ===
                                                "home"
                                            ) {
                                                return (
                                                    <div className="grid grid-cols-12 mt-4">
                                                        <div className="col-span-12">
                                                            {/* ConfigurationGroupHeader */}
                                                            <ConfigurationGroupHeader
                                                                value={value}
                                                                onChange={
                                                                    onChange
                                                                }
                                                                configurationGroup={
                                                                    selectedConfigurationGroup
                                                                }
                                                            />
                                                            <div>
                                                                <input
                                                                    value={
                                                                        value.string
                                                                    }
                                                                    onChange={e => {
                                                                        onChange(
                                                                            {
                                                                                string:
                                                                                    e
                                                                                        .currentTarget
                                                                                        .value,
                                                                            },
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return defaultComponent;
                                            }
                                        }}
                                    </ProjectEditor>
                                    <pre>
                                        {JSON.stringify(projectInput, null, 4)}
                                    </pre>
                                </React.Fragment>
                            )}
                        </RuntimeProvider>
                    )}
                </WebRuntime>
            </Story>
        );
    });
});
