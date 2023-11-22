/** @format */

const dateFomat = require('moment');
require('moment/locale/vi');

export default {
    formatDate: (date:any) => dateFomat(date).fromNow(),
    formatDMY: (date:any) => dateFomat(date).format('D, MMMM YYYY'),
    countDay:(date:any)=>{
        let dayCreated = dateFomat(date);
        let dayNow = dateFomat().startOf('day');
        return Math.round(dateFomat.duration(dayNow - dayCreated).asDays());
    }
//     MonthandYear: (date:any) => dateFomat(date).format('MMM[, ‘]YYYY'),
//     FormatMonth: (date:any) => dateFomat(date).format('MMM'),
};