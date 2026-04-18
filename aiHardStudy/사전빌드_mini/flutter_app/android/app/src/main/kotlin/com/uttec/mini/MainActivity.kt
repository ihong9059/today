package com.uttec.mini

import android.media.AudioManager
import android.media.ToneGenerator
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "com.uttec.mini/sound")
            .setMethodCallHandler { call, result ->
                when (call.method) {
                    "playNotification" -> {
                        playLoudBeeps(1)
                        result.success(true)
                    }
                    "playAlarm" -> {
                        playLoudBeeps(3)
                        result.success(true)
                    }
                    else -> result.notImplemented()
                }
            }
    }

    private fun playLoudBeeps(count: Int) {
        Thread {
            try {
                val toneGen = ToneGenerator(AudioManager.STREAM_MUSIC, ToneGenerator.MAX_VOLUME)
                for (i in 0 until count) {
                    toneGen.startTone(ToneGenerator.TONE_CDMA_ALERT_CALL_GUARD, 300)
                    Thread.sleep(500)
                }
                Thread.sleep(400)
                toneGen.release()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }.start()
    }
}
