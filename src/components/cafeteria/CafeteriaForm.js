import { SaveOutlined } from '@mui/icons-material'
import { Box, MenuItem } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BasicButton from '../../shared/Basic/BasicButton'
import BasicInput from '../../shared/Basic/BasicInput'
import BasicSelect from '../../shared/Basic/BasicSelect'
import { Colors } from '../../styles/colors'

const CafeteriaForm = ({
  setOpen,
  setRefresh,
  element = {},
  //setElement,
  isEditing,
  setIsEditing,
  setEditData,
  //query,
  format,
}) => {
  const [newElement, setNewElement] = useState(element)
  const [isLoading, setIsLoading] = useState(false)
  const [campusList, setCampusList] = useState([])
  const [isLoadingCampus, setIsLoadingCampus] = useState(false)
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

  const getCampus = async () => {
    setIsLoadingCampus(true)
    try {
      const res = await axios.get(
        'https://cafeteria-op-src-api.onrender.com/api/campus'
      )
      setCampusList(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingCampus(false)
    }
  }

  const create = async () => {
    try {
      await axios.post(
        'https://cafeteria-op-src-api.onrender.com/api/cafeterias',
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
        `https://cafeteria-op-src-api.onrender.com/api/cafeterias/${element.id}`,
        newElement
      )
      setEditData({})
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsEditing(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setNewElement(element)
    getCampus()
  }, [])

  return (
    <Box>
      <BasicInput
        label={'Descripción'}
        required
        name="description"
        //disabled={query === 'exchangeRate'}
        defaultValue={newElement?.description || ''}
        onChange={handleInputChange}
      />
      <BasicSelect
        name="campusId"
        label={'Campus'}
        defaultValue={newElement?.campusId || ''}
        onChange={handleInputChange}
        isLoading={isLoadingCampus}
        // formRegister={{
        //   ...register('warehouseId', { required: true }),
        // }}
        //style={{ maxWidth: isClosed ? '100%' : '57%' }}
      >
        {campusList?.map((campus) => (
          <MenuItem key={campus.id} value={campus.id}>
            {campus.description}
          </MenuItem>
        ))}
      </BasicSelect>
      <BasicInput
        label={'Encargado'}
        required
        name="encargado"
        //disabled={query === 'exchangeRate'}
        defaultValue={newElement?.encargado || ''}
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

export default CafeteriaForm
