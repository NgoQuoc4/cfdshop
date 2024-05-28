import React from 'react'

const Checkbox = ({ id, label, checked, onChange }) => {
    // console.log("id", id)
    // console.log("label", label)
    // console.log("checked", checked)
    // console.log("onChange", onChange)

    return (
        <>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={id} onChange={onChange} />
                <label className="custom-control-label" htmlFor={id}>{label || ""}</label>
            </div>
            <span className="item-count">2</span>
        </>
    )
}

export default Checkbox