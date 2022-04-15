import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goal/goalSlice'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const GoalItem = ({goal}) => {
    
    const dispatch = useDispatch()
  return (
    <div>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
    <DeleteForeverOutlinedIcon onClick={()=> dispatch(deleteGoal(goal._id))} className='close' />
    </div>
  )
}

export default GoalItem
