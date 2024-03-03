import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import BasicDialog from '../../shared/Basic/BasicDialog'
import BasicIconButton from '../../shared/Basic/BasicIconButton'
import Table from '../../shared/Table'

const EmployeeTable = (props) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedData, setSelectedData] = useState({})

  const onDelete = async () => {
    try {
      await axios.delete(
        `https://cafeteria-op-src-api.onrender.com/api/employees/${selectedData.id}`
      )
      props.setRefresh((prevVal) => !prevVal)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: 'Nombre',
      selector: (data) => data?.name || '',
      width: 130,
    },
    {
      name: 'Cedula',
      selector: (data) => data?.cedula || '',
      width: 130,
    },
    {
      name: 'Tanda labor',
      selector: (data) => data?.workShift || '',
      width: 130,
    },
    {
      name: 'Porciento comision',
      selector: (data) => data?.commissionPercentage || '',
      width: 130,
    },
    {
      name: 'Fecha admisión',
      selector: (data) => data?.admissionDate || '',
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
        title={`Estas seguro que desas eliminar la marca ${selectedData.name}`}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        onAccept={() => onDelete()}
      />
    </Box>
  )
}

export default EmployeeTable
