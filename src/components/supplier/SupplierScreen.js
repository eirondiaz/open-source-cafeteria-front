import { Add } from '@mui/icons-material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BasicIconButton from '../../shared/Basic/BasicIconButton'
import BasicModal from '../../shared/Basic/BasicModal'
import SupplierForm from './SupplierForm'
import SupplierTable from './SupplierTable'

const SupplierScreen = () => {
  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState('add')
  const [editData, setEditData] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const selectedSupplier = (mt, camp) => {
    setModalType(mt)
    setEditData(camp)
    setIsEditing(true)
  }

  const getSuppliers = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(
        'https://cafeteria-op-src-api.onrender.com/api/suppliers'
      )
      setData(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  // const modalOptions = {
  //   add: {
  //     title: 'Agregar campus',
  //     modal: <CampusForm setOpen={setOpen} setRefresh={setRefresh} />,
  //   },
  //   // delete: {
  //   //   title: 'Eliminar campus',
  //   //   modal: (
  //   //     <DeleteForm campus={campus} setOpen={setOpen} setRefresh={setRefresh} />
  //   //   ),
  //   // },
  //   edit: {
  //     title: 'Editar campus',
  //     modal: <CampusForm supplier={supplier} />,
  //   },
  // }

  useEffect(() => {
    getSuppliers()
  }, [refresh])

  return (
    <Box
      container
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingX: 7,
        paddingTop: 2,
        paddingBottom: 10,
        //alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <h2>Gestión de Proveedores</h2>
        <BasicIconButton
          onClick={() => {
            setModalType('add')
            setOpen(true)
          }}
          title={'Agregar'}
        >
          <Add sx={{ color: 'white' }} />
        </BasicIconButton>
      </Box>
      <SupplierTable
        data={data}
        isLoading={isLoading}
        setOpen={setOpen}
        selectedSupplier={selectedSupplier}
        setRefresh={setRefresh}
      />
      <BasicModal
        open={open}
        onClose={() => {
          setOpen(false)
          setEditData({})
          setIsEditing(false)
        }}
        title={isEditing ? 'Editar' : 'Crear'}
      >
        <SupplierForm
          element={editData}
          isEditing={isEditing}
          setOpen={setOpen}
          setRefresh={setRefresh}
          setEditData={setEditData}
          setIsEditing={setIsEditing}
        />
      </BasicModal>
    </Box>
  )
}

export default SupplierScreen
