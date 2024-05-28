import React, { useMemo } from 'react'
import styled from 'styled-components';

const PAGE_STEP = 1;

const Pagination = ({ page, limit = 0, total = 0, onPagiChange }) => {
    const totalPage = useMemo(() => {
        if (!limit || !total) {
            return 1;
        }
        return Math.ceil(Number(total) / Number(limit)) || 1;
    }, [limit, total])

    const pageList = useMemo(() => {
        let start = page - PAGE_STEP;
        let end = page + PAGE_STEP;

        if (start <= 0) {
            start = 1;
            end = start + PAGE_STEP * 2;
            if (end > totalPage) {
                end = totalPage;
            }
        }

        if (end >= totalPage) {
            end = totalPage;
            start = end - PAGE_STEP * 2;
            if (start < 1) {
                start = 1;
            }
        }

        const list = [];
        for (let index = start; index < end + 1; index++) {
            list.push(index);
        }
        return list;
    }, [page, totalPage])
    // next
    const onNext = () => {
        const nextPage = page + 1;
        if (nextPage <= totalPage) {
            onPagiChange(nextPage)
        }
    }
    // prev
    const onPrev = () => {
        const prevPage = page - 1;
        if (prevPage <= totalPage) {
            onPagiChange(prevPage)
        }
    }
    // first
    const onFirst = () => {
        onPagiChange(1);
    }
    // last
    const onLast = () => {
        onPagiChange(totalPage);
    }



    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <PagiItem isDisabled={page === 1} onClick={onPrev}>
                    <span aria-hidden="true">
                        <i className="icon-long-arrow-left"></i>
                    </span>
                    Prev
                </PagiItem>
                <PagiItem isDisabled={pageList[0] === 1} onClick={onFirst}>
                    First
                </PagiItem>
                {pageList?.length > 0 &&
                    pageList.map((pageNumb) => (
                        <PagiItem
                            key={pageNumb}
                            isActive={pageNumb === page}
                            onClick={() => {
                                onPagiChange(pageNumb);
                            }}
                        >
                            {pageNumb}
                        </PagiItem>
                    ))
                }
                <PagiItem className="page-item-total">of {totalPage}</PagiItem>
                <PagiItem
                    isDisabled={pageList[pageList.length - 1] === totalPage}
                    onClick={onLast}
                >
                    Last
                </PagiItem>
                <PagiItem
                    isDisabled={pageList[pageList.length - 1] === page}
                    onClick={onNext}
                >
                    Next
                    <span aria-hidden="true">
                        <i className="icon-long-arrow-right"></i>
                    </span>
                </PagiItem>
            </ul>
        </nav>
    )
}

const PagiItem = ({
    children,
    isActive = false,
    isDisabled = false,
    className = "",
    onClick,
    ...props
}) => {
    return (
        <PagiItemWrapper
            className={`page-item ${className} ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`}
            onClick={() => (isDisabled ? {} : onClick())}
            {...props}
        >
            <a className="page-link" role="button">{children}</a>
        </PagiItemWrapper>
    )
}


const PagiItemWrapper = styled.li`
    margin: 0 10px;
    cursor: pointer;
    .page-link {
    &:hover {
        color: #fcb941 !important;
    }
    display: flex;
    gap: 10px;
  }
`;

export default Pagination