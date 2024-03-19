import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TodoList {
  uid:string
  text: string
  checked: boolean
  timeStamp: Date
}

export interface List {
  todolist: TodoList[]
  completed: TodoList[]
  trash : TodoList[]
}

const initialState :List = {
  todolist:[],
  completed:[],
  trash:[]
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    AddTodo: (state,action: PayloadAction<TodoList>) => {
      state.todolist.unshift(action.payload)
    },
    updateTodo: (state,action: PayloadAction<TodoList>) => {
      let index=state.todolist.findIndex(item=>item.uid===action.payload.uid)
      state.todolist[index]=action.payload
    },
    moveToCompleted:(state,action: PayloadAction<TodoList>)=>{
       let index=state.todolist.findIndex(item=>item.uid===action.payload.uid)
       let arr=state.todolist.splice(index,1)
       arr[0].checked=true
       state.completed.unshift(...arr)
    },
    moveDonetotodo:(state,action:PayloadAction<TodoList>)=>{
      let index=state.completed.findIndex(item=>item.uid===action.payload.uid)
      let arr=state.completed.splice(index,1)
      arr[0].checked=false
      state.todolist.unshift(...arr)
    },
    moveDonetotrash:(state,action:PayloadAction<TodoList>)=>{
      let index=state.completed.findIndex(item=>item.uid===action.payload.uid)
      let arr=state.completed.splice(index,1)
      state.trash.unshift(...arr)
    },
    undoTask:(state,action:PayloadAction<TodoList>)=>{
     if(action.payload.checked){
      let index=state.trash.findIndex(item=>item.uid===action.payload.uid)
      let arr=state.trash.splice(index,1)
      arr[0].checked=true
      state.completed.unshift(...arr)
     }else{
      let index=state.trash.findIndex(item=>item.uid===action.payload.uid)
      let arr=state.trash.splice(index,1)
      arr[0].checked=false
      state.todolist.unshift(...arr)
     }
    },
    deleteTodo: (state,action: PayloadAction<TodoList>) => {
      let index=state.todolist.findIndex(item=>item.uid===action.payload.uid)
      let arr=state.todolist.splice(index,1)
      state.trash.unshift(...arr)
    },
    deletePermanently:(state,action: PayloadAction<TodoList>)=>{
      let index=state.todolist.findIndex(item=>item.uid===action.payload.uid)
      state.trash.splice(index,1)
    }
  
  },
})

export const { AddTodo,deleteTodo,updateTodo,moveToCompleted,moveDonetotrash,moveDonetotodo ,undoTask, deletePermanently} = todoSlice.actions
 
export default todoSlice.reducer