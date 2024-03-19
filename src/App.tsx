import { useSelector } from 'react-redux';
import { RootState } from "./index"
import style from './App.module.css'
import { useEffect, useMemo, useState } from 'react';
import { Modal } from 'antd';
import './global.css'
import Timer, { dateTimeSplitter } from './features/Timer';
import { v4 as uuidv4 } from 'uuid';
import { AddTodo, TodoList, deleteTodo, updateTodo } from './features/todoState';
import { useDispatch } from 'react-redux';
import CompletedTask from './Components/CompletedTask';
import TrashTask from './Components/TrashTask';
import TodoTask from './Components/TodoTask';
import ReactLoading from 'react-loading';


function App() {

  const { time } = Timer()

  const [selectedTodo, setselectedTodo] = useState<TodoList | null>(null)
  const [text, setText] = useState("")

  const { todo } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [draggedElement,setDragElement]=useState<TodoList|null>(null)

  useEffect(()=>{
   console.log(draggedElement)
  },[draggedElement])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedTodo == null && text.length) {

      const data: TodoList = {
        uid: uuidv4(),
        text: text,
        checked: false,
        timeStamp: time
      }
      dispatch(AddTodo(data))

    } else if (text.length && selectedTodo != null) {
      const data: TodoList = {
        uid: selectedTodo.uid,
        text: text,
        checked: selectedTodo.checked,
        timeStamp: selectedTodo.timeStamp
      }

      dispatch(updateTodo(data))
    }

    else if (text.length == 0 && selectedTodo != null) {
      dispatch(deleteTodo(selectedTodo))
    }


    setText("")
    setselectedTodo(null)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setText("")
    setselectedTodo(null)
    setIsModalOpen(false);
  };



  // time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })
  return (
    <div className={style.container}>

      <Modal title={<div className={style.listHead}>{selectedTodo ? "Edit Task" : "Add Task"}</div>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <textarea id="textarea" className={style.textArea} value={text} onChange={e => setText(e.target.value)} />
      </Modal>

      {/* Header component */}
      <header className={style.header}>
        <div className={style.app_heading}>Todo List - <span className={style.highlight}>&nbsp;DeveloperBox </span></div>
        <div className={style.dateNtime}>
          {dateTimeSplitter(time).dateStamp} -
          <span className={style.timeBox}>{dateTimeSplitter(time).hour}</span>
          :<span className={style.timeBox}>{dateTimeSplitter(time).minute}</span>
          <span className={style.timeBox} style={{ padding: "0px 6px" }}>{dateTimeSplitter(time).periods}</span>
        </div>
      </header>
      {/*End of Header component */}

      <div className={style.gridLayout}>

        {/* Completed List */}
        <section className={style.grid1}>
          {useMemo(() =><CompletedTask />, [todo.completed])}
          {useMemo(() =><TrashTask />, [todo.trash])}
        </section>

        <section className={style.grid2}>
          <TodoTask 
          setselectedTodo={setselectedTodo} 
          setText={setText} 
          showModal={showModal} />
        </section>

      </div>

      {/* <ReactLoading type="spin" color="blue" height={67} width={67} /> */}
    </div>
  );
}

export default App;
