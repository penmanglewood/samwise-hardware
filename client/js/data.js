
var testData = [
  {
"timestamp":1461677784568, "value":689},
  {
"timestamp":1461677788561, "value":512},
  {
"timestamp":1461677777311, "value":851},
  {
"timestamp":1461677780537, "value":456},
  {
"timestamp":1461677840676, "value":118},
  {
"timestamp":1461677844689, "value":270},
  {
"timestamp":1461677832667, "value":670},
  {
"timestamp":1461677836764, "value":353},
  {
"timestamp":1461677856733, "value":680},
  {
"timestamp":1461677860741, "value":50},
  {
"timestamp":1461677848701, "value":936},
  {
"timestamp":1461677852712, "value":677},
  {
"timestamp":1461677800594, "value":748},
  {
"timestamp":1461677804578, "value":171},
  {
"timestamp":1461677792570, "value":375},
  {
"timestamp":1461677796580, "value":447},
  {
"timestamp":1461677816634, "value":236},
  {
"timestamp":1461677820657, "value":657},
  {
"timestamp":1461677808668, "value":204},
  {
"timestamp":1461677812609, "value":563},
  {
"timestamp":1461678025245, "value":770},
  {
"timestamp":1461678029226, "value":397},
  {
"timestamp":1461678017192, "value":260},
  {
"timestamp":1461678021191, "value":905},
  {
"timestamp":1461678041288, "value":439},
  {
"timestamp":1461678045285, "value":465},
  {
"timestamp":1461678033269, "value":442},
  {
"timestamp":1461678037276, "value":76},
  {
"timestamp":1461677993158, "value":389},
  {
"timestamp":1461677997150, "value":418},
  {
"timestamp":1461677985126, "value":338},
  {
"timestamp":1461677989110, "value":73},
  {
"timestamp":1461678009195, "value":372},
{
"timestamp":1461678013193, "value":356},
  {
"timestamp":1461678001158, "value":122},
  {
"timestamp":1461678005172, "value":898},
  {
"timestamp":1461678089462, "value":421},
  {
"timestamp":1461678093460, "value":667},
  {
"timestamp":1461678081358, "value":487},
  {
"timestamp":1461678085358, "value":905},
  {
"timestamp":1461678105540, "value":632},
  {
"timestamp":1461678109467, "value":258},
  {
"timestamp":1461678097452, "value":521},
  {
"timestamp":1461678101469, "value":793},
  {
"timestamp":1461678057315, "value":904},
  {
"timestamp":1461678061318, "value":893},
  {
"timestamp":1461678049295, "value":791},
  {
"timestamp":1461678053314, "value":942},
  {
"timestamp":1461678073325, "value":176},
  {
"timestamp":1461678077381, "value":202},
  {
"timestamp":1461678065305, "value":739},
  {
"timestamp":1461678069336, "value":934},
  {
"timestamp":1461677896915, "value":206},
  {
"timestamp":1461677901128, "value":305},
  {
"timestamp":1461677892876, "value":171},
  {
"timestamp":1461677893050, "value":566},
  {
"timestamp":1461677912977, "value":238},
  {
"timestamp":1461677916986, "value":746},
  {
"timestamp":1461677904954, "value":779},
  {
"timestamp":1461677908962, "value":500},
  {
"timestamp":1461677872827, "value":880}
];

testData = testData.sort(function (a, b) {
  if (a.timestamp > b.timestamp) {
    return 1;
  }
  if (a.timestamp < b.timestamp) {
    return -1;
  }
  // a must be equal to b
  return 0;
})

var data1 = [
{ 
  date:"1-May-12",
  close:58.13 
},
{ 
  date:"30-Apr-12",
  close:53.98
},
{ 
  date:"27-Apr-12",
  close:67.00
},
{ 
  date:"26-Apr-12",
  close:89.70
},
{ 
  date:"25-Apr-12",
  close:99.00
},
{ 
  date:"24-Apr-12",
  close:130.28
},
{ 
  date:"23-Apr-12",
  close:166.70
},
{ 
  date:"20-Apr-12",
  close:234.98
},
{ 
  date:"19-Apr-12",
  close:345.44
},
{ 
  date:"18-Apr-12",
  close:443.34
},
{ 
  date:"17-Apr-12",
  close:543.70
},
{ 
  date:"16-Apr-12",
  close:580.13
},
{ 
  date:"13-Apr-12",
  close:605.23
},
{ 
  date:"12-Apr-12",
  close:622.77
},
{ 
  date:"11-Apr-12",
  close:626.20
},
{ 
  date:"10-Apr-12",
  close:628.44
},
{ 
  date:"9-Apr-12",
  close:636.23
},
{ 
  date:"5-Apr-12",
  close:633.68
},
{ 
  date:"4-Apr-12",
  close:624.31
},
{ 
  date:"3-Apr-12",
  close:629.32
},
{ 
  date:"2-Apr-12",
  close:618.63
},
{ 
  date:"30-Mar-12",
  close:599.55
},
{ 
  date:"29-Mar-12",
  close:609.86
},
{ 
  date:"28-Mar-12",
  close:617.62
},
{ 
  date:"27-Mar-12",
  close:614.48
},
{ 
  date:"26-Mar-12",
  close:606.98
}];

