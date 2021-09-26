// double check this with teammates
function cal_drought(form)
{

    var a=tonum(form.dkdiinmm.value);//Bryamm-Keech Drought Index
    var b=tonum(form.dslr.value);//Time since last rain
    var c=tonum(form.precipinmm.value);//amount of precipitation
    var d=(0.191*(a+104)*Math.pow((b+1),1.5))/(3.52*Math.pow((b+1),1.5)+c-1);//drought factor

    if (Math.floor(d)>= 10)
        var r = 10;
    
    else
    var r =Math.floor(d);
{

form.dfactor.value=r;//drought factor

function cal_fdi(form)
{
    var b=tonum(form.inputbox2.value);//temperature
    if (b < 0 || b > 45) {
    
    alert("ERROR - Temperature must be between 0 and 45 degrees Celcius.")
    }
    var c=tonum(form.inputbox3.value);//rel humidity
    if (c < 0 || c > 100) {
    
    alert("ERROR - Relative Humidity must be between 0 and 100%.")
    }
    var d=tonum(form.inputbox4.value);//wind speed
    if (d < 0 || d > 70) {
    
    alert("ERROR - Fuel Load must be between 1 and 25 tonne/hectare.")
    }
    var h=tonum(form.inputbox6.value);//drought factor
    if (h < 0 || h > 10) {
    
   
}

var k=2*(Math.exp((.987*Math.log(h+0.001))-.45-(.0345*c)+(.0338*b)+(.0234*d)));//forest mk5
{
  if (Math.round(k) == 0)
    var s = (" NIL");

  else if  (k<5)
   var s =(Math.round(k) + " LOW");

 else if  (k<12)
   var s =(Math.round(k) + " MODERATE");
 
else if  (k<24)
   var s =(Math.round(k) + " HIGH");
 
else if  (k<50)
   var s =(Math.round(k) + " VERY HIGH");
 
else if  (k>50)
   var s =(Math.round(k) + " EXTREME");
 
}




}