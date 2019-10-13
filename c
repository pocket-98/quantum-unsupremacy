function decbin(x, y) {
    var first = Number(x).toString(2), second = Number(y).toString(2);

    first = "0000".substr(first.length) + first;
    second = "0000".substr(second.length) + second;
    return classicAdder(first, second);
}

// helper methods

// flips a bit
function not(x) {
    return x === 1 ? 0 : 1;
}

// will only return 1 if both are 1
function and(x, y) {
    return x + y < 2 ? 0 : 1;
}

// will only return 0 if both bits are 1
function nand(x, y) {
    return not(and(x, y));
}

// will only return 0 if both are bits are 0
function or(x, y) {
    return nand(nand(x,x), nand(y,y));
}

// will return 0 if both bits are the same
function xor(x, y) {
    return nand(nand(nand(x,y), x), nand(nand(x,y), y));
}

// compares two bits and returns a carry and the sum
function simpleAdd(x, y) {
    return {
        carryOver: and(x, y), sum: xor(x, y)
    };
}

// compares two bits first, then factors in any carrys
function complexAdd(x, y, z) {
    var val1 = simpleAdd(x, y);
    var val2 = simpleAdd(val1.sum, z);
    return {
        carryOver: or(val1.carryOver, val2.carryOver), sum: val2.sum
    };
}

// adds any 4 bit binary values
function classicAdder(x, y) {
    console.log(x);
  	console.log(y);
    var inX = Array(4), inY = Array(4), out = Array(4), i = 4, pass;

    for(i = 0; i < x.length; i++) {
        inX[i] = x[i] != 1 ? 0 : 1;
        inY[i] = y[i] != 1 ? 0 : 1;
    }

    // connect the bit blocks
    pass = simpleAdd(inX[3], inY[3]);
    out[3] = pass.sum;
    pass = complexAdd(inX[2], inY[2], pass.carryOver);
    out[2] = pass.sum;
    pass = complexAdd(inX[1], inY[1], pass.carryOver);
    out[1] = pass.sum;
    pass = complexAdd(inX[0], inY[0], pass.carryOver);
    out[0] = pass.sum;

    // if result needs a fifth bit will add it
    if(pass.carryOver){
    	out = out.join('');
    	return out = "1" + out;
    }

    return out.join('');
}
