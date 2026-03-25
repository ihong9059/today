package com.tetherscanner

import android.content.Context
import android.net.wifi.WifiManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ProgressBar
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import java.io.BufferedReader
import java.io.FileReader
import java.net.InetAddress
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var scanButton: Button
    private lateinit var progressBar: ProgressBar
    private lateinit var statusText: TextView
    private lateinit var deviceCountText: TextView
    private val deviceList = mutableListOf<DeviceInfo>()
    private lateinit var adapter: DeviceAdapter
    private val executor = Executors.newFixedThreadPool(50)
    private val handler = Handler(Looper.getMainLooper())

    data class DeviceInfo(val ip: String, val mac: String, val hostname: String)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        recyclerView = findViewById(R.id.recyclerView)
        scanButton = findViewById(R.id.scanButton)
        progressBar = findViewById(R.id.progressBar)
        statusText = findViewById(R.id.statusText)
        deviceCountText = findViewById(R.id.deviceCountText)

        adapter = DeviceAdapter(deviceList)
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = adapter

        scanButton.setOnClickListener {
            startScan()
        }

        // 앱 시작 시 자동 스캔
        startScan()
    }

    private fun startScan() {
        deviceList.clear()
        adapter.notifyDataSetChanged()
        scanButton.isEnabled = false
        progressBar.visibility = View.VISIBLE
        statusText.text = "스캔 중..."
        deviceCountText.text = "연결된 기기: 0대"

        Thread {
            // ARP 테이블에서 연결된 기기 확인
            val arpDevices = readArpTable()

            // 테더링 IP 범위 스캔 (192.168.43.x)
            val subnet = "192.168.43"
            var scannedCount = 0
            val totalCount = 254

            for (i in 1..254) {
                val ip = "$subnet.$i"
                executor.execute {
                    try {
                        val inetAddress = InetAddress.getByName(ip)
                        if (inetAddress.isReachable(300)) {
                            val hostname = try {
                                inetAddress.hostName ?: "Unknown"
                            } catch (e: Exception) {
                                "Unknown"
                            }
                            val mac = arpDevices[ip] ?: getMacFromArp(ip)

                            handler.post {
                                val device = DeviceInfo(ip, mac, hostname)
                                if (!deviceList.any { it.ip == ip }) {
                                    deviceList.add(device)
                                    deviceList.sortBy {
                                        it.ip.split(".").last().toIntOrNull() ?: 0
                                    }
                                    adapter.notifyDataSetChanged()
                                    deviceCountText.text = "연결된 기기: ${deviceList.size}대"
                                }
                            }
                        }
                    } catch (e: Exception) {
                        // Ignore unreachable hosts
                    }

                    synchronized(this@MainActivity) {
                        scannedCount++
                        handler.post {
                            val progress = (scannedCount * 100) / totalCount
                            statusText.text = "스캔 중... $progress%"
                            if (scannedCount >= totalCount) {
                                scanButton.isEnabled = true
                                progressBar.visibility = View.GONE
                                statusText.text = "스캔 완료"
                            }
                        }
                    }
                }
            }
        }.start()
    }

    private fun readArpTable(): Map<String, String> {
        val arpMap = mutableMapOf<String, String>()
        try {
            val reader = BufferedReader(FileReader("/proc/net/arp"))
            reader.readLine() // Skip header
            var line: String?
            while (reader.readLine().also { line = it } != null) {
                val parts = line!!.split("\\s+".toRegex())
                if (parts.size >= 4) {
                    val ip = parts[0]
                    val mac = parts[3]
                    if (mac != "00:00:00:00:00:00") {
                        arpMap[ip] = mac.uppercase()
                    }
                }
            }
            reader.close()
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return arpMap
    }

    private fun getMacFromArp(ip: String): String {
        try {
            val reader = BufferedReader(FileReader("/proc/net/arp"))
            reader.readLine() // Skip header
            var line: String?
            while (reader.readLine().also { line = it } != null) {
                val parts = line!!.split("\\s+".toRegex())
                if (parts.size >= 4 && parts[0] == ip) {
                    val mac = parts[3]
                    reader.close()
                    return if (mac != "00:00:00:00:00:00") mac.uppercase() else "N/A"
                }
            }
            reader.close()
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return "N/A"
    }

    class DeviceAdapter(private val devices: List<DeviceInfo>) :
        RecyclerView.Adapter<DeviceAdapter.ViewHolder>() {

        class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
            val ipText: TextView = view.findViewById(R.id.ipText)
            val macText: TextView = view.findViewById(R.id.macText)
            val hostnameText: TextView = view.findViewById(R.id.hostnameText)
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val view = LayoutInflater.from(parent.context)
                .inflate(R.layout.item_device, parent, false)
            return ViewHolder(view)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            val device = devices[position]
            holder.ipText.text = device.ip
            holder.macText.text = "MAC: ${device.mac}"
            holder.hostnameText.text = "Host: ${device.hostname}"
        }

        override fun getItemCount() = devices.size
    }
}
