import { Box, Grid, Modal, Paper, Slide, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Colors } from '../../styles/colors'
import './basic-style.scss'
import React from 'react'

const BasicModal = ({
  children,
  title,
  description,
  open,
  className,
  showCloseButton = true,
  onClose,
  paperProps,
  titleStyle,
  ...props
}) => {
  return (
    <Modal
      open={!!open}
      onClose={onClose}
      className={`modalContainer ${className}`}
      disableEnforceFocus
      disableAutoFocus
      sx={{
        '&:focus': {
          outline: 'none !important',
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none !important',
        zIndex: 2,
      }}
      {...props}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          className="paperContainer"
          style={{ maxWidth: 1100 }}
          sx={{
            width: '600px',
            maxHeight: '90vh !important',
            borderRadius: '4px !important',
          }}
          {...paperProps}
        >
          <Grid container style={{ width: '100%', maxHeight: '90vh' }}>
            {(title || showCloseButton) && (
              <Box
                sx={{
                  height: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  '& .closeButton': {
                    cursor: 'pointer',
                  },
                  width: '100% !important',
                  paddingX: '20px',
                  paddingY: '8px',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: title ? 'space-between' : 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  {title ? (
                    <Typography
                      className="title"
                      sx={{
                        color: Colors.accent,
                        fontWeight: 'bold',
                        fontSize: '24px !important',
                        ...titleStyle,
                      }}
                    >
                      {title}
                    </Typography>
                  ) : null}
                  {showCloseButton && (
                    <Close className="closeButton" onClick={onClose} />
                  )}
                </Box>
                {description ? (
                  <Box sx={{ width: '100%', mt: 1 }}>
                    <Typography
                      className="title"
                      sx={{
                        color: Colors.black,
                        fontSize: '14px !important',
                        ...titleStyle,
                      }}
                    >
                      {description}
                    </Typography>
                  </Box>
                ) : null}
              </Box>
            )}
            <Box sx={{ padding: '20px !important', width: '100%' }}>
              {children}
            </Box>
          </Grid>
        </Paper>
      </Slide>
    </Modal>
  )
}

export default BasicModal
