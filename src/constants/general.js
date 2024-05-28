export const MODAL_TYPES = {
    login: 'login',
    register: 'register',
}
export const SORT_OPTIONS = {
    popularity: {
        value: "popularity",
        label: "Most Popular",
        queryObject: { orderBy: undefined, order: undefined },
    },
    pricelow: {
        value: "pricelow",
        label: "Price Low to High",
        queryObject: { orderBy: "price", order: "1" },
    },
    pricehigh: {
        value: "pricehigh",
        label: "Price Hight to Low",
        queryObject: { orderBy: "price", order: "-1" },
    },
    newest: {
        value: "newest",
        label: "Newest",
        queryObject: { orderBy: "createdAt", order: "-1" },
    },
    rating: {
        value: "rating",
        label: "Most Rated",
        queryObject: { orderBy: "rating", order: "-1" },
    },
};

export const SHIPPING_OPTIONS = [
    {
        value: "free",
        label: "Free shipping",
        price: 0,
    },
    {
        value: "standard",
        label: "Standard",
        price: 10,
    },
    {
        value: "express",
        label: "Express",
        price: 20,
    },
]

export const PAYMENT_METHODS = {
    cash: "cash",
    card: "card",
}