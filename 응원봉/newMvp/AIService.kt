package com.uttec.fanstick.ai

import android.util.Log
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import java.util.concurrent.TimeUnit

/**
 * AI FanStick - AI 서비스 (통합 버전)
 *
 * Python gemini_service.py를 Kotlin으로 마이그레이션
 * 앱에서 직접 Gemini/OpenAI API를 호출합니다.
 */

data class AIResponse(
    val success: Boolean,
    val response: String,
    val ledColor: List<Int>,
    val currentSong: SongInfo
)

class AIService(
    private val concertData: ConcertDataManager,
    private val promptGenerator: PromptGenerator,
    private val geminiApiKey: String = "",
    private val openAiApiKey: String = "",
    private val preferredProvider: AIProvider = AIProvider.GEMINI
) {
    companion object {
        private const val TAG = "AIService"
        private const val GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
        private const val OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
    }

    enum class AIProvider {
        GEMINI, OPENAI
    }

    private val httpClient = OkHttpClient.Builder()
        .connectTimeout(15, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()

    /**
     * AI에게 질문하기 (메인 함수)
     */
    suspend fun ask(userQuestion: String): AIResponse = withContext(Dispatchers.IO) {
        var result: AIResponse? = null

        // 1. 선호하는 provider로 먼저 시도
        if (preferredProvider == AIProvider.OPENAI && openAiApiKey.isNotEmpty()) {
            result = askOpenAI(userQuestion)
            if (result == null && geminiApiKey.isNotEmpty()) {
                Log.d(TAG, "OpenAI 실패, Gemini로 폴백...")
                result = askGemini(userQuestion)
            }
        } else if (geminiApiKey.isNotEmpty()) {
            result = askGemini(userQuestion)
            if (result == null && openAiApiKey.isNotEmpty()) {
                Log.d(TAG, "Gemini 실패, OpenAI로 폴백...")
                result = askOpenAI(userQuestion)
            }
        }

        // 2. 둘 다 실패하면 규칙 기반 응답
        result ?: fallbackResponse(userQuestion)
    }

    /**
     * Gemini API 호출
     */
    private fun askGemini(userQuestion: String): AIResponse? {
        if (geminiApiKey.isEmpty()) {
            Log.w(TAG, "Gemini API 키가 설정되지 않았습니다.")
            return null
        }

        try {
            val systemPrompt = promptGenerator.generate()

            val requestBody = JSONObject().apply {
                put("contents", JSONArray().apply {
                    put(JSONObject().apply {
                        put("role", "user")
                        put("parts", JSONArray().apply {
                            put(JSONObject().apply {
                                put("text", userQuestion)
                            })
                        })
                    })
                })
                put("systemInstruction", JSONObject().apply {
                    put("parts", JSONArray().apply {
                        put(JSONObject().apply {
                            put("text", systemPrompt)
                        })
                    })
                })
                put("generationConfig", JSONObject().apply {
                    put("maxOutputTokens", 200)
                    put("temperature", 0.8)
                })
            }.toString()

            val request = Request.Builder()
                .url("$GEMINI_API_URL?key=$geminiApiKey")
                .post(requestBody.toRequestBody("application/json".toMediaType()))
                .build()

            httpClient.newCall(request).execute().use { response ->
                if (!response.isSuccessful) {
                    Log.e(TAG, "Gemini API 오류: ${response.code}")
                    return null
                }

                val jsonResponse = JSONObject(response.body?.string() ?: "{}")
                val candidates = jsonResponse.optJSONArray("candidates")
                val content = candidates?.optJSONObject(0)
                    ?.optJSONObject("content")
                    ?.optJSONArray("parts")
                    ?.optJSONObject(0)
                    ?.optString("text", "") ?: ""

                if (content.isNotEmpty()) {
                    val ledColor = parseLedColor(content)
                    val cleanResponse = cleanResponse(content)
                    Log.d(TAG, "[Gemini] 응답 성공: ${cleanResponse.take(50)}...")

                    return AIResponse(
                        success = true,
                        response = cleanResponse,
                        ledColor = ledColor,
                        currentSong = concertData.getCurrentSong()
                    )
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Gemini API 오류", e)
        }

        return null
    }

    /**
     * OpenAI API 호출
     */
    private fun askOpenAI(userQuestion: String): AIResponse? {
        if (openAiApiKey.isEmpty()) {
            Log.w(TAG, "OpenAI API 키가 설정되지 않았습니다.")
            return null
        }

        try {
            val systemPrompt = promptGenerator.generate()

            val requestBody = JSONObject().apply {
                put("model", "gpt-4o-mini")
                put("messages", JSONArray().apply {
                    put(JSONObject().apply {
                        put("role", "system")
                        put("content", systemPrompt)
                    })
                    put(JSONObject().apply {
                        put("role", "user")
                        put("content", userQuestion)
                    })
                })
                put("max_tokens", 200)
                put("temperature", 0.8)
            }.toString()

            val request = Request.Builder()
                .url(OPENAI_API_URL)
                .addHeader("Authorization", "Bearer $openAiApiKey")
                .addHeader("Content-Type", "application/json")
                .post(requestBody.toRequestBody("application/json".toMediaType()))
                .build()

            httpClient.newCall(request).execute().use { response ->
                if (!response.isSuccessful) {
                    Log.e(TAG, "OpenAI API 오류: ${response.code}")
                    return null
                }

                val jsonResponse = JSONObject(response.body?.string() ?: "{}")
                val content = jsonResponse.optJSONArray("choices")
                    ?.optJSONObject(0)
                    ?.optJSONObject("message")
                    ?.optString("content", "") ?: ""

                if (content.isNotEmpty()) {
                    val ledColor = parseLedColor(content)
                    val cleanResponse = cleanResponse(content)
                    Log.d(TAG, "[OpenAI] 응답 성공: ${cleanResponse.take(50)}...")

                    return AIResponse(
                        success = true,
                        response = cleanResponse,
                        ledColor = ledColor,
                        currentSong = concertData.getCurrentSong()
                    )
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "OpenAI API 오류", e)
        }

        return null
    }

    /**
     * 응답에서 LED 색상 추출 [LED:R,G,B] 형식
     */
    private fun parseLedColor(responseText: String): List<Int> {
        val regex = """\[LED:(\d+),(\d+),(\d+)\]""".toRegex()
        val match = regex.find(responseText)

        return if (match != null) {
            listOf(
                match.groupValues[1].toInt().coerceIn(0, 255),
                match.groupValues[2].toInt().coerceIn(0, 255),
                match.groupValues[3].toInt().coerceIn(0, 255)
            )
        } else {
            // 현재 곡의 색상 반환
            concertData.getCurrentSong().colorRgb
        }
    }

    /**
     * 응답에서 LED 태그 제거
     */
    private fun cleanResponse(responseText: String): String {
        return responseText.replace("""\s*\[LED:\d+,\d+,\d+\]""".toRegex(), "").trim()
    }

    /**
     * API 실패 시 규칙 기반 폴백 응답
     */
    private fun fallbackResponse(question: String): AIResponse {
        val lowerQuestion = question.lowercase().trim()
        val currentSong = concertData.getCurrentSong()
        val nextSong = concertData.getNextSong()

        // 다음 곡 관련
        if (listOf("다음 곡", "다음곡", "다음 노래", "그 다음").any { it in lowerQuestion }) {
            return if (nextSong != null) {
                AIResponse(
                    success = true,
                    response = "다음 곡은 '${nextSong.title}'이에요! 응원 색상은 ${nextSong.colorName}이고, 팬 응원법은 '${nextSong.fanChant}'예요!",
                    ledColor = nextSong.colorRgb,
                    currentSong = currentSong
                )
            } else {
                AIResponse(
                    success = true,
                    response = "이게 마지막 곡이에요! 끝까지 함께해요!",
                    ledColor = currentSong.colorRgb,
                    currentSong = currentSong
                )
            }
        }

        // 현재 곡 관련
        if (listOf("지금 곡", "현재 곡", "이 곡", "지금 노래").any { it in lowerQuestion }) {
            return AIResponse(
                success = true,
                response = "지금 곡은 '${currentSong.title}'이에요! 응원 색상은 ${currentSong.colorName}이고, 팬 응원법은 '${currentSong.fanChant}'예요!",
                ledColor = currentSong.colorRgb,
                currentSong = currentSong
            )
        }

        // 응원법/떼창 관련
        if (listOf("응원법", "떼창", "응원", "팬챈트").any { it in lowerQuestion }) {
            return AIResponse(
                success = true,
                response = "'${currentSong.title}'의 응원법은 '${currentSong.fanChant}'예요! ${currentSong.highlight}",
                ledColor = currentSong.colorRgb,
                currentSong = currentSong
            )
        }

        // 색상 관련
        if (listOf("색", "색상", "무슨 색", "컬러").any { it in lowerQuestion }) {
            return AIResponse(
                success = true,
                response = "지금 응원 색상은 ${currentSong.colorName}이에요! 응원봉을 이 색으로 맞춰주세요!",
                ledColor = currentSong.colorRgb,
                currentSong = currentSong
            )
        }

        // 멤버 관련
        val members = concertData.getMembers()
        for (member in members) {
            if (member.stageName.lowercase() in lowerQuestion ||
                member.realName.lowercase() in lowerQuestion) {
                return AIResponse(
                    success = true,
                    response = "${member.stageName}(${member.realName})의 생일은 ${member.birthday}이에요! 포지션은 ${member.position}이고, 이모지는 ${member.emoji}예요!",
                    ledColor = listOf(138, 43, 226), // 보라색
                    currentSong = currentSong
                )
            }
        }

        // 기본 응답
        return AIResponse(
            success = true,
            response = "안녕하세요! 지금은 '${currentSong.title}'을 연주하고 있어요. 응원 색상은 ${currentSong.colorName}이에요! 다른 궁금한 게 있으면 물어봐주세요!",
            ledColor = currentSong.colorRgb,
            currentSong = currentSong
        )
    }
}
