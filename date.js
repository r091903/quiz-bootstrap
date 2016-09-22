var date = new Date();
var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
var id=""+date.getDate()+monthShortNames[date.getMonth()]+date.getFullYear()+date.getHours()+date.getMinutes()+date.getSeconds();
// console.log(date.getDate());
// console.log(monthShortNames[date.getMonth()]);
// console.log(date.getFullYear());
var n = date.getHours();
var m = date.getMinutes();
var s=date.getSeconds();
console.log(n);
console.log(m);
console.log(s);
console.log(id);
