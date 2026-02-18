package com.isiwoo.japantravel;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private static final String URL = "http://121.137.66.41:10000";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 외부 브라우저(Chrome 등)로 URL 열기
        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(URL));
        startActivity(browserIntent);

        // 앱 종료 (브라우저만 열고 앱은 닫음)
        finish();
    }
}
