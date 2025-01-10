//////////// variables ///////////
//const = variable cant be changed
//let = variable can be changed
const x = 1
let y = 5

console.log(x, y)   // 1, 5 are printed
y += 10
console.log(x, y)   // 1, 15 are printed
y = 'sometext'
console.log(x, y)   // 1, sometext are printed
x = 4               // causes an error

//////////// Arrays ///////////
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

//Used for iteration through items of an array 
t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each on its own line
})     

//////////// Pushing number in array in React Code ///////////
const L = [1, -1, 3]

const l2 = L.concat(5)  // creates new array

console.log(L)  // [1, -1, 3] is printed
console.log(l2) // [1, -1, 3, 5] is printed

//The method call t.concat(5) does not add a new item 
// to the old array but returns a new array which, 
// besides containing the items of the old array, 
// also contains the new item.

//////////// Map method ///////////
const k = [1, 2, 3]

const m1 = k.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed

//////////// Objects ///////////
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5,
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}

//////////// Functions ///////////
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

///////////////// Object Methods and ""This"/////////////
//Losing track of this when writing JavaScript code brings forth a few potential issues.
// Bind >> This
//There are no classes mechanism in Javascript like OOP in c++
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },

  doAddition: function(a, b) {
    console.log(a + b)
  },
}

arto.doAddition(1, 4)        // 5 is printed

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed

//JavaScript essentially only defines the types Boolean, Null, Undefined, Number, String, Symbol, BigInt, and Object.
// Hooks(feature of react) >> Classes
