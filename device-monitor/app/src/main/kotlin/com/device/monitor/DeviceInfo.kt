package com.device.monitor

import android.app.ActivityManager
import android.content.Context
import android.os.Build
import android.os.Environment
import android.os.StatFs
import android.os.storage.StorageManager
import java.io.BufferedReader
import java.io.File
import java.io.FileReader
import java.io.RandomAccessFile

data class DeviceInfo(
    // CPU
    val cpuModel: String,
    val cpuCores: Int,
    val cpuFreqMax: String,
    val cpuUsage: Float,

    // Memory
    val totalRam: Long,
    val availableRam: Long,
    val usedRam: Long,

    // Storage
    val internalTotal: Long,
    val internalFree: Long,
    val sdCardTotal: Long,
    val sdCardFree: Long,
    val sdCardName: String?,

    // Device
    val deviceModel: String,
    val androidVersion: String,
    val sdkVersion: Int
)

object DeviceInfoHelper {

    fun getDeviceInfo(context: Context): DeviceInfo {
        return DeviceInfo(
            cpuModel = getCpuModel(),
            cpuCores = Runtime.getRuntime().availableProcessors(),
            cpuFreqMax = getCpuMaxFreq(),
            cpuUsage = getCpuUsage(),
            totalRam = getTotalRam(context),
            availableRam = getAvailableRam(context),
            usedRam = getTotalRam(context) - getAvailableRam(context),
            internalTotal = getInternalStorageTotal(),
            internalFree = getInternalStorageFree(),
            sdCardTotal = getSDCardTotal(context),
            sdCardFree = getSDCardFree(context),
            sdCardName = getSDCardName(context),
            deviceModel = "${Build.MANUFACTURER} ${Build.MODEL}",
            androidVersion = Build.VERSION.RELEASE,
            sdkVersion = Build.VERSION.SDK_INT
        )
    }

    private fun getCpuModel(): String {
        return try {
            val br = BufferedReader(FileReader("/proc/cpuinfo"))
            var line: String?
            while (br.readLine().also { line = it } != null) {
                if (line!!.contains("Hardware") || line!!.contains("model name")) {
                    br.close()
                    return line!!.split(":").getOrNull(1)?.trim() ?: "Unknown"
                }
            }
            br.close()
            Build.HARDWARE
        } catch (e: Exception) {
            Build.HARDWARE
        }
    }

    private fun getCpuMaxFreq(): String {
        return try {
            val file = File("/sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_max_freq")
            if (file.exists()) {
                val freq = file.readText().trim().toLong()
                String.format("%.1f GHz", freq / 1000000.0)
            } else {
                "N/A"
            }
        } catch (e: Exception) {
            "N/A"
        }
    }

    private fun getCpuUsage(): Float {
        return try {
            val reader = RandomAccessFile("/proc/stat", "r")
            val load1 = reader.readLine()
            reader.close()

            Thread.sleep(100)

            val reader2 = RandomAccessFile("/proc/stat", "r")
            val load2 = reader2.readLine()
            reader2.close()

            val toks1 = load1.split(" +".toRegex())
            val toks2 = load2.split(" +".toRegex())

            val idle1 = toks1[4].toLong()
            val cpu1 = toks1[1].toLong() + toks1[2].toLong() + toks1[3].toLong() + toks1[5].toLong() + toks1[6].toLong() + toks1[7].toLong()

            val idle2 = toks2[4].toLong()
            val cpu2 = toks2[1].toLong() + toks2[2].toLong() + toks2[3].toLong() + toks2[5].toLong() + toks2[6].toLong() + toks2[7].toLong()

            val totalDiff = (cpu2 + idle2) - (cpu1 + idle1)
            val idleDiff = idle2 - idle1

            if (totalDiff > 0) {
                ((totalDiff - idleDiff).toFloat() / totalDiff.toFloat()) * 100f
            } else {
                0f
            }
        } catch (e: Exception) {
            0f
        }
    }

    private fun getTotalRam(context: Context): Long {
        val activityManager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val memInfo = ActivityManager.MemoryInfo()
        activityManager.getMemoryInfo(memInfo)
        return memInfo.totalMem
    }

    private fun getAvailableRam(context: Context): Long {
        val activityManager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val memInfo = ActivityManager.MemoryInfo()
        activityManager.getMemoryInfo(memInfo)
        return memInfo.availMem
    }

    private fun getInternalStorageTotal(): Long {
        val stat = StatFs(Environment.getDataDirectory().path)
        return stat.blockSizeLong * stat.blockCountLong
    }

    private fun getInternalStorageFree(): Long {
        val stat = StatFs(Environment.getDataDirectory().path)
        return stat.blockSizeLong * stat.availableBlocksLong
    }

    private fun getSDCardTotal(context: Context): Long {
        return try {
            val storageManager = context.getSystemService(Context.STORAGE_SERVICE) as StorageManager
            val volumes = storageManager.storageVolumes
            for (volume in volumes) {
                if (volume.isRemovable && volume.state == "mounted") {
                    val path = "/storage/${volume.uuid}"
                    val file = File(path)
                    if (file.exists()) {
                        return file.totalSpace
                    }
                }
            }
            0L
        } catch (e: Exception) {
            0L
        }
    }

    private fun getSDCardFree(context: Context): Long {
        return try {
            val storageManager = context.getSystemService(Context.STORAGE_SERVICE) as StorageManager
            val volumes = storageManager.storageVolumes
            for (volume in volumes) {
                if (volume.isRemovable && volume.state == "mounted") {
                    val path = "/storage/${volume.uuid}"
                    val file = File(path)
                    if (file.exists()) {
                        return file.freeSpace
                    }
                }
            }
            0L
        } catch (e: Exception) {
            0L
        }
    }

    private fun getSDCardName(context: Context): String? {
        return try {
            val storageManager = context.getSystemService(Context.STORAGE_SERVICE) as StorageManager
            val volumes = storageManager.storageVolumes
            for (volume in volumes) {
                if (volume.isRemovable && volume.state == "mounted") {
                    return volume.uuid ?: "SD Card"
                }
            }
            null
        } catch (e: Exception) {
            null
        }
    }

    fun formatSize(size: Long): String {
        return when {
            size < 1024 -> "$size B"
            size < 1024 * 1024 -> String.format("%.1f KB", size / 1024.0)
            size < 1024 * 1024 * 1024 -> String.format("%.1f MB", size / (1024.0 * 1024))
            else -> String.format("%.2f GB", size / (1024.0 * 1024 * 1024))
        }
    }
}
