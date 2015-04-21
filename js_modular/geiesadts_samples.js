
define(["require", "exports", './geiesadts'], (function(require, exports, adts) {
  "use strict";
  
  var newItem = adts.newItem;
  var leaf = adts.leaf;
  var node = adts.node;

  var colombia = newItem('CO')

  var pp_1_euro = newItem('1 euro');
  var pp_2_euro = newItem('2 euro');
  var pp_3_euro = newItem('3 euro');

  var conn1 = newItem('conn1');
  var conn2 = newItem('conn2');

  var cp_vodafone = newItem('CP Vodafone');
  (exports['cp_vodafone'] = cp_vodafone);
  var cp_telfort = newItem('CP Telfort');
  (exports['cp_telfort'] = cp_telfort);
  var cp_kpn = newItem('CP KPN');
  (exports['cp_kpn'] = cp_kpn);
  var cp_tmobile = newItem('CP T-Mobile');
  (exports['cp_tmobile'] = cp_tmobile);

  var route1 = newItem('route1');
  var route2 = newItem('route2');
  var route3 = newItem('route3');
  (exports['route3'] = route3);
  var route4 = newItem('route4');
  var route5 = newItem('route5');

  var sdk = newItem('sdk');
  (exports['sdk'] = sdk);
  var sms = newItem('sms');
  (exports['sms'] = sms);
  var desktop = newItem('desktop');
  (exports['desktop'] = desktop);

  var leaf1 = leaf(cp_tmobile);
  (exports['leaf1'] = leaf1);
  var leaf2 = leaf(sms);
  (exports['leaf2'] = leaf2);

  var subtree1 = node(route3,[
    leaf(sdk),
    leaf2
  ]);
  (exports['subtree1'] = subtree1);


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
  (exports['tree1'] = tree1);

}));