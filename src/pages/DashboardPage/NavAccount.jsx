import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PATHS from '../../constants/paths';
import { handleLogout } from '../../store/reducers/authReducer';

const NavAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const _onSignOut = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
        navigate(PATHS.HOME);
    };
    return (
        <aside className="col-md-4 col-lg-3">
            <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                <li className="nav-item">
                    <NavLink
                        end
                        className="nav-link"
                        to={PATHS.PROFILE.INDEX}
                    >Account Details</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        end
                        className="nav-link"
                        to={PATHS.PROFILE.PROFILE_ORDER}
                    >Orders</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        end
                        className="nav-link"
                        to={PATHS.PROFILE.PROFILE_ADDRESS}
                    >Adresses</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        end
                        className="nav-link"
                        to={PATHS.PROFILE.PROFILE_WISHLIST}
                    >Wishlist</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        end
                        className="nav-link"
                        to={PATHS.PROFILE.PROFILE_CHANGE_PASS}
                    >Change Password</NavLink>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        href="#"
                        onClick={(e) => _onSignOut(e)}
                    >Sign Out</a>
                </li>
            </ul>
        </aside>
    )
}

export default NavAccount