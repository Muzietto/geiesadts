
var colombia = newItem('CO')

var pp_1_euro = newItem('1 euro');
var pp_2_euro = newItem('2 euro');
var pp_3_euro = newItem('3 euro');

var conn1 = newItem('conn1');
var conn2 = newItem('conn2');

var cp_vodafone = newItem('CP Vodafone');
var cp_telfort = newItem('CP Telfort');
var cp_kpn = newItem('CP KPN');
var cp_tmobile = newItem('CP T-Mobile');

var route1 = newItem('route1');
var route2 = newItem('route2');
var route3 = newItem('route3');
var route4 = newItem('route4');
var route5 = newItem('route5');

var sdk = newItem('sdk');
var sms = newItem('sms');
var desktop = newItem('desktop');

var leaf1 = leaf(cp_tmobile);
var leaf2 = leaf(sms);

var subtree1 = node(route3,[
  leaf(sdk),
  leaf2
]);

var tree1 = node(colombia,[
  leaf(pp_1_euro),
  node(pp_2_euro,[
    node(conn1,[
      node(cp_vodafone,[
        leaf(route1),
        leaf(route2),
        subtree1
      ]),
      leaf1
    ]),
    leaf(conn2)
  ])
]);

