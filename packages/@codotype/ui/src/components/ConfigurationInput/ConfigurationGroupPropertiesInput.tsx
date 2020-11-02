import * as React from "react";
import {
    ConfigurationGroup,
    ConfigurationProperty,
    PropertyTypes,
    OptionValue,
    OptionValueInstance,
    EMPTY_TOKEN_CASING,
    buildTokenPluralization,
} from "@codotype/core";
import { ConfigurationInputChild } from "./ConfigurationInputChild";
import { ConfigurationInputFormGroup } from "./ConfigurationInputFormGroup";
import { ConfigurationCollectionInput } from "./ConfigurationCollectionInput";

// // // //

/**
 * ConfigurationGroupPropertiesInput
 * @param props
 */
export function ConfigurationGroupPropertiesInput(props: {
    configurationGroup?: ConfigurationGroup;
    properties?: ConfigurationProperty[];
    value: OptionValueInstance;
    onChange: (updatedVal: OptionValueInstance) => void;
}) {
    const { configurationGroup } = props;

    // @ts-ignore
    const properties: ConfigurationProperty[] =
        // @ts-ignore
        props.properties || configurationGroup.properties;

    return (
        <div className="row">
            {properties.map((property: ConfigurationProperty) => {
                // Handle PropertyTypes.COLLECTION
                if (property.type === PropertyTypes.COLLECTION) {
                    const val =
                        // @ts-ignore
                        props.value[property.identifier];
                    return (
                        <ConfigurationInputFormGroup
                            enabled={!!val.enabled}
                            property={property}
                            key={property.identifier}
                            onChangeEnabled={updatedEnabled => {
                                props.onChange({
                                    ...props.value,
                                    [property.identifier]: {
                                        ...val,
                                        enabled: updatedEnabled,
                                    },
                                });
                            }}
                        >
                            <ConfigurationCollectionInput
                                identifiers={buildTokenPluralization("Item")} // TODO - replace with option taken from ConfigurationProperty
                                properties={property.properties}
                                propertyPreview={property.preview}
                                onChange={(updatedVal: OptionValue) => {
                                    props.onChange({
                                        ...props.value,
                                        [property.identifier]: updatedVal,
                                    });
                                }}
                                value={val}
                            />
                        </ConfigurationInputFormGroup>
                    );
                }

                // Handle instance input
                if (property.type === PropertyTypes.INSTANCE) {
                    const val =
                        // @ts-ignore
                        props.value[property.identifier];
                    return (
                        <ConfigurationInputFormGroup
                            enabled={!!val.enabled}
                            property={property}
                            key={property.identifier}
                            onChangeEnabled={updatedEnabled => {
                                props.onChange({
                                    ...props.value,
                                    [property.identifier]: {
                                        ...val,
                                        enabled: updatedEnabled,
                                    },
                                });
                            }}
                        >
                            <ConfigurationGroupPropertiesInput
                                properties={property.properties}
                                onChange={(updatedVal: OptionValueInstance) => {
                                    if (property.allowDisable) {
                                        props.onChange({
                                            ...props.value,
                                            [property.identifier]: {
                                                enabled: true,
                                                value: updatedVal,
                                            },
                                        });
                                    } else {
                                        props.onChange({
                                            ...props.value,
                                            [property.identifier]: updatedVal,
                                        });
                                    }
                                }}
                                value={property.allowDisable ? val.value : val}
                            />
                        </ConfigurationInputFormGroup>
                    );
                }

                // Handle PropertyTypes.STRING + PropertyTypes.NUMBER + PropertyTypes.BOOLEAN + PropertyTypes.BOOLEAN
                // @ts-ignore
                const value = props.value[property.identifier];
                return (
                    <ConfigurationInputFormGroup
                        enabled={!!value.enabled}
                        property={property}
                        key={property.identifier}
                        onChangeEnabled={(updatedEnabled: boolean) => {
                            props.onChange({
                                ...props.value,
                                [property.identifier]: {
                                    ...value,
                                    enabled: updatedEnabled,
                                },
                            });
                        }}
                    >
                        <ConfigurationInputChild
                            value={value}
                            property={property}
                            onChange={(updatedValue: OptionValue) => {
                                props.onChange({
                                    ...props.value,
                                    [property.identifier]: updatedValue,
                                });
                            }}
                        />
                    </ConfigurationInputFormGroup>
                );
            })}
        </div>
    );
}