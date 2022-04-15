import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Goal from './Goal'
import Spinnar from '../Compound/spinal'
import { getGoals, reset} from '../features/goal/goalSlice'
import GoalItem from '../GoalItem/GoalItem'



const Dashboard = () => {

  //calling in the function
  const navigate = useNavigate()
  const dispatch = useDispatch()

   const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goal
  )

  //useEffect
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinnar />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome <i>{user && user.name}</i></h1>
        <p>Goals Dashboard</p>
      </section>

      <Goal />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
               <GoalItem key={goal._id} goal={goal}/>
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
      <h4>Project By Bright Jonathan</h4>
    </>
  )
}

export default Dashboard
