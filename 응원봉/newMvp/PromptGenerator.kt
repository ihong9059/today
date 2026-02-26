package com.uttec.fanstick.ai

import android.content.Context
import org.json.JSONObject
import org.json.JSONArray
import java.io.InputStream

/**
 * AI FanStick - 시스템 프롬프트 생성기
 *
 * Python prompt_generator.py를 Kotlin으로 마이그레이션
 * 콘서트 데이터를 로드하여 AI API에 전달할 시스템 프롬프트를 동적으로 생성합니다.
 */

data class SongInfo(
    val order: Int,
    val title: String,
    val colorName: String,
    val colorRgb: List<Int>,
    val fanChant: String,
    val highlight: String
)

data class MemberInfo(
    val stageName: String,
    val realName: String,
    val birthday: String,
    val position: String,
    val emoji: String
)

data class ArtistInfo(
    val name: String,
    val koreanName: String,
    val fandomName: String,
    val officialColor: String,
    val debutDate: String
)

data class ConcertInfo(
    val tourName: String,
    val venue: String,
    val date: String,
    val startTime: String
)

class ConcertDataManager(private val context: Context) {

    private var data: JSONObject = JSONObject()
    private var _currentSongIndex: Int = 0

    val currentSongIndex: Int get() = _currentSongIndex

    init {
        loadData()
    }

    /**
     * assets/concert_data.json 파일에서 데이터 로드
     */
    private fun loadData() {
        try {
            val inputStream: InputStream = context.assets.open("concert_data.json")
            val jsonString = inputStream.bufferedReader().use { it.readText() }
            data = JSONObject(jsonString)
            _currentSongIndex = data.optJSONObject("current_state")?.optInt("song_index", 0) ?: 0
        } catch (e: Exception) {
            e.printStackTrace()
            // 기본 데이터 설정
            data = createDefaultData()
        }
    }

    /**
     * 데이터 다시 로드
     */
    fun reload() {
        loadData()
    }

    /**
     * 현재 곡 인덱스 설정
     */
    fun setCurrentSongIndex(index: Int) {
        val setlistLength = getSetlist().size
        _currentSongIndex = index.coerceIn(0, setlistLength - 1)
    }

    /**
     * 다음 곡으로 이동
     */
    fun nextSong(): SongInfo {
        setCurrentSongIndex(_currentSongIndex + 1)
        return getCurrentSong()
    }

    /**
     * 이전 곡으로 이동
     */
    fun prevSong(): SongInfo {
        setCurrentSongIndex(_currentSongIndex - 1)
        return getCurrentSong()
    }

    /**
     * 아티스트 정보 반환
     */
    fun getArtist(): ArtistInfo {
        val artist = data.optJSONObject("artist") ?: JSONObject()
        return ArtistInfo(
            name = artist.optString("name", "Unknown"),
            koreanName = artist.optString("korean_name", ""),
            fandomName = artist.optString("fandom_name", ""),
            officialColor = artist.optString("official_color", "#800080"),
            debutDate = artist.optString("debut_date", "")
        )
    }

    /**
     * 콘서트 정보 반환
     */
    fun getConcert(): ConcertInfo {
        val concert = data.optJSONObject("concert") ?: JSONObject()
        return ConcertInfo(
            tourName = concert.optString("tour_name", ""),
            venue = concert.optString("venue", ""),
            date = concert.optString("date", ""),
            startTime = concert.optString("start_time", "")
        )
    }

