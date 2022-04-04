import { Box, Button, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Group, GroupMemberModifyData, GroupMemberModifyData2, MemberData } from "../../api/group";
import { RootState } from "../../modules";
import produce from 'immer'

interface GroupMemberSettingProps {
    group: any
    onAddGroupMemberSubmit: (groupMemberModifyData: GroupMemberModifyData) => void
    onMemberDeleteByLeaderSubmit: (groupMemberModifyData: GroupMemberModifyData2) => void
}

function GroupMemberSetting({
    group,
    onAddGroupMemberSubmit,
    onMemberDeleteByLeaderSubmit
}: GroupMemberSettingProps) {

    const userInfo = useSelector((state: RootState) => state.user.userInfo.data)
    const [addMemberInfo, setAddMemberInfo] = useState({
        teamId: group ? group.teamSeq : 0,
        userEmail: ''
    })

    const [userList, setUserList] = useState({
        users: []
    })

    useEffect(() => {
        if (group !== null) {
            const user = group.userList
                .map((memberData: MemberData) => ({
                    email: memberData.email,
                    name: memberData.name
                }))
            setUserList(
                produce((draft) => {
                    draft.users = user
                })
            )
        }
    }, [group])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.common.white,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const onAddMemberSubmit = () => {
        onAddGroupMemberSubmit(addMemberInfo)
    }

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setAddMemberInfo({ teamId: group.teamSeq, userEmail: e.target.value })
    }

    const onDeleteMember = (e: React.MouseEvent<HTMLButtonElement>, user_email: string) => {
        onMemberDeleteByLeaderSubmit({ team_id: group.teamSeq, user_email: user_email })
    }

    return (
        <Box
            sx={{
                border: 1,
                borderRadius: 4,
                borderColor: 'gray',
                width: '100%',
                minWidth: '600px',
                p: 2,
                margin: 2
            }}>
            <h1>사용자 관리</h1>
            <TableContainer component={Paper} sx={{
                width: '100%',
                height: '200px', // 스크롤 적용
                '@media (max-height: 760px)': {
                    height: '115px',
                },
            }}>
                <Table sx={{ minWidth: 500, width: '100%' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">이름</StyledTableCell>
                            <StyledTableCell align="center">이메일</StyledTableCell>
                            {userInfo !== null && group !== null && userInfo.email === group.leaderEmail &&
                                <StyledTableCell2 align="center">삭제</StyledTableCell2>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            userList.users.map((user: any, index: number) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="center">{user.name}</StyledTableCell>
                                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                                    {userInfo !== null && group !== null && userInfo.email === group.leaderEmail &&
                                        <StyledTableCell align="center">
                                            {group.leaderEmail !== user.email &&
                                                <Button onClick={(e) => { onDeleteMember(e, user.email) }}>내보내기</Button>
                                            }
                                        </StyledTableCell>
                                    }
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {userInfo !== null && group !== null && userInfo.email === group.leaderEmail &&
                <Box sx={{
                    justifyContent: 'flex-end',
                    width: '100%',
                    minWidth: '600px',
                    flexDirection: 'row',
                }}>
                    <Box sx={{ width: '12%', minWidth: '200px', py: 2, my: 2 }}>
                        <Box
                            sx={{
                                height: '40px',
                                mb: '2vh',
                                justifyContent: 'end',
                                fontWeight: 'bold',
                            }}
                        >
                            <div>추가하기</div>
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                width: '18%',
                                minWidth: '300px',
                                flexDirection: 'column',
                            }}
                            onSubmit={onAddMemberSubmit}
                        >
                            <TextField
                                required
                                fullWidth
                                size="small"
                                id="email"
                                variant="outlined"
                                onChange={onChangeEmail}
                                value={addMemberInfo.userEmail}
                                color="success"
                                sx={{ background: 'white', mb: '2vh' }}
                            />
                            <Button
                                sx={{
                                    height: '40px',
                                    mb: '2vh',
                                    justifyContent: 'end',
                                    fontWeight: 'bold',
                                    background: (theme) => theme.colors.gray,
                                }}
                                variant="contained"
                                type="submit"
                                color="success"
                            >
                                ADD
                            </Button>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )

}

export default GroupMemberSetting