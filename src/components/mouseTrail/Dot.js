
export default class Dot {
    
    constructor(className, offset){
        this.x = 100;
        this.y = 100;
        
        var n = document.createElement("div");
        n.className = className
        document.body.appendChild(n);
        n.style.position = "fixed"
        this.node = n;
        this.offset = offset;
    }

    draw() {
        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";
    }
}
