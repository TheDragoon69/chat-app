var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var createdAt = new Date().toDateString()

        var message = generateMessage(from,text);

        // expect(message.createdAt).toBe('number');
        expect(message).toEqual({createdAt, from, text});
    });
});