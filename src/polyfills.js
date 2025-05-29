/* Polyfills for IE11 and older browsers */

// Promise and other ES6 features
import 'core-js/stable';

// Generator functions and async/await
import 'regenerator-runtime/runtime';

// Modern fetch API
import 'whatwg-fetch';

// IntersectionObserver for lazy loading
import 'intersection-observer';

// Import object-assign polyfill
import objectAssign from 'object-assign';

// Array.from polyfill
if (!Array.from) {
  Array.from = function(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };
}

// Object.assign polyfill
if (!Object.assign) {
  Object.assign = objectAssign;
}

// Add any other polyfills your application might need
console.log('Polyfills loaded for browser compatibility');