    /**
     * 셋리스트 반환
     */
    fun getSetlist(): List<SongInfo> {
        val setlistArray = data.optJSONArray("setlist") ?: JSONArray()
        val songs = mutableListOf<SongInfo>()

        for (i in 0 until setlistArray.length()) {
            val song = setlistArray.getJSONObject(i)
            val colorArray = song.optJSONArray("color_rgb")
            val colorRgb = if (colorArray != null && colorArray.length() >= 3) {
                listOf(colorArray.getInt(0), colorArray.getInt(1), colorArray.getInt(2))
            } else {
                listOf(128, 0, 128) // 기본 보라색
            }

            songs.add(SongInfo(
                order = song.optInt("order", i + 1),
                title = song.optString("title", "Unknown"),
                colorName = song.optString("color_name", ""),
                colorRgb = colorRgb,
                fanChant = song.optString("fan_chant", ""),
                highlight = song.optString("highlight", "")
            ))
        }

        return songs
    }

    /**
     * 멤버 정보 반환
     */
    fun getMembers(): List<MemberInfo> {
        val membersArray = data.optJSONArray("members") ?: JSONArray()
        val members = mutableListOf<MemberInfo>()

        for (i in 0 until membersArray.length()) {
            val member = membersArray.getJSONObject(i)
            members.add(MemberInfo(
                stageName = member.optString("stage_name", ""),
                realName = member.optString("real_name", ""),
                birthday = member.optString("birthday", ""),
                position = member.optString("position", ""),
                emoji = member.optString("emoji", "")
            ))
        }

        return members
    }

    /**
     * 팬덤 용어 반환
     */
    fun getFandomTerms(): Map<String, String> {
        val termsObj = data.optJSONObject("fandom_terms") ?: JSONObject()
        val terms = mutableMapOf<String, String>()

        termsObj.keys().forEach { key ->
            terms[key] = termsObj.optString(key, "")
        }

        return terms
    }

    /**
     * 현재 곡 정보 반환
     */
    fun getCurrentSong(): SongInfo {
        val setlist = getSetlist()
        return if (setlist.isNotEmpty() && _currentSongIndex < setlist.size) {
            setlist[_currentSongIndex]
        } else {
            SongInfo(1, "Unknown", "", listOf(128, 0, 128), "", "")
        }
    }

    /**
     * 다음 곡 정보 반환
     */
    fun getNextSong(): SongInfo? {
        val setlist = getSetlist()
        val nextIndex = _currentSongIndex + 1
        return if (nextIndex < setlist.size) {
            setlist[nextIndex]
        } else {
            null
        }
    }

    /**
     * 남은 곡 수 반환
     */
    fun getRemainingCount(): Int {
        return getSetlist().size - _currentSongIndex - 1
    }

    /**
     * 기본 데이터 생성 (파일 로드 실패 시)
     */
    private fun createDefaultData(): JSONObject {
        return JSONObject().apply {
            put("artist", JSONObject().apply {
                put("name", "BTS")
                put("korean_name", "방탄소년단")
                put("fandom_name", "아미")
            })
            put("concert", JSONObject().apply {
                put("tour_name", "Concert")
                put("venue", "Seoul")
                put("date", "2026-01-01")
            })
            put("setlist", JSONArray().apply {
                put(JSONObject().apply {
                    put("order", 1)
                    put("title", "Sample Song")
                    put("color_name", "보라색")
                    put("color_rgb", JSONArray().apply {
                        put(128); put(0); put(128)
                    })
                    put("fan_chant", "")
                    put("highlight", "")
                })
            })
            put("members", JSONArray())
            put("fandom_terms", JSONObject())
            put("current_state", JSONObject().apply {
                put("song_index", 0)
            })
        }
    }
}


/**
 * 시스템 프롬프트 생성기
 */
class PromptGenerator(private val concertData: ConcertDataManager) {

