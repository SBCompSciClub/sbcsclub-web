const alpha = 400;

module.exports = function(x, y){
    return - alpha / 10000 * (x * x + y * y) / 2;
}