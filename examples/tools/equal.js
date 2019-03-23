// Equal 比较2个对象是否相等

// +0 与 -0 
+0 === -0  // true
(-0).toString()  // '0'
(+0).toString()  // '0'
-0 < +0 // false
-0 > +0 // false

1 / +0 // Infinity
1 / -0 // -Infinity

1 / +0 === 1 / -0 // false

function equals(a, b) {
	if(a === b) return a !== 0 ||  1 / a === 1 / b 
	return false
}

// NaN 自己与自己也不相等
function equals(a, b) {
	if(a !== a) return b !== b
}

