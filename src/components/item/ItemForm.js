import { SaveOutlined } from '@mui/icons-material'
import { Box, MenuItem } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BasicButton from '../../shared/Basic/BasicButton'
import BasicInput from '../../shared/Basic/BasicInput'
import BasicSelect from '../../shared/Basic/BasicSelect'
import { Colors } from '../../styles/colors'

const ItemForm = ({
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
  const [brandList, setBrandList] = useState([])
  const [isLoadingBrands, setIsLoadingBrands] = useState(false)
  const [supplierList, setSupplierList] = useState([])
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(false)
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
        'https://cafeteria-op-src-api.onrender.com/api/items',
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
        `https://cafeteria-op-src-api.onrender.com/api/items/${newElement.id}`,
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

  const getBrands = async () => {
    setIsLoadingBrands(true)
    try {
      const res = await axios.get(
        'https://cafeteria-op-src-api.onrender.com/api/brands'
      )
      setBrandList(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingBrands(false)
    }
  }

  const getSuppliers = async () => {
    setIsLoadingSuppliers(true)
    try {
      const res = await axios.get(
        'https://cafeteria-op-src-api.onrender.com/api/suppliers'
      )
      setSupplierList(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingSuppliers(false)
    }
  }

  useEffect(() => {
    getBrands()
    getSuppliers()
  }, [])

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
      <BasicSelect
        name="brandId"
        label={'Marcas'}
        defaultValue={newElement?.brandId || ''}
        onChange={handleInputChange}
        isLoading={isLoadingBrands}
        // formRegister={{
        //   ...register('warehouseId', { required: true }),
        // }}
        //style={{ maxWidth: isClosed ? '100%' : '57%' }}
      >
        {brandList?.map((data) => (
          <MenuItem key={data.id} value={data.id}>
            {data.description}
          </MenuItem>
        ))}
      </BasicSelect>
      <BasicSelect
        name="supplierId"
        label={'Suplidor'}
        defaultValue={newElement?.supplierId || ''}
        onChange={handleInputChange}
        isLoading={isLoadingSuppliers}
        // formRegister={{
        //   ...register('warehouseId', { required: true }),
        // }}
        //style={{ maxWidth: isClosed ? '100%' : '57%' }}
      >
        {supplierList?.map((data) => (
          <MenuItem key={data.id} value={data.id}>
            {data.comercialName}
          </MenuItem>
        ))}
      </BasicSelect>
      <BasicInput
        label={'Costo'}
        required
        name="cost"
        type="number"
        //disabled={query === 'exchangeRate'}
        defaultValue={element?.cost || ''}
        onChange={handleInputChange}
      />
      <BasicInput
        label={'Existencia'}
        required
        name="stock"
        type="number"
        //disabled={query === 'exchangeRate'}
        defaultValue={element?.stock || ''}
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

export default ItemForm
