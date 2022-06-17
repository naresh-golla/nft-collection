import React, { Component, useContext, useState, useEffect } from 'react'
import { UserDataContext } from './StateContext';

export default function CountDown() {

  const user_Data_Context = useContext(UserDataContext)
  let userData = user_Data_Context.userData

  const [countDown, setcountDown] = useState(undefined)

  useEffect(() => {
    // Set the date we're counting down to
    var countDownDate = new Date("Jun 18, 2022 00:00:00").getTime();
    // Update the count down every 1 second
    var x = setInterval(() => {
      // Get today's date and time  
      var now = new Date().getTime();
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setcountDown(prevState =>({
        ...prevState,
        obj:{
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        }
      }))
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        // document.getElementById("demo").innerHTML = "EXPIRED";
        setcountDown({
          countDown: undefined
        })
      }
    }, 1000);
  }, [])

  return (
    <div>
      {(countDown !== undefined && !userData.isWhiteListed) && <div>
        {/* <div class="count_heading">NFT Drop is coming soon</div> */}
        <div class="count_head">Public sale will be live on</div>
            <div class="count_wrapper">
            <div class="count_div">
              <div>{countDown.obj.days}</div>
              <div>Days</div>
            </div>
            <div class="count_div">
              <div>{countDown.obj.hours}</div>
              <div>Hours</div>
            </div>
            <div class="count_div">
              <div>{countDown.obj.minutes}</div>
              <div>Mins</div>
            </div>
            <div class="count_div">
              <div>{countDown.obj.seconds}</div>
              <div>sec</div>
            </div>
          </div>
      </div>}
    </div>
  )

}