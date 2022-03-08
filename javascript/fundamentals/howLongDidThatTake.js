// Number.prototype.isPrime = function() {
//     for( let i=2; i<=Math.sqrt(this); i++ ) {
//         if( this % i === 0 ) {
//             return false;
//         }
//     }
//     return true;
// }

// const { performance } = require('perf_hooks');
// const start = performance.now();
// let primeCount = 0;
// let num = 2; // for math reasons, 1 is considered prime
// while( primeCount < 1e6 ) {
//     if( num.isPrime() ) {
//         primeCount++;
//     }
//     num++;
// }
// console.log(`The 1,000,000th prime number is ${num-1}`);
// console.log(`This took ${performance.now() - start} milliseconds to run`);


// recursive
// const { performance } = require('perf_hooks');
// const startr = performance.now();
// function rFib( n ) {
//     if ( n < 2 ) {
//         return n;
//     }
//     return rFib( n-1 ) + rFib( n-2 );
// }
// let rfib20 = rFib(50);
// console.log(`The 20th number in the Fibonacci's sequence is ${rfib20}`);
// console.log(`This took ${performance.now() - startr} milliseconds to run`);

// iterative is faster
// const { performance } = require('perf_hooks');
// const start = performance.now();
// function iFib( n ) {
//     const vals = [ 0, 1 ];
//     while(vals.length-1 < n) {
//         let len = vals.length;
//         vals.push( vals[len-1] + vals[len-2] );
//     }
//     return vals[n];
// }
// let ifib20 = iFib(50);
// console.log(`The 20th number in the Fibonacci's sequence is ${ifib20}`);
// console.log(`This took ${performance.now() - start} milliseconds to run`);

// const { performance } = require('perf_hooks');
// const start = performance.now();
// const story = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident culpa nihil repellat nulla laboriosam maxime, quia aliquam ipsam reprehenderit delectus reiciendis molestias assumenda aut fugit tempore laudantium tempora aspernatur? Repellendus consequatur expedita doloribus soluta cupiditate quae fugit! Aliquid, repellat animi, illum molestias maiores, laboriosam vero impedit iusto mollitia optio labore asperiores!";
// const reversed1 = story.split("").reverse().join("");
// console.log(reversed1)
// console.log(`This took ${performance.now() - start} milliseconds to run`);

// const { performance } = require('perf_hooks');
// const start = performance.now();
// const story = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident culpa nihil repellat nulla laboriosam maxime, quia aliquam ipsam reprehenderit delectus reiciendis molestias assumenda aut fugit tempore laudantium tempora aspernatur? Repellendus consequatur expedita doloribus soluta cupiditate quae fugit! Aliquid, repellat animi, illum molestias maiores, laboriosam vero impedit iusto mollitia optio labore asperiores!";
// let reversed1 = ""
// for (let i = story.length; i >= 0; i--) {
//     reversed1 += story.charAt(i)
// }
// console.log(reversed1)
// console.log(`This took ${performance.now() - start} milliseconds to run`);

