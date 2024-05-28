import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { styled } from "styled-components"
const InputNumberStyle = styled.input`
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
    -moz-appearance:textfield;
`

const QuantityInput = ({
    className,
    defaultValue,
    min = 1,
    max = 10,
    step = 1,
    onChange,
    ...inputProps
}, ref) => {
    const [currentQuantity, setCurrentQuantity] = useState(defaultValue ?? 1);

    useImperativeHandle(ref, () => {
        return {
            value: currentQuantity,
            reset: () => {
                setCurrentQuantity(defaultValue ?? 1);
            }
        }
    })

    useEffect(() => {
        onChange?.(currentQuantity);
    }, [currentQuantity])

    const _onInputChange = (e) => {
        setCurrentQuantity(e.target.value !== "" ? _modifyValue(Number(e.target.value)) : "");
    }
    const _onInputBlur = () => {
        if (currentQuantity === "") {
            setCurrentQuantity(defaultValue);
        }
    }
    const _onIncrease = () => {
        const value = _modifyValue(Number(currentQuantity) + Number(step))
        setCurrentQuantity(value)
    }
    const _onDecrease = () => {
        const value = _modifyValue(Number(currentQuantity) - Number(step))
        setCurrentQuantity(value)
    }
    const _modifyValue = (value) => {
        if (value > max) {
            return max;
        } else if (value < min) {
            return min;
        } else {
            return value;
        }
    };

    return (
        <div className={className}>
            <div className="input-group input-spinner">
                <div className="input-group-prepend">
                    <button
                        className="btn btn-decrement btn-spinner"
                        onClick={_onDecrease}
                    >
                        <i className="icon-minus"></i>
                    </button>
                </div>
                <InputNumberStyle
                    type="number"
                    className="form-control"
                    style={{
                        textAlign: 'center'
                    }}
                    value={currentQuantity}
                    onChange={_onInputChange}
                    onBlur={_onInputBlur}
                    max={max}
                    {...inputProps}
                />
                <div className="input-group-append">
                    <button
                        style={{ minWidth: 26 }}
                        className="btn btn-increment btn-spinner"
                        type="botton"
                        onClick={_onIncrease}
                    >
                        <i className="icon-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(QuantityInput) 