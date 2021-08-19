import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

function PaginationTable(props) {
    const {pagination,onPageChange} = props


    const { page,max,limit } = pagination;
    const handleChange =(event,value)=>{
        if(onPageChange){
            return onPageChange(value)
        }
    }
    const soTrang = Math.ceil(max/limit)
    return (
        <div>
            <Pagination 
                count={soTrang}
                page={page}
                color="secondary"
                onChange = {handleChange}
             />
        </div>
    );
}

export default PaginationTable;