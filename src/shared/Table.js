import { Checkbox } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import DataTable from 'react-data-table-component'

const Table = ({
  columns,
  data = [],
  paginationProps,
  reverse,
  title,
  cellStyle,
  maxHeight,
  hidePagination,
  isLoading,
  ...props
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: `column${reverse ? '-reverse' : ''}`,
      }}
    >
      <DataTable
        columns={columns}
        data={data}
        title={title}
        theme="co-products"
        selectableRowsComponent={Checkbox}
        striped
        highlightOnHover
        noDataComponent={
          <Box sx={{ padding: 4, borderRadius: '6px' }}>
            No hay información para mostrar 😢
          </Box>
        }
        customStyles={{
          table: {
            style: {
              maxHeight: maxHeight || '600px !important',
            },
          },
          headCells: {
            style: {
              fontSize: '14px',
              minHeight: '56px',
              paddingRight: '8px',
            },
          },
          cells: {
            style: {
              fontSize: '14px',
              width: '100%',
              ...cellStyle,
            },
          },
        }}
        {...props}
      />
      {paginationProps && !hidePagination ? (
        <Box
          sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
        >
          {/* <BasicPagination {...paginationProps} /> */}
        </Box>
      ) : null}
    </Box>
  )
}

export default Table
