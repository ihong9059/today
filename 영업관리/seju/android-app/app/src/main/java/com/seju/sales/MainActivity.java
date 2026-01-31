package com.seju.sales;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends AppCompatActivity implements LocationListener {

    private WebView webView;
    private LocationManager locationManager;
    private String serverUrl = "http://178.128.90.37:90";
    private String deviceId = "seju-tablet-001";
    private ExecutorService executor = Executors.newSingleThreadExecutor();
    private Handler mainHandler = new Handler(Looper.getMainLooper());

    private static final int PERMISSION_REQUEST_CODE = 100;
    private static final int FILE_CHOOSER_REQUEST_CODE = 101;

    private ValueCallback<Uri[]> filePathCallback;
    private String currentPhotoPath;
    private Uri photoUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        setupWebView();
        checkPermissions();
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void setupWebView() {
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setGeolocationEnabled(true);

        webView.setWebViewClient(new WebViewClient());

        webView.setWebChromeClient(new WebChromeClient() {

            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback,
                                            FileChooserParams fileChooserParams) {
                if (MainActivity.this.filePathCallback != null) {
                    MainActivity.this.filePathCallback.onReceiveValue(null);
                }
                MainActivity.this.filePathCallback = filePathCallback;

                Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                File photoFile = null;
                try {
                    photoFile = createImageFile();
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

                if (photoFile != null) {
                    photoUri = FileProvider.getUriForFile(MainActivity.this,
                            getApplicationContext().getPackageName() + ".provider",
                            photoFile);
                    takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
                    takePictureIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    takePictureIntent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
                }

                Intent contentSelectionIntent = new Intent(Intent.ACTION_GET_CONTENT);
                contentSelectionIntent.addCategory(Intent.CATEGORY_OPENABLE);
                contentSelectionIntent.setType("image/*");

                Intent chooserIntent = new Intent(Intent.ACTION_CHOOSER);
                chooserIntent.putExtra(Intent.EXTRA_INTENT, contentSelectionIntent);
                chooserIntent.putExtra(Intent.EXTRA_TITLE, "사진 선택");
                chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, new Intent[]{takePictureIntent});

                startActivityForResult(chooserIntent, FILE_CHOOSER_REQUEST_CODE);
                return true;
            }

            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, false);
            }

            @Override
            public void onPermissionRequest(PermissionRequest request) {
                mainHandler.post(() -> request.grant(request.getResources()));
            }
        });

        webView.addJavascriptInterface(new WebAppInterface(), "Android");
        webView.loadUrl("file:///android_asset/index.html");
    }

    private File createImageFile() throws IOException {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(new Date());
        String imageFileName = "SEJU_" + timeStamp + "_";
        File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(imageFileName, ".jpg", storageDir);
        currentPhotoPath = image.getAbsolutePath();
        return image;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == FILE_CHOOSER_REQUEST_CODE) {
            if (filePathCallback == null) return;

            Uri[] results = null;

            if (resultCode == Activity.RESULT_OK) {
                if (data != null && data.getData() != null) {
                    results = new Uri[]{data.getData()};
                } else if (photoUri != null) {
                    results = new Uri[]{photoUri};
                }
            }

            filePathCallback.onReceiveValue(results);
            filePathCallback = null;
            currentPhotoPath = null;
            photoUri = null;
        }
    }

    private void checkPermissions() {
        String[] permissions = {
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.CAMERA,
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
        };

        boolean allGranted = true;
        for (String permission : permissions) {
            if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
                allGranted = false;
                break;
            }
        }

        if (!allGranted) {
            ActivityCompat.requestPermissions(this, permissions, PERMISSION_REQUEST_CODE);
        } else {
            startLocationUpdates();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQUEST_CODE) {
            startLocationUpdates();
        }
    }

    @SuppressLint("MissingPermission")
    private void startLocationUpdates() {
        locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
        if (locationManager != null) {
            try {
                locationManager.requestLocationUpdates(
                    LocationManager.GPS_PROVIDER, 5000, 10, this);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void onLocationChanged(@NonNull Location location) {
        sendGpsData(location.getLatitude(), location.getLongitude(),
                   location.getAccuracy(), location.getAltitude(), location.getSpeed());
    }

    private void sendGpsData(double lat, double lng, float accuracy, double altitude, float speed) {
        executor.execute(() -> {
            try {
                JSONObject json = new JSONObject();
                json.put("device_id", deviceId);
                json.put("latitude", lat);
                json.put("longitude", lng);
                json.put("accuracy", accuracy);
                json.put("altitude", altitude);
                json.put("speed", speed);

                sendPost(serverUrl + "/api/gps", json.toString());
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    private void sendPost(String urlStr, String jsonData) {
        try {
            URL url = new URL(urlStr);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonData.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = conn.getResponseCode();
            conn.disconnect();

            mainHandler.post(() -> {
                if (responseCode == 200 || responseCode == 201) {
                    // Success
                } else {
                    Toast.makeText(this, "전송 실패: " + responseCode, Toast.LENGTH_SHORT).show();
                }
            });
        } catch (Exception e) {
            mainHandler.post(() ->
                Toast.makeText(this, "오류: " + e.getMessage(), Toast.LENGTH_SHORT).show()
            );
        }
    }

    public class WebAppInterface {
        @JavascriptInterface
        public void setServerUrl(String url) {
            serverUrl = url;
            mainHandler.post(() ->
                Toast.makeText(MainActivity.this, "서버: " + url, Toast.LENGTH_SHORT).show()
            );
        }

        @JavascriptInterface
        public void setDeviceId(String id) {
            deviceId = id;
        }

        @JavascriptInterface
        public String getDeviceId() {
            return deviceId;
        }

        @JavascriptInterface
        public String getServerUrl() {
            return serverUrl;
        }

        @JavascriptInterface
        public void sendVisitData(String customerName, String visitType, String notes) {
            executor.execute(() -> {
                try {
                    JSONObject json = new JSONObject();
                    json.put("device_id", deviceId);
                    json.put("customer_name", customerName);
                    json.put("visit_type", visitType);
                    json.put("notes", notes);

                    sendPost(serverUrl + "/api/visit", json.toString());
                    mainHandler.post(() ->
                        Toast.makeText(MainActivity.this, "방문 기록 전송 완료!", Toast.LENGTH_SHORT).show()
                    );
                } catch (Exception e) {
                    mainHandler.post(() ->
                        Toast.makeText(MainActivity.this, "오류: " + e.getMessage(), Toast.LENGTH_SHORT).show()
                    );
                }
            });
        }

        @JavascriptInterface
        public void sendOrderData(String orderData) {
            executor.execute(() -> {
                try {
                    JSONObject json = new JSONObject();
                    json.put("device_id", deviceId);
                    json.put("order_data", new JSONObject(orderData));

                    sendPost(serverUrl + "/api/order", json.toString());
                    mainHandler.post(() ->
                        Toast.makeText(MainActivity.this, "주문 전송 완료!", Toast.LENGTH_SHORT).show()
                    );
                } catch (Exception e) {
                    mainHandler.post(() ->
                        Toast.makeText(MainActivity.this, "오류: " + e.getMessage(), Toast.LENGTH_SHORT).show()
                    );
                }
            });
        }

        @JavascriptInterface
        public void showToast(String message) {
            mainHandler.post(() ->
                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show()
            );
        }

        @JavascriptInterface
        public void openDashboard() {
            mainHandler.post(() -> webView.loadUrl(serverUrl));
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (locationManager != null) {
            locationManager.removeUpdates(this);
        }
        executor.shutdown();
    }
}
