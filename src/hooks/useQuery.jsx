import { useEffect, useState } from "react";

const useQuery = (promise, dependencies = [], options = {}) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        if (options.preventInitialCall) return;
        fetchData();
    }, dependencies);

    const fetchData = async (query) => {
        setLoading(true);
        try {
            const res = await promise(query);
            setData(res.data?.data || []);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        refetch: fetchData,
    };
};

export default useQuery;





