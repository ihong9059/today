package com.device.monitor

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            MaterialTheme(
                colorScheme = darkColorScheme(
                    primary = Color(0xFF2196F3),
                    secondary = Color(0xFF64B5F6),
                    background = Color(0xFF0D1117),
                    surface = Color(0xFF161B22),
                    onPrimary = Color.White,
                    onSecondary = Color.White,
                    onBackground = Color.White,
                    onSurface = Color.White
                )
            ) {
                DeviceMonitorApp()
            }
        }
    }

    @OptIn(ExperimentalMaterial3Api::class)
    @Composable
    fun DeviceMonitorApp() {
        var deviceInfo by remember { mutableStateOf<DeviceInfo?>(null) }

        LaunchedEffect(Unit) {
            while (true) {
                deviceInfo = DeviceInfoHelper.getDeviceInfo(this@MainActivity)
                delay(2000)
            }
        }

        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                Icons.Default.PhoneAndroid,
                                contentDescription = null,
                                tint = Color(0xFF2196F3)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Device Monitor", fontWeight = FontWeight.Bold)
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = Color(0xFF161B22)
                    )
                )
            }
        ) { padding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .background(Color(0xFF0D1117))
                    .verticalScroll(rememberScrollState())
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                deviceInfo?.let { info ->
                    // Device Info Card
                    InfoCard(
                        title = "Device",
                        icon = Icons.Default.Smartphone,
                        color = Color(0xFF9C27B0)
                    ) {
                        InfoRow("Model", info.deviceModel)
                        InfoRow("Android", "${info.androidVersion} (API ${info.sdkVersion})")
                    }

                    // CPU Card
                    InfoCard(
                        title = "CPU",
                        icon = Icons.Default.Memory,
                        color = Color(0xFFFF5722)
                    ) {
                        InfoRow("Processor", info.cpuModel)
                        InfoRow("Cores", "${info.cpuCores} cores")
                        InfoRow("Max Frequency", info.cpuFreqMax)
                        Spacer(modifier = Modifier.height(8.dp))
                        UsageBar(
                            label = "CPU Usage",
                            usage = info.cpuUsage / 100f,
                            color = Color(0xFFFF5722)
                        )
                    }

                    // Memory Card
                    InfoCard(
                        title = "Memory (RAM)",
                        icon = Icons.Default.Storage,
                        color = Color(0xFF4CAF50)
                    ) {
                        InfoRow("Total", DeviceInfoHelper.formatSize(info.totalRam))
                        InfoRow("Used", DeviceInfoHelper.formatSize(info.usedRam))
                        InfoRow("Available", DeviceInfoHelper.formatSize(info.availableRam))
                        Spacer(modifier = Modifier.height(8.dp))
                        UsageBar(
                            label = "RAM Usage",
                            usage = info.usedRam.toFloat() / info.totalRam.toFloat(),
                            color = Color(0xFF4CAF50)
                        )
                    }

                    // Internal Storage Card
                    InfoCard(
                        title = "Internal Storage",
                        icon = Icons.Default.Inventory2,
                        color = Color(0xFF2196F3)
                    ) {
                        val internalUsed = info.internalTotal - info.internalFree
                        InfoRow("Total", DeviceInfoHelper.formatSize(info.internalTotal))
                        InfoRow("Used", DeviceInfoHelper.formatSize(internalUsed))
                        InfoRow("Free", DeviceInfoHelper.formatSize(info.internalFree))
                        Spacer(modifier = Modifier.height(8.dp))
                        UsageBar(
                            label = "Storage Usage",
                            usage = internalUsed.toFloat() / info.internalTotal.toFloat(),
                            color = Color(0xFF2196F3)
                        )
                    }

                    // SD Card
                    if (info.sdCardTotal > 0) {
                        InfoCard(
                            title = "SD Card (${info.sdCardName ?: "External"})",
                            icon = Icons.Default.SdCard,
                            color = Color(0xFFFF9800)
                        ) {
                            val sdUsed = info.sdCardTotal - info.sdCardFree
                            InfoRow("Total", DeviceInfoHelper.formatSize(info.sdCardTotal))
                            InfoRow("Used", DeviceInfoHelper.formatSize(sdUsed))
                            InfoRow("Free", DeviceInfoHelper.formatSize(info.sdCardFree))
                            Spacer(modifier = Modifier.height(8.dp))
                            UsageBar(
                                label = "SD Card Usage",
                                usage = sdUsed.toFloat() / info.sdCardTotal.toFloat(),
                                color = Color(0xFFFF9800)
                            )
                        }
                    }

                    // Widget Instructions
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = Color(0xFF1E2430)),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Column(
                            modifier = Modifier.padding(16.dp)
                        ) {
                            Text(
                                "Widget 추가 방법",
                                fontWeight = FontWeight.Bold,
                                fontSize = 16.sp,
                                color = Color.White
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                "1. 홈 화면 길게 누르기\n2. '위젯' 선택\n3. 'Device Monitor' 찾기\n4. 원하는 위치에 드래그",
                                fontSize = 14.sp,
                                color = Color.Gray,
                                lineHeight = 22.sp
                            )
                        }
                    }
                }
            }
        }
    }

    @Composable
    fun InfoCard(
        title: String,
        icon: ImageVector,
        color: Color,
        content: @Composable ColumnScope.() -> Unit
    ) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF161B22)),
            shape = RoundedCornerShape(12.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        icon,
                        contentDescription = null,
                        tint = color,
                        modifier = Modifier.size(28.dp)
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        title,
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp,
                        color = Color.White
                    )
                }
                Spacer(modifier = Modifier.height(12.dp))
                content()
            }
        }
    }

    @Composable
    fun InfoRow(label: String, value: String) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                label,
                fontSize = 14.sp,
                color = Color.Gray
            )
            Text(
                value,
                fontSize = 14.sp,
                fontWeight = FontWeight.Medium,
                color = Color.White
            )
        }
    }

    @Composable
    fun UsageBar(label: String, usage: Float, color: Color) {
        Column {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    label,
                    fontSize = 12.sp,
                    color = Color.Gray
                )
                Text(
                    "${(usage * 100).toInt()}%",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium,
                    color = color
                )
            }
            Spacer(modifier = Modifier.height(4.dp))
            LinearProgressIndicator(
                progress = usage.coerceIn(0f, 1f),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(8.dp),
                color = color,
                trackColor = Color(0xFF2D333B)
            )
        }
    }
}
