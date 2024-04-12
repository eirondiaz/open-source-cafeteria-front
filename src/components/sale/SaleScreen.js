import { Add } from '@mui/icons-material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BasicIconButton from '../../shared/Basic/BasicIconButton'
import BasicModal from '../../shared/Basic/BasicModal'
import SaleTable from './SaleTable'
import SaleForm from './SaleForm'

const SaleScreen = () => {
  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState('add')
  const [editData, setEditData] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const selectedData = (mt, camp) => {
    setModalType(mt)
    setEditData(camp)
    setIsEditing(true)
  }

  const getCafeterias = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(
        'https://cafeteria-op-src-api.onrender.com/api/sales'
      )
      setData(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCafeterias()
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
        <h2>Gestión de Ventas</h2>
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
      <SaleTable
        data={data}
        isLoading={isLoading}
        setOpen={setOpen}
        selectedData={selectedData}
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
        <SaleForm
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

export default SaleScreen
