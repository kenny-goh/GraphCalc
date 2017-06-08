//var math = require('../math.js');

/**
 * 
 */
class GraphCalcModel {
    constructor() {
        this._listeners = [];
        this._expr = "";
        this._x = 0
        this._y = 0;   
        this._min_x = -100
        this._max_x = 100
        this._min_y = -100
        this._max_y = 100
        this._x_unit = 10
        this._y_unit = 10
    }

    setExpression(expr) {
        try {
            this._expr = expr
            var node = math.parse(expr);      
            this._code = node.compile();  
            this.fireExpressionChangedEvent(this);
        } 
        catch (err) {
            throw "Invalid expression"
        }
    }

    setSetting(min_x,max_x,min_y,max_y,x_unit) {
        this._min_x = min_x;
        this._max_x = max_x;
        this._min_y = min_y;
        this._max_y = max_y;
        this._x_unit = x_unit;
        this._y_unit = y_unit;
        this.fireSettingChangedEvent;
    }

    setX(x) {
        this._x = x;
        this._y = 13;
        var scope = {
            x: this._x
        };
        this._code.eval(scope); 
        this._y = scope.y
        this.fireModelChangedEvent(this)
    }

    getY() {
        return this._y;
    }

    getMinY() {
        return this._min_y;
    }

    getMaxY() {
        return this._max_y;
    }

    getMinX() {
        return this._min_x;
    }
    
    getMaxX() {
        return this._max_x;
    }

    getXUnit() {
        return this._x_unit;
    }

    getYUnit() {
        return this._y_unit;
    }

    registerListener(listener) {
        this._listeners.push(listener);
    }

    fireExpressionChangedEvent() {
        for (let each of this._listeners) {
            each.onExpressionChange(this);
        }
    }


    fireModelChangedEvent() {
        for (let each of this._listeners) {
            each.onModelChange(this);
        }    
    }

    fireSettingChangedEvent() {
        for (let each of this._listeners) {
            each.onSettingChange(this);
        }    
    }
}

/**
 * 
 */
class GraphCalcView {
    constructor(model) {
        model.registerListener(this);
    }

    onModelChange(model) {}
    onSettingchanged(model) {}

    onExpressionChange(model) {
        
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var width = canvas.width
        var height = canvas.height

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        ctx.lineWidth="1";

        ctx.strokeStyle="black"; 

        ctx.beginPath();  

        ctx.moveTo(0,0);
        ctx.lineTo(0,height);
        ctx.stroke();
       
        ctx.moveTo(width,0);
        ctx.lineTo(width,height);
        ctx.stroke();
      
        ctx.moveTo(0,0);
        ctx.lineTo(width,0);
        ctx.stroke();

        ctx.moveTo(0,height);
        ctx.lineTo(width,height);
        ctx.stroke();

        ctx.moveTo(width/2,0);
        ctx.lineTo(width/2,height);
        ctx.stroke();

        ctx.moveTo(0,height/2);
        ctx.lineTo(width,height/2);
        ctx.stroke();

        ctx.font = "12px Arial";
        var x_offset=5 
        var y_offset=5
        ctx.fillText("0",(width/2)+x_offset,(height/2)-y_offset);

        var x_offset=30 
        var y_offset=5
        ctx.fillText(model.getMaxX(),(width)-x_offset,(height/2)-y_offset);

        var x_offset=5
        var y_offset=5
        ctx.fillText(model.getMinX(),0+x_offset,(height/2)-y_offset);
  
        var x_offset=5
        var y_offset=15
        ctx.fillText(model.getMinX(),(width/2)+x_offset,y_offset);
   
        var x_offset=5
        var y_offset=10
        ctx.fillText(model.getMinX(),(width/2)+x_offset,height-y_offset);

        var x_size = model.getMaxX() - model.getMinY();
        var y_size = model.getMaxY() - model.getMinY();

        var x_unit = model.getXUnit()
        var y_unit = model.getYUnit()

        for (var x = 0; x < x_size; x+=x_unit) {

            var pos_x = (( x / x_size ) * width) 
            var pos_y = -(( y / y_size ) * height) 

            ctx.moveTo(pos_x +0.5,0 +0.5);
            ctx.lineTo(pos_x +0.5,height+0.5);
            ctx.stroke();
        }
  
        for (var y = 0; y < y_size; y+=y_unit) {
            
            var pos_x = (( x / x_size ) * width) 
            var pos_y = (( y / y_size ) * height)

            ctx.moveTo(0+0.5,pos_y+0.5);
            ctx.lineTo(width+0.5,pos_y+0.5);
            ctx.stroke();
        }


        ctx.lineWidth="3";
        ctx.strokeStyle="green"; 

        var prev_x =0
        var prev_y =0
        for (var x = model.getMinX(); x < model.getMaxX(); x++) {   
    
            model.setX(x);
            var y = model.getY()

            var range_x = model.getMaxX() - model.getMinX();
            var range_y = model.getMaxY() - model.getMinY();
            
            var pos_x = (( x / range_x ) * width) + width/2
            var pos_y = -(( y / range_y ) * height) + height/2

            ctx.beginPath();
                          
            ctx.moveTo(prev_x,prev_y);
            ctx.lineTo(pos_x,pos_y);
            ctx.stroke();

            prev_x = pos_x
            prev_y = pos_y
        }

    }
}


//module.exports = { GraphCalcView, GraphCalcModel }
