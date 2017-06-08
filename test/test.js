
var assert = require('assert');
var graphcalc = require('../graphcalc')

 describe('testcase 1', () => {
      it('simple expression y=x+3', () => {
        var model = new graphcalc.GraphCalcModel();
        var view = new graphcalc.GraphCalcView(model);
        model.setExpression("y=x+3");
        model.setX(10);
        assert.equal(model.getY(), 13)
      });
  });


 describe('testcase 2', () => {
      it('simple expression y=x+3 iterated over a for loop', () => {
        var model = new graphcalc.GraphCalcModel();
        var view = new graphcalc.GraphCalcView(model);
        model.setExpression("y=x+3");
        for (var i = 0; i < 100; i++) {
          model.setX(i);
          assert.equal(model.getY(), i+3)
        }
      });
  });

   describe('testcase 3', () => {
      it('quadratic expression y=x^2', () => {
        var model = new graphcalc.GraphCalcModel();
        var view = new graphcalc.GraphCalcView(model);
        model.setExpression("y=x^2+x");
        model.setX(2);
        assert.equal(model.getY(), 6)
      });
  });