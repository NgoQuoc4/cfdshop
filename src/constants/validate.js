export const REGEX = {
    email: '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
    phone: "/(84|0[3|5|7|8|9])+([0-9]{8})\b/",
    password: "/^[a-zA-Z0-9!@#$%^&*]{6,16}$/",
}
export const MESSAGE = {
    required: "Please enter your information",
    email: "Please enter email with format abc@gmail.com",
    password: "Please enter password with format",
}