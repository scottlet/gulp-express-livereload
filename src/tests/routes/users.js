/*global describe, it */
'use strict';
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var users = require('../../js/server/routes/users');

describe('Routes', function() {
    describe('GET Index', function() {
        it('should respond', function() {
            var req,res,spy;

            req = res = {};
            spy = res.send = sinon.spy();

            users(req, res);
            expect(spy.calledOnce).to.equal(true);
        });
    });
});
