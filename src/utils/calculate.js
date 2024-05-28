export const sumArrayNumber = (arr, initialValue = 0) => {
    return (
        arr?.reduce(
            (curr, next) => Number(curr) + Number(next),
            initialValue
        ) || 0
    );
};