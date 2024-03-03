import { SaveOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import BasicButton from '../../shared/Basic/BasicButton'
import BasicInput from '../../shared/Basic/BasicInput'
import { Colors } from '../../styles/colors'

const BrandForm = ({
  setOpen,
  setRefresh,
  element = {},
  setIsEditing,
  //setElement,
  isEditing,
  //query,
  format,
}) => {
  const [newElement, setNewElement] = useState(element)
  const [isLoading, setIsLoading] = useState(false)
  // Handle the button disabled state based on the new element state
  const isButtonDisabled =
    Object.values(newElement)?.some((value) => !value) ||
    Object.values(newElement)?.some((value) => !value.toString().trim()) ||
    !Object.values(newElement)?.length

  // Handle the input change
  const handleInputChange = (event) => {
    const { name, value } = event.target

    setNewElement((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // Handle the form submit
  const onSubmit = async (element) => {
    isEditing ? update() : create()
  }

  const create = async () => {
    try {
      await axios.post(
        'https://cafeteria-op-src-api.onrender.com/api/brands',
        newElement
      )
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsEditing(false)
      setIsLoading(false)
    }
  }

  const update = async () => {
    try {
      await axios.put(
        `https://cafeteria-op-src-api.onrender.com/api/brands/${newElement.id}`,
        newElement
      )
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsEditing(false)
      setIsLoading(false)
    }
  }

  return (
    <Box>
      <BasicInput
        label={'Description'}
        required
        name="description"
        //disabled={query === 'exchangeRate'}
        defaultValue={element?.description || ''}
        onChange={handleInputChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <BasicButton
          type="submit"
          endIcon={<SaveOutlined />}
          style={{ color: Colors.white }}
          disabled={isButtonDisabled || isLoading}
          isLoading={isLoading}
          onClick={() => onSubmit(newElement)}
        >
          {'GUARDAR'}
        </BasicButton>
      </Box>
    </Box>
  )
}

export default BrandForm
