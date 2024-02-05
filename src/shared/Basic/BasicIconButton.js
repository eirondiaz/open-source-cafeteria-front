import React from 'react'
import { IconButton, IconButtonProps } from '@mui/material'
import BasicTooltip from './BasicTooltip.js'
import './basic-style.scss'
import { generateStyle } from '../shared-components.js'
import { Colors } from '../../styles/colors.js'

const BasicIconButton = ({
  style,
  remix = 'contained',
  custom,
  children,
  title,
  titlePlacement,
  tooltipOptions,
  disabled,
  className,
  tooltipProps,
  hidden,
  ...props
}) => {
  if (hidden) return null
  if (disabled) {
    remix = 'disabled'
  }

  return (
    <IconButton
      sx={{
        color: Colors.black,
        borderRadius: '6px',
        paddingY: 1,
        textTransform: 'inherit',
        backdropFilter: 'blue',
        ...generateStyle(remix || custom, 'iconButton'),
        ...style,
      }}
      className={`soft-transition ${className}`}
      disabled={disabled}
      {...props}
    >
      <BasicTooltip
        followCursor={tooltipOptions?.followCursor || false}
        accent={tooltipOptions?.tooltipAccent || custom || '#000000'}
        title={title}
        placement={titlePlacement || 'bottom'}
        {...tooltipProps}
      >
        {children}
      </BasicTooltip>
    </IconButton>
  )
}

export default BasicIconButton
