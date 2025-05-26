import { useState, useMemo } from "react";

const usePagination = (data = [], itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(
        () => Math.ceil(data.length / itemsPerPage),
        [data.length, itemsPerPage]
    );

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    }, [data, currentPage, itemsPerPage]);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const nextPage = () => goToPage(currentPage + 1);
    const prevPage = () => goToPage(currentPage - 1);

    const resetPage = () => setCurrentPage(1);

    return {
        currentPage,
        totalPages,
        currentData,
        goToPage,
        nextPage,
        prevPage,
        setCurrentPage,
        resetPage,
    };
};

export default usePagination;