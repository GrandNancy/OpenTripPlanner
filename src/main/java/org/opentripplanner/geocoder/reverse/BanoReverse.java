package org.opentripplanner.geocoder.reverse;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;

import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import org.apache.commons.io.IOUtils;
import org.opentripplanner.geocoder.bano.BanoGeocoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Path("/reverse")
public class BanoReverse implements BoundaryResolver{
        
        private static final Logger LOG = LoggerFactory.getLogger(BanoGeocoder.class);

    private String reverseBanoUrl = "http://api-adresse.data.gouv.fr/reverse";
    
    public BanoReverse() {
        super();
    }
    
    @Override
        public String resolve(double lat, double lon) {


        try {
            URL banoUrl = getBanoReverseGeocoderUrl(lat, lon);
            URLConnection conn = banoUrl.openConnection();
            InputStream in = conn.getInputStream();
            String resultAdress = IOUtils.toString(in, "UTF-8"); //TODO changer, voir ShapeFileBoundaryResolver
            in.close();

            return resultAdress;

        } catch (IOException e) {
            LOG.error("Error processing BANO reverse geocoder", e);
            return null;
        }
        
        }
    
    private URL getBanoReverseGeocoderUrl(double lat, double lon) throws IOException {
        UriBuilder uriBuilder = UriBuilder.fromUri(reverseBanoUrl);
        uriBuilder.queryParam("lon", lon);
        uriBuilder.queryParam("lat", lat);
        URI uri = uriBuilder.build();
        return new URL(uri.toString());
    }

        
}
