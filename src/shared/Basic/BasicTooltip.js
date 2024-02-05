import React from 'react'
import './basic-style.scss'
import { Tooltip, TooltipProps } from '@mui/material'

const BORDER_RADIUS = {
  top: '4px 4px 0px 0px',
  bottom: '0px 0px 4px 4px',
  right: '0px 4px 4px 0px',
  left: '4px 0px 0px 4px',
}

const BasicTooltip = ({
  accent,
  placement = 'bottom',
  children,
  arrow = true,
  style,
  className,
  ...props
}) => {
  return (
    <Tooltip
      componentsProps={{
        arrow: {
          sx: {
            color: accent || "#0000000",
          },
        },
        popper: {
          sx: {
            '& .MuiTooltip-tooltip': {
              color: 'white',
              borderRadius: BORDER_RADIUS[placement] || '4px 4px 0px 0px',
              backgroundColor: accent || "#000000",
              fontSize: '12px',
              ...style,
            },
          },
        },
      }}
      placement={placement}
      className={`soft-transition ${className}`}
      arrow={arrow}
      {...props}
    >
      {children}
    </Tooltip>
  )
}

export default BasicTooltip
