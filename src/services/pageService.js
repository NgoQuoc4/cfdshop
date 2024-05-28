import axiosInstance from "../utils/axiosInstance"

export const pageService = {
    getPageData(query) {
        return axiosInstance.get(`/pages/${query}`)
    },
    getPageDataByName(name, query = "") {
        return axiosInstance.get(`/pages/${name}${query}`)
    },
}