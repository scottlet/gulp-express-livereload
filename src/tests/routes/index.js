/*global describe, it */
'use strict';
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var index = require('../../js/server/routes/index');

describe('Routes', function() {
    describe('GET Index', function() {
        it('should respond', function() {
            var req,res,spy;

            req = res = {};
            spy = res.render = sinon.spy();

            index(req, res);
            expect(spy.calledOnce).to.equal(true);
        });
    });
});
