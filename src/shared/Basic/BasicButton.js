import React from 'react'
import './basic-style.scss'
import CircularProgress from '@mui/material/CircularProgress'
import { Button, ButtonProps } from '@mui/material'
import { generateStyle } from '../shared-components'

const BasicButton = ({
  label,
  style,
  remix = 'contained',
  disabled,
  custom,
  children,
  className,
  isLoading,
  hidden,
  ...props
}) => {
  return (
    <Button
      disableRipple
      disableElevation
      disabled={disabled}
      sx={{
        color: '#FFFFFF',
        paddingX: '1em',
        borderRadius: '6px',
        paddingY: 1,
        textTransform: 'inherit',
        backgroundColor: '#efefef',
        ...generateStyle(remix || custom, 'iconButton'),
        ...style,
      }}
      className={`soft-transition ${className}`}
      {...props}
    >
      {children || label}
      {isLoading && <CircularProgress sx={{ ml: 2 }} size={20} />}
    </Button>
  )
}

export default BasicButton
