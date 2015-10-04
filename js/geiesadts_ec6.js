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
var all = (tree, predicate) => { /* implement me */ }

// e.g. modify all children
var traverse = (tree, fab) => { /* implement me */ }

// find && return cloned parent
var parent = (tree, child, prevParent) => tree.match(
  () => {},
  (i) => (prevParent && (i.name() === item(child).name())) ? prevParent : undefined,
  (i, cs) => (prevParent && (i.name() === item(child).name())) 
              ? prevParent 
              : cs.reduce((acc, curr) => acc || parent(curr, child, node(i, cs)), null)
);

// recognize parent, push child into children - mutation!!!
var insert = (tree, child, parent) => tree.match(
  () => {},
  (i) => {}, // TODO - handle case when parent is still a leaf
  (i, cs) => {
    if (i.name() === item(parent).name()) {
      cs.push(child);
      return;
    }
    cs.forEach(c => insert(c, child, parent)); // TODO - exit loop after insert
  }
);


// recognize parent, clone, push child into children - pure!!
var insertion = (tree, child, parent) => tree; // TODO - complete me!

// tree = empty || leaf || node
var empty = () => builder()(() => {}, (e, l, n) => e());

var leaf = item => builder(item)(w => w(item), (e, l, n) => l(item));

var node = (item, children) => builder(item, children)(w => w(item, children), (e, l, n) => n(item, children));

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
var count = tree => tree.match(
  () => 0,
  item => 1,
  (item, children) => children.reduce((acc, curr) => acc + count(curr),1)
);

var depth = tree => tree.match(
  () => 0,
  item => 1,
  (item, children) => 1 + children.reduce((acc, curr) => Math.max(acc, depth(curr)),0)
);

////////// MAYBE ////////////
var some = item => {
  if (item === null
   || item === NaN
   || item === Infinity
   || typeof item === 'undefined') {
    return none();
  }
  return builder(item)(w => w(item), (s, n) => s(item));
}

var none = () => builder()(w => w(), (s, n) => n());

var maybe_fmap = (maybe, fab) => maybe.match(
  i => tryCatch(() => some(fab(i)), () => none()),
  () => maybe
);

var tryCatch = (tryClause, catchClause) => {
  try {
    return tryClause();
  } catch (e) {
    return catchClause(e);
  }
}

var isSome = maybe => maybe.match(() => true, () => false);
var isNone = maybe => maybe.match(() => false, () => true);

////////// EITHER /////////////
var left = error => builder()((w) => w(error), (l, r) => l(error));
var right = value => builder()((w) => w(value), (l, r) => r(value));

var either_fmap = (either, fab) => either.match(
  () => either,
  value => tryCatch(() => right(fab(value)), (error) => left(error))
);

var isLeft = either => either.match(() => true, () => false);
var isRight = either => either.match(() => false, () => true);

// mutable thing
var newItem = name => ({ name : () => name, filtered : false });

// TODO - create pseudo-mutable items using pure functions