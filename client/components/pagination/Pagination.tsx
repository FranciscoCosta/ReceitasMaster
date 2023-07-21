import React from 'react';
import './Pagination.scss';

interface PaginationProps {
    cardsPerPage: number;
    totalCards: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}


const Pagination = ({ cardsPerPage, totalCards, setCurrentPage, currentPage }: PaginationProps) => {
    let pages: number[] = [];

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='Pagination'>
            <h2 className='Pagination__title'>Páginas</h2>
            <div className="Page_number">
                {pages.map((page, index) => {
                    return (
                        <button onClick={() => setCurrentPage(page)} key={index} className={`button__page ${currentPage === page ? "active-page" : ""}`}>
                            {page}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Pagination;