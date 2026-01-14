package com.example.nfcreader

import android.app.AlertDialog
import android.app.PendingIntent
import android.content.Intent
import android.content.IntentFilter
import android.nfc.NdefMessage
import android.nfc.NfcAdapter
import android.nfc.Tag
import android.nfc.tech.MifareClassic
import android.nfc.tech.MifareUltralight
import android.nfc.tech.Ndef
import android.nfc.tech.NfcA
import android.os.Build
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : AppCompatActivity() {

    private var nfcAdapter: NfcAdapter? = null
    private lateinit var pendingIntent: PendingIntent

    private lateinit var tvStatus: TextView
    private lateinit var tvTagId: TextView
    private lateinit var tvTagType: TextView
    private lateinit var tvTagData: TextView
    private lateinit var tvTimestamp: TextView
    private lateinit var btnRead: Button
    private lateinit var btnClear: Button
    private lateinit var btnWriteUid: Button
    private lateinit var etNewUid: EditText

    private var isReading = false
    private var isWriteMode = false
    private var pendingUid: ByteArray? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initViews()
        initNfc()
        setupButtons()

        // 앱이 NFC 태그로 시작된 경우 처리
        handleNfcIntent(intent)
    }

    private fun initViews() {
        tvStatus = findViewById(R.id.tvStatus)
        tvTagId = findViewById(R.id.tvTagId)
        tvTagType = findViewById(R.id.tvTagType)
        tvTagData = findViewById(R.id.tvTagData)
        tvTimestamp = findViewById(R.id.tvTimestamp)
        btnRead = findViewById(R.id.btnRead)
        btnClear = findViewById(R.id.btnClear)
        btnWriteUid = findViewById(R.id.btnWriteUid)
        etNewUid = findViewById(R.id.etNewUid)
    }

    private fun initNfc() {
        nfcAdapter = NfcAdapter.getDefaultAdapter(this)

        if (nfcAdapter == null) {
            tvStatus.text = "이 기기는 NFC를 지원하지 않습니다"
            btnRead.isEnabled = false
            btnWriteUid.isEnabled = false
            return
        }

        if (!nfcAdapter!!.isEnabled) {
            tvStatus.text = "NFC가 비활성화되어 있습니다. 설정에서 활성화해주세요."
        }

        val intent = Intent(this, javaClass).apply {
            addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        }

        val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
        } else {
            PendingIntent.FLAG_UPDATE_CURRENT
        }

        pendingIntent = PendingIntent.getActivity(this, 0, intent, flags)
    }

    private fun setupButtons() {
        btnRead.setOnClickListener {
            if (nfcAdapter == null) {
                Toast.makeText(this, "NFC를 사용할 수 없습니다", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (!nfcAdapter!!.isEnabled) {
                Toast.makeText(this, "NFC를 활성화해주세요", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            isWriteMode = false
            isReading = !isReading
            if (isReading) {
                btnRead.text = "읽기 중지"
                tvStatus.text = "태그를 스마트폰 뒷면에 가까이 대세요..."
                enableForegroundDispatch()
            } else {
                btnRead.text = "태그 읽기"
                tvStatus.text = "준비됨"
                disableForegroundDispatch()
            }
        }

        btnClear.setOnClickListener {
            clearTagInfo()
            etNewUid.text.clear()
        }

        btnWriteUid.setOnClickListener {
            if (nfcAdapter == null || !nfcAdapter!!.isEnabled) {
                Toast.makeText(this, "NFC를 활성화해주세요", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val uidText = etNewUid.text.toString().trim().uppercase()
            if (uidText.isEmpty()) {
                Toast.makeText(this, "UID를 입력해주세요", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // UID 파싱 (AA:BB:CC:DD 또는 AABBCCDD 형식 지원)
            val uidBytes = parseUid(uidText)
            if (uidBytes == null || uidBytes.size != 4) {
                Toast.makeText(this, "UID는 4바이트여야 합니다 (예: AA:BB:CC:DD)", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // 확인 다이얼로그
            AlertDialog.Builder(this)
                .setTitle("UID 쓰기 확인")
                .setMessage("새 UID: ${uidBytes.toHexString()}\n\nCUID 태그에 이 UID를 쓰시겠습니까?\n\n주의: 일반 MIFARE Classic 태그는 UID를 변경할 수 없습니다.")
                .setPositiveButton("쓰기") { _, _ ->
                    pendingUid = uidBytes
                    isWriteMode = true
                    isReading = true
                    btnRead.text = "쓰기 중지"
                    tvStatus.text = "CUID 태그를 스마트폰에 대세요..."
                    enableForegroundDispatch()
                }
                .setNegativeButton("취소", null)
                .show()
        }
    }

    private fun parseUid(text: String): ByteArray? {
        return try {
            val cleanText = text.replace(":", "").replace(" ", "").replace("-", "")
            if (cleanText.length % 2 != 0) return null

            val bytes = ByteArray(cleanText.length / 2)
            for (i in bytes.indices) {
                bytes[i] = cleanText.substring(i * 2, i * 2 + 2).toInt(16).toByte()
            }
            bytes
        } catch (e: Exception) {
            null
        }
    }

    private fun clearTagInfo() {
        tvTagId.text = "태그 ID: -"
        tvTagType.text = "태그 타입: -"
        tvTagData.text = "데이터: -"
        tvTimestamp.text = "읽은 시간: -"
    }

    private fun enableForegroundDispatch() {
        nfcAdapter?.enableForegroundDispatch(this, pendingIntent, null, null)
    }

    private fun disableForegroundDispatch() {
        nfcAdapter?.disableForegroundDispatch(this)
    }

    override fun onResume() {
        super.onResume()
        if (isReading) {
            enableForegroundDispatch()
        }
    }

    override fun onPause() {
        super.onPause()
        disableForegroundDispatch()
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        handleNfcIntent(intent)
    }

    private fun handleNfcIntent(intent: Intent) {
        val action = intent.action
        if (NfcAdapter.ACTION_NDEF_DISCOVERED == action ||
            NfcAdapter.ACTION_TECH_DISCOVERED == action ||
            NfcAdapter.ACTION_TAG_DISCOVERED == action) {

            val tag: Tag? = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                intent.getParcelableExtra(NfcAdapter.EXTRA_TAG, Tag::class.java)
            } else {
                @Suppress("DEPRECATION")
                intent.getParcelableExtra(NfcAdapter.EXTRA_TAG)
            }

            tag?.let {
                if (isWriteMode && pendingUid != null) {
                    writeUidToTag(it, pendingUid!!)
                } else {
                    displayTagInfo(it, intent)
                    Toast.makeText(this, "태그를 읽었습니다!", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun writeUidToTag(tag: Tag, newUid: ByteArray) {
        val mifareClassic = MifareClassic.get(tag)
        if (mifareClassic == null) {
            Toast.makeText(this, "MIFARE Classic 태그가 아닙니다", Toast.LENGTH_SHORT).show()
            return
        }

        try {
            mifareClassic.connect()

            // 기본 키로 섹터 0 인증
            val defaultKey = ByteArray(6) { 0xFF.toByte() }
            val auth = mifareClassic.authenticateSectorWithKeyA(0, defaultKey)

            if (!auth) {
                Toast.makeText(this, "인증 실패", Toast.LENGTH_SHORT).show()
                mifareClassic.close()
                return
            }

            // 블록 0 읽기 (현재 데이터)
            val block0 = mifareClassic.readBlock(0)

            // 새 블록 0 데이터 생성
            // 블록 0 구조: UID(4) + BCC(1) + SAK(1) + ATQA(2) + 제조사 데이터(8)
            val newBlock0 = block0.copyOf()

            // UID 변경 (4바이트)
            System.arraycopy(newUid, 0, newBlock0, 0, 4)

            // BCC 계산 (UID 4바이트 XOR)
            newBlock0[4] = (newUid[0].toInt() xor newUid[1].toInt() xor newUid[2].toInt() xor newUid[3].toInt()).toByte()

            // 블록 0에 쓰기 시도 (CUID 태그만 가능)
            try {
                mifareClassic.writeBlock(0, newBlock0)

                tvStatus.text = "UID 쓰기 성공!"
                tvTagData.text = "새 UID: ${newUid.toHexString()}\n\n태그를 다시 읽어 확인하세요."
                Toast.makeText(this, "UID 쓰기 성공!", Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                Toast.makeText(this, "UID 쓰기 실패: 일반 태그는 쓸 수 없습니다", Toast.LENGTH_LONG).show()
                tvStatus.text = "쓰기 실패 (CUID 태그가 아님)"
            }

            mifareClassic.close()

        } catch (e: Exception) {
            Toast.makeText(this, "오류: ${e.message}", Toast.LENGTH_SHORT).show()
            try { mifareClassic.close() } catch (ignored: Exception) {}
        }

        // 쓰기 모드 종료
        isWriteMode = false
        pendingUid = null
        isReading = false
        btnRead.text = "태그 읽기"
    }

    private fun displayTagInfo(tag: Tag, intent: Intent) {
        // 태그 ID
        val tagId = tag.id.toHexString()
        tvTagId.text = "태그 ID: $tagId"

        // 현재 UID를 입력칸에 표시
        etNewUid.setText(tagId)

        // 태그 타입
        val techList = tag.techList.joinToString(", ") { it.substringAfterLast(".") }
        tvTagType.text = "태그 타입: $techList"

        // 데이터 읽기
        val data = readTagData(tag, intent)
        tvTagData.text = "데이터:\n$data"

        // 타임스탬프
        val timestamp = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault()).format(Date())
        tvTimestamp.text = "읽은 시간: $timestamp"

        tvStatus.text = "태그 읽기 완료!"
    }

    private fun readTagData(tag: Tag, intent: Intent): String {
        val sb = StringBuilder()

        // NDEF 메시지 읽기
        val rawMessages = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES)
        if (rawMessages != null) {
            val messages = rawMessages.map { it as NdefMessage }
            for (message in messages) {
                for (record in message.records) {
                    val payload = record.payload
                    val text = if (payload.isNotEmpty()) {
                        if (record.tnf == android.nfc.NdefRecord.TNF_WELL_KNOWN) {
                            val languageCodeLength = payload[0].toInt() and 0x3F
                            String(payload, languageCodeLength + 1, payload.size - languageCodeLength - 1, Charsets.UTF_8)
                        } else {
                            String(payload, Charsets.UTF_8)
                        }
                    } else {
                        "(빈 데이터)"
                    }
                    sb.appendLine("NDEF: $text")
                }
            }
        }

        // Ndef 기술 정보
        val ndef = Ndef.get(tag)
        if (ndef != null) {
            sb.appendLine("최대 크기: ${ndef.maxSize} bytes")
            sb.appendLine("타입: ${ndef.type}")
            sb.appendLine("쓰기 가능: ${if (ndef.isWritable) "예" else "아니오"}")
        }

        // MIFARE Classic 정보 및 데이터 읽기
        val mifareClassic = MifareClassic.get(tag)
        if (mifareClassic != null) {
            sb.appendLine("MIFARE Classic")
            sb.appendLine("섹터 수: ${mifareClassic.sectorCount}")
            sb.appendLine("블록 수: ${mifareClassic.blockCount}")
            sb.appendLine("크기: ${mifareClassic.size} bytes")
            sb.appendLine("")

            try {
                mifareClassic.connect()

                for (sector in 0 until mifareClassic.sectorCount) {
                    val keyA = ByteArray(6) { 0xFF.toByte() }
                    val authA = mifareClassic.authenticateSectorWithKeyA(sector, keyA)

                    if (authA) {
                        sb.appendLine("=== 섹터 $sector ===")
                        val blockCount = mifareClassic.getBlockCountInSector(sector)
                        val firstBlock = mifareClassic.sectorToBlock(sector)

                        for (block in 0 until blockCount) {
                            val blockIndex = firstBlock + block
                            try {
                                val data = mifareClassic.readBlock(blockIndex)
                                sb.appendLine("블록 $blockIndex: ${data.toHexString()}")
                            } catch (e: Exception) {
                                sb.appendLine("블록 $blockIndex: (읽기 실패)")
                            }
                        }
                    } else {
                        val authB = mifareClassic.authenticateSectorWithKeyB(sector, keyA)
                        if (authB) {
                            sb.appendLine("=== 섹터 $sector (Key B) ===")
                            val blockCount = mifareClassic.getBlockCountInSector(sector)
                            val firstBlock = mifareClassic.sectorToBlock(sector)

                            for (block in 0 until blockCount) {
                                val blockIndex = firstBlock + block
                                try {
                                    val data = mifareClassic.readBlock(blockIndex)
                                    sb.appendLine("블록 $blockIndex: ${data.toHexString()}")
                                } catch (e: Exception) {
                                    sb.appendLine("블록 $blockIndex: (읽기 실패)")
                                }
                            }
                        } else {
                            sb.appendLine("섹터 $sector: 인증 실패 (보호됨)")
                        }
                    }
                }

                mifareClassic.close()
            } catch (e: Exception) {
                sb.appendLine("데이터 읽기 오류: ${e.message}")
                try { mifareClassic.close() } catch (ignored: Exception) {}
            }
        }

        // MIFARE Ultralight 정보
        val mifareUltralight = MifareUltralight.get(tag)
        if (mifareUltralight != null) {
            val type = when (mifareUltralight.type) {
                MifareUltralight.TYPE_ULTRALIGHT -> "Ultralight"
                MifareUltralight.TYPE_ULTRALIGHT_C -> "Ultralight C"
                else -> "Unknown"
            }
            sb.appendLine("MIFARE $type")
        }

        return if (sb.isEmpty()) "(데이터 없음)" else sb.toString().trim()
    }

    private fun ByteArray.toHexString(): String {
        return joinToString(":") { "%02X".format(it) }
    }
}
