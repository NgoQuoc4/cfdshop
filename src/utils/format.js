
import moment from "moment";
import { TIME_DISPLAYS } from "../constants/format-date";

// ---- Format number to display currency ----//
export const formatCurrency = (data, type = "vi-VN") => {
    if (!data) return 0;
    return data.toLocaleString(type);
};

// ---- Format date to display with format ----//
export const formatDate = (date, format = TIME_DISPLAYS.DATE) => {
    if (!!!date) return "";
    return moment(date).format(format);
};
export const formatDateNow = (date) => {
    if (!!!date) return "";
    return moment(date).fromNow();
};

// transform 0 - 1 to percent  100%
export const transformNumberToPercent = (number) => {
    if (!number) return 0;
    return number * 100;
}


export const removeAccents = (str) => {
    var AccentsMap = [
        "àáãảạăằắẳẵặâầấẩẫậ",
        "èéẻẽẹêềếểễệ",
        "đ",
        "ùúủũụưừứửữự",
        "òóỏõọôồốổỗộơờớởỡợ",
        "ìíỉĩịäëïîöüûñç",
        "ýỳỹỵỷ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
}

// export const getImageURL = (data) =>``