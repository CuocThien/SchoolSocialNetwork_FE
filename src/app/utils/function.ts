import * as moment from "moment"

function getDaysToNow(date) {
    return Math.ceil(moment.duration(moment().diff(moment(date))).asDays())
}
export { getDaysToNow }