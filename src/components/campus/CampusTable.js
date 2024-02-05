import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BasicDialog from '../../shared/Basic/BasicDialog'
import BasicIconButton from '../../shared/Basic/BasicIconButton'
import Table from '../../shared/Table'

const CampusTable = (props) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCampus, setSelectedCampus] = useState({})

  const onDelete = async () => {
    try {
      await axios.delete(
        `https://cafeteria-op-src-api.onrender.com/api/campus/${selectedCampus.id}`
      )
      props.setRefresh((prevVal) => !prevVal)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: 'Descripcion',
      selector: (campus) => campus.description,
      width: 130,
    },
    {
      name: 'Fecha creación',
      selector: (campus) => campus.createdAt,
      width: 130,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <>
          <BasicIconButton
            remix="text"
            onClick={() => {
              props.selectedCampus('edit', row)
              props.setOpen(true)
            }}
            title={'Editar'}
          >
            <EditOutlined />
          </BasicIconButton>
          <BasicIconButton
            remix="text"
            onClick={() => {
              setSelectedCampus(row)
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
        title={`Estas seguro que desas eliminar el campus ${selectedCampus.description}`}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        onAccept={() => onDelete()}
      />
    </Box>
  )
}

export default CampusTable
