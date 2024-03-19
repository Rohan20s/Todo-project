import { useState } from 'react'
import style from "../App.module.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from "../index"
import { TodoList, deletePermanently, undoTask, } from '../features/todoState'
import { Popconfirm } from 'antd'
import ShowMoreText from "react-show-more-text";
import { dateTimeSplitter } from '../features/Timer'

const TrashTask = () => {
    const { todo } = useSelector((state: RootState) => state)
    const dispatch = useDispatch()
    const [isFullCompletedVisible, setCompleteVisiblity] = useState(false)

    return (
        <>
            <div className={style.listHead} style={{ borderBottom: "1px solid black" }}>
                <div >Trash</div>
                {/* <button className={style.addBTN}></button> */}
            </div>

            {todo.trash.length ? todo.trash.map((item: TodoList, i: Number) => {

                if (i < 2 || isFullCompletedVisible)
                    return <div className={style.deleteBox}>
                        <div className={style.actionList} style={{ justifyContent: "flex-end" }}>
                            <span className={style.edit} onClick={e => dispatch(undoTask(item))}>Undo</span>
                            <Popconfirm
                                placement="bottomRight"
                                title=""
                                description="Delete permanently ?"
                                okText="Yes"
                                onConfirm={e => dispatch(deletePermanently(item))}
                                cancelText="No"
                            >
                                <div className={style.delete} >
                                    Delete</div>
                            </Popconfirm>
                        </div>

                        <ShowMoreText
                            /* Default options */
                            lines={1}
                            more="more"
                            less="show less"
                            className={`${style.todoText} content-css`}
                            style={{ color: "black" }}
                            anchorClass="show-more-less-clickable"
                            truncatedEndingComponent={"... "}
                        >
                            <div className={style.todoText} style={{ color: "black" }}>{item.text}</div>
                        </ShowMoreText>
                        <div className={style.timestamp}>{dateTimeSplitter(item.timeStamp).dateTimeStamp}</div>
                    </div>

            }) : <div className={style.Nodata}>No deleted task is listed</div>}

            {todo.trash.length > 2 ? isFullCompletedVisible ?
                <div className={style.moreNless} onClick={e => { setCompleteVisiblity(!isFullCompletedVisible) }}>View less</div> :
                <div className={style.moreNless} onClick={e => { setCompleteVisiblity(!isFullCompletedVisible) }}>view more</div> : null}

        </>
    )
}

export default TrashTask