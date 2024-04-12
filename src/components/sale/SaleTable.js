import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import BasicDialog from '../../shared/Basic/BasicDialog'
import BasicIconButton from '../../shared/Basic/BasicIconButton'
import Table from '../../shared/Table'

const SaleTable = (props) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState({})

  const onDelete = async () => {
    try {
      await axios.delete(
        `https://cafeteria-op-src-api.onrender.com/api/sales/${selectedRecord.id}`
      )
      props.setRefresh((prevVal) => !prevVal)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: 'No. Factura',
      selector: (campus) => campus?.id,
      width: 130,
    },
    {
      name: 'Empleado',
      selector: (campus) => campus.employeeId.name,
      width: 130,
    },
    {
      name: 'Articulo',
      selector: (campus) => campus.itemId.description,
      width: 130,
    },
    {
      name: 'Usuario',
      selector: (campus) => campus.userId.name,
      width: 130,
    },
    {
      name: 'Fecha venta',
      selector: (campus) => campus.createdAt,
      width: 130,
    },
    {
      name: 'Monto del articulo',
      selector: (campus) => campus.itemId.cost,
      width: 130,
    },
    {
      name: 'Fecha creación',
      selector: (campus) => campus.createdAt,
      width: 130,
    },
    {
      name: 'Unidades vendidas',
      selector: (campus) => campus.units,
      width: 130,
    },
    {
      name: 'Comentario',
      selector: (campus) => campus.comment,
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
              setSelectedRecord(row)
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
        title={`Estas seguro que desas eliminar la venta ${
          selectedRecord.description || ''
        }`}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        onAccept={() => onDelete()}
      />
    </Box>
  )
}

export default SaleTable
