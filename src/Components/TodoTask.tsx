import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import style from "../App.module.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from "../index"
import { TodoList, deleteTodo, moveToCompleted } from '../features/todoState'
import { Popconfirm } from 'antd'
import { dateTimeSplitter } from '../features/Timer'

const TodoTask = ({ setselectedTodo, setText, showModal }
        : {
            setselectedTodo: (value: TodoList) => void | null,
            setText: (value: string) => void | null
            , showModal: () => void
        }) => {


    const { todo } = useSelector((state: RootState) => state)
    const dispatch = useDispatch()


    return (
        <>
            <div className={style.listHead}>
                <div >Todo List</div>
                <button className={style.addBTN} onClick={showModal}> + Add </button>
            </div>

            {todo.todolist.length ? <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 600: 2, 1000: 3 }}
            >
                <Masonry >

                    {todo.todolist.map((item: TodoList, i: number) =>
                        <div className={style.todoBox} id={'item' + i} >
                            <div className={style.actionList}>
                                <input className={style.checkbox} checked={item.checked} type='checkbox'
                                    onChange={e => {
                                        if (e.target.checked) {
                                            dispatch(moveToCompleted(item))
                                        }
                                    }} />
                                <span className={style.edit} onClick={e => {
                                    setselectedTodo(item);
                                    setText(item.text)
                                    showModal()
                                }}>Edit</span>

                                <Popconfirm
                                    placement="bottomRight"
                                    title=""
                                    description="Do you want to remove it?"
                                    okText="Yes"
                                    onConfirm={e => dispatch(deleteTodo(item))}
                                    cancelText="No"
                                >
                                    <div className={style.delete}>Leave</div>
                                </Popconfirm>

                            </div>
                            <div className={style.todoText}>{item.text}</div>
                            <div className={style.timestamp}>{dateTimeSplitter(item.timeStamp).dateTimeStamp}</div>
                        </div>
                    )}
                </Masonry>
            </ResponsiveMasonry> :
                <div className={style.Nodata}>No todo task is listed</div>
            }
        </>
    )
}

export default TodoTask