var data2 = [
{ 
  date:"1-May-12",
  close:58.13 
},
{ 
  date:"30-Apr-12",
  close:53.98
},
{ 
  date:"27-Apr-12",
  close:67.00
},
{ 
  date:"26-Apr-12",
  close:89.70
},
{ 
  date:"25-Apr-12",
  close:99.00
},
{ 
  date:"24-Apr-12",
  close:130.28
},
{ 
  date:"23-Apr-12",
  close:166.70
},
{ 
  date:"20-Apr-12",
  close:234.98
},
{ 
  date:"19-Apr-12",
  close:345.44
},
{ 
  date:"18-Apr-12",
  close:443.34
},
{ 
  date:"17-Apr-12",
  close:543.70
},
{ 
  date:"16-Apr-12",
  close:580.13
},
{ 
  date:"13-Apr-12",
  close:6.23
},
{ 
  date:"12-Apr-12",
  close:622.77
},
{ 
  date:"11-Apr-12",
  close:626.20
},
{ 
  date:"10-Apr-12",
  close:628.44
},
{ 
  date:"9-Apr-12",
  close:636.23
},
{ 
  date:"5-Apr-12",
  close:633.68
},
{ 
  date:"4-Apr-12",
  close:6.31
},
{ 
  date:"3-Apr-12",
  close:629.32
},
{ 
  date:"2-Apr-12",
  close:618.63
},
{ 
  date:"30-Mar-12",
  close:599.55
},
{ 
  date:"29-Mar-12",
  close:609.86
},
{ 
  date:"28-Mar-12",
  close:617.62
},
{ 
  date:"27-Mar-12",
  close:614.48
},
{ 
  date:"26-Mar-12",
  close:606.98
}];

var data3 = [
{ 
  date:"1-May-12",
  close:58.13 
},
{ 
  date:"30-Apr-12",
  close:53.98
},
{ 
  date:"27-Apr-12",
  close:67.00
},
{ 
  date:"26-Apr-12",
  close:89.70
},
{ 
  date:"25-Apr-12",
  close:99.00
},
{ 
  date:"24-Apr-12",
  close:130.28
},
{ 
  date:"23-Apr-12",
  close:166.70
},
{ 
  date:"20-Apr-12",
  close:234.98
},
{ 
  date:"19-Apr-12",
  close:345.44
},
{ 
  date:"18-Apr-12",
  close:443.34
},
{ 
  date:"17-Apr-12",
  close:543.70
},
{ 
  date:"16-Apr-12",
  close:580.13
},
{ 
  date:"13-Apr-12",
  close:605.23
},
{ 
  date:"12-Apr-12",
  close:622.77
},
{ 
  date:"11-Apr-12",
  close:626.20
},
{ 
  date:"10-Apr-12",
  close:628.44
},
{ 
  date:"9-Apr-12",
  close:636.23
},
{ 
  date:"5-Apr-12",
  close:633.68
},
{ 
  date:"4-Apr-12",
  close:624.31
},
{ 
  date:"3-Apr-12",
  close:629.32
},
{ 
  date:"2-Apr-12",
  close:618.63
},
{ 
  date:"30-Mar-12",
  close:599.55
},
{ 
  date:"29-Mar-12",
  close:6.86
},
{ 
  date:"28-Mar-12",
  close:617.62
},
{ 
  date:"27-Mar-12",
  close:614.48
},
{ 
  date:"26-Mar-12",
  close:606.98
}];

var moistureData = [
 {
  date:"2012-07-20",
  bucket:800,
  count:119
 },
 {
  date:"2012-07-20",
  bucket:900,
  count:123
 },
 {
  date:"2012-07-20",
  bucket:1000,
  count:173
 },
 {
  date:"2012-07-20",
  bucket:1100,
  count:226
 },
 {
  date:"2012-07-20",
  bucket:1200,
  count:284
 }
];

