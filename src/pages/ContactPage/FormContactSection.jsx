import React from 'react'
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import { MESSAGE, REGEX } from '../../constants/validate';
import { subscribeService } from '../../services/subscribeService';
import { message } from 'antd';
import useMutation from '../../hooks/useMutation';
import { useNavigate } from 'react-router-dom';
import PATHS from '../../constants/paths';

const FormContactSection = () => {
    const navigate = useNavigate();
    const { execute: contactExecution } = useMutation(subscribeService.subscribe);

    const handleContactForm = (contactForm, callback) => {
        if (contactForm) {
            const { name, subject = "", email, note, phone = "", } = contactForm || {};
            const payload = {
                name,
                email,
                title: subject || "",
                description: note,
                phone: phone || "",
            }
            contactExecution(payload, {
                onSuccess: (payload) => {
                    message.success("Send question successfully");
                    callback?.();
                    navigate(PATHS.HOME);
                },
                onFail: (error) => {
                    message.error("Send question failed!");
                }
            });
        }
    }

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (value) => {
        handleContactForm?.(value, reset);
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="contact-form mb-3">
            <div className="row">
                <div className="col-sm-6">
                    <Input
                        type="name"
                        placeholder="Name*"
                        {...register("name", {
                            required: MESSAGE.required,
                        })}
                        error={errors?.name?.message || ""}
                    />
                </div>
                <div className="col-sm-6">
                    <Input
                        placeholder="Email*"
                        type="email"
                        {...register("email", {
                            required: MESSAGE.required,
                            pattern: {
                                value: REGEX.email,
                                message: MESSAGE.email
                            },
                        })}
                        error={errors?.email?.message || ""}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <Input
                        type="phone"
                        placeholder="Phone"
                        {...register("phone", {
                            required: MESSAGE.required,
                            pattern: {
                                value: REGEX.phone,
                                message: MESSAGE.phone
                            },
                        })}
                        error={errors?.phone?.message || ""}
                    />
                </div>
                <div className="col-sm-6">
                    <Input
                        class="form-control"
                        placeholder="Subject"
                        type="subject"
                        {...register("subject")}
                    />
                </div>
            </div>
            <Input
                type="text"
                // required
                renderInput={(inputProps) => {
                    return (
                        <>
                            <textarea
                                required
                                {...inputProps}
                                {...register("note")}
                                className="form-control"
                                cols={30} rows={4}
                                placeholder="Message*"
                            />
                        </>
                    )
                }}
                error={errors?.note?.message || ""}
            />
            <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                <span>SUBMIT</span>
                <i className="icon-long-arrow-right" />
            </button>
        </form>
    )
}

export default FormContactSection