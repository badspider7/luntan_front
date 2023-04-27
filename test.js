let time = new Date()

// console.log(time);

// function localDate(v) {

//     const d = new Date(v || Date.now());
    
//     d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    
//     return d.toISOString();
    
// }
    

// console.log(localDate(time));

const moment = require('moment-timezone');
const createdAt = moment.utc(time).tz('Asia/Shanghai');
console.log(createdAt.format());