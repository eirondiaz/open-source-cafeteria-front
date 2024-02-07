import { CircularProgress, FormControl, Select } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { generateStyle } from '../shared-components'
import BasicLabel from './BasicLabel'

const BasicSelect = ({
  remix = 'solid',
  children,
  labelStyle,
  style,
  sx,
  formRegister,
  isLoading,
  ...props
}) => {
  return (
    <Box
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', ...style }}
    >
      <BasicLabel
        required={props?.required}
        label={props?.label}
        remix={remix}
        style={labelStyle}
      />
      <FormControl fullWidth>
        <Select
          sx={{
            ...generateStyle(remix, 'select'),
            ...style,
            ...sx,
            width: '100%',
          }}
          // renderValue={(value) => value.name}
          {...props}
          {...formRegister}
          startAdornment={
            isLoading ? (
              <Box>
                <CircularProgress color="inherit" size={20} />
              </Box>
            ) : null
          }
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  )
}

export default BasicSelect
