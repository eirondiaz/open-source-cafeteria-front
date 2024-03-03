import { Box, OutlinedInput } from '@mui/material'
import BasicLabel from './BasicLabel'
import React from 'react'
import { generateStyle } from '../shared-components'

const BasicInput = ({
  label,
  type = 'text',
  style,
  sx,
  remix = 'solid',
  className,
  labelStyle,
  formRegister,
  ...props
}) => {
  return (
    <Box sx={{ width: '100%', ...style }}>
      {label ? (
        <BasicLabel
          required={props?.required}
          label={label}
          remix={remix}
          style={labelStyle}
        />
      ) : null}
      <OutlinedInput
        className={`soft-transition ${className}`}
        sx={{
          borderRadius: '6px',
          ...generateStyle(remix, 'input'),
          ...sx,
          width: '100%',
          // pr: "0",
        }}
        type={type}
        //type={showPassword ? 'text' : type}
        // endAdornment={
        //   type === 'password' ? (
        //     <PasswordAdornment
        //       showPassword={showPassword}
        //       setShowPassword={setShowPassword}
        //     />
        //   ) : null
        // }
        {...props}
        {...formRegister}
      />
    </Box>
  )
}

export default BasicInput
