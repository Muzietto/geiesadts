
describe("an algebraic data structure", function () {
  beforeEach(function () {
    
  });
//  expect(minElem(res)).to.be.null;
//  expect(minElem(res)).to.be.equal(12);
//  expect(balanced(res)).to.be.true;

  describe("when is a tree", function () {
    beforeEach(function () {

    });
    it('may be traversed to count its items', function () {
      expect(count(empty())).to.be.equal(0);
      expect(count(leaf(123))).to.be.equal(1);
      expect(count(node('asd',[leaf(123)]))).to.be.equal(2);
      expect(count(tree1)).to.be.equal(12);
    });

    it('may be traversed to measure its depth', function () {
      expect(depth(empty())).to.be.equal(0);
      expect(depth(leaf(123))).to.be.equal(1);
      expect(depth(node('asd',[leaf(123)]))).to.be.equal(2);
      expect(depth(tree1)).to.be.equal(6);
    });
    
  })
  
});

