/*global describe, it */
'use strict';
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var index = require('../../../app/routes/index');

describe('Routes', () => {
    describe('GET Index', () => {
        it('should respond', () => {
            var req,res,spy;

            req = res = {};
            spy = sinon.spy();
            res.render = (path, opts) => {
                spy();
                expect(opts.testableProperty).to.equal(true);
                expect(opts.title).to.equal('The Test Page');
                expect(opts.pageTitle).to.equal('Welcome!');
                expect(opts.helpers.capitalise('Enjoy!')).to.equal('ENJOY!');
                expect(spy.calledOnce).to.equal(true);
            };
            index(req, res);
        });
    });
});
