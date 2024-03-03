import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import BasicDialog from '../../shared/Basic/BasicDialog'
import BasicIconButton from '../../shared/Basic/BasicIconButton'
import Table from '../../shared/Table'

const ItemTable = (props) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedData, setSelectedData] = useState({})

  const onDelete = async () => {
    try {
      await axios.delete(
        `https://cafeteria-op-src-api.onrender.com/api/items/${selectedData.id}`
      )
      props.setRefresh((prevVal) => !prevVal)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: 'Descripcion',
      selector: (data) => data.description,
      width: 130,
    },
    {
      name: 'Marca',
      selector: (data) => data?.brandId?.description || '',
      width: 130,
    },
    {
      name: 'Costo',
      selector: (data) => data.cost,
      width: 130,
    },
    {
      name: 'Suplidor',
      selector: (data) => data?.supplierId?.comercialName || '',
      width: 130,
    },
    {
      name: 'Existencia',
      selector: (data) => data.stock,
      width: 130,
    },
    {
      name: 'Fecha creación',
      selector: (data) => data.createdAt,
      width: 130,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <>
          <BasicIconButton
            remix="text"
            onClick={() => {
              props.selectedData('edit', row)
              props.setOpen(true)
            }}
            title={'Editar'}
          >
            <EditOutlined />
          </BasicIconButton>
          <BasicIconButton
            remix="text"
            onClick={() => {
              setSelectedData(row)
              setOpenDialog(true)
              // return (
              //   <BasicDialog
              //     title={'Estas seguro que desas eliminar el campus '}
              //     open={true}
              //   />
              // )
            }}
            title={'Eliminar'}
          >
            <DeleteOutline />
          </BasicIconButton>
        </>
      ),
      width: 130,
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Table
        columns={columns}
        data={props.data}
        hidePagination
        fixedHeader
        progressPending={props.isLoading}
      />
      <BasicDialog
        target={'delete'}
        title={`Estas seguro que desas eliminar la marca ${selectedData.description}`}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        onAccept={() => onDelete()}
      />
    </Box>
  )
}

export default ItemTable
