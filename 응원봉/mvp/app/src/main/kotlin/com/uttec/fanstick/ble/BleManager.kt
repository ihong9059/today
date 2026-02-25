/**
 * AI FanStick MVP - BLE 매니저
 * ESP32-C3 응원봉과 BLE 통신
 */

package com.uttec.fanstick.ble

import android.annotation.SuppressLint
import android.bluetooth.*
import android.bluetooth.le.*
import android.content.Context
import android.os.Handler
import android.os.Looper
import android.util.Log
import java.util.UUID

// BLE UUID (ESP32 펌웨어와 동일)
private val SERVICE_UUID = UUID.fromString("4fafc201-1fb5-459e-8fcc-c5c9c331914b")
private val LED_CHAR_UUID = UUID.fromString("beb5483e-36e1-4688-b7f5-ea07361b26a8")
private val TEXT_CHAR_UUID = UUID.fromString("beb5483e-36e1-4688-b7f5-ea07361b26a9")

private const val TAG = "BleManager"

// 연결 상태
enum class BleConnectionState {
    DISCONNECTED,
    SCANNING,
    CONNECTING,
    CONNECTED
}

// BLE 콜백 인터페이스
interface BleCallback {
    fun onConnectionStateChanged(state: BleConnectionState)
    fun onDeviceFound(device: BluetoothDevice)
    fun onDataReceived(data: String)
    fun onError(message: String)
}

@SuppressLint("MissingPermission")
class BleManager(private val context: Context) {

    private val bluetoothManager = context.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
    private val bluetoothAdapter: BluetoothAdapter? = bluetoothManager.adapter
    private var bluetoothGatt: BluetoothGatt? = null
    private var ledCharacteristic: BluetoothGattCharacteristic? = null
    private var textCharacteristic: BluetoothGattCharacteristic? = null

    private val handler = Handler(Looper.getMainLooper())
    private var callback: BleCallback? = null

    var connectionState = BleConnectionState.DISCONNECTED
        private set

    // 스캔 설정
    private val scanSettings = ScanSettings.Builder()
        .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
        .build()

    private val scanFilter = ScanFilter.Builder()
        .setServiceUuid(android.os.ParcelUuid(SERVICE_UUID))
        .build()

    // 스캔 콜백
    private val scanCallback = object : ScanCallback() {
        override fun onScanResult(callbackType: Int, result: ScanResult) {
            val device = result.device
            Log.d(TAG, "Device found: ${device.name ?: "Unknown"} - ${device.address}")

            if (device.name?.contains("FanStick") == true) {
                stopScan()
                callback?.onDeviceFound(device)
            }
        }

        override fun onScanFailed(errorCode: Int) {
            Log.e(TAG, "Scan failed: $errorCode")
            connectionState = BleConnectionState.DISCONNECTED
            callback?.onError("스캔 실패: $errorCode")
        }
    }

    // GATT 콜백
    private val gattCallback = object : BluetoothGattCallback() {
        override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
            when (newState) {
                BluetoothProfile.STATE_CONNECTED -> {
                    Log.d(TAG, "Connected to GATT server")
                    connectionState = BleConnectionState.CONNECTED
                    gatt.discoverServices()
                    handler.post { callback?.onConnectionStateChanged(BleConnectionState.CONNECTED) }
                }
                BluetoothProfile.STATE_DISCONNECTED -> {
                    Log.d(TAG, "Disconnected from GATT server")
                    connectionState = BleConnectionState.DISCONNECTED
                    bluetoothGatt?.close()
                    bluetoothGatt = null
                    handler.post { callback?.onConnectionStateChanged(BleConnectionState.DISCONNECTED) }
                }
            }
        }

        override fun onServicesDiscovered(gatt: BluetoothGatt, status: Int) {
            if (status == BluetoothGatt.GATT_SUCCESS) {
                val service = gatt.getService(SERVICE_UUID)
                if (service != null) {
                    ledCharacteristic = service.getCharacteristic(LED_CHAR_UUID)
                    textCharacteristic = service.getCharacteristic(TEXT_CHAR_UUID)

                    // Notification 활성화
                    ledCharacteristic?.let { enableNotification(gatt, it) }

                    Log.d(TAG, "Services discovered successfully")
                } else {
                    Log.e(TAG, "FanStick service not found")
                    callback?.onError("FanStick 서비스를 찾을 수 없습니다")
                }
            }
        }

