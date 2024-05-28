import { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";
import { message } from "antd";
import tokenMethod from "../utils/token";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [showedModal, setShowedModal] = useState("");
    // open
    const handleShowModal = (modalType) => {
        if (!!!tokenMethod.get()) {
            setShowedModal(modalType || "");
        }
        setShowedModal(modalType || "");
    }
    // close
    const handleCloseModal = (e) => {
        e?.stopPropagation();
        setShowedModal("")
    };
    // handle login
    const handleLogin = async (loginData, callback) => {
        // call api
        try {
            const res = await authService.login(loginData);
            const { token: accessToken, refreshToken } = res?.data?.data || {};
            // luu vao local storage
            tokenMethod.set({
                accessToken,
                refreshToken,
            });

            console.log("data", res.data.data)
            if (!!tokenMethod.get()) {
                // get profile
                // handleGetProfile();
                // handleGetProfileCourse();
                // handleGetProfilePayment();
                message.success("Đăng nhập thành công!");
                handleCloseModal();
            }
        } catch (error) {
            console.log("error", error);
            message.error("Đăng nhập thất bại");
        }
    };

    // handle register
    const handleRegister = async (registerData, callback) => {
        try {
            const { email, password } = registerData || {};
            const payload = {
                firstName: "",
                lastName: "",
                email,
                password,
            }
            const res = await authService.register(payload);
            if (res?.data?.data?.id) {
                message.success("Đăng ký thành công!");
                handleLogin({
                    email,
                    password,
                });
            }
        } catch (error) {
            console.log("error", error);
            if (error?.response?.status === 403) {
                message.error("Email đăng ký đã tôn tại!");
            } else {
                message.error("Đăng ký thất bại!");
            }
        } finally {
            callback();
        }
    };

    return (
        <AuthContext.Provider value={{
            showedModal,
            handleLogin,
            handleRegister,
            handleShowModal,
            handleCloseModal
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export const useAuthContext = () => useContext(AuthContext)