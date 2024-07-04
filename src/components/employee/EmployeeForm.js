import { SaveOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import BasicButton from '../../shared/Basic/BasicButton'
import BasicInput from '../../shared/Basic/BasicInput'
import { Colors } from '../../styles/colors'

const EmployeeForm = ({
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
  const [isValidCedula, setIsValidCedula] = useState('')
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
  const onSubmit = async () => {
    const isValid = validaCedula(newElement?.cedula || '')
    console.log(isValid)
    setIsValidCedula(isValid)
    if (!isValid) return
    isEditing ? update() : create()
  }

  function validaCedula(pCedula) {
    console.log(pCedula)
    let vnTotal = 0
    let vcCedula = pCedula.replace(/-/g, '')
    let pLongCed = vcCedula.trim().length
    let digitoMult = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1]

    if (pLongCed !== 11) {
      return false
    }

    for (let vDig = 1; vDig <= pLongCed; vDig++) {
      let vCalculo =
        parseInt(vcCedula.substring(vDig - 1, vDig)) * digitoMult[vDig - 1]
      if (vCalculo < 10) {
        vnTotal += vCalculo
      } else {
        vnTotal +=
          parseInt(vCalculo.toString().substring(0, 1)) +
          parseInt(vCalculo.toString().substring(1, 1))
      }
    }

    return vnTotal % 10 === 0
  }

  const create = async () => {
    try {
      await axios.post(
        'https://cafeteria-op-src-api.onrender.com/api/employees',
        newElement
      )
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsEditing(false)
      setIsLoading(false)
      setIsValidCedula('')
    }
  }

  const update = async () => {
    try {
      await axios.put(
        `https://cafeteria-op-src-api.onrender.com/api/employees/${newElement.id}`,
        newElement
      )
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsEditing(false)
      setIsLoading(false)
      setIsValidCedula('')
    }
  }

  return (
    <Box>
      <BasicInput
        label={'Nombre'}
        required
        name="name"
        //disabled={query === 'exchangeRate'}
        defaultValue={element?.name || ''}
        onChange={handleInputChange}
      />
      <BasicInput
        label={'Cedula'}
        required
        name="cedula"
        //disabled={query === 'exchangeRate'}
        defaultValue={element?.cedula || ''}
        onChange={handleInputChange}
      />
      {isValidCedula === false && <p>Cedula Invalida</p>}
      <BasicInput
        label={'Tanda labor'}
        required
        name="workShift"
        //disabled={query === 'exchangeRate'}
        defaultValue={element?.workShift || ''}
        onChange={handleInputChange}
      />
      <BasicInput
        label={'Porciento comision'}
        required
        name="commissionPercentage"
        //disabled={query === 'exchangeRate'}
        defaultValue={element?.commissionPercentage || ''}
        onChange={handleInputChange}
      />
      <BasicInput
        label={'Fecha Ingreso'}
        required
        name="admissionDate"
        type="date"
        //disabled={query === 'exchangeRate'}
        defaultValue={element?.admissionDate || ''}
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

export default EmployeeForm
