var expect = require('chai').expect;
const { filterUndefinedParam } = require('../../dist/lib/doraemon-utils');



describe('Object', function() {
  describe('#filterUndefinedParam', function() {
    it('6个假的布尔值', function() {
      const obj = {
        a: '',
        b: false,
        c: null,
        d: undefined,
        e: NaN,
        f: 0,
      };
      filterUndefinedParam(obj);
      expect(obj).to.not.have.property('a');
      expect(obj).to.not.have.property('b');
      expect(obj).to.not.have.property('c');
      expect(obj).to.not.have.property('d');
      expect(obj).to.not.have.property('e');
      expect(obj).to.not.have.property('f');
    });


    it('6个假的布尔值 部分个真的布尔值', function() {
      const obj = {
        a: '',
        b: false,
        c: null,
        d: undefined,
        e: NaN,
        f: 0,
        g: 444,
        h: 'NaN',
        i: '0',
      };
      filterUndefinedParam(obj);
      expect(obj).to.not.have.property('a');
      expect(obj).to.not.have.property('b');
      expect(obj).to.not.have.property('c');
      expect(obj).to.not.have.property('d');
      expect(obj).to.not.have.property('e');
      expect(obj).to.not.have.property('f');


      expect(obj).to.have.property('g', 444);
      expect(obj).to.have.property('h', 'NaN');
      expect(obj).to.have.property('i', '0');
    });


    it('使用 filter ignoredKeys', function() {
      const obj = {
        id: 0,
      };
      const filter = {
        ignoredKeys: ['id'],
      }
      // ignoredKeys?: String[];
      // overrideRules?: String[];
      filterUndefinedParam(obj, filter );
      expect(obj).to.have.property('id', 0);
    });

    it('使用 filter overrideRules ', function() {
      const obj = {
        id: 'test',
        uid: 'test'
      };
      const filter = {
        overrideRules: ['test']
      }
      // ignoredKeys?: String[];
      // overrideRules?: String[];
      filterUndefinedParam(obj, filter );
      expect(obj).to.not.have.property('id');
      expect(obj).to.not.have.property('uid');
    });

    it('使用 filter excludeKeyValues ', function() {
      const obj = {
        id: 'tanghao',
        name: 'tanghao',
      };
      const filter = {
        overrideRules: ['tanghao'],
        excludeKeyValues: {
          name: 'tanghao'
        }
      }
      filterUndefinedParam(obj, filter);
      expect(obj).to.not.have.property('id');
      expect(obj).to.have.property('name', 'tanghao');
    });

  });
});
