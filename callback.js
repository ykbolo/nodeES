function count(index,callback) {
    return callback(index,index+1)
}
function number(a,b) {
    console.log(a+b)
    return a+b
}
count(1,number)