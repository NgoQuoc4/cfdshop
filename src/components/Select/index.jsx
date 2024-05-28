import React from 'react'

const Select = ({ options, error, ...rest }) => {
    return (
        <div className="select-custom">
            <select
                {...rest}
                className={`form-control ${!!error ? "input-error" : ""}`}>

                {options?.map((option, index) => (
                    <option key={option?.value || index} value={option?.value} >
                        {option?.label || ""}
                    </option>
                ))}

            </select>
        </div>
    )
}

export default Select 