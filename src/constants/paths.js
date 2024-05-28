const PRODUCTS_PATH = "/products";
const PROFILE_PATH = "/profile";
const PROFILE_ORDER = "profile/order";
const PROFILE_ADDRESS = "profile/address";
const PROFILE_WISHLIST = "profile/wishlist";
const PROFILE_CHANGE_PASS = "profile/change-password";
const BLOG_PATH = "/blog";
const PATHS = {
    HOME: "/",
    PRODUCTS: PRODUCTS_PATH,
    PRODUCTS_DETAIL: PRODUCTS_PATH + "/:slug",
    CART: "/cart",
    CHECKOUT: "/checkout",
    CHECKOUT_SUCCESS: "/checkout_success",
    DASHBOARD: "/dashboard",
    FAQ: "/faq",
    PAYMENT_METHOD: "/payment_method",
    PRIVATE_POLICY: "/private_policy",
    RETURN: "/return",
    SHIPPING: "/shipping",
    PROFILE: {
        INDEX: PROFILE_PATH,
        PROFILE_ORDER: PROFILE_ORDER,
        PROFILE_WISHLIST: PROFILE_WISHLIST,
        PROFILE_ADDRESS: PROFILE_ADDRESS,
        PROFILE_CHANGE_PASS: PROFILE_CHANGE_PASS,
    },
    BLOG: "/blog",
    BLOG_DETAIL: BLOG_PATH + "/:slug",
    CONTACT: "/contact",
    ABOUT: "/about",
};

export default PATHS;