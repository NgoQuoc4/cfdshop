import React, { useRef } from 'react'
import Input from '../../components/Input';
import { MESSAGE } from '../../constants/validate';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { authService } from '../../services/authService';
import { message } from 'antd';

const ChangePass = () => {
    const { profile } = useSelector((state) => state.auth);
    const newPassword = useRef({});
    const password = useRef({});

    const { register, handleSubmit, watch, formState: { errors },
    } = useForm();

    newPassword.current = watch("newPassword", "");
    password.current = watch("password", "");

    const _onSubmit = async (data) => {
        try {
            const res = await authService.updateProfile({ ...profile, ...data });
            if (res.status === 200) {
                message.success("Updated password successfully")
            }
        } catch (error) {
            message.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div className="tab-pane fade show active">
            <form className="account-form" onSubmit={handleSubmit(_onSubmit)}>
                <Input
                    type="password"
                    defaultValue={null}
                    label="Current password (leave blank to leave unchanged)"
                    {...register("password", {
                        required: MESSAGE.required,

                    })}
                    error={errors?.password?.message || ""}
                />
                <Input
                    type="password"
                    required
                    label="New password (leave blank to leave unchanged)"
                    {...register("newPassword", {
                        validate: (value) => value !== password.current || "Matches the old password!"
                    })}
                    error={errors?.newPassword?.message || ""}
                />
                <Input
                    type="password"
                    required
                    label="Confirm new password"
                    {...register("cppassword", {
                        validate: (value) => value === newPassword.current || "Confirm password not match!"

                    })}
                    error={errors?.cppassword?.message || ""}
                />
                <button type="submit" className="btn btn-outline-primary-2">
                    <span>SAVE CHANGES</span>
                    <i className="icon-long-arrow-right" />
                </button>
            </form>
        </div>
    )
}

export default ChangePass