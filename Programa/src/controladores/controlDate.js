function getDateToday() {
    const date = new Date(Date.now());
    const text = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return text;
}

function getDatePlusDays(days) {
    const date = new Date(Date.now());
    date.setDate(date.getDate() + 5);
    const text = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return text;
}

module.exports = {
    getDatePlusDays,
    getDateToday
};