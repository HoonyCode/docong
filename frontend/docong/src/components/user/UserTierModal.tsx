import { Modal, Box, Typography, Avatar } from '@mui/material'

interface UserTierModalProps {
  isOpenTierModal: boolean
  closeTierModal: () => void
}

function UserTierModal({
  isOpenTierModal,
  closeTierModal,
}: UserTierModalProps) {
  const tierList = [
    ['한콩', '1 ~ 50'],
    ['두콩', '50 ~ 100'],
    ['세콩', '100 ~ 200'],
    ['네콩', '200 ~ 500'],
    ['완두콩', '500 ~ 1000'],
    ['투두콩', '1000 ~ 5000'],
    ['쓰리두콩', '5000 ~ 10000'],
    ['포두콩', '10000 ~ 20000'],
    ['콩나무', '20000+'],
  ]

  return (
    <Modal
      open={isOpenTierModal}
      onClose={closeTierModal}
      aria-labelledby="user-tier"
      aria-describedby="user-tier-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          background: (theme) => theme.colors.navBg,
          border: '2px solid gray',
          borderRadius: '16px',
          boxShadow: 12,
          p: '32px',
        }}
      >
        <Typography
          sx={{
            fontSize: '32px',
            fontWeight: 'bold',
            fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
            color: '#4F774E',
            mb: '15px',
            textAlign: 'center',
          }}
        >
          두콩 티어
        </Typography>
        {tierList.map((tier, index) => (
          <Box key={index} sx={{ display: 'flex', mb: '12px' }}>
            <Box
              sx={{
                display: 'flex',
                alignSelf: 'center',
                p: '4px',
                ml: '5px',
                borderRadius: '8px',
                background: '#f4fce3',
                boxShadow: 1,
              }}
            >
              <Avatar
                sx={{
                  height: '24px',
                  width: 'auto',
                  alignSelf: 'center',
                  mr: '5px',
                }}
                variant="square"
                src={`/images/tier_${index + 1}.png`}
              />
              <Box
                sx={{
                  fontSize: '20px',
                  color: (theme) => theme.colors.greenText,
                  alignSelf: 'center',
                }}
              >
                {tier[0]}
              </Box>
            </Box>
            <Box sx={{ fontSize: '24px', ml: '12px' }}>{`${tier[1]} 콩`}</Box>
          </Box>
        ))}
      </Box>
    </Modal>
  )
}

export default UserTierModal
