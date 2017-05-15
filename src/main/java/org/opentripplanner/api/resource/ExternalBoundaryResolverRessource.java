package org.opentripplanner.api.resource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.opentripplanner.geocoder.reverse.BoundaryResolver;

@Path("/geocodeReverse")
public class ExternalBoundaryResolverRessource {
        
        public BoundaryResolver boundaryResolver;
        
        @GET
        public String resolve(
                        @QueryParam("lat") Double lat,
            @QueryParam("lon") Double lon){
                if (lat == null) {
                badRequest ("no latitude");
            }
                if (lon == null) {
                badRequest ("no longitude");
            }
                if (boundaryResolver == null) {
                badRequest ("no boundary Resolver");
            }
                return boundaryResolver.resolve(lat, lon);
        }
        private void badRequest (String message) {
        throw new WebApplicationException(Response.status(Status.BAD_REQUEST)
                .entity(message).type("text/plain").build());
    }
        
}