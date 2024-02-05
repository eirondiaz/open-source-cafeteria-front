import React from 'react'
import { Box, Typography } from '@mui/material'
import './side-drawer.scss'
//import { OverridableComponent } from '@mui/material/OverridableComponent'
import BasicTooltip from './Basic/BasicTooltip'
import BasicButton from './Basic/BasicButton'
import BasicIconButton from './Basic/BasicIconButton'

import { Colors } from '../styles/colors'

const DrawerItem = ({
  selected,
  onSelectDrawerItem,
  isExtendedDrawer,
  item,
}) => {
  const { label, Icon, countKey } = item

  const isSelected = selected === countKey

  const handleItemClick = (countKey) => {
    onSelectDrawerItem(countKey)
  }

  return (
    <Box className="app-drawer-item" key={countKey}>
      {isExtendedDrawer ? (
        <BasicTooltip
          title={
            <Typography sx={{ py: '4px', fontSize: 16, fontWeight: 530 }}>
              {'PRUEBA 2'}
            </Typography>
          }
          arrow={false}
          style={{
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            padding: '4px 14px',
            animation: 'zoom-in-zoom-out 2s ease infinite',
          }}
          placement="right"
        >
          <div style={{ width: '100%' }}>
            <BasicIconButton
              onClick={() => handleItemClick(label)}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '10px',
              }}
            >
              <Icon
                sx={{
                  color: isSelected ? Colors.white : Colors.accent,
                }}
              />
            </BasicIconButton>
          </div>
        </BasicTooltip>
      ) : (
        <BasicButton
          onClick={() => handleItemClick(countKey)}
          label={label}
          style={{
            width: '100%',
            justifyContent: 'flex-start',
          }}
          remix={isSelected ? 'contained' : 'text'}
          startIcon={
            <Icon
              className={
                isSelected ? 'app-drawer-icon-selected' : 'app-drawer-icon'
              }
            />
          }
        >
          <Typography
            sx={{
              color: isSelected ? Colors.white : Colors.accent,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              px: 0.5,
            }}
          >
            <span>{label}</span>
          </Typography>
        </BasicButton>
      )}
    </Box>
  )
}

export default DrawerItem
