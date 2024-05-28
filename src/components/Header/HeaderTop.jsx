import React from 'react'
import { MODAL_TYPES } from '../../constants/general';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout, handleShowModal } from '../../store/reducers/authReducer';
import PATHS from '../../constants/paths';
import tokenMethod from '../../utils/token';

const HeaderTop = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.auth);
    const { firstName, email } = profile || {};
    const pathWishList = `/profile/` + PATHS.PROFILE.PROFILE_WISHLIST
    const pathOrder = `/profile/` + PATHS.PROFILE.PROFILE_ORDER

    const _onShowAuthModal = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        dispatch(handleShowModal(MODAL_TYPES.login));
    };

    const _onSignOut = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
        navigate(PATHS.HOME);
    };

    if (!!!tokenMethod.get()) {
        return (
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        <a href="tel:0989596912">
                            <i className="icon-phone" /> Hotline: 098 9596 912 </a>
                    </div>
                    <div className="header-right">
                        {/* Not LogIn */}
                        <ul className="top-menu top-link-menu" >
                            <li >
                                <a onClick={() => _onShowAuthModal()} href="#signin-modal" data-toggle="modal" className="top-menu-login"><i className="icon-user" />Login | Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        )
    }
    return (
        <div className="header-top">
            <div className="container">
                <div className="header-left">
                    <a href="tel:0989596912">
                        <i className="icon-phone" /> Hotline: 098 9596 912 </a>
                </div>
                <div className="header-right">
                    <ul className="top-menu">
                        <li>
                            <a href="#" className="top-link-menu"><i className="icon-user" />{firstName || ""} </a>
                            <ul>
                                <li>
                                    <ul>
                                        <li><Link to={PATHS.PROFILE.INDEX}>Account Details</Link></li>
                                        <li><Link to={pathOrder}>Your Orders</Link></li>
                                        <li><Link to={pathWishList}>Wishlist <span>(3)</span></Link></li>
                                        <li><a href="#" onClick={(e) => _onSignOut(e)}>Sign Out</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default HeaderTop