import axiosInstance from "../utils/axiosInstance"

export const orderServices = {
    getVoucher(id = "") {
        return axiosInstance.get(`/orders/voucher/${id}`);
    },
    getOrders(query = "") {
        return axiosInstance.get(`/orders/me${query}`);
    },
    getOrdersById(id = "") {
        return axiosInstance.get(`/orders/${id}/me`);
    },
    checkout(payload = {}) {
        return axiosInstance.post(`/orders`, payload);
    },
}
