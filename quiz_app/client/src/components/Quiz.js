import React, { useState,useEffect } from 'react'
import Questions from './Questions'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion'
import { PushAnswer } from '../hooks/setResult'
/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Quiz() {

  const [ check, setChecked ] = useState(undefined)
  const dispatch = useDispatch()
  const result = useSelector(state => state.result.result);
  const { queue, trace } = useSelector(state => state.questions);
  useEffect(() => {
    console.log(result)
  })
  /**next btn event handler */
  function onNext() {
    console.log('On Next Click')
    if (trace < queue.length) {
      /**update trace value by 1 using MoveNextAction*/
      dispatch(MoveNextQuestion());
      
      /**INsert a new result in the array. */
      if(result.length<=trace){
        dispatch(PushAnswer(check));
      }
    }
    /**reset the value of the checked variable */
    setChecked(undefined)
  }

  /* prev btn event handler */
  function onPrev() {
    
    if (trace > 0) {
      /**update trace value by 1 using MovePrevAction*/
      dispatch(MovePrevQuestion());
    }

  }

  function onChecked(check) {
    console.log(check)
    setChecked(check)
  }

  /** finish exam after the last question*/
  if(result.length && result.length >=queue.length){
    return <Navigate to={'/result'} replace="true"></Navigate>
  }

  return (
    <div className='container quest'>

      
      <Questions onChecked={onChecked} />


      <div className='grid'>
        {trace>0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
        <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
  )
}
