import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../modules"

interface GroupDeleteFormProps {
    groupSeq: number
    isOpenGroupDeleteForm: boolean
    closeGroupDeleteForm: () => void
    onGroupDeleteSubmit: (team_id: number) => void
}

function GroupDeleteForm({
    groupSeq,
    isOpenGroupDeleteForm,
    closeGroupDeleteForm,
    onGroupDeleteSubmit,
}: GroupDeleteFormProps) {
    const groupInfo = useSelector((state: RootState) => state.group.groups.data)


    const onSubmitGroupDelete = () => {
        if (isOpenGroupDeleteForm === true) {
            // group의 leader인지 체크?

            onGroupDeleteSubmit(groupSeq)
        }
    }

    return (
        <Dialog open={isOpenGroupDeleteForm} onClose={closeGroupDeleteForm}>
            <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
            <DialogActions sx={{ p: '0 100px 20px 100px' }}>
                <Button
                    sx={{
                        width: '50%',
                        fontSize: '16px',
                        color: (theme) => theme.colors.pageBg,
                        background: (theme) => theme.colors.greenButton,
                        borderRadius: '8px',
                        mr: '80px',
                    }}
                    onClick={onSubmitGroupDelete}
                    variant="contained"
                    color="success"
                    type="submit"
                >
                    삭제하기
                </Button>
                    <Button
                        sx={{
                            width: '50%',
                            fontSize: '16px',
                            color: (theme) => theme.colors.pageBg,
                            background: (theme) => theme.colors.gray,
                            borderRadius: '8px',
                        }}
                        onClick={closeGroupDeleteForm}
                        variant="contained"
                        color="success"
                    >
                        CANCLE
                    </Button>
            </DialogActions>
        </Dialog>
    )
}

export default GroupDeleteForm