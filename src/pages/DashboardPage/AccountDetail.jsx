import React from 'react'
import { useSelector } from 'react-redux'
import FormAccount from './FormAccount';

const AccountDetail = () => {
    const { profile, loading } = useSelector((state) => state.auth)

    if (!profile || loading.getProfile) return null;

    return (
        profile && <FormAccount profile={profile} />
    )
}

export default AccountDetail;