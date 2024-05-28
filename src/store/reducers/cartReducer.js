import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cartService } from "../../services/cartService";
import { message } from 'antd';
import { sumArrayNumber } from "../../utils/calculate";
import { authService } from "../../services/authService";

const initialState = {
    cartInfo: {},
    cartLoading: false
};

export const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        updateCacheCart: (state, action) => {
            state.cartInfo = action.payload || state.cartInfo;
        },
        clearCart: (state) => {
            state.cartInfo = {};
        },
    },
    extraReducers: (builder) => {
        // get cart
        builder.addCase(handleGetCart.pending, (state) => {
            state.cartLoading = true;
        });
        builder.addCase(handleGetCart.fulfilled, (state, action) => {
            state.cartLoading = false;
            state.cartInfo = action.payload
        });
        builder.addCase(handleGetCart.rejected, (state) => {
            state.cartLoading = false;
            state.cartInfo = {};
        });
        // add cart
        builder.addCase(handleAddCart.pending, (state) => {
            state.cartLoading = true;
        });
        builder.addCase(handleAddCart.fulfilled, (state) => {
            state.cartLoading = false;
        });
        builder.addCase(handleAddCart.rejected, (state) => {
            state.cartLoading = false;
        });
        // remove cart
        builder.addCase(handleRemoveFromCart.pending, (state) => {
            state.cartLoading = true;
        });
        builder.addCase(handleRemoveFromCart.fulfilled, (state) => {
            state.cartLoading = false;
        });
        builder.addCase(handleRemoveFromCart.rejected, (state) => {
            state.cartLoading = false;
        });
        // update cart
        builder.addCase(handleUpdateCart.pending, (state) => {
            state.cartLoading = true;
        });
        builder.addCase(handleUpdateCart.fulfilled, (state) => {
            state.cartLoading = false;
        });
        builder.addCase(handleUpdateCart.rejected, (state) => {
            state.cartLoading = false;
        });


    },
});

// Extract the action creators object and the reducer
const { actions, reducer: cartReducer } = cartSlice;
// Extract and export each action creator by name
export const { updateCacheCart, clearCart } = actions;
// Export the reducer, either as a default or named export
export default cartReducer;

export const handleGetCart = createAsyncThunk(
    "cart/get",
    async (_, thunkApi) => {
        try {
            const cartRes = await cartService.getCart();
            return cartRes.data?.data;
        } catch (error) {
            thunkApi.rejectWithValue(error);
        }
    }

);

export const handleAddCart = createAsyncThunk(
    "cart/add",
    async (actionPayload, thunkApi) => {

        try {
            const { addedId, addedColor, addedQuantity, addedPrice } = actionPayload;

            const { cartInfo } = thunkApi.getState()?.cart || {};
            let addPayload = {};

            if (cartInfo.id) {
                const matchIndex = cartInfo.product?.findIndex(
                    (product) => product.id === addedId
                );
                //start clone data 
                const newProduct = cartInfo.product?.map((product) => {
                    return product.id
                });
                const newQuantity = [...(cartInfo.quantity ?? [])];
                const newVariant = [...(cartInfo.variant ?? [])];
                const newTotalProduct = [...(cartInfo.totalProduct ?? [])];

                const matchColorIndex = newVariant?.findIndex(color => color === addedColor)

                //end clone data 
                if (matchIndex > -1 && matchColorIndex > -1) {
                    newQuantity[matchColorIndex] = Number(newQuantity[matchColorIndex]) + Number(addedQuantity);
                    newVariant[matchColorIndex] = addedColor;
                    newTotalProduct[matchColorIndex] = Number(newTotalProduct[matchColorIndex]) + addedPrice * addedQuantity;
                } else {
                    newProduct.push(addedId);
                    newQuantity.push(addedQuantity);
                    newVariant.push(addedColor);
                    newTotalProduct.push(addedPrice * addedQuantity);
                }

                const newSubtotal =
                    newTotalProduct.reduce((curr, next) =>
                        Number(curr) + Number(next), 0) || 0;
                const newTotal = newSubtotal - cartInfo.discount;

                addPayload = {
                    ...cartInfo,
                    product: newProduct,
                    quantity: newQuantity,
                    variant: newVariant,
                    subTotal: newSubtotal,
                    total: newTotal,
                    totalProduct: newTotalProduct,
                };
            } else {
                addPayload = {
                    product: [addedId],
                    quantity: [addedQuantity],
                    variant: [addedColor],
                    totalProduct: [addedPrice * addedQuantity],
                    subTotal: addedPrice * addedQuantity,
                    total: addedPrice * addedQuantity,
                    discount: 0,
                    paymentMethod: "",
                };

            }
            const cartRes = await cartService.updateCart(addPayload);
            if (cartRes?.data?.data?.id) {
                thunkApi.dispatch(handleGetCart());
            }
            message.success("Add to cart successfully")
            return cartRes?.data?.data;

        } catch (error) {
            thunkApi.rejectWithValue(error);
            message.error("Add to cart failed");
        }
    }
);

export const handleRemoveFromCart = createAsyncThunk(
    "cart/removeProduct",
    async (actionPayload, thunkApi) => {
        const { removedIndex } = actionPayload || {};
        const { getState, dispatch, rejectWithValue } = thunkApi;
        const { cartInfo } = getState()?.cart || {};
        if (removedIndex < 0) return false;
        try {
            const newProduct = cartInfo.product?.filter((_, index) => index !== removedIndex).map((item) => item.id);
            const newQuantity = cartInfo.quantity?.filter((_, index) => index !== removedIndex);
            const newVariant = cartInfo.variant?.filter((_, index) => index !== removedIndex);
            const newTotalProduct = cartInfo.totalProduct?.filter((_, index) => index !== removedIndex);
            const newSubtotal = sumArrayNumber(newTotalProduct);
            const newTotal = newSubtotal - (cartInfo.discount ?? 0) + (cartInfo.shipping?.price ?? 0);

            const updatePayload = {
                ...cartInfo,
                product: newProduct,
                quantity: newQuantity,
                variant: newVariant,
                totalProduct: newTotalProduct,
                subTotal: newSubtotal,
                total: newTotal,
                shipping: newProduct?.length > 0 ? cartInfo.shipping : {},
                discount: newProduct?.length > 0 ? cartInfo.discount : 0
            };
            const cartRef = await cartService.updateCart(updatePayload);
            dispatch(handleGetCart());
            message.success("Remove from cart successfully");
            return cartRef?.data?.data;
        } catch (error) {
            rejectWithValue(error);
            message.error("Remove from cart failed")
        }
    }
)

export const handleUpdateCart = createAsyncThunk(
    "cart/update",
    async (actionPayload, thunkApi) => {
        const { dispatch, rejectWithValue } = thunkApi;
        try {
            const cartRes = await cartService.updateCart(actionPayload);
            dispatch(handleGetCart());
            message.success("Updated cart successfully");
            return cartRes?.data?.data;
        } catch (error) {
            rejectWithValue(error);
            message.error("Update cart failed!");
            throw error;
        }
    }
)
