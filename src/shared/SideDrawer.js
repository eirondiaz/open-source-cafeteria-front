import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import './side-drawer.scss'
import DrawerItem from './DrawerItem'
import BasicButton from './Basic/BasicButton'

import GavelIcon from '@mui/icons-material/Gavel'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
//Users
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined'
//Master-data
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined'

const drawerItems = [
  {
    label: 'Campus',
    countKey: 'campus',
    Icon: GavelIcon,
    url: '',
    roles: ['superadmin', 'mazadmin'],
  },
  {
    label: 'Proveedores',
    countKey: 'supplier',
    Icon: StoreOutlinedIcon,
    url: '',
    roles: ['superadmin', 'mazadmin'],
  },
  {
    label: 'Tipos de usuarios',
    countKey: 'userType',
    Icon: LocalMallOutlinedIcon,
    url: '',
    roles: ['superadmin', 'mazadmin'],
  },

  // {
  //   label: 'users',
  //   countKey: 'user',
  //   Icon: GroupOutlinedIcon,
  //   url: '',
  //   roles: ['superadmin', 'mazadmin'],
  // },
  // {
  //   label: 'masterData',
  //   countKey: 'masterData',
  //   Icon: StorageRoundedIcon,
  //   url: '',
  //   roles: ['superadmin'],
  // },
  // {
  //   label: 'profits',
  //   countKey: 'profits',
  //   Icon: LeaderboardRoundedIcon,
  //   url: '',
  //   roles: ['superadmin'],
  // },
]

const SideDrawer = ({ isExtendedDrawer, selectedItem, setSelectedItem }) => {
  const onSelectDrawerItem = (item) => {
    if (!item) return
    setSelectedItem(item)
  }

  return (
    <Box className="app-drawer-container">
      <Box>
        <Typography
          sx={{ color: '#000000', textAlign: 'center', fontSize: 18 }}
        >
          <p>Cafeteria APEC</p>
        </Typography>
        <Box sx={{ mt: 8 }}>
          {drawerItems.map((item) => {
            const { children, label } = item
            return (
              <>
                <DrawerItem
                  onSelectDrawerItem={onSelectDrawerItem}
                  key={label}
                  selected={selectedItem}
                  setSelectedItem={setSelectedItem}
                  isExtendedDrawer={isExtendedDrawer}
                  item={item}
                />
              </>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default SideDrawer
