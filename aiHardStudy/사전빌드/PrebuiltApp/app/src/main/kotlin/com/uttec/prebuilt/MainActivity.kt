package com.uttec.prebuilt

import android.Manifest
import android.annotation.SuppressLint
import android.bluetooth.*
import android.bluetooth.le.*
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.app.ActivityCompat
import kotlinx.coroutines.*
import okhttp3.*
import org.json.JSONArray
import org.json.JSONObject
import java.io.IOException
import java.util.UUID
import java.util.concurrent.TimeUnit

private const val TAG = "Prebuilt"
private const val SERVER_URL = "http://100.82.193.50:8095"

// UTTEC Board BLE UUIDs
private const val OTA_SERVICE_UUID = "0000fe00-0000-1000-8000-00805f9b34fb"
private const val OTA_CTRL_UUID = "0000fe01-0000-1000-8000-00805f9b34fb"
private const val OTA_DATA_UUID = "0000fe02-0000-1000-8000-00805f9b34fb"
private const val OTA_STATUS_UUID = "0000fe03-0000-1000-8000-00805f9b34fb"

class MainActivity : ComponentActivity() {

    private var bluetoothAdapter: BluetoothAdapter? = null
    private var bluetoothGatt: BluetoothGatt? = null
    private var otaCtrlChar: BluetoothGattCharacteristic? = null
    private var otaDataChar: BluetoothGattCharacteristic? = null

    private val handler = Handler(Looper.getMainLooper())
    private val scope = CoroutineScope(Dispatchers.Main + Job())
    private val httpClient = OkHttpClient.Builder()
        .connectTimeout(10, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()

    // UI State
    private val _items = mutableStateListOf<CatalogItem>()
    private val _selectedItem = mutableStateOf<CatalogItem?>(null)
    private val _guide = mutableStateOf<JSONObject?>(null)
    private val _bleState = mutableStateOf("미연결")
    private val _bleConnected = mutableStateOf(false)
    private val _bleName = mutableStateOf("")
    private val _serverConnected = mutableStateOf(false)
    private val _otaProgress = mutableStateOf(-1)  // -1 = idle
    private val _otaMessage = mutableStateOf("")
    private val _filterDiff = mutableStateOf(0) // 0=all
    private val _searchQuery = mutableStateOf("")
    private val _scannedDevices = mutableStateListOf<BluetoothDevice>()
    private val _showScanDialog = mutableStateOf(false)

    data class CatalogItem(
        val no: String, val prompt: String, val desc: String,
        val category: String, val catName: String,
        val difficulty: Int, val fwSize: Int, val tags: List<String>
    )

    private val permLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) {}

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val bm = getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
        bluetoothAdapter = bm.adapter
        requestPermissions()
        loadCatalog()

