/* This program is free software: you can redistribute it and/or
   modify it under the terms of the GNU Lesser General Public License
   as published by the Free Software Foundation, either version 3 of
   the License, or (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>. 
*/


otp.namespace("otp.core");

otp.core.BoundaryResolver = otp.Class({
    
    url : null,
    
    initialize : function() {
        this.url = otp.config.boundaryResolver.url;
    },
    
boundaryResolve : function(LatLng, setResultsCallback) {
        
        var params = { };
        params = LatLng;
       // Avoid out-of-order responses from the geocoding service. see #1419
        lastXhr = $.ajax(this.url, {
            data : {lat : params.lat, lon: params.lng},
            
            success: function(data, status, xhr) {
              
            	if (xhr === lastXhr){
                if((typeof data) == "string") data = jQuery.parseXML(data);
                var results = data.features[0].properties.label;
                console.log(data.features[0].properties.label);
                
                setResultsCallback.call(this, results);
              }
            }
        });        
    } 
    
});
