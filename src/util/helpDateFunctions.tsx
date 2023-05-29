export function getDate(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const currentDate = new Date(date)
    const currentDateIndex = currentDate.getDay()

    return days[currentDateIndex]
}

export function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
    const choosenDay = new Date(date)
    const monthIndex = choosenDay.getMonth()
    return monthNames[monthIndex]
}