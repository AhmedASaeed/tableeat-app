(function() {

  
  var rest0 = document.getElementById('rest0');
  var rest1 = document.getElementById('rest1');
  var rest2 = document.getElementById('rest2');
  var rest3 = document.getElementById('rest3');
  var restaurantsnames=[];
  var notSupported = function() {
   element.innerHTML = 'Your browser doesn’t seem to support <code>xhr.responseType="json"</code> yet. :(';
   element.className = 'fail';
  };



  var getJSON = function(url, successHandler, errorHandler) {
   if (typeof XMLHttpRequest == 'undefined') {
    return notSupported();
   }
   var xhr = new XMLHttpRequest();
   xhr.open('get', url, true);
   xhr.responseType = 'json';
   xhr.onload = function() {
    var status = xhr.status;
    if (status == 200) {
     successHandler && successHandler(xhr.response);
    } else {
     errorHandler && errorHandler(status);
    }
   };
   xhr.send();
  };

  // load a non-JSON resource
  getJSON('http://52.79.42.151:3000/api/restaurants', function(data) {
   if (typeof data == 'string') {
    notSupported();
   } else {
   
    //alert('Your public IP address is: ' + data);
	///function that works
								function recursiveGetProperty(obj, lookup, callback) {
								for (property in obj) {
									if (property == lookup) {
										callback(obj[property]);
									} else if (obj[property] instanceof Object) {
										recursiveGetProperty(obj[property], lookup, callback);
									}
								}
							} 
								recursiveGetProperty(data, "name", function(obj) {
									// do something with it.
									restaurantsnames[restaurantsnames.length] = obj;
									
								});
																
								for (i = 0; i < restaurantsnames.length; i++) {
									
									console.log(restaurantsnames[i]);
									
								}
								rest0.innerHTML=restaurantsnames[0];
								rest1.innerHTML=restaurantsnames[1];
								/////
								
																/*function traverse_it(obj){
																for(var prop in obj){
																	if(typeof obj[prop]=='object'){
																		// object
																		traverse_it(obj[prop[i]]);
																	}else{
																		// something else
																		alert('The value of '+prop+' is '+obj[prop]+'.');
																	}
																}
															}

															traverse_it(data);*/
	
	
   }
  });
  var link0= document.getElementById('rest0');
  link0.addEventListener('click',function(){
	  console.log(link0.innerHTML);
	  rest = open( "restaurant2.html",link0);
	  rest.document.getElementById('title_header').innerHTML=rest0;
	  
	  
  });

 }());