        override fun onCharacteristicChanged(
            gatt: BluetoothGatt,
            characteristic: BluetoothGattCharacteristic,
            value: ByteArray
        ) {
            val data = String(value, Charsets.UTF_8)
            Log.d(TAG, "Data received: $data")
            handler.post { callback?.onDataReceived(data) }
        }

        override fun onCharacteristicWrite(
            gatt: BluetoothGatt,
            characteristic: BluetoothGattCharacteristic,
            status: Int
        ) {
            if (status == BluetoothGatt.GATT_SUCCESS) {
                Log.d(TAG, "Write successful")
            } else {
                Log.e(TAG, "Write failed: $status")
            }
        }
    }

    // ===== Public Methods =====

    fun setCallback(cb: BleCallback) {
        callback = cb
    }

    fun isBluetoothEnabled(): Boolean = bluetoothAdapter?.isEnabled == true

    fun startScan() {
        if (!isBluetoothEnabled()) {
            callback?.onError("블루투스가 꺼져 있습니다")
            return
        }

        connectionState = BleConnectionState.SCANNING
        callback?.onConnectionStateChanged(BleConnectionState.SCANNING)

        bluetoothAdapter?.bluetoothLeScanner?.startScan(
            listOf(scanFilter),
            scanSettings,
            scanCallback
        )

        // 10초 후 자동 중지
        handler.postDelayed({
            if (connectionState == BleConnectionState.SCANNING) {
                stopScan()
                callback?.onError("디바이스를 찾지 못했습니다")
            }
        }, 10000)

        Log.d(TAG, "Scanning started...")
    }

    fun stopScan() {
        bluetoothAdapter?.bluetoothLeScanner?.stopScan(scanCallback)
        if (connectionState == BleConnectionState.SCANNING) {
            connectionState = BleConnectionState.DISCONNECTED
        }
        Log.d(TAG, "Scanning stopped")
    }

    fun connect(device: BluetoothDevice) {
        connectionState = BleConnectionState.CONNECTING
        callback?.onConnectionStateChanged(BleConnectionState.CONNECTING)

        bluetoothGatt = device.connectGatt(context, false, gattCallback)
        Log.d(TAG, "Connecting to ${device.name}...")
    }

    fun disconnect() {
        bluetoothGatt?.disconnect()
        bluetoothGatt?.close()
        bluetoothGatt = null
        connectionState = BleConnectionState.DISCONNECTED
        callback?.onConnectionStateChanged(BleConnectionState.DISCONNECTED)
    }

    // ===== 명령 전송 =====

    /**
     * LED 색상 설정
     */
    fun setLedColor(r: Int, g: Int, b: Int) {
        sendCommand("C:$r,$g,$b")
    }

    /**
     * LED 패턴 설정
     */
    fun setPattern(pattern: String) {
        sendCommand("P:$pattern")
    }

    /**
     * 텍스트 표시
     */
    fun showText(text: String) {
        sendCommand("T:$text")
    }

    /**
     * 버저 재생
     */
    fun playBuzzer(pattern: String) {
        sendCommand("B:$pattern")
    }

    /**
     * 밝기 설정
     */
    fun setBrightness(value: Int) {
        sendCommand("L:$value")
    }

    /**
     * 곡 정보 표시
     */
    fun showSongInfo(title: String, color: String) {
        sendCommand("S:$title|$color")
    }

    private fun sendCommand(cmd: String) {
        if (connectionState != BleConnectionState.CONNECTED) {
            Log.w(TAG, "Not connected, cannot send: $cmd")
            return
        }

        ledCharacteristic?.let { char ->
            char.value = cmd.toByteArray(Charsets.UTF_8)
            bluetoothGatt?.writeCharacteristic(char)
            Log.d(TAG, "Sent: $cmd")
        }
    }

    private fun enableNotification(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic) {
        gatt.setCharacteristicNotification(characteristic, true)
        val descriptor = characteristic.getDescriptor(
            UUID.fromString("00002902-0000-1000-8000-00805f9b34fb")
        )
        descriptor?.let {
            it.value = BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE
            gatt.writeDescriptor(it)
        }
    }
}
