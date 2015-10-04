/*
	GEIESADTS - JS Algebraic Data Structures
	Author: Marco Faustinelli (contacts@faustinelli.net)
	Web: http://faustinelli.net/
	     http://faustinelli.wordpress.com/
	Version: 1.0

	The Apache v.2 License - Copyright (c) 2014-2015 Geiesadts Project
*/
////////// TREE ////////////

// e.g. all children filtered
function all(predicate) {
}

// e.g. modify all children
function traverse(fab) {
}

// find && return cloned parent
var parent = (tree, child, prevParent) => tree.match(
    () => {},
    (i) => (prevParent && (i.name() === item(child).name())) ? prevParent : undefined,
    (i, cs) => (prevParent && (i.name() === item(child).name())) 
                ? prevParent 
                : cs.reduce((acc, curr) => acc || parent(curr, child, node(i, cs)), null)
  );

// recognize parent, push child into children - mutation!!!
function insert(tree, child, parent) {
  tree.match(
    function() {},
    function(i) {}, // TODO - handle case when parent is still a leaf
    function(i, cs) {
      if (i.name() === item(parent).name()) {
        cs.push(child);
        return;
      }
      cs.forEach(function(c) { // TODO - exit loop after insert
        insert(c, child, parent);
      });
    }
  );
}

// recognize parent, clone, push child into children - pure!!
function insertion(tree, child, parent) {
  return tree; // TODO - complete me!
}

// tree = empty || leaf || node
var empty = () => builder()(
  () => {},
  (e, l, n) => e()
);

var leaf = item => builder(item)(
  w => w(item),
  (e, l, n) => l(item)
);

var node = (item, children) => builder(item, children)(
  w => w(item, children),
  (e, l, n) => n(item, children)
);

var builder = (item, children) => (character, match) => {
  var result = character;
  result.match = match;
  return result;
}

var item = tree => tree.match(
    () => null,
    (i) => i,
    (i, cs) => i
);

var children = tree => tree.match(
    () => null,
    item => null,
    (item, children) => children
);

var child = tree => pos => children(tree)[pos];

var subtree = (tree, navigation) => navigation(tree);

// count items
function count(tree) {
  return tree.match(
    function() { return 0; },
    function(item) { return 1; },
    function(item, children) {
      return children.reduce(function(acc, curr) { 
        return acc + count(curr);
      },1);
    }
  );
}

function depth(tree) {
  return tree.match(
    function() { return 0; },
    function(item) { return 1; },
    function(item, children) {
      return 1 + children.reduce(function(acc, curr) {
        return Math.max(acc, depth(curr));
      },0);
    }
  );
}

////////// MAYBE ////////////
function some(item) {
  if (item === null
   || item === NaN
   || item === Infinity
   || typeof item === 'undefined') {
    return none();
  }
  var result = function(w) {
    return w(item);
  }
  result.match = function(s, n) {
    return s(item);
  }
  return result;
}

function none() {
  var result = function(w) {
    return w();
  }
  result.match = function(s, n) {
    return n();
  }
  return result;
}

function maybe_fmap(maybe, fab) {
  return maybe.match(
    function(i) { 
      try {
        return some(fab(i));
      } catch (e) {
        return none();
      }
    },
    function() { return maybe; }
  );
}

function isSome(maybe) {
  return maybe.match(
    function() { return true; },
    function() { return false; }
  );
}
function isNone(maybe) {
  return maybe.match(
    function() { return false; },
    function() { return true; }
  );
}

////////// EITHER /////////////
function left(error) {
  var result = function(w) {
    return w(error);
  }
  result.match = function(l, r) {
    return l(error);
  }
  return result;
}

function right(value) {
  var result = function(w) {
    return w(value);
  }
  result.match = function(l, r) {
    return r(value);
  }
  return result;
}

function either_fmap(either, fab) {
  return either.match(
    function() { return either; },
    function(value) {
      try {
        return right(fab(value));
      } catch (error) {
        return left(error);
      }
    }
  );
}

function isLeft(either) {
  return either.match(
    function() { return true; },
    function() { return false; }
  );
}
function isRight(either) {
  return either.match(
    function() { return false; },
    function() { return true; }
  );
}

// mutable thing
function newItem(name) {
  return { name:function() { return name}, filtered: false };
}
// TODO - create pseudo-mutable items using pure functions