import { Avatar, Box, Tooltip } from "@mui/material"
import { OnOffUser, OnOffUserList } from "../../api/group"
import OnTimerDetail from "./OnTimerDetail"

interface OnTimerProps {
    userList: OnOffUserList | null
    getUserList: () => void
}

function OnTimer({ userList, getUserList }: OnTimerProps) {

    return (
        <Box
            sx={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end',
                height: '9%',
            }}>
            {
                userList !== null &&
                userList
                    .filter((user: OnOffUser) => user.online === true)
                    .map((user: OnOffUser) => (
                        <Tooltip title={`${user.userName}`}>
                            <Avatar
                                sx={{
                                    width: 24,
                                    height: 24,
                                    m: 0.5,
                                    flexDirection: 'column',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'end',
                                }}
                                alt={`${user.userName}`}
                                src={
                                    user.userImg
                                        ? user.userImg
                                        : '/images/Profile_Default.png'
                                }
                            />
                        </Tooltip>
                    ))
            }
            <OnTimerDetail
                userList={userList}
                getUserList={getUserList} />
        </Box>
    )
}

export default OnTimer