var PubSub = function(){
    this._listener = {};
}
PubSub.prototype = {
    constructor: this,
    addEvent:function(type, fn){
        if(!this._listener[type]){
            this._listener[type] = [];
        }
        typeof(fn) === 'function' && this._listener[type].push(fn);
    },
    fireEvent:function(type, scope){
        var realArguments = arguments;
        if(this._listener[type]){
            this._listener[type].forEach(function(fn){
                fn.apply(scope, [].slice.call(realArguments, 2));
            });
        }
    },
    removeEvent:function(type, fn){
        if(this._listener[type]){
            for (var i = 0, len = this._listener[type].length ; i < len; i++) {
                this._listener[type].splice(i,1);
            };
        }
    }
};


// function f1(){
//     console.log('f1');
// }

// function f2(p1, p2){
//     console.log(this);
//     console.log(this.name)
//     console.log('f2 -' + p1 +' -' + p2);
// }
// function Person(name){
//     this.name = name;
// }
// event = new MyEvent();
// event.addEvent('click', f1);
// event.addEvent('click', f2);
// event.fireEvent('click');
// event.removeEvent('click',f1);
// event.fireEvent('click', new Person('haha') ,'p1','p2');

// function DOMEvent(el){
//     this.el = el;
// }
// DOMEvent.prototype = {
//     constructor: this,
//     addEvent: function(type, fn){
//         this.el.addEventListener(type, fn, false);
//         var ev = document.createEvent('HTMLEvents');
//         ev.initEvent(type, false, false);
//         this.el['ev' + type] = ev;
//     },
//     fireEvent: function(type){
//         var ev =this.el['ev' + type];
//         if(ev){
//             this.el.dispatchEvent(ev);
//         }
//     }
// };
// var ele = document.querySelector('.test');
// new DOMEvent(ele).addEvent('alert', f1);
// new DOMEvent(ele).fireEvent('alert');

