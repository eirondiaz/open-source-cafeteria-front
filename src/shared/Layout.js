import React, { useState } from 'react'
import { Grid } from '@mui/material'
import SideDrawer from './SideDrawer'
import CampusScreen from '../components/campus/CampusScreen'
import SupplierScreen from '../components/supplier/SupplierScreen'
import UserTypeScreen from '../components/user-type/UserTypeScreen'

const Layout = () => {
  const [selectedItem, setSelectedItem] = useState('campus')

  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid
        item
        sx={{
          zIndex: '9999',
          display: { xs: 'none', md: 'inherit' },
          transition: 'all 0.3s ease-in-out',
        }}
        xs={2}
      >
        <SideDrawer
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          isExtendedDrawer={false}
        />
      </Grid>
      <Grid
        item
        xs={10}
        sx={{
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Grid container spacing={0}>
          {/* <Grid item xs={12}>
            <p>Prueba</p>
            <AdminHeader xs={!isExtendedDrawer ? 11.4 : 10.2} />
          </Grid> */}
          {selectedItem == 'campus' ? (
            <CampusScreen />
          ) : selectedItem == 'supplier' ? (
            <SupplierScreen />
          ) : (
            <UserTypeScreen />
          )}
          {/* <LayoutComponent /> */}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Layout
