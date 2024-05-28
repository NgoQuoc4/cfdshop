import React, { forwardRef } from 'react'
const Input = ({ label, required, error, renderInput = undefined, name = "", type = "text", ...rest }, ref) => {
    return (
        <>
            <div className="form-group">
                <label className="label">{label}{required && <span>*</span>}</label>
                {
                    renderInput?.({ ...rest, error }) ||
                    <input ref={ref} {...rest} name={name} id={name} type={type} className={`form-control ${error ? "input-error" : ""}`} />
                }
                <p className="form-error">{error || ""}</p>
            </div>
        </>

    )
}
export default forwardRef(Input)