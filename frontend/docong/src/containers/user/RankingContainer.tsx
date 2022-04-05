import { Box } from '@mui/material'
import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserRanking from '../../components/user/UserRanking'
import { RootState } from '../../modules'
import { getRankingListAsync } from '../../modules/user'

function RankingContainer() {
  const rankingList = useSelector((state: RootState) =>
    state.user.rankingList ? state.user.rankingList.data : null
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRankingListAsync.request(null))
  }, [])

  return (
    <Box sx={{ height: '100%', width: '100%', p: '2vw' }}>
      <Box
        sx={{
          textAlign: 'center',
          fontSize: '36px',
          mt: '1vh',
          color: (theme) => theme.colors.greenText,
        }}
      >
        두콩 랭킹
      </Box>
      <UserRanking rankingList={rankingList} />
    </Box>
  )
}

export default memo(RankingContainer)
