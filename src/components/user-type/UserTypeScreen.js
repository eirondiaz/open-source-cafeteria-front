import { Add } from '@mui/icons-material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BasicIconButton from '../../shared/Basic/BasicIconButton'
import BasicModal from '../../shared/Basic/BasicModal'
import UserTypeForm from './UserTypeForm'
import UserTypeTable from './UserTypeTable'

const UserTypeScreen = () => {
  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState('add')
  const [editData, setEditData] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const selectedUserType = (mt, camp) => {
    setModalType(mt)
    setEditData(camp)
    setIsEditing(true)
  }

  const getUserTypes = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(
        'https://cafeteria-op-src-api.onrender.com/api/user-types'
      )
      setData(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserTypes()
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
        <h2>Gestión de Tipos de Usuarios</h2>
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
      <UserTypeTable
        data={data}
        isLoading={isLoading}
        setOpen={setOpen}
        selectedSupplier={selectedUserType}
        setRefresh={setRefresh}
      />
      <BasicModal
        open={open}
        onClose={() => {
          setOpen(false)
          setEditData({})
          setIsEditing(false)
        }}
        title={'PRUEBAAA'}
      >
        <UserTypeForm
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

export default UserTypeScreen
