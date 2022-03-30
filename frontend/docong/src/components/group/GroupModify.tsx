import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GroupModifyData } from "../../api/group";
import { RootState } from "../../modules";

interface GroupModifyProps {
    onGroupModifySubmit: (groupModifyData: GroupModifyData) => void
}

function GroupModify({ onGroupModifySubmit }: GroupModifyProps) {

    const groupInfo = useSelector((state: RootState) => state.group.groups.data)
    const userInfo = useSelector((state: RootState) => state.user.userInfo.data)

    const [groupModifyInput, setGroupModifyInput] = useState({
        userEmail: userInfo ? userInfo.email : '',
        // teamId: groupInfo ? groupInfo.seq : 1,
        teamId: 1,
        name: groupInfo ? groupInfo.name : ''
    })

    useEffect(() => {
        setGroupModifyInput({
            userEmail: userInfo ? userInfo.email : '',
            // teamId: groupInfo ? groupInfo.seq : 1,
            teamId: 1,
            name: groupInfo ? groupInfo.name : ''
        })
    }, [userInfo, groupInfo])

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupModifyInput({ ...groupModifyInput, name: e.target.value })
    }

    const onSubmitModifyGroupInfo = () => {
        if (groupModifyInput.name === '') {
            alert('팀 이름을 입력해주세요.')
        }
        else {
            onGroupModifySubmit(groupModifyInput)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                minWidth: '600px',
            }}>
            <Box sx={{ width: '12%', minWidth: '200px', py: '1vh' }}>
                <Box
                    sx={{
                        display: 'flex',
                        height: '40px',
                        mb: '2vh',
                        justifyContent: 'end',
                        alignItems: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    <div>그룹명</div>
                </Box>
            </Box>
            <Box
                component="form"
                sx={{
                    width: '18%',
                    minWidth: '300px',
                    p: '1vh',
                }}
                onSubmit={onSubmitModifyGroupInfo}
            >
                <TextField
                    required
                    fullWidth
                    size="small"
                    id="email"
                    variant="outlined"
                    onChange={onChangeName}
                    value={groupModifyInput.name}
                    color="success"
                    sx={{ background: 'white', mb: '2vh' }}
                />
                <Button
                    sx={{
                        display: 'flex',
                        height: '40px',
                        mb: '2vh',
                        justifyContent: 'end',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        background: (theme) => theme.colors.gray,
                    }}
                    variant="contained"
                    type="submit"
                    color="success"
                >
                    변경
                </Button>
            </Box>
        </Box>
    )
}

export default GroupModify