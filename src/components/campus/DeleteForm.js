import { Box } from '@mui/system'
import axios from 'axios'
import React from 'react'
import BasicButton from '../../shared/Basic/BasicButton'
import BasicLabel from '../../shared/Basic/BasicLabel'
import { Colors } from '../../styles/colors'

const DeleteForm = ({ campus, setOpen, setRefresh }) => {
  const onSubmit = async () => {
    try {
      await axios.delete(
        `https://cafeteria-op-src-api.onrender.com/api/campus/${campus.id}}`
      )
      setOpen(false)
      setRefresh((prevVal) => !prevVal)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <BasicLabel
        label={`Estas seguro que desas eliminar el campus "${campus.description}"?`}
        style={{ fontSize: 18 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 8 }}>
        <BasicButton
          type="submit"
          //endIcon={<SaveOutlined />}
          style={{ color: Colors.white, display: 'inline-block' }}
          //disabled={isButtonDisabled || isLoading}
          //isLoading={isLoading}
          onClick={() => setOpen(false)}
        >
          {'Eliminar'}
        </BasicButton>
        <BasicButton
          type="submit"
          //endIcon={<SaveOutlined />}
          style={{
            color: Colors.white,
            backgroundColor: Colors.darkRed,
            display: 'inline-block',
          }}
          //disabled={isButtonDisabled || isLoading}
          //isLoading={isLoading}
          onClick={() => onSubmit()}
        >
          {'Cancelar'}
        </BasicButton>
      </Box>
    </Box>
  )
}

export default DeleteForm
