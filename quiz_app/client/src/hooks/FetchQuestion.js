import {useEffect,useState} from "react"
import { useDispatch } from "react-redux";
import data,{answers} from "../database/data";
import * as Action from '../Redux/question_reducer'
/** fetch question hook fetch api data and set value to store  */
export const useFetchQuestion=()=>{
    const dispatch=useDispatch();
    const [getData,setGetData]=useState({ isLoading:false,apiData:[], serverError:null});
    useEffect(() => {
        setGetData(prev => ({...prev,isLoading:true}));

        /** async fun to fetch bakend data */
        (async () =>{
            try{
               let question=await data;
               if(question.length>0){
                setGetData(prev => ({...prev,isLoading:false}));
                setGetData(prev => ({...prev,apiData:{question,answers}}));
                /**dispatch an action */
                    dispatch(Action.startExamAction({question,answers}))
               } 
               else{
                throw new Error("No Question Available");
               }
            }
            catch(error){
                setGetData(prev => ({...prev,isLoading:false}));
                setGetData(prev => ({...prev,serverError:error}));
            }
        })();
    }, [dispatch]);
    return [getData,setGetData];
}
/** MoveAction Dispatch Function*/
export const MoveNextQuestion=() =>async(dispatch)=> {
    try{
        dispatch(Action.moveNextAction())
    }
    catch(error) {
        console.log(error)
    }
}
/** prevAction Dispatch Function*/
export const MovePrevQuestion=() =>async(dispatch)=> {
    try{
        dispatch(Action.movePrevAction())
    }
    catch(error) {
        console.log(error)
    }
}