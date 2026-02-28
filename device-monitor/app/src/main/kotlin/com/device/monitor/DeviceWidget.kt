package com.device.monitor

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.*
import androidx.glance.action.actionStartActivity
import androidx.glance.action.clickable
import androidx.glance.appwidget.*
import androidx.glance.layout.*
import androidx.glance.text.*
import androidx.glance.unit.ColorProvider

class DeviceWidget : GlanceAppWidget() {

    override val sizeMode = SizeMode.Exact

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        provideContent {
            WidgetContent(context)
        }
    }

    @Composable
    private fun WidgetContent(context: Context) {
        val info = DeviceInfoHelper.getDeviceInfo(context)

        GlanceTheme {
            Box(
                modifier = GlanceModifier
                    .fillMaxSize()
                    .background(ColorProvider(Color(0xFF161B22)))
                    .cornerRadius(16.dp)
                    .clickable(actionStartActivity<MainActivity>())
                    .padding(12.dp)
            ) {
                Column(
                    modifier = GlanceModifier.fillMaxSize(),
                    verticalAlignment = Alignment.Top
                ) {
                    // Header
                    Row(
                        modifier = GlanceModifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Device Monitor",
                            style = TextStyle(
                                color = ColorProvider(Color.White),
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold
                            )
                        )
                    }

                    Spacer(modifier = GlanceModifier.height(8.dp))

                    // Device Model
                    Text(
                        text = info.deviceModel,
                        style = TextStyle(
                            color = ColorProvider(Color(0xFF9C27B0)),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Medium
                        )
                    )

                    Spacer(modifier = GlanceModifier.height(8.dp))

                    // CPU Info
                    WidgetInfoRow(
                        label = "CPU",
                        value = "${info.cpuCores} cores",
                        usage = info.cpuUsage,
                        color = Color(0xFFFF5722)
                    )

                    Spacer(modifier = GlanceModifier.height(6.dp))

                    // RAM Info
                    val ramUsage = (info.usedRam.toFloat() / info.totalRam.toFloat()) * 100
                    WidgetInfoRow(
                        label = "RAM",
                        value = "${DeviceInfoHelper.formatSize(info.usedRam)} / ${DeviceInfoHelper.formatSize(info.totalRam)}",
                        usage = ramUsage,
                        color = Color(0xFF4CAF50)
                    )

                    Spacer(modifier = GlanceModifier.height(6.dp))

                    // Internal Storage
                    val internalUsed = info.internalTotal - info.internalFree
                    val internalUsage = (internalUsed.toFloat() / info.internalTotal.toFloat()) * 100
                    WidgetInfoRow(
                        label = "Internal",
                        value = "${DeviceInfoHelper.formatSize(internalUsed)} / ${DeviceInfoHelper.formatSize(info.internalTotal)}",
                        usage = internalUsage,
                        color = Color(0xFF2196F3)
                    )

                    // SD Card (if exists)
                    if (info.sdCardTotal > 0) {
                        Spacer(modifier = GlanceModifier.height(6.dp))
                        val sdUsed = info.sdCardTotal - info.sdCardFree
                        val sdUsage = (sdUsed.toFloat() / info.sdCardTotal.toFloat()) * 100
                        WidgetInfoRow(
                            label = "SD Card",
                            value = "${DeviceInfoHelper.formatSize(sdUsed)} / ${DeviceInfoHelper.formatSize(info.sdCardTotal)}",
                            usage = sdUsage,
                            color = Color(0xFFFF9800)
                        )
                    }
                }
            }
        }
    }

    @Composable
    private fun WidgetInfoRow(
        label: String,
        value: String,
        usage: Float,
        color: Color
    ) {
        Column(modifier = GlanceModifier.fillMaxWidth()) {
            Row(
                modifier = GlanceModifier.fillMaxWidth(),
                horizontalAlignment = Alignment.Horizontal.Start
            ) {
                Text(
                    text = label,
                    style = TextStyle(
                        color = ColorProvider(color),
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                )
                Spacer(modifier = GlanceModifier.defaultWeight())
                Text(
                    text = "${usage.toInt()}%",
                    style = TextStyle(
                        color = ColorProvider(Color.White),
                        fontSize = 11.sp
                    )
                )
            }
            Spacer(modifier = GlanceModifier.height(2.dp))
            Text(
                text = value,
                style = TextStyle(
                    color = ColorProvider(Color.Gray),
                    fontSize = 10.sp
                )
            )
            Spacer(modifier = GlanceModifier.height(4.dp))
            // Progress bar simulation
            Row(
                modifier = GlanceModifier
                    .fillMaxWidth()
                    .height(4.dp)
                    .background(ColorProvider(Color(0xFF2D333B)))
                    .cornerRadius(2.dp)
            ) {
                val widthFraction = (usage / 100f).coerceIn(0f, 1f)
                if (widthFraction > 0) {
                    Box(
                        modifier = GlanceModifier
                            .fillMaxHeight()
                            .width((widthFraction * 200).dp.coerceAtMost(200.dp))
                            .background(ColorProvider(color))
                            .cornerRadius(2.dp)
                    ) {}
                }
            }
        }
    }
}

class DeviceWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = DeviceWidget()
}
