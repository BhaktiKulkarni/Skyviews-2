package io.ionic.starter;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.mapbox.api.directions.v5.models.DirectionsResponse;
import com.mapbox.api.directions.v5.models.DirectionsRoute;
import com.mapbox.geojson.Point;
import com.mapbox.mapboxsdk.Mapbox;
import com.mapbox.services.android.navigation.ui.v5.NavigationLauncher;
import com.mapbox.services.android.navigation.ui.v5.NavigationLauncherOptions;
import com.mapbox.services.android.navigation.v5.navigation.MapboxNavigation;
import com.mapbox.services.android.navigation.v5.navigation.NavigationRoute;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MapBoxDemoActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private MapboxNavigation navigation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map_box_demo);

        Mapbox.getInstance(this, getResources().getString(R.string.access_token));

        Toast.makeText(this, "Hello", Toast.LENGTH_LONG);

        navigation = new MapboxNavigation(this, getResources().getString(R.string.access_token));

        // From Mapbox to The White House
        Point origin = Point.fromLngLat(-77.03613, 38.90992);
        Point destination = Point.fromLngLat(-77.0365, 38.8977);

        NavigationRoute.builder(this)
                .accessToken(getResources().getString(R.string.access_token))
                .origin(origin)
                .destination(destination)
                .build()
                .getRoute(new Callback<DirectionsResponse>() {
                    @Override
                    public void onResponse(Call<DirectionsResponse> call, Response<DirectionsResponse> response) {
                        Log.d(TAG, "onResponse: " + response);
                        Log.d(TAG, "onResponse: Call" + call);

                        DirectionsResponse directionsRoute = response.body();

                        NavigationLauncherOptions options = NavigationLauncherOptions.builder()
                                .directionsRoute(directionsRoute.routes().get(0))
                                .shouldSimulateRoute(false)
                                .build();

// Call this method with Context from within an Activity
                        NavigationLauncher.startNavigation(MapBoxDemoActivity.this, options);
                    }

                    @Override
                    public void onFailure(Call<DirectionsResponse> call, Throwable t) {
                        Log.d(TAG, "onFailure: " + call);
                    }
                });


    }
}
