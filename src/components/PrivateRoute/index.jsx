import React from 'react'
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import tokenMethod from '../../utils/token';
import { handleShowModal } from '../../store/reducers/authReducer';
import { MODAL_TYPES } from '../../constants/general';
import PATHS from '../../constants/paths';

const PrivateRoute = ({ redirectPath = PATHS.HOME }) => {
    const dispatch = useDispatch();

    if (!!!tokenMethod.get()) {
        dispatch(handleShowModal(MODAL_TYPES.login));
        return <Navigate to={redirectPath} />
    }
    return (
        <>
            <Outlet />
        </>

    )
}

export default PrivateRoute