        setContent {
            MaterialTheme(colorScheme = darkColorScheme()) {
                Surface(color = Color(0xFF0F0F23)) { MainUI() }
            }
        }
    }

    private fun requestPermissions() {
        val perms = mutableListOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
        )
        if (Build.VERSION.SDK_INT >= 31) {
            perms.add(Manifest.permission.BLUETOOTH_SCAN)
            perms.add(Manifest.permission.BLUETOOTH_CONNECT)
        }
        permLauncher.launch(perms.toTypedArray())
    }

    // ─── UI ───

    @Composable
    fun MainUI() {
        val items = _items
        val selected = _selectedItem.value
        val bleConn = _bleConnected.value
        val serverConn = _serverConnected.value

        Column(modifier = Modifier.fillMaxSize()) {
            // Header
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFF1A1A3E))
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("⚡ UTTEC 사전빌드", color = Color(0xFFA29BFE), fontWeight = FontWeight.Bold, fontSize = 16.sp)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    // Server status
                    Surface(
                        color = if (serverConn) Color(0xFF00B894) else Color(0xFF666666),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text("서버", modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                            color = Color.White, fontSize = 11.sp)
                    }
                    // BLE button
                    Surface(
                        color = if (bleConn) Color(0xFF00B894) else Color(0xFF6C5CE7),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.clickable {
                            if (bleConn) disconnectBle() else startAutoConnect()
                        }
                    ) {
                        Text(
                            if (bleConn) "✅ ${_bleName.value}" else "🔗 BLE",
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
                            color = Color.White, fontSize = 11.sp, fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            // Difficulty filter
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState())
                    .padding(horizontal = 8.dp, vertical = 6.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                FilterChip("전체", 0)
                FilterChip("★ 기초", 1)
                FilterChip("★★ 중급", 2)
                FilterChip("★★★ 고급", 3)
                FilterChip("★★★★ 프로", 4)
            }

            // OTA Progress
            if (_otaProgress.value >= 0) {
                Column(modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp)) {
                    Text(_otaMessage.value, color = Color(0xFFA29BFE), fontSize = 12.sp)
                    LinearProgressIndicator(
                        progress = _otaProgress.value / 100f,
                        modifier = Modifier.fillMaxWidth().height(4.dp),
                        color = Color(0xFF6C5CE7),
                    )
                }
            }

            // Content
            if (selected != null) {
                DetailView(selected)
            } else {
                ItemList(items)
            }
        }
    }

    @Composable
    fun FilterChip(label: String, diff: Int) {
        val active = _filterDiff.value == diff
        val colors = mapOf(0 to Color(0xFF6C5CE7), 1 to Color(0xFF00B894),
            2 to Color(0xFFB8860B), 3 to Color(0xFFE17055), 4 to Color(0xFFD63031))
        Surface(
            color = if (active) colors[diff] ?: Color.Gray else Color.Transparent,
            shape = RoundedCornerShape(16.dp),
            border = BorderStroke(1.dp, if (active) Color.Transparent else colors[diff] ?: Color.Gray),
            modifier = Modifier.clickable { _filterDiff.value = diff; filterItems() }
        ) {
            Text(label, modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                color = Color.White, fontSize = 12.sp)
        }
    }

    @Composable
    fun ItemList(items: List<CatalogItem>) {
        val diffStars = mapOf(1 to "★", 2 to "★★", 3 to "★★★", 4 to "★★★★")
        val diffColors = mapOf(1 to Color(0xFF00B894), 2 to Color(0xFFB8860B), 3 to Color(0xFFE17055), 4 to Color(0xFFD63031))

        LazyColumn(modifier = Modifier.fillMaxSize().padding(horizontal = 8.dp)) {
            // Group by category
            val groups = items.groupBy { it.category }
            groups.keys.sorted().forEach { cat ->
                val catItems = groups[cat]!!
                item {
                    Text("${cat}. ${catItems[0].catName}",
                        modifier = Modifier.fillMaxWidth().background(Color(0xFF1A1A3E)).padding(8.dp),
                        color = Color(0xFF6C5CE7), fontSize = 13.sp, fontWeight = FontWeight.Bold)
                }
                items(catItems) { item ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { selectItem(item) }
                            .padding(horizontal = 12.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(diffStars[item.difficulty] ?: "", color = diffColors[item.difficulty] ?: Color.Gray,
                            fontSize = 12.sp, modifier = Modifier.width(48.dp))
                        Text(item.no, color = Color.Gray, fontSize = 12.sp, modifier = Modifier.width(36.dp))
                        Text(item.prompt, color = Color.White, fontSize = 14.sp, modifier = Modifier.weight(1f))
                        Text("⚡", fontSize = 14.sp)
                    }
                    Divider(color = Color(0xFF1A1A30), thickness = 0.5.dp)
                }
            }
        }
    }

    @Composable
    fun DetailView(item: CatalogItem) {
        val guide = _guide.value
        val bleConn = _bleConnected.value

        Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(12.dp)) {
            // Back button
            TextButton(onClick = { _selectedItem.value = null; _guide.value = null }) {
                Icon(Icons.Default.ArrowBack, null, tint = Color(0xFFA29BFE))
                Spacer(Modifier.width(4.dp))
                Text("목록으로", color = Color(0xFFA29BFE))
            }

            // Title card
            Card(colors = CardDefaults.cardColors(containerColor = Color(0xFF1A1A3E)), modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("${mapOf(1 to "★",2 to "★★",3 to "★★★",4 to "★★★★")[item.difficulty]} ${item.prompt}",
                        color = Color(0xFFA29BFE), fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    Spacer(Modifier.height(8.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        ChipText(item.no)
                        ChipText(item.catName)
                        ChipText("${item.fwSize / 1024}KB")
                    }
                    Spacer(Modifier.height(8.dp))
                    Text(item.desc, color = Color(0xFFCCCCCC))

                    Spacer(Modifier.height(12.dp))
                    Button(
                        onClick = { sendToBoard(item.no) },
                        enabled = bleConn && _otaProgress.value < 0,
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF6C5CE7))
                    ) {
                        Text(
                            if (!bleConn) "⚡ 보드에 보내기 (BLE 연결 필요)"
                            else if (_otaProgress.value >= 0) "전송 중..."
                            else "⚡ 보드에 보내기",
                            fontWeight = FontWeight.Bold, fontSize = 16.sp
                        )
                    }
                }
            }

            // Guide
            if (guide != null) {
                Spacer(Modifier.height(12.dp))
                // What happens
                val wh = guide.optJSONArray("what_happens")
                if (wh != null && wh.length() > 0) {
                    GuideCard("동작 순서") {
                        for (i in 0 until wh.length()) {
                            Text("▸ ${wh.getString(i)}", color = Color(0xFFCCCCCC), fontSize = 14.sp,
                                modifier = Modifier.padding(vertical = 2.dp))
                        }
                    }
                }
                // Concepts
                val concepts = guide.optJSONArray("concepts")
                if (concepts != null && concepts.length() > 0) {
                    GuideCard("학습 개념") {
                        for (i in 0 until concepts.length()) {
                            val c = concepts.getJSONObject(i)
                            Column(modifier = Modifier.padding(vertical = 4.dp)
                                .background(Color(0xFF12122A), RoundedCornerShape(6.dp))
                                .padding(8.dp)) {
                                Text(c.optString("term"), color = Color(0xFFA29BFE), fontWeight = FontWeight.Bold, fontSize = 14.sp)
                                Text(c.optString("explanation"), color = Color(0xFFAAAAAA), fontSize = 13.sp)
                            }
                        }
                    }
                }
                // Quiz
                val quiz = guide.optJSONObject("quiz")
                if (quiz != null) {
                    GuideCard("퀴즈") { QuizView(quiz) }
                }
            }
        }
    }

    @Composable
    fun GuideCard(title: String, content: @Composable () -> Unit) {
        Card(colors = CardDefaults.cardColors(containerColor = Color(0xFF1A1A3E)), modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(title, color = Color(0xFF6C5CE7), fontWeight = FontWeight.Bold, fontSize = 15.sp)
                Spacer(Modifier.height(8.dp))
                content()
            }
        }
    }

    @Composable
    fun QuizView(quiz: JSONObject) {
        var answered by remember { mutableStateOf(false) }
        var selected by remember { mutableIntStateOf(-1) }
        val answer = quiz.optInt("answer", 0)
        val options = quiz.optJSONArray("options")

        Text(quiz.optString("question"), color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
        Spacer(Modifier.height(8.dp))
        if (options != null) {
            for (i in 0 until options.length()) {
                val bg = when {
                    !answered -> Color(0xFF1A1A3E)
                    i == answer -> Color(0xFF00B894)
                    i == selected -> Color(0xFFD63031)
                    else -> Color(0xFF1A1A3E)
                }
                Surface(
                    color = bg, shape = RoundedCornerShape(6.dp),
                    border = BorderStroke(1.dp, Color(0xFF333333)),
                    modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp)
                        .clickable { if (!answered) { selected = i; answered = true } }
                ) {
                    Text(options.getString(i), modifier = Modifier.padding(10.dp), color = Color.White, fontSize = 13.sp)
                }
            }
        }
        if (answered) {
            Spacer(Modifier.height(6.dp))
            Text(quiz.optString("explanation"), color = Color(0xFF55EFC4), fontSize = 12.sp)
        }
    }

    @Composable
    fun ChipText(text: String) {
        Surface(color = Color(0x266C5CE7), shape = RoundedCornerShape(12.dp)) {
            Text(text, modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp),
                color = Color(0xFFA29BFE), fontSize = 11.sp)
        }
    }

    @SuppressLint("MissingPermission")
    @Composable
    fun ScanDialog() {
        // AlertDialog 대신 직접 구현 (Compose 애니메이션 호환성 문제 회피)
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0x99000000))
                .clickable { _showScanDialog.value = false; stopScan() },
            contentAlignment = Alignment.Center
        ) {
            Card(
                modifier = Modifier.fillMaxWidth(0.85f),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1A1A3E))
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Text("BLE 장치 선택", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    Spacer(Modifier.height(12.dp))

                    if (_scannedDevices.isEmpty()) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier.fillMaxWidth().padding(20.dp)
                        ) {
                            Text("⏳", fontSize = 32.sp)
                            Spacer(Modifier.height(8.dp))
                            Text("스캔 중...", color = Color.Gray)
                        }
                    } else {
                        _scannedDevices.toList().forEach { dev ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable {
                                        _showScanDialog.value = false; stopScan(); connectBle(dev)
                                    }
                                    .padding(12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(Icons.Default.Bluetooth, null, tint = Color(0xFF6C5CE7))
                                Spacer(Modifier.width(12.dp))
                                Column {
                                    Text(dev.name ?: "Unknown", fontWeight = FontWeight.Bold, color = Color.White)
                                    Text(dev.address, fontSize = 12.sp, color = Color.Gray)
                                }
                            }
                            Divider(color = Color(0xFF333333), thickness = 0.5.dp)
                        }
                    }

                    Spacer(Modifier.height(12.dp))
                    TextButton(
                        onClick = { _showScanDialog.value = false; stopScan() },
                        modifier = Modifier.align(Alignment.End)
                    ) {
                        Text("닫기", color = Color(0xFFA29BFE))
                    }
                }
            }
        }
    }

    // ─── Server ───

    private var allItems = mutableListOf<CatalogItem>()

    private fun loadCatalog() {
        scope.launch(Dispatchers.IO) {
            try {
                val req = Request.Builder().url("$SERVER_URL/api/catalog").build()
                httpClient.newCall(req).execute().use { resp ->
                    val json = JSONObject(resp.body?.string() ?: "{}")
                    val arr = json.optJSONArray("items") ?: JSONArray()
                    val list = mutableListOf<CatalogItem>()
                    for (i in 0 until arr.length()) {
                        val o = arr.getJSONObject(i)
                        val tags = mutableListOf<String>()
                        val ta = o.optJSONArray("tags")
                        if (ta != null) for (j in 0 until ta.length()) tags.add(ta.getString(j))
                        list.add(CatalogItem(
                            o.getString("no"), o.getString("user_prompt"), o.optString("description", ""),
                            o.getString("category"), o.getString("category_name"),
                            o.getInt("difficulty"), o.optInt("firmware_size", 0), tags
                        ))
                    }
                    withContext(Dispatchers.Main) {
                        allItems.clear(); allItems.addAll(list)
                        _items.clear(); _items.addAll(list)
                        _serverConnected.value = true
                        Log.d(TAG, "Catalog loaded: ${list.size} items")
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    _serverConnected.value = false
                    Log.e(TAG, "Catalog load failed", e)
                }
            }
        }
    }

    private fun filterItems() {
        val d = _filterDiff.value
        val filtered = if (d == 0) allItems else allItems.filter { it.difficulty == d }
        _items.clear(); _items.addAll(filtered)
    }

    private fun selectItem(item: CatalogItem) {
        _selectedItem.value = item
        _guide.value = null
        // Load guide
        scope.launch(Dispatchers.IO) {
            try {
                val req = Request.Builder().url("$SERVER_URL/api/prebuilt/${item.no}/guide").build()
                httpClient.newCall(req).execute().use { resp ->
                    if (resp.isSuccessful) {
                        val g = JSONObject(resp.body?.string() ?: "{}")
                        withContext(Dispatchers.Main) { _guide.value = g }
                    }
                }
            } catch (e: Exception) { Log.e(TAG, "Guide load failed", e) }
        }
    }

    // ─── BLE ───

    private var scanner: BluetoothLeScanner? = null
    private val scanCallback = object : ScanCallback() {
        @SuppressLint("MissingPermission")
        override fun onScanResult(callbackType: Int, result: ScanResult) {
            val dev = result.device
            val name = dev.name ?: return
            if (!_scannedDevices.any { it.address == dev.address }) {
                _scannedDevices.add(dev)
                Log.d(TAG, "Found: $name - ${dev.address}")
            }
        }
    }

    @SuppressLint("MissingPermission")
    private fun startAutoConnect() {
        _bleState.value = "UTTEC 보드 검색 중..."
        Toast.makeText(this, "UTTEC 보드를 검색합니다...", Toast.LENGTH_SHORT).show()
        _scannedDevices.clear()
        scanner = bluetoothAdapter?.bluetoothLeScanner
        val autoCallback = object : ScanCallback() {
            override fun onScanResult(callbackType: Int, result: ScanResult) {
                val dev = result.device
                val name = dev.name ?: return
                if (name.startsWith("UTTEC")) {
                    Log.d(TAG, "Auto-connect: found $name")
                    scanner?.stopScan(this)
                    handler.post {
                        _bleState.value = "$name 연결 중..."
                        Toast.makeText(this@MainActivity, "$name 발견! 연결 중...", Toast.LENGTH_SHORT).show()
                    }
                    connectBle(dev)
                }
            }
        }
        scanner?.startScan(autoCallback)
        // 10초 후 타임아웃
        handler.postDelayed({
            try { scanner?.stopScan(autoCallback) } catch (_: Exception) {}
            if (!_bleConnected.value) {
                _bleState.value = "UTTEC 보드를 찾지 못했습니다"
                Toast.makeText(this, "UTTEC 보드를 찾지 못했습니다. 보드 전원을 확인하세요.", Toast.LENGTH_LONG).show()
            }
        }, 10000)
    }

    @SuppressLint("MissingPermission")
    private fun startScan() {
        _scannedDevices.clear()
        scanner = bluetoothAdapter?.bluetoothLeScanner
        scanner?.startScan(scanCallback)
        handler.postDelayed({ stopScan() }, 15000)
    }

    @SuppressLint("MissingPermission")
    private fun stopScan() {
        try { scanner?.stopScan(scanCallback) } catch (_: Exception) {}
    }

    @SuppressLint("MissingPermission")
    private fun connectBle(device: BluetoothDevice) {
        _bleState.value = "연결 중..."
        bluetoothGatt = device.connectGatt(this, false, gattCallback)
    }

    @SuppressLint("MissingPermission")
    private fun disconnectBle() {
        bluetoothGatt?.disconnect()
        bluetoothGatt?.close()
        bluetoothGatt = null
        otaCtrlChar = null; otaDataChar = null
        _bleConnected.value = false
        _bleName.value = ""
        _bleState.value = "미연결"
    }

    // Write 완료 대기용
    private var writeCompleted = java.util.concurrent.CountDownLatch(1)

    private val gattCallback = object : BluetoothGattCallback() {
        @SuppressLint("MissingPermission")
        override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
            if (newState == BluetoothProfile.STATE_CONNECTED) {
                Log.d(TAG, "GATT connected")
                gatt.requestMtu(517) // MTU 확장 요청
            } else {
                handler.post {
                    _bleConnected.value = false
                    _bleName.value = ""
                    _bleState.value = "연결 끊김"
                }
            }
        }

        @SuppressLint("MissingPermission")
        override fun onMtuChanged(gatt: BluetoothGatt, mtu: Int, status: Int) {
            Log.d(TAG, "MTU changed: $mtu")
            gatt.discoverServices()
        }

        @SuppressLint("MissingPermission")
        override fun onServicesDiscovered(gatt: BluetoothGatt, status: Int) {
            val otaSvc = gatt.getService(UUID.fromString(OTA_SERVICE_UUID))
            if (otaSvc != null) {
                otaCtrlChar = otaSvc.getCharacteristic(UUID.fromString(OTA_CTRL_UUID))
                otaDataChar = otaSvc.getCharacteristic(UUID.fromString(OTA_DATA_UUID))
                handler.post {
                    _bleConnected.value = true
                    _bleName.value = gatt.device.name ?: "UTTEC"
                    _bleState.value = "연결됨"
                    Toast.makeText(this@MainActivity, "BLE 연결 완료!", Toast.LENGTH_SHORT).show()
                }
                Log.d(TAG, "OTA service found")
            } else {
                handler.post {
                    _bleState.value = "OTA 서비스 없음"
                    Toast.makeText(this@MainActivity, "OTA 서비스를 찾을 수 없습니다", Toast.LENGTH_SHORT).show()
                }
            }
        }

        override fun onCharacteristicWrite(gatt: BluetoothGatt, char: BluetoothGattCharacteristic, status: Int) {
            writeCompleted.countDown()
        }
    }

    @SuppressLint("MissingPermission")
    private fun writeAndWait(char: BluetoothGattCharacteristic, data: ByteArray, writeType: Int, timeoutMs: Long = 3000): Boolean {
        writeCompleted = java.util.concurrent.CountDownLatch(1)
        char.value = data
        char.writeType = writeType
        bluetoothGatt!!.writeCharacteristic(char)
        return writeCompleted.await(timeoutMs, java.util.concurrent.TimeUnit.MILLISECONDS)
    }

    // ─── OTA ───

    @SuppressLint("MissingPermission")
    private fun sendToBoard(no: String) {
        if (!_bleConnected.value || otaCtrlChar == null || otaDataChar == null) return

        _otaProgress.value = 0
        _otaMessage.value = "펌웨어 다운로드 중..."

        scope.launch(Dispatchers.IO) {
            try {
                // Download firmware
                val req = Request.Builder().url("$SERVER_URL/api/prebuilt/$no").build()
                val fwData = httpClient.newCall(req).execute().use { it.body?.bytes() }
                    ?: throw RuntimeException("Download failed")

                val total = fwData.size
                Log.d(TAG, "OTA: firmware downloaded, size=$total")
                withContext(Dispatchers.Main) { _otaMessage.value = "OTA 시작... (${total/1024}KB)" }

                // OTA START — 리틀엔디안으로 크기 전송
                val startCmd = byteArrayOf(
                    0x01,
                    (total and 0xFF).toByte(),
                    ((total shr 8) and 0xFF).toByte(),
                    ((total shr 16) and 0xFF).toByte(),
                    ((total shr 24) and 0xFF).toByte()
                )
                writeAndWait(otaCtrlChar!!, startCmd, BluetoothGattCharacteristic.WRITE_TYPE_DEFAULT)
                Log.d(TAG, "OTA: START sent, size=$total")
                delay(500) // 보드 Update.begin() 대기

                // DATA chunks — 240바이트, NO_RESPONSE + 콜백 대기
                val chunkSize = 240
                var offset = 0
                var lastPct = -1
                while (offset < total) {
                    val end = minOf(offset + chunkSize, total)
                    val chunk = fwData.copyOfRange(offset, end)

                    writeAndWait(otaDataChar!!, chunk, BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE, 3000)

                    offset = end
                    val pct = (offset * 100) / total
                    if (pct != lastPct && pct % 5 == 0) {
                        lastPct = pct
                        withContext(Dispatchers.Main) {
                            _otaProgress.value = pct
                            _otaMessage.value = "전송 중... ${pct}% (${offset/1024}/${total/1024}KB)"
                        }
                        Log.d(TAG, "OTA: $pct% ($offset/$total)")
                    }
                }

                // OTA END
                delay(200)
                writeAndWait(otaCtrlChar!!, byteArrayOf(0x02), BluetoothGattCharacteristic.WRITE_TYPE_DEFAULT)
                Log.d(TAG, "OTA: END sent")

                withContext(Dispatchers.Main) {
                    _otaProgress.value = 100
                    _otaMessage.value = "✅ OTA 완료! 보드가 재시작됩니다."
                    Toast.makeText(this@MainActivity, "펌웨어 전송 완료!", Toast.LENGTH_LONG).show()
                }

                // Stats
                try {
                    val sr = Request.Builder().url("$SERVER_URL/api/stats/$no").post(
                        okhttp3.RequestBody.create(null, "")).build()
                    httpClient.newCall(sr).execute().close()
                } catch (_: Exception) {}

                delay(3000)
                withContext(Dispatchers.Main) { _otaProgress.value = -1 }

            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    _otaMessage.value = "❌ 전송 실패: ${e.message}"
                    Log.e(TAG, "OTA failed", e)
                    e.printStackTrace()
                }
                // ABORT
                try { writeAndWait(otaCtrlChar!!, byteArrayOf(0x03), BluetoothGattCharacteristic.WRITE_TYPE_DEFAULT) } catch (_: Exception) {}
                delay(3000)
                withContext(Dispatchers.Main) { _otaProgress.value = -1 }
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        scope.cancel()
        disconnectBle()
    }
}
