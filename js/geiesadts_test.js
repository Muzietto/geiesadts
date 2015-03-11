
describe("an algebraic data structure", function () {
  beforeEach(function () {
    
  });
//  expect(minElem(res)).to.be.null;
//  expect(minElem(res)).to.be.equal(12);
//  expect(balanced(res)).to.be.true;

  describe("when is an empty||leaf||node tree", function () {
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

    it('may be traversed to fetch a specific node and/or leaf',function(){
      var leaf22 = leaf(sms);
      var subtree11 = node(route3,[
        leaf(sdk),
        leaf22
      ]);
      
      expect(children(subtree11).length).to.be.equal(2);
      expect(child(subtree11)(1)).to.be.equal(leaf22);
      expect(item(child(subtree11)(1)).name()).to.be.equal('sms');
      
      function child2nd(tree){
        return child(tree)(1);
      }
      expect(subtree(subtree1,child2nd)).to.be.equal(leaf2);
    });

    it('may be traversed to add a child to a specific parent node (MUTATION!!)',function(){
      var parent = child(child(tree1)(1))(0);
      expect(item(parent).name()).to.be.equal('conn1');
      expect(children(parent).length).to.be.equal(2);
      expect(count(tree1)).to.be.equal(12);

      // mutates tree1 && children(parent)
      insert(tree1,leaf(cp_telfort),parent);

      expect(count(tree1)).to.be.equal(13);
      expect(depth(tree1)).to.be.equal(6);
      expect(children(parent).length).to.be.equal(3);
    });

    it.skip('may be traversed to add a child to a specific CLONED parent node (PURE!!)',function(){
      var parent = child(child(tree1)(1))(0);
      expect(item(parent).name()).to.be.equal('conn1');
      expect(children(parent).length).to.be.equal(3);
      
      var tree2 = insertion(tree1,leaf(cp_kpn),parent);
      var clonedParent = child(child(tree2)(1))(0);

      expect(count(tree2)).to.be.equal(14);
      expect(depth(tree2)).to.be.equal(6);
      expect(children(parent).length).to.be.equal(3);
      expect(children(clonedParent).length).to.be.equal(4);
    });

    it('may be traversed to find the parent of a given child - EASY',function(){
      var leaf22 = leaf(sms);
      var subtree11 = node(route3,[
        leaf(sdk),
        leaf22
      ]);
      
      var foundParent = parent(subtree11,leaf22);
      expect(item(foundParent).name()).to.be.equal('route3');
    });
    it('may be traversed to find the parent of a given child - HARD',function(){
      var node_conn1 = child(child(tree1)(1))(0);
      var child1 = child(child(child(tree1)(1))(0))(2);
      
      var foundParent = parent(tree1,child1);
      expect(item(foundParent).name()).to.be.equal(item(node_conn1).name());
    });
  })
  
});

