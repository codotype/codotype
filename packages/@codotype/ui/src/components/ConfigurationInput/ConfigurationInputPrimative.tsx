import * as React from "react";
import {
    PropertyTypes,
    ConfigurationPropertyValue,
    DropdownOption,
    ConfigurationProperty,
    applyStringPropertyTransformations,
    applyNumberPropertyTransformations,
} from "@codotype/core";
import Switch from "react-switch";

// // // //

interface ConfigurationInputChildProps {
    value: any;
    property: ConfigurationProperty;
    onChange: (updatedValue: ConfigurationPropertyValue) => void;
}

export function ConfigurationInputPrimative(
    props: ConfigurationInputChildProps,
) {
    const { property } = props;

    function setValue(updatedValue: ConfigurationPropertyValue) {
        if (property.allowDisable) {
            props.onChange({
                enabled: props.value.enabled,
                value: updatedValue,
            });
            return;
        }
        props.onChange(updatedValue);
    }

    // Pulls value from props.value
    let value = props.value;
    if (property.allowDisable) {
        value = props.value.value;
    }

    // // // //

    // Handle PropertyTypes.STRING
    if (property.type === PropertyTypes.STRING) {
        return (
            <input
                className="form-control"
                type="text"
                name={property.identifier}
                required={property.required}
                placeholder={property.content.label}
                autoComplete="none"
                value={value}
                onChange={e => {
                    setValue(e.currentTarget.value);
                }}
                onBlur={e => {
                    const value = e.currentTarget.value;

                    // Applies PropertyFilters from ConfigurationProperty
                    const filteredValue: string = applyStringPropertyTransformations(
                        {
                            value,
                            // @ts-ignore
                            filters: property.filters,
                        },
                    );

                    // Sets value with filtered version on blur
                    setValue(filteredValue);
                }}
            />
        );
    }

    // Handle PropertyTypes.NUMBER
    if (property.type === PropertyTypes.NUMBER) {
        return (
            <input
                className="form-control"
                type="number"
                placeholder={property.content.label}
                value={value}
                required={property.required}
                onChange={e => {
                    setValue(e.currentTarget.value);
                }}
                onBlur={e => {
                    const value = parseFloat(e.currentTarget.value);

                    // Return if value is NaN for some reason
                    if (Number.isNaN(value)) {
                        return;
                    }

                    // Applies PropertyFilters from ConfigurationProperty
                    const filteredValue: number = applyNumberPropertyTransformations(
                        {
                            value,
                            // @ts-ignore
                            filters: property.filters,
                        },
                    );

                    // Sets value with filtered version on blur
                    setValue(filteredValue);
                }}
            />
        );
    }

    // Handle PropertyTypes.BOOLEAN
    if (property.type === PropertyTypes.BOOLEAN) {
        return (
            <Switch
                height={22}
                width={50}
                // onHandleColor={}
                // offHandleColor={}
                offColor={"#888"}
                onColor={"#6366F1"}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={(updatedChecked: boolean) => {
                    setValue(updatedChecked);
                }}
                checked={value}
            />
        );
    }

    // Handle PropertyTypes.DROPDOWN
    if (property.type === PropertyTypes.DROPDOWN) {
        return (
            <select
                className="form-control"
                value={value}
                onChange={e => {
                    setValue(e.currentTarget.value);
                }}
            >
                {property.required && (
                    <option value="">{property.content.label}</option>
                )}
                {property.dropdownOptions.map((d: DropdownOption) => {
                    return (
                        <option key={d.value} value={d.value}>
                            {d.label}
                        </option>
                    );
                })}
            </select>
        );
    }

    // FEATURE - add support for MULTI_DROPDOWN
    return null;
}
