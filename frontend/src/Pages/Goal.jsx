import {useState} from 'react'
import { useDispatch } from 'react-redux'
import {createGoal} from '../features/goal/goalSlice'


const Goal = () => {
 
const [text, setText] = useState('');

//calling in the function
const dispatch = useDispatch()

    //
const onSubmit = (e)=>{
    e.preventDefault(e.target.value)

    dispatch(createGoal({text}))
    setText('')
}

const onChange = (e)=>{
  setText(e.target.value)
}

  return (
    <>
    <section className='form'>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <label htmlFor='text'>Goal</label>
          <input 
          type="text" 
          name="text" 
          id='text'
          value={text}
          onChange={onChange}/>
      </div>
      <div className='form-group'>
            <button type='submit' className='btn btn-block'> Add Goal </button>
       </div>
      </form>
    </section>
    </>
  )
}

export default Goal
