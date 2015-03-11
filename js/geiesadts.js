
// e.g. all children filtered
function all(predicate){
  
}

// e.g. modify all children
function traverse(fab){
  
}

// find parent && push into children
function insert(child,parent){
  
}

// tree = empty || leaf || node
function empty(){
  var result = function(){}
  result.match = function(e,l,n){
    return e();
  }
  return result;
}

function leaf(item){
  var result = function(w){
    return w(item);
  }
  result.match = function(e,l,n){
    return l(item);
  }
  return result;
}

function node(item,children){
  var result = function(w){
    return w(item,children);
  }
  result.match = function(e,l,n){
    return n(item,children);
  }
  return result;
}

function item(tree){
  return tree.match(
    function(){ return null; },
    function(item){ return item; },
    function(item,children){ return item; }
  );
}

function children(tree){
  return tree.match(
    function(){ return null; },
    function(item){ return null; },
    function(item,children){ return children; }
  );
}

// count items
function count(tree){
  return tree.match(
    function(){ return 0; },
    function(item){ return 1; },
    function(item,children){ 
      return children.reduce(function(acc,curr){ 
        return acc + count(curr);
      },1);
    }
  );
}

function depth(tree){
  return tree.match(
    function(){ return 0; },
    function(item){ return 1; },
    function(item,children){
      return 1 + children.reduce(function(acc,curr){
        return Math.max(acc,depth(curr));
      },0);
    }
  );
}

// mutable
function newItem(name){
  return { name:function(){ return name}, filtered: false };
}

// TODO - create pseudo-mutable items using pure functions