import { useState, useEffect } from 'react';

const Timer = () => {
    const [time, setTime] = useState(new Date());
    useEffect(
      () => {
        const intervalId = setInterval(() => {
          setTime(new Date());
        }, 60000);
        return () => {
          clearInterval(intervalId)
        }
      }
    )
    
    return {time}
}

export default Timer;


export function dateTimeSplitter(time:Date){

    if(typeof time=="string"){
        time=new Date(time)
    }

    const ddmmyy = time.toLocaleString('en-US', { day: 'numeric',month:'numeric', year: "numeric" }).split("/")
    const houreminutepm = time.toLocaleString('en-US', { hour: '2-digit',minute:'2-digit', hour12: true })
    
    const hour = houreminutepm.substring(0,2)
    const minute = houreminutepm.substring(3,5)
    const periods = houreminutepm.substring(6,8)
    const day = ddmmyy[1]
    const month= ddmmyy[0]
    const year= ddmmyy[2]
    
    const dateTimeStamp=day+"-"+month+"-"+year+" "+hour+" : "+minute+" "+periods
    const timeStamp=hour+" : "+minute+" "+periods;
    const dateStamp=day+"-"+month+"-"+year

    return {hour,minute,periods,day,month,year,dateTimeStamp,timeStamp,dateStamp}
}