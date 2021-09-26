

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