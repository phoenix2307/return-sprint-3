//
// let obj = {a: 1, b: 2}
//
// let obj2 = obj
// // obj.b = 10
//
// obj2.c = 3
// // obj2 = []
// // obj2 = {}
// console.log(obj)
// console.log(obj2)
// console.log(obj === obj2)
const foo = () => {
    if (true) {
        const message = 'Hello'
        return message
    }
}

console.log(foo()) // ReferenceError: message is not defined