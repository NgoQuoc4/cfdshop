import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { MESSAGE } from '../../constants/validate'
import Button from '../../components/Button'

const CheckoutDiscountWrapper = styled.div`
    height: 40px;
    display: flex;
    gap: 10px;
    .checkout-discount{
        flex: 1;
    }
    input{
        margin: 0 !important;
    }
`
const CheckoutDiscount = ({
    addedCoupon,
    handleAddCoupon,
    handleRemoveCoupon,
}) => {
    useEffect(() => {
        $('#checkout-discount-input').on('focus', function () {
            // Hide label on focus
            $(this).parent('form').find('label').css('opacity', 0);
        }).on('blur', function () {
            // Check if input is empty / toggle label
            var $this = $(this);

            if ($this.val().length !== 0) {
                $this.parent('form').find('label').css('opacity', 0);
            } else {
                $this.parent('form').find('label').css('opacity', 1);
            }
        });
    }, [])

    const { register, handleSubmit, reset, formState: { errors }
    } = useForm({
        defaultValues: {
            discountCode: addedCoupon,
        },
    });

    useEffect(() => {
        reset({
            discountCode: addedCoupon
        });
    }, [addedCoupon])

    const _onSubmit = (value) => {
        if (value?.discountCode) {
            handleAddCoupon?.(value.discountCode)
        }
    };

    return (
        <CheckoutDiscountWrapper>
            <div className="checkout-discount">
                <form>
                    <input
                        type="text"
                        className="form-control"
                        id="checkout-discount-input"
                        {...register("discountCode", {
                            required: MESSAGE.required,
                        })}
                    />
                    <label
                        htmlFor="checkout-discount-input"
                        className="text-truncate"
                        style={{ opacity: addedCoupon ? 0 : 1 }}
                    >Have a coupon?{""}
                        <span>Click here to enter your code</span>
                    </label>
                    <p className="form-error" style={{ minHeight: 23 }}>
                        {errors?.discountCode?.message || ""}
                    </p>
                </form>
            </div>
            {addedCoupon ? (
                <Button variant="outline" onClick={handleRemoveCoupon}>
                    Remove
                </Button>
            ) : (
                <Button onClick={handleSubmit(_onSubmit)}>Add</Button>
            )}
        </CheckoutDiscountWrapper>
    )
}

export default CheckoutDiscount