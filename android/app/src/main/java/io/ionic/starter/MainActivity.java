package io.ionic.starter;

import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.mapbox.api.directions.v5.models.DirectionsResponse;
import com.mapbox.geojson.Point;
import com.mapbox.mapboxsdk.maps.MapView;
import com.mapbox.services.android.navigation.v5.navigation.MapboxNavigation;
import com.mapbox.services.android.navigation.v5.navigation.NavigationRoute;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends BridgeActivity {


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        // Initializes the Bridge
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            // Additional plugins you've installed go here
            // Ex: add(TotallyAwesomePlugin.class);
        }});



    }
}
