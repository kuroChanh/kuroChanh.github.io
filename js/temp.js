var greeting = /** @class */ (function () {
    function greeting() {
    }
    //variables
    //functions
    greeting.prototype.greet = function () {
        console.log("Husband Henry");
    };
    return greeting;
}());
var obj = new greeting();
obj.greet();
