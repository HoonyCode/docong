import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import GroupCreate from '../../components/group/GroupCreate'
import GroupCreateForm from '../../components/group/GroupCreateForm'
import { GroupCreateData, searchAllGroup } from "../../api/group"
import GroupList from "../../components/group/GroupList"
import { RootState } from "../../modules"
import { createGroupAsync, searchAllGroupAsync } from "../../modules/group"

function GroupMainContainer() {
    /*
        1. 해당 user가 참여하고 있는 group 리스트 보여주기
        2. group을 누르면 그 그룹의 정보를 state에 넣고 group todo로 이동
    */

    const groups = useSelector((state: RootState) => state.group.groups.data)
    const [isOpenCreateGroupForm, setIsOpenCreateGroupForm] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        searchAllGroup()
    }, [])

    const searchAllGroup = () => {
        dispatch(searchAllGroupAsync.request(null))
    }

    const onCreateGroupSubmit = (groupCreateData: GroupCreateData) => {
        dispatch(createGroupAsync.request(groupCreateData))
        setIsOpenCreateGroupForm(false)

    }

    const openGroupCreateForm = () => {
        setIsOpenCreateGroupForm(true)
    }

    const closeCreateGroupForm = () => {
        setIsOpenCreateGroupForm(false)
    }

    return (
        <>
            <GroupCreate openGroupCreateForm={openGroupCreateForm} />
            <GroupCreateForm
                isOpenGroupCreateForm={isOpenCreateGroupForm}
                closeGroupCreateForm={closeCreateGroupForm}
                onCreateGroupSubmit={onCreateGroupSubmit} />
            <GroupList groups={groups} />
        </>
    )
}

export default GroupMainContainer