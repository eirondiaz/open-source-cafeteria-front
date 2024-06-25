import React, { useState } from 'react'
import { Grid } from '@mui/material'
import SideDrawer from './SideDrawer'
import CampusScreen from '../components/campus/CampusScreen'
import SupplierScreen from '../components/supplier/SupplierScreen'
import UserTypeScreen from '../components/user-type/UserTypeScreen'
import CafeteriaScreen from '../components/cafeteria/CafeteriaScreen'
import BrandScreen from '../components/brand/BrandScreen'
import ItemScreen from '../components/item/ItemScreen'
import EmployeeScreen from '../components/employee/EmployeeScreen'
import SaleScreen from '../components/sale/SaleScreen'
import UserScreen from '../components/user/UserScreen'
import Login from '../components/Auth/AuthScreen'
import Register from '../components/Auth/RegisterScreen'

const Layout = () => {
  const [selectedItem, setSelectedItem] = useState('login')

  return (
    <Grid container sx={{ height: '100%' }}>
      {selectedItem == 'login' ? (
        <Login setSelectedItem={setSelectedItem} />
      ) : selectedItem == 'register' ? (
        <Register setSelectedItem={setSelectedItem} />
      ) : (
        <>
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
              {selectedItem == 'cafeteria' ? (
                <CafeteriaScreen />
              ) : selectedItem == 'campus' ? (
                <CampusScreen />
              ) : selectedItem == 'supplier' ? (
                <SupplierScreen />
              ) : selectedItem == 'brand' ? (
                <BrandScreen />
              ) : selectedItem == 'user' ? (
                <UserScreen />
              ) : selectedItem == 'item' ? (
                <ItemScreen />
              ) : selectedItem == 'employee' ? (
                <EmployeeScreen />
              ) : selectedItem == 'sale' ? (
                <SaleScreen />
              ) : (
                <UserTypeScreen />
              )}
              {/* <LayoutComponent /> */}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default Layout
