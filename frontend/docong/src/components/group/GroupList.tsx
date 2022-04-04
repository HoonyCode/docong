import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Group } from "../../api/group"
import { RootState } from "../../modules"
import produce from 'immer'
import { Button } from "@mui/material"

interface GroupListProps {
    groups: any
}

function GroupList({ groups }: GroupListProps) {

    const navigate = useNavigate();

    const [group, setGroup] = useState({
        group: []
    })

    useEffect(() => {
        if (groups !== null) {
            const group = groups
                .map((group: Group) => ({
                    teamSeq: group.teamSeq,
                    // createDate: group.createdDate,
                    // modifiedDate: group.modifiedDate,
                    jiraApiToken: group.jiraApiToken,
                    jiraDomain: group.jiraDomain,
                    jiraProjectKey: group.jiraProjectKey,
                    jiraUserId: group.jiraUserId,
                    userList: group.userList,
                    name: group.name,
                    leaderEmail: group.leaderEmail
                }))
            setGroup(
                produce((draft) => {
                    draft.group = group
                })
            )
        }
    }, [groups])


    const moveGroupTodo = (e: React.MouseEvent<HTMLButtonElement>, groupSeq: number) => {
        navigate(`/group/todo/${groupSeq}`)
    }

    return (
        <>
            {
                group.group.map((value: Group, key: any) => (
                    <Button key={key} variant="outlined" onClick={(e) => {moveGroupTodo(e, value.teamSeq)}}>{value.name}</Button>
                ))
            }
        </>
    )
}

export default GroupList