/*! thrill - v0.3.0 - 2013-01-13
* Copyright (c) 2013 Ozan Turgut; Licensed Apache License 2.0 */
thrill=function(){var e=function(e,t){return e.exports=t,t.TESTER_MESSAGE_TYPE={start:1,end:2,"suite start":3,"suite end":4,"test start":5,"test end":6,batch:7},e.exports}({},{}),t=function(t,n){function s(e){this.isStreaming=!/(?:\?|\&)disableStream=true(.*)(?:\&|$)/.test(window.location.search)&&!window.THRILL_STREAM_DISABLE,this.batch=[],this.socket=e}t.exports=n;var r=e.TESTER_MESSAGE_TYPE,i=t.exports=function(e){e=e||window.queenSocket||function(){var e=window.location.search.match(/(?:\?|\&)queenSocketId=(.*)(?:\&|$)/);if(!e)throw new ReferenceError("Unable to find queen socket id in the url.");return window.parent.iframeSockets[e[1]]}();var t=new s(e);return t};return s.prototype.sendToSocket=function(e){this.isStreaming?this.socket(e):(this.batch.push(e),e[0]===r.end&&this.socket([r.batch,this.batch]))},s.prototype.start=function(e){this.sendToSocket([r.start,e])},s.prototype.suite=function(e){this.sendToSocket([r["suite start"],e])},s.prototype.test=function(e){this.sendToSocket([r["test start"],e])},s.prototype.testEnd=function(e){this.sendToSocket([r["test end"],e])},s.prototype.suiteEnd=function(e){this.sendToSocket([r["suite end"],e])},s.prototype.end=function(e){if(!e||e.passed===void 0)throw new TypeError('A "passed" variable is required to end the test');this.sendToSocket([r.end,e])},t.exports}({},{}),n=function(e,t){function r(e,t,n){var r=0,i=e.length;for(;r<i;r++)t.call(n,e[r],r,e)}function i(e,t,n){var r;for(r in e)e.hasOwnProperty(r)&&t.call(n,e[r],r,e)}function o(e,t,n){var r=0,i=e.length,s=[];for(;r<i;r++)s.push(t.call(n,e[r],r,e));return s}function u(e,t,n){var r,i={};for(r in e)e.hasOwnProperty(r)&&(i[r]=t.call(n,e[r],r,e));return i}function f(e,t,n){var r=0,i=e.length,s=[];for(;r<i;r++)t.call(n,e[r],r,e)&&s.push(e[r]);return s}function l(e,t,n){var r,i={};for(r in e)e.hasOwnProperty(r)&&t.call(n,e[r],r,e)&&(i[r]=e[r]);return i}e.exports=t;var n=t.noop=function(){},s=t.each=function(e,t,n){return e instanceof Array?r.apply(void 0,arguments):i.apply(void 0,arguments)},a=t.map=function(e,t,n){return e instanceof Array?o.apply(void 0,arguments):u.apply(void 0,arguments)},c=t.filter=function(e,t,n){return e instanceof Array?f.apply(void 0,arguments):l.apply(void 0,arguments)},h=t.values=function(e){var t=[];return i(e,function(e){t.push(e)}),t},p=t.keys=function(e){var t=[];return i(e,function(e,n){t.push(n)}),t},d=t.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}};return e.exports}({},{}),r=function(e,r){function u(e){var t=e.message||"",n=e.source;return e.result?t:(e.expected&&(t+=" (Expected: "+e.expected+", Actual: "+e.actual+")"),n&&(n=n.split(/\n/g),n=s.filter(n,function(e,t,n){return~e.indexOf("/qunit.js")?!1:(n[t]=e.replace(/\(.*\/g\/.*?\//,"(").replace(/\?queenSocketId=([\w\-])*/,""),!0)}),t+=(t?"\n":"")+n.join("\n")),t)}e.exports=r;var i=t,s=n,o=e.exports=function(e){e=e||{};var t=e.qunit||window.QUnit,n=e.thrill||i(),r,s;t.begin(function(){n.start({type:"qunit"})}),t.moduleStart(function(e){n.suite({name:e.name})}),t.testStart(function(e){n.test({name:e.name,suiteName:e.module}),r=+(new Date),s=[]}),t.log(function(e){e.result||s.push(u(e))}),t.testDone(function(e){var t=+(new Date)-r;n.testEnd({name:e.name,suiteName:e.module,passCount:e.passed,failCount:e.failed,runtime:t,log:s.join("\n")})}),t.moduleDone(function(e){n.suiteEnd({name:e.name,failCount:e.failed,passCount:e.passed})}),t.done(function(e){n.end({passed:e.failed===0,total:e.total,passCount:e.passed,failCount:e.failed,runtime:e.runtime}),r=null,s=null})};return(typeof THRILL_MANUAL=="undefined"||!THRILL_MANUAL)&&o(),e.exports}({},{});return r}();