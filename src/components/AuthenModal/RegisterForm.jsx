import React, { useEffect, useRef, useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import { useAuthContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { MESSAGE, REGEX } from '../../constants/validate';
import useDebounce from '../../hooks/useDebounce';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';
import { useDispatch, useSelector } from 'react-redux';
import { handleRegister } from '../../store/reducers/authReducer';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        if (data && !loading.register) {
            try {
                const { name, email, password } = data;
                const payload = {
                    firstName: name || "",
                    lastName: "",
                    email,
                    password,
                };
                console.log("payload", payload);
                dispatch(handleRegister(payload));
            } catch (error) {
                console.log("error", error);
            }
        }
    }
    // useDebounce
    const renderLoading = useDebounce(loading.register, 300);

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            style={{ position: "relative" }}>
            {renderLoading && <>loading</>}
            <Input
                type="email"
                label="Your email address"
                required
                {...register("email", {
                    required: MESSAGE.required,
                    pattern: {
                        value: REGEX.email,
                        message: MESSAGE.email
                    },
                })}
                error={errors?.email?.message || ""}
            // ref={firstInputRef}
            />
            <Input
                type="password"
                label="Password"
                required
                {...register("password", {
                    required: MESSAGE.required,
                })}
                error={errors?.password?.message || ""}
            />
            <div className="form-footer">
                <Button type="submit">
                    <span>SIGN UP</span>
                    <i className="icon-long-arrow-right" />
                </Button>
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="register-policy"
                        {...register("isAgree", {
                            required: "Please agree with our policy"
                        })}
                    />
                    <label className="custom-control-label" htmlFor="register-policy">I agree to the
                        <Link to={PATHS.PRIVATE_POLICY}>privacy policy</Link> *
                    </label>
                </div>
            </div>
        </form>
    )
}

export default RegisterForm