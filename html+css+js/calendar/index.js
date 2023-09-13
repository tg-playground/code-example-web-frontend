let globalCalendarYear = new Date().getFullYear();
let globalCalendarMonth = new Date().getMonth();

initCalendar();

function initCalendar() {
    const year = globalCalendarYear;
    const month = globalCalendarMonth;
    operateElementBySelector("#current-month", el => {
        el.innerHTML = year + "-" + String(month + 1).padStart(2, '0');
    });
    let firstDayOfMonth = getFirstDayOfMonth(year, month);
    let totalDays = getTotalDaysOfMonth(year, month)
    let weekday = firstDayOfMonth.getDay();
    if (weekday == 0) {
        weekday = 7;
    }
    let rows = Math.ceil((totalDays + weekday - 1) / 7);
    let calendarRow = `<div class="calendar-row">
                                    <div class="calendar-item"></div>
                                    <div class="calendar-item"></div>
                                    <div class="calendar-item"></div>
                                    <div class="calendar-item"></div>
                                    <div class="calendar-item"></div>
                                    <div class="calendar-item"></div>
                                    <div class="calendar-item"></div>
                                </div>`;

    operateElementBySelector(".calendar-row", el => el.remove());
    for (let i = 0; i < rows; i++) {
        operateElementBySelector("#calendar-wrapper", el => el.insertAdjacentHTML("beforeend", calendarRow));
    }
    console.log("totalDays: " + totalDays);
    let index = 1;
    operateElementBySelector(".calendar-item", (el) => {
        // console.log("index: " + index);
        if (index >= weekday && index <= totalDays + weekday - 1) {
            el.innerHTML = index - weekday + 1;
            if (index - weekday + 1 == new Date().getDate() &&
                year == new Date().getFullYear() &&
                month == new Date().getMonth()) {
                el.classList.add("today");
            }
        }
        index++;
    });
}

function submitSearch() {
    let yearmonth = document.querySelector("#yearmonth").value;
    console.log("yearmonth: " + yearmonth);
    if (yearmonth == null || yearmonth == "") {
        alert("Please input yearmonth");
        return;
    }
    if (!/^\d{4}-\d{2}$/.test(yearmonth)) {
        alert("Please input yearmonth like 'yyyy-MM'");
        return;
    }
    globalCalendarYear = parseInt(yearmonth.split("-")[0]);
    globalCalendarMonth = parseInt(yearmonth.split("-")[1]) - 1;
    initCalendar();
}

function operateElementBySelector(selector, func) {
    document.querySelectorAll(selector).forEach(el => func(el));
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
}

function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0);
}

function getTotalDaysOfMonth(year, month) {
    let lastDay = getLastDayOfMonth(year, month);
    return lastDay.getDate();
}

function getDateStr(year, month, day) {
    const totalLength = 2;
    return year + "-" + String(month).padStart(totalLength, '0') + "-" +
        String(day).padStart(totalLength, '0');
}
