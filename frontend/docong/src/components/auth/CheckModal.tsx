import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'

interface CheckModalProps {
  isOpenCheckModal: boolean
  setIsOpenCheckModal: (isOpen: boolean) => void
  onClick: () => void
  title: string
  content: string
  leftButton: string
  rightButton: string
}

function CheckModal({
  isOpenCheckModal,
  setIsOpenCheckModal,
  onClick,
  title,
  content,
  leftButton,
  rightButton,
}: CheckModalProps) {
  return (
    <Dialog
      open={isOpenCheckModal}
      keepMounted
      onClose={() => setIsOpenCheckModal(false)}
      aria-describedby="stop-dialog"
    >
      <DialogTitle
        sx={{
          width: '350px',
          fontSize: '24px',
          fontWeight: 'bold',
          p: '18px',
          color: (theme) => theme.colors.greenText,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '16px' }} id="stop-dialog">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: '16px', pr: '16px' }}>
        <Button
          sx={{
            color: (theme) => theme.colors.pageBg,
            background: (theme) => theme.colors.greenButton,
            borderRadius: '8px',
          }}
          variant="contained"
          color="success"
          onClick={() => {
            onClick()
            setIsOpenCheckModal(false)
          }}
        >
          {leftButton}
        </Button>
        <Button
          sx={{
            color: (theme) => theme.colors.pageBg,
            background: (theme) => theme.colors.gray,
            borderRadius: '8px',
          }}
          variant="contained"
          color="success"
          onClick={() => setIsOpenCheckModal(false)}
        >
          {rightButton}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CheckModal
