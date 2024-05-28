import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAddress from '../../hooks/useAddress';
import { useForm, Controller } from 'react-hook-form';
import Input from '../../components/Input';
import { MESSAGE, REGEX } from '../../constants/validate';
import { Select, message } from 'antd';
import { removeAccents } from '../../utils/format';
import { authService } from '../../services/authService';
import { handleGetProfile } from '../../store/reducers/authReducer';
import dayjs from 'dayjs';

const FormAccount = () => {

    const { profile } = useSelector((state) => state.auth);

    const { firstName, phone, email, province, district, birthday, ward, street } = profile || {};

    const dispatch = useDispatch();
    const { provinces,
        districts,
        wards,
        provinceId,
        districtId,
        wardId,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange, } = useAddress();

    const { register, handleSubmit, reset, getValues, control, formState: { errors },
    } = useForm({ defaultValues: { firstName, phone, email, province, birthday, district, ward, street }, });

    useEffect(() => {
        if (!profile) return;
        reset?.({
            firstName,
            phone,
            email,
            province,
            district,
            ward,
            street,
            birthday: profile?.birthday ? dayjs(profile?.birthday || "01-01-2000").format("YYYY/MM/DD").replaceAll("/", "-") : "",
        });
        handleProvinceChange?.(province);
        handleDistrictChange?.(district);
        handleWardChange?.(ward);
    }, [profile])

    const _onProvinceChange = (changedId) => {
        handleProvinceChange?.(changedId);
        reset({
            ...getValues(),
            province: changedId,
            district: undefined,
            ward: undefined,
        });
    }

    const _onDistrictChange = (changedId) => {
        handleDistrictChange?.(changedId);
        reset({
            ...getValues(),
            district: changedId,
            ward: undefined,
        });
    }
    const _onWardChange = (changedId) => {
        handleWardChange?.(changedId);
        reset({
            ...getValues(),
            ward: changedId,
        });
    }

    const _onSubmit = async (data) => {
        console.log(data);
        const payload = {
            ...data, lastName: profile?.lastName,
        }
        try {
            const res = await authService.updateProfile(payload);
            if (res?.status === 200) {
                message.success("Updated profile successfully");
                dispatch(handleGetProfile());
            }
        } catch (error) {
            message.error(error?.response?.data?.message || "Something went wrong");
        }
    }


    return (
        <div className="tab-pane fade show active">
            <form className="account-form" onSubmit={handleSubmit(_onSubmit)}>
                <div className="row">
                    <div className="col-sm-6">
                        <Input
                            type="text"
                            required
                            label="Name"
                            {...register("firstName", {
                                required: MESSAGE.required,
                            })}
                            error={errors?.firstName?.message || ""}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Input
                            type="text"
                            required
                            disabled
                            label="Email address"
                            {...register("email", {
                                required: MESSAGE.required,
                            })}
                            error={errors?.email?.message || ""}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Input
                            type="text"
                            required
                            label="Phone"
                            {...register("phone", {
                                required: MESSAGE.required,
                                pattern: {
                                    value: REGEX.phone,
                                    message: "Please enter a valid phone number"
                                }
                            })}
                            error={errors?.phone?.message || ""}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Input
                            type='date'
                            required
                            label="Birthday"
                            {...register("birthday", {
                                required: MESSAGE.required
                            })}
                            error={errors?.birthday?.message || ""}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <label>Province/City *</label>
                        <Controller
                            name="province"
                            control={control}
                            rules={{
                                required: MESSAGE.required
                            }}
                            render={({ formState: { errors } }) => {
                                return (
                                    <>
                                        <Select
                                            style={{ display: "block", minHeight: "40px" }}
                                            className="customSelect select-custom"
                                            suffixIcon={<></>}
                                            showSearch
                                            placeholder="Please select Province/City"
                                            options={provinces}
                                            value={provinceId}
                                            optionFilterProp="children"
                                            onChange={_onProvinceChange}
                                            filterOption={(input, option) =>
                                                removeAccents(
                                                    option?.label ?? ""
                                                )
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(
                                                            input.toLowerCase()
                                                        )
                                                    )
                                            }
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 23 }}
                                        >
                                            {errors?.province?.message || ""}
                                        </p>
                                    </>
                                )
                            }}
                        />
                    </div>
                    <div className="col-sm-4">
                        <label>District/Town *</label>
                        <Controller
                            name="district"
                            control={control}
                            rules={{
                                required: MESSAGE.required
                            }}
                            render={({ formState: { errors } }) => {
                                return (
                                    <>
                                        <Select
                                            style={{ display: "block", minHeight: "40px" }}
                                            className="customSelect select-custom"
                                            suffixIcon={<></>}
                                            showSearch
                                            placeholder="Please select District/Town"
                                            options={districts}
                                            value={districtId}
                                            optionFilterProp="children"
                                            onChange={_onDistrictChange}
                                            filterOption={(input, option) =>
                                                removeAccents(
                                                    option?.label ?? ""
                                                )
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(
                                                            input.toLowerCase()
                                                        )
                                                    )
                                            }
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 23 }}
                                        >
                                            {errors?.district?.message || ""}
                                        </p>
                                    </>
                                )
                            }}
                        />
                    </div>
                    <div className="col-sm-4">
                        <label>Ward *</label>
                        <Controller
                            name="ward"
                            control={control}
                            rules={{
                                required: MESSAGE.required
                            }}
                            render={({ formState: { errors } }) => {
                                return (
                                    <>
                                        <Select
                                            style={{ display: "block", minHeight: "40px" }}
                                            className="customSelect select-custom"
                                            suffixIcon={<></>}
                                            showSearch
                                            placeholder="Please select Ward/Town"
                                            options={wards}
                                            value={wardId}
                                            optionFilterProp="children"
                                            onChange={_onWardChange}
                                            filterOption={(input, option) =>
                                                removeAccents(
                                                    option?.label ?? ""
                                                )
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(
                                                            input.toLowerCase()
                                                        )
                                                    )
                                            }
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 23 }}
                                        >
                                            {errors?.ward?.message || ""}
                                        </p>
                                    </>
                                )
                            }}
                        />
                    </div>
                </div>
                <Input
                    type="text"
                    required
                    label="Street address"
                    {...register("street", {
                        required: MESSAGE.required,
                    })}
                    error={errors?.street?.message || ""}
                />
                <button type="submit" className="btn btn-outline-primary-2">
                    <span>SAVE CHANGES</span>
                    <i className="icon-long-arrow-right" />
                </button>
            </form>
        </div>
    )
}

export default FormAccount