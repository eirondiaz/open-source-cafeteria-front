import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import React from 'react'
import BasicButton from './BasicButton'

const BasicDialog = ({
  open,
  handleClose,
  title,
  content,
  contentText,
  onAccept,
  hideActions,
  hideCancel,
  hideAccept,
  actions,
  cancelLabel,
  acceptLabel,
  target,
}) => {
  const onSubmit = () => {
    onAccept()
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>
        {content}
      </DialogContent>
      {!hideActions && (
        <DialogActions>
          {actions}
          {!hideCancel && (
            <BasicButton remix="contained" onClick={handleClose}>
              {cancelLabel || 'Cancelar'}
            </BasicButton>
          )}
          {!hideAccept && (
            <BasicButton
              onClick={onSubmit}
              autoFocus
              remix={target === 'delete' ? 'cancel' : 'contained'}
            >
              {acceptLabel || 'Aceptar'}
            </BasicButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default BasicDialog
