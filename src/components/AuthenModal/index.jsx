import React from 'react'
import { MODAL_TYPES } from '../../constants/general';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { handleCloseModal, handleShowModal } from '../../store/reducers/authReducer';
import cn from '../../utils/cn';
import styled from 'styled-components';

const AuthenModalContainer = styled.div`
      display:${(props) => (props?.isShow ? "block" : "none")} ;
    `;

const AuthenModal = () => {
    // const { showedModal, handleCloseModal, handleShowModal } = useAuthContext();

    const dispatch = useDispatch();
    const { showedModal } = useSelector((state) => state.auth);
    const _onTabChange = (e, tab) => {
        e?.stopPropagation();
        e?.preventDefault();
        dispatch(handleShowModal(tab));
    }
    const _onCloseModal = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        dispatch(handleCloseModal());
    }

    return (
        <>
            <AuthenModalContainer
                className={cn("modal", { "fade show": !!showedModal })}
                isShow={!!showedModal}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                onClick={_onCloseModal}
                                type="button"
                                className="close">
                                <span aria-hidden="true">
                                    <i className="icon-close" />
                                </span>
                            </button>
                            <div className="form-box">
                                <div className="form-tab">
                                    <ul className="nav nav-pills nav-fill nav-border-anim" role="tablist">
                                        <li className="nav-item">
                                            <a href="signin" onClick={(e) => _onTabChange(e, MODAL_TYPES.login)}
                                                className={cn("nav-link", { active: showedModal === MODAL_TYPES.login, })}
                                            >Sign In
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="register" onClick={(e) => _onTabChange(e, MODAL_TYPES.register)}
                                                className={cn("nav-link", { active: showedModal === MODAL_TYPES.register, })}
                                            >Register
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="tab-content-5">
                                        <div className="tab-pane fade show active">
                                            {showedModal === MODAL_TYPES.login && (<LoginForm />)}
                                            {showedModal === MODAL_TYPES.register && (<RegisterForm />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenModalContainer>
            {!!showedModal && (
                <div className="modal-backdrop fade show"
                    onClick={handleCloseModal}>
                </div>
            )}
        </>

    )
}

export default AuthenModal