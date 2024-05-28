import React, { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';
import Input from '../Input';
import useDebounce from '../../hooks/useDebounce';
import { MESSAGE, REGEX } from '../../constants/validate';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../../store/reducers/authReducer';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        if (data && !loading.login) {
            try {
                const res = await dispatch(handleLogin(data)).unwrap();
                console.log("res", res);
            } catch (error) {
                console.log("error", error);
            }
        }
    }
    // useDebounce
    const renderLoading = useDebounce(loading.login, 300);
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ position: "relative" }}>
            {renderLoading && <>loading</>}
            <Input
                label="Username or email address"
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
                label="Password"
                required
                type="password"
                {...register("password", {
                    required: MESSAGE.required,
                })}
                error={errors?.password?.message || ""}
            />
            <div className="form-footer">
                <Button type="submit">
                    <span>LOG IN</span>
                    <i className="icon-long-arrow-right" />
                </Button>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="signin-remember" />
                    <label className="custom-control-label" htmlFor="signin-remember">Remember
                        Me</label>
                </div>
                {/* <a href="#" className="forgot-link">Forgot Your Password?</a> */}
            </div>
        </form>
    )
}

export default LoginForm