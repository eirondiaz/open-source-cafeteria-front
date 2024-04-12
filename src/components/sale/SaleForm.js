import { SaveOutlined } from '@mui/icons-material'
import { Box, MenuItem } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BasicButton from '../../shared/Basic/BasicButton'
import BasicInput from '../../shared/Basic/BasicInput'
import BasicSelect from '../../shared/Basic/BasicSelect'
import { Colors } from '../../styles/colors'

const SaleForm = ({
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
  const [employeeList, setEmployeeList] = useState([])
  const [itemList, setItemList] = useState([])
  const [userList, setUserList] = useState([])
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const [isLoadingItem, setIsLoadingItem] = useState(false)
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

  const getEmployees = async () => {
    setIsLoadingEmployee(true)
    try {
      const res = await axios.get(
        'https://cafeteria-op-src-api.onrender.com/api/employees'
      )
      setEmployeeList(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingEmployee(false)
    }
  }

  const getUsers = async () => {
    setIsLoadingUser(true)
    try {
      const res = await axios.get(
        'https://cafeteria-op-src-api.onrender.com/api/users'
      )
      setUserList(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingUser(false)
    }
  }

  const getItems = async () => {
    setIsLoadingItem(true)
    try {
      const res = await axios.get(
        'https://cafeteria-op-src-api.onrender.com/api/items'
      )
      setItemList(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingItem(false)
    }
  }

  const create = async () => {
    try {
      await axios.post(
        'https://cafeteria-op-src-api.onrender.com/api/sales',
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
        `https://cafeteria-op-src-api.onrender.com/api/sales/${newElement.id}`,
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
    getEmployees()
    getItems()
    getUsers()
  }, [])

  return (
    <Box>
      <BasicSelect
        name="employeeId"
        label={'Empleado'}
        defaultValue={newElement?.employeeId || ''}
        onChange={handleInputChange}
        isLoading={isLoadingEmployee}
      >
        {employeeList?.map((employee) => (
          <MenuItem key={employee.id} value={employee.id}>
            {employee.name}
          </MenuItem>
        ))}
      </BasicSelect>
      <BasicSelect
        name="itemId"
        label={'Articulo'}
        defaultValue={newElement?.itemId || ''}
        onChange={handleInputChange}
        isLoading={isLoadingItem}
      >
        {itemList?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item?.description}
          </MenuItem>
        ))}
      </BasicSelect>
      <BasicSelect
        name="userId"
        label={'Usuario'}
        defaultValue={newElement?.userId || ''}
        onChange={handleInputChange}
        isLoading={isLoadingUser}
      >
        {userList?.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user?.name}
          </MenuItem>
        ))}
      </BasicSelect>
      <BasicInput
        label={'Monto del articulo'}
        required
        name="cost"
        type="number"
        //disabled={query === 'exchangeRate'}
        defaultValue={newElement?.itemId?.cost || ''}
        onChange={handleInputChange}
      />
      <BasicInput
        label={'Unidades Vendidas'}
        required
        name="units"
        type="number"
        //disabled={query === 'exchangeRate'}
        defaultValue={newElement?.units || ''}
        onChange={handleInputChange}
      />
      <BasicInput
        label={'Comentario'}
        required
        name="comment"
        //disabled={query === 'exchangeRate'}
        defaultValue={newElement?.comment || ''}
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

export default SaleForm
