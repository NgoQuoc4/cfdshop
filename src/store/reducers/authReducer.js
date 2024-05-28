import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import tokenMethod from "../../utils/token";
import { message } from "antd";
import { authService } from "../../services/authService";
import { handleGetCart } from "./cartReducer";

const initialState = {
    showedModal: "",
    profile: null,
    loading: {
        login: false,
        register: false,
        getProfile: false,
        add: false,
        delete: false,
    },
};

export const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        handleShowModal: (state, action) => {
            state.showedModal = action.payload;
        },
        handleCloseModal: (state) => {
            state.showedModal = "";
        },
        handleLogout: (state) => {
            tokenMethod.remove();
            state.profile = null;
            state.showedModal = "";
            message.success("Đăng xuất thành công");
        },
    },
    extraReducers: (builder) => {
        builder
            // handleRegister
            .addCase(handleRegister.fulfilled, (state) => {
                state.loading.register = false;
            })
            .addCase(handleRegister.pending, (state) => {
                state.loading.register = true;
            })
            .addCase(handleRegister.rejected, (state) => {
                state.loading.register = false;
            })
            // handleLogin 
            .addCase(handleLogin.fulfilled, (state) => {
                state.loading.login = false;
                state.showedModal = "";
            })
            .addCase(handleLogin.pending, (state) => {
                state.loading.login = true;
            })
            .addCase(handleLogin.rejected, (state) => {
                state.loading.login = false;
            })
            // handleGetProfile
            .addCase(handleGetProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading.getProfile = false;
            })
            .addCase(handleGetProfile.pending, (state) => {
                state.loading.getProfile = true;
            })
            .addCase(handleGetProfile.rejected, (state) => {
                state.loading.getProfile = false;
            })

            // handleAddWishList
            .addCase(handleAddWishList.pending, (state) => {
                state.loading.add = true;
            })
            .addCase(handleAddWishList.fulfilled, (state) => {
                state.loading.add = false;
            })
            .addCase(handleAddWishList.rejected, (state) => {
                state.loading.add = false;
            })
            // handleDeleteWishList
            .addCase(handleDeleteWishList.pending, (state) => {
                state.loading.delete = true;
            })
            .addCase(handleDeleteWishList.fulfilled, (state) => {
                state.loading.delete = false;
            })
            .addCase(handleDeleteWishList.rejected, (state) => {
                state.loading.delete = false;
            })

    },
});

// Extract the action creators object and the reducer
const { actions, reducer: authReducer } = authSlice;
// Extract and export each action creator by name
export const { handleLogout, handleShowModal, handleCloseModal } = actions;
// Export the reducer, either as a default or named export
export default authReducer;

export const handleRegister = createAsyncThunk(
    "auth/handleRegister",
    async (payload, thunkApi) => {
        try {
            const registerRes = await authService.register(payload);
            if (registerRes?.data?.data?.id) {
                message.success("Đăng ký thành công");
                thunkApi.dispatch(
                    handleLogin({
                        email: payload.email,
                        password: payload.password,
                    })
                );
                return true;
            } else {
                throw false;
            }
        } catch (error) {
            const errorInfo = error?.response?.data;
            if (errorInfo.error === "Forbidden") {
                message.error("Email đã được đăng ký");
            }
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
);
// handle login
export const handleLogin = createAsyncThunk(
    "auth/handleLogin",
    async (payload, thunkApi) => {
        try {
            const loginRes = await authService.login(payload);
            const { token: accessToken, refreshToken } = loginRes?.data?.data || {};
            tokenMethod.set({
                accessToken,
                refreshToken,
            });
            thunkApi.dispatch(handleGetProfile());
            thunkApi.dispatch(handleGetCart());

            message.success("Đăng nhập thành công");
            return true;
        } catch (error) {
            const errorInfo = error?.response?.data;
            if (errorInfo.error === "Not Found") {
                message.error("Username hoặc password không đúng");
            }
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
);

export const handleGetProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, thunkApi) => {
        if (tokenMethod.get()) {
            try {
                const profileRes = await authService.getProfiles();
                return profileRes?.data?.data;
            } catch (error) {
                return thunkApi.rejectWithValue(error?.response?.data);
            }
        }
    }
);

export const handleAddWishList = createAsyncThunk(
    "auth/handleAddWishList",
    async (payload, thunkApi) => {
        try {
            const wishListRes = await authService.whitelistProfile(payload);
            if (wishListRes?.data?.data?.id) {
                message.success("Add wish list successfully");
                thunkApi.dispatch(handleGetProfile());
            } else {
                throw false;
            }
        } catch (error) {
            const errorInfo = error?.response?.data;
            message.error("Add wish list failed");
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
);

export const handleDeleteWishList = createAsyncThunk(
    "auth/handleDeleteWishList",
    async (payload, thunkApi) => {
        try {
            const deleteRes = await authService.deleteWhitelistProfile(payload);
            if (deleteRes) {
                message.success("Delete wish list successfully");
                thunkApi.dispatch(handleGetProfile());
            } else {
                throw false;
            }
        } catch (error) {
            const errorInfo = error?.response?.data;
            message.error("Delete wish list failed");
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
);