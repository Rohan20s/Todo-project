import { useEffect, useMemo, useState } from 'react'
import style from "../App.module.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from "../index"
import { TodoList, moveDonetotodo, moveDonetotrash, moveToCompleted } from '../features/todoState'
import { Popconfirm } from 'antd'
import ShowMoreText from "react-show-more-text";
import { dateTimeSplitter } from '../features/Timer'
import ReactLoading from 'react-loading';


const CompletedTask = () => {
  const { todo } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  const [isFullCompletedVisible, setCompleteVisiblity] = useState(false)

  
  return (
    <>
      <div className={style.listHead} style={{ borderBottom: "1px solid black" }}>
        <div >Completed Task</div>
      </div>


      {todo.completed.length ? todo.completed.map((item: TodoList, i: number) => {

        if (i < 2 || isFullCompletedVisible)
          return <div className={style.completedBox} >
            <div className={style.actionList} style={{ justifyContent: "flex-end" }}>
              <span className={style.edit} onClick={e => {
                dispatch(moveDonetotodo(item))
              }}>Todo</span>

              <Popconfirm
                placement="bottomRight"
                title=""
                description="Do you want to remove it?"
                okText="Yes"
                onConfirm={e => dispatch(moveDonetotrash(item))}
                cancelText="No"
              >
                <span className={style.delete} >Trash</span>
              </Popconfirm>
              {/* <div className={style.delete} onClick={e => {
                  dispatch(moveDonetotrash(item))
                }}><IoCloseOutline /></div> */}
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
      }

      ) :
        <div className={style.Nodata}>No completed task is listed</div>
      }

      {todo.completed.length > 2 ? isFullCompletedVisible ?
        <div className={style.moreNless} onClick={e => { setCompleteVisiblity(!isFullCompletedVisible) }}>View less</div> :
        <div className={style.moreNless} onClick={e => { setCompleteVisiblity(!isFullCompletedVisible) }}>View more</div> : null}

    </>
  )
}

export default CompletedTask