    companion object {
        private const val SYSTEM_PROMPT_TEMPLATE = """당신은 K-POP 콘서트 AI 비서 "FanStick"입니다.

[역할]
- 콘서트 정보 안내 (셋리스트, 응원법, 떼창 구간)
- 아티스트/멤버 정보 제공 (생일, 프로필)
- 팬덤 문화 및 용어 설명
- LED 색상 추천

[응답 규칙]
1. 1-2문장으로 간결하게 답변
2. 친근한 반말 사용
3. 이모지 적절히 사용
4. ★중요★ 답변 끝에 LED 색상을 반드시 JSON 형식으로 포함:
   형식: [LED:R,G,B] (예: [LED:255,215,0])
5. 색상 변경이 필요 없으면 현재 곡 색상 유지

[현재 콘서트 정보]
아티스트: %ARTIST_NAME% (%KOREAN_NAME%)
팬덤명: %FANDOM_NAME%
공연장: %VENUE%
날짜: %DATE%

[셋리스트]
%SETLIST%

[현재 상태]
▶ 현재 곡: %CURRENT_SONG% (%CURRENT_COLOR%)
→ 다음 곡: %NEXT_SONG% (%NEXT_COLOR%)
남은 곡: %REMAINING%곡

[멤버 정보]
%MEMBERS%

[팬덤 용어]
%FANDOM_TERMS%

[LED 색상 응답 예시]
Q: "다음 곡이 뭐야?"
A: "다음 곡은 '%NEXT_SONG%'이야! %NEXT_COLOR% 준비! [LED:%NEXT_RGB%]"

Q: "응원법 알려줘"
A: "지금 '%CURRENT_SONG%' 응원법은 '%CURRENT_CHANT%'야! 같이 외쳐봐! [LED:%CURRENT_RGB%]"
"""
    }

    /**
     * 셋리스트 포맷팅
     */
    private fun formatSetlist(): String {
        val setlist = concertData.getSetlist()
        val currentIndex = concertData.currentSongIndex

        return setlist.mapIndexed { index, song ->
            val marker = if (index == currentIndex) "▶" else " "
            val rgb = song.colorRgb.joinToString(",")
            "$marker ${song.order}. ${song.title} - ${song.colorName} [RGB:$rgb]"
        }.joinToString("\n")
    }

    /**
     * 멤버 정보 포맷팅
     */
    private fun formatMembers(): String {
        return concertData.getMembers().joinToString("\n") { member ->
            "- ${member.emoji} ${member.stageName} (${member.realName}): ${member.position}, 생일 ${member.birthday}"
        }
    }

    /**
     * 팬덤 용어 포맷팅
     */
    private fun formatFandomTerms(): String {
        return concertData.getFandomTerms().map { (term, desc) ->
            "- $term: $desc"
        }.joinToString("\n")
    }

    /**
     * 시스템 프롬프트 생성
     */
    fun generate(): String {
        val artist = concertData.getArtist()
        val concert = concertData.getConcert()
        val currentSong = concertData.getCurrentSong()
        val nextSong = concertData.getNextSong()

        val currentRgb = currentSong.colorRgb.joinToString(",")
        val nextRgb = nextSong?.colorRgb?.joinToString(",") ?: "없음"

        return SYSTEM_PROMPT_TEMPLATE
            .replace("%ARTIST_NAME%", artist.name)
            .replace("%KOREAN_NAME%", artist.koreanName)
            .replace("%FANDOM_NAME%", artist.fandomName)
            .replace("%VENUE%", concert.venue)
            .replace("%DATE%", concert.date)
            .replace("%SETLIST%", formatSetlist())
            .replace("%CURRENT_SONG%", currentSong.title)
            .replace("%CURRENT_COLOR%", currentSong.colorName)
            .replace("%CURRENT_RGB%", currentRgb)
            .replace("%CURRENT_CHANT%", currentSong.fanChant)
            .replace("%NEXT_SONG%", nextSong?.title ?: "없음 (마지막 곡)")
            .replace("%NEXT_COLOR%", nextSong?.colorName ?: "없음")
            .replace("%NEXT_RGB%", nextRgb)
            .replace("%REMAINING%", concertData.getRemainingCount().toString())
            .replace("%MEMBERS%", formatMembers())
            .replace("%FANDOM_TERMS%", formatFandomTerms())
    }
}
