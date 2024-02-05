import { InputLabel } from '@mui/material'
import React from 'react'
import { Colors } from '../../styles/colors'
import { labelStyles } from '../shared-components'

const BasicLabel = ({ label, style, remix = 'solid', ...props }) => {
  return (
    <InputLabel
      sx={{
        '& .MuiFormLabel-asterisk': {
          color: Colors.mediumRed,
        },
        fontSize: '13px',
        textAlign: 'left',
        marginLeft: '3px',
        transition: 'all 0.2s linear',
        mb: 0.5,
        ...labelStyles[remix],
        ...style,
      }}
      {...props}
    >
      {label}
    </InputLabel>
  )
}

export default BasicLabel
