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
function myFunc(container, zipCodes){
        var results = [];
        if (zipCodes){
        	$(zipCodes).each(function() {
                var zipCodes = this.toString();
               $(container).each(function () {
                    var that = this.description;
                    if(that.includes(zipCodes)){
                        results.push(this);
                    }

                });
            });
            return results;
        }
        
        return container;   
    }

	otp.core.Geocoder = otp.Class({
    
    url : null,
    addressParam : null,
    zipCodeRestriction : "zipCodeRestriction",
    
    initialize : function(url, addressParam) {
        this.url = url;
        this.addressParam = addressParam;
    },
    
    geocode : function(address, setResultsCallback) {
        var params = { };
        params[this.zipCodeRestriction] = otp.config.zipCodeRestriction;
        params[this.addressParam] = address;
        $.ajaxSetup({traditional:true});
       // Avoid out-of-order responses from the geocoding service. see #1419
        lastXhr = $.ajax(otp.config.hostname + "/" + this.url, {
            data : params,
            
            success: function(data, status, xhr) {
              if (xhr === lastXhr){
                if((typeof data) == "string") data = jQuery.parseXML(data);
                var results = [];
                // use zipCodeRestriction
                console.log(data.results);
                data.results = myFunc(data.results,otp.config.zipCodeRestriction);
                console.log(data.results);
                $(data.results).each(function () {
                    var resultXml = $(this);
                    
                    var resultObj = {
                        description : resultXml[0].description,
                        lat : resultXml[0].lat,
                        lng : resultXml[0].lng
                    };
                    
                    results.push(resultObj);
                });
                setResultsCallback.call(this, results);
              }
            }
        });        
    },
});
