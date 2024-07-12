  
  let calendar = function(year, month, d){
  
    let today = new Date();
    let currentYear = parseInt(year ? year : today.getFullYear());
    let currentMonth = parseInt(month ? month : today.getMonth() + 1);
        // selectedDay = selectedDay === '' ? today.getFullYear() +'-'+ (today.getMonth() + 1) +'-'+ today.getDate() : selectedDay;

  
    let holidayDate = {
        "1-1" : "신정",
        "3-1" : "삼일절",
        "5-5" : "어린이날",
        "6-6" : "현충일",
        "8-15" : "광복절",
        "10-3" : "개천절",
        "10-9" : "한글날",
        "12-25" : "성탄절",
    }
  
    let lunarHolidayData = {
      //"1231" : "설날", //12월 말일
      "0101" : "설날",
      "0102" : "설날",
      "0408" : "석가탄신일",
      "0814" : "추석",
      "0814" : "추석",
      "0815" : "추석",
      "0816" : "추석",
    }
  
    function dateFormat(date){
      return date.split('-')[0].replace(/(^0+)/, "") +'-'+ date.split('-')[1].replace(/(^0+)/, "")
    }
  
    //설전날 대체휴일
    let lunarYear = currentYear-1;
    let newYearPrevDate = (lunarYear + Resut( currentYear + "0101")).replace(/[^0-9]/g, '').replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, ""); 
        newYearPrevDate = new Date(new Date(newYearPrevDate).setDate(new Date(newYearPrevDate).getDate() - 1))
        newYearPrevDate = ("0" + new Date(newYearPrevDate).getMonth()+1).slice(-2) +'-'+ new Date(newYearPrevDate).getDate()
        holidayDate[dateFormat(newYearPrevDate)] = '설날';
        
    //음력휴일
    for (const i in lunarHolidayData) {
      var solar = Resut( currentYear + "" + i).replace(/[^0-9]/g, '').replace(/^(\d{0,2})(\d{0,2})$/g, "$1-$2").replace(/(\-{1,2})$/g, ""); ;
      holidayDate[dateFormat(solar)] = lunarHolidayData[i];
    }
  
  
    let calendarWrap = document.querySelector('.calendar-wrap');
    let calYear = calendarWrap.querySelector(".year");
    let calMonth = calendarWrap.querySelector(".month");
    let calendar = calendarWrap.querySelector(".calendar");
    let tblHeader= calendarWrap.querySelector(".tbl-header");
    let tbl = calendarWrap.querySelector(".tbl-body");
    let days = ["일", "월", "화", "수", "목", "금", "토"];
  
    function generate_range(start, end, unit) {
      let options = "";
      for (let i = start; i <= end; i++) {
        options += "<option value='" + i + "'>" + i + unit + "</option>";
      }
      return options;
    }
  
    function daysInMonth(year, month) { //마지막날 체크
      return 32 - new Date(year, month-1, 32).getDate();
    }
  
    function next() {
      currentYear = (currentMonth === 12) ? currentYear + 1 : currentYear;
      currentMonth = ((currentMonth + 1) % 13) === 0 ? 1 : (currentMonth + 1);
      showCalendar(currentYear, currentMonth);
    }
  
    function previous() {
      currentYear = (currentMonth === 1) ? currentYear - 1 : currentYear;
      currentMonth = (currentMonth === 1) ? 12 : (currentMonth - 1);
      showCalendar(currentYear, currentMonth);
    }
    
    function showCalendar(year, month, d) {
  
      let firstDay = (new Date( year, month-1) ).getDay(); // 시작칸수
  
      tbl.innerHTML = "";
      calYear.textContent = year;
      calMonth.textContent =month;
  
      let prevMonth = [...Array(daysInMonth(year, month-1)).keys()].map(day => day + 1);
      let nowMonth = [...Array(daysInMonth(year, month)).keys()].map(day => day + 1);
      let nextMonth = [...Array(daysInMonth(year, month+1)).keys()].map(day => day + 1);
  
      let rownum = (nowMonth.length + firstDay) / 7;
  
      // creating all cells
      let date = 1;
      for ( let i = 0; i < rownum; i++ ) {
          let row = document.createElement("tr");
  
          for ( let j = 0; j < 7; j++ ) { // 이전달력 날자
              if ( i === 0 && j < firstDay ) {
                  cell = document.createElement( "td" );
                  cell.innerHTML = "<div class='empty prev-month'>" + prevMonth[prevMonth.length - (firstDay - j)] + "</div>"
                  row.appendChild(cell);
              } else if (date > daysInMonth(year, month)) { // 다음달력 날자
                  cell = document.createElement( "td" );
                  cell.innerHTML = "<div class='empty next-month'>" + nextMonth.shift() + "</div>"
                  row.appendChild(cell);
              } else { // 현재 달력
                  var holiday = holidayDate[month+'-'+date] ;
                  
                  function today(){
                    let today = new Date().getFullYear() + "-"+ (new Date().getMonth() + 1) + "-" + new Date().getDate()
                    return today === currentYear + "-" + currentMonth + "-" + date ? 'today' : ''
                  }
                  function selected(){
                    // return selectedDay === (currentYear + "-" + currentMonth + "-" + date) ? "on" : "";
                    return (year + "-" + month + "-" + d) === (currentYear + "-" + currentMonth + "-" + date) ? "on" : "";
                  }
                  function disabled(){
                    let case1 = new Date(currentYear, currentMonth-1, date) < new Date()  // ||  maxDisableDate > 0 ? new Date(currentYear + "-" + currentMonth + "-" + date) > new Date().setDate(new Date().getDate() + maxDisableDate) : ''
                    let case2 = disabledDate.includes(currentYear + "-" + currentMonth + "-" + date);
                    let case3 = maxDisableDate > 0 ? new Date(currentYear, currentMonth-1, date) > new Date().setDate(new Date().getDate() + maxDisableDate) : '';
                    let condition = calType === 'reserve' ? (case1 || case2 || case3) : case2;
                    
                    return condition ? true : false;
                  }
  
                  cell = document.createElement("td");
                  if(disabled() && !today()) cell.innerHTML = "<div class='disabled "+(holiday ? "holiday" : "")+"'><button disabled>"+ date +"<div class='txt'>" +  (holiday ? holiday : "") + "</div></button></div>"
                  else {
                    cell.innerHTML = "<div class='date "+selected()+(today() ? ' today' : '')+' '+(holiday ? "holiday" : "")+"' data-id="+currentYear+'-'+currentMonth+'-'+date+" onclick='calendarSelected(this, "+currentYear+", "+currentMonth+", "+date+")'><button>"+ date +"<div class='selected-txt'>"+ textType +"</div><div class='txt'>" + (holiday ? holiday : "") + "</div></button></div>"
                  }
                  row.appendChild(cell);
                  date++;
  
                  
              }
          }
  
          tbl.appendChild(row);
      }
  
    }
  

    tblHeader.innerHTML = days.map(day => "<th data-days='"+ day +"'>"+ day +"</th>").join("");
  
    showCalendar(currentYear, currentMonth, d);
  
    return {
      next : next,
      previous : previous,
      // showCalendar: showCalendar
    }
  }


