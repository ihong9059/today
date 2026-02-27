# 방법 1: 로컬 DB + 시스템 프롬프트 구현 설명서

**작성일:** 2026-02-24
**대상:** AI FanStick MVP 개발
**예상 개발 기간:** 5일

---

## 목차

1. [개요](#1-개요)
2. [전체 구조](#2-전체-구조)
3. [데이터 설계](#3-데이터-설계)
4. [Android 앱 구현](#4-android-앱-구현)
5. [시스템 프롬프트 생성](#5-시스템-프롬프트-생성)
6. [Gemini API 연동](#6-gemini-api-연동)
7. [현재 곡 관리 UI](#7-현재-곡-관리-ui)
8. [전체 동작 흐름](#8-전체-동작-흐름)
9. [테스트 방법](#9-테스트-방법)
10. [파일 구조](#10-파일-구조)

---

## 1. 개요

### 1.1 방법 1이란?

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│   앱 안에 콘서트 정보를 JSON 파일로 저장해두고,                   │
│   사용자가 질문할 때마다 이 정보를 시스템 프롬프트에 포함시켜     │
│   Gemini에게 전달하는 방식                                       │
│                                                                  │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│   │ JSON 데이터  │ ──► │ 프롬프트    │ ──► │  Gemini     │       │
│   │ (앱 내장)   │     │ 생성        │     │  API 호출   │       │
│   └─────────────┘     └─────────────┘     └─────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 왜 이 방법인가?

| 장점 | 설명 |
|------|------|
| ✅ 간단함 | JSON 파일 하나로 모든 데이터 관리 |
| ✅ 빠름 | 로컬에서 즉시 데이터 로드 |
| ✅ 무료 | 별도 서버 비용 없음 |
| ✅ 오프라인 | 인터넷 없어도 데이터 접근 가능 |

### 1.3 이 설명서에서 만들 것

1. **콘서트 정보 JSON 파일** - 셋리스트, 멤버 정보, 팬덤 용어
2. **데이터 관리 클래스** - JSON 로드, 현재 곡 관리
3. **프롬프트 생성기** - 동적으로 시스템 프롬프트 생성
4. **Gemini 연동** - API 호출 및 응답 처리
5. **현재 곡 UI** - 이전/다음 곡 버튼

---

## 2. 전체 구조

### 2.1 시스템 구조도

```
┌─────────────────────────────────────────────────────────────────┐
│                        Android 앱                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    assets 폴더                            │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  concert_data.json                                  │ │   │
│  │  │  - 아티스트 정보                                     │ │   │
│  │  │  - 셋리스트                                          │ │   │
│  │  │  - 멤버 프로필                                       │ │   │
│  │  │  - 팬덤 용어                                         │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                 ConcertDataManager                        │   │
│  │  - loadData(): JSON 파싱                                  │   │
│  │  - getCurrentSong(): 현재 곡 정보                         │   │
│  │  - getNextSong(): 다음 곡 정보                            │   │
│  │  - nextSong(): 다음 곡으로 이동                           │   │
│  │  - prevSong(): 이전 곡으로 이동                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                 PromptGenerator                           │   │
│  │  - generateSystemPrompt(): 시스템 프롬프트 생성            │   │
│  │  - buildContext(): 현재 상황 컨텍스트 구성                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                 GeminiService                             │   │
│  │  - ask(question): 질문 → 답변                             │   │
│  │  - extractColor(response): 답변에서 색상 추출              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│                        답변 + LED 색상                           │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 데이터 흐름

```
1. 앱 시작
   └── concert_data.json 로드 → ConcertDataManager에 저장

2. 사용자 질문 "다음 곡 뭐야?"
   │
   ├── ConcertDataManager에서 현재 상황 정보 가져옴
   │   - 현재 곡: Dynamite
   │   - 다음 곡: 좋아
   │   - 남은 곡: 3곡
   │
   ├── PromptGenerator가 시스템 프롬프트 생성
   │   "당신은 K-POP AI 비서입니다.
   │    현재 곡: Dynamite
   │    다음 곡: 좋아 (응원색: 파란색)
   │    ..."
   │
   ├── GeminiService가 API 호출
   │   - 시스템 프롬프트 + 사용자 질문 전송
   │
   └── 응답: "다음 곡은 '좋아'야! 파란색으로 바꿔줄게 💙"
```

---

## 3. 데이터 설계

### 3.1 JSON 파일 구조

**파일 위치:** `app/src/main/assets/concert_data.json`

```json
{
  "version": "1.0",
  "last_updated": "2026-02-24",

  "artist": {
    "name": "BTS",
    "korean_name": "방탄소년단",
    "debut_date": "2013-06-13",
    "company": "HYBE (빅히트)",
    "fandom_name": "아미 (ARMY)",
    "official_color": "#800080",
    "official_color_name": "보라색"
  },

  "members": [
    {
      "stage_name": "RM",
      "real_name": "김남준",
      "birthday": "1994-09-12",
      "position": "리더, 메인 래퍼",
      "emoji": "🐨",
      "fun_facts": ["IQ 148", "영어 독학으로 습득"]
    },
    {
      "stage_name": "진",
      "real_name": "김석진",
      "birthday": "1992-12-04",
      "position": "서브 보컬, 비주얼",
      "emoji": "🐹",
      "fun_facts": ["월드와이드핸섬", "아재개그 담당"]
    },
    {
      "stage_name": "슈가",
      "real_name": "민윤기",
      "birthday": "1993-03-09",
      "position": "리드 래퍼",
      "emoji": "🐱",
      "fun_facts": ["프로듀서 Agust D", "잠을 사랑함"]
    },
    {
      "stage_name": "제이홉",
      "real_name": "정호석",
      "birthday": "1994-02-18",
      "position": "메인 댄서, 서브 래퍼",
      "emoji": "🐿️",
      "fun_facts": ["분위기 메이커", "광주 출신"]
    },
    {
      "stage_name": "지민",
      "real_name": "박지민",
      "birthday": "1995-10-13",
      "position": "메인 댄서, 리드 보컬",
      "emoji": "🐥",
      "fun_facts": ["현대무용 전공", "눈웃음"]
    },
    {
      "stage_name": "뷔",
      "real_name": "김태형",
      "birthday": "1995-12-30",
      "position": "서브 보컬, 비주얼",
      "emoji": "🐻",
      "fun_facts": ["세계에서 가장 잘생긴 얼굴 1위", "색소폰 연주"]
    },
    {
      "stage_name": "정국",
      "real_name": "전정국",
      "birthday": "1997-09-01",
      "position": "메인 보컬, 리드 댄서, 서브 래퍼",
      "emoji": "🐰",
      "fun_facts": ["황금막내", "못하는 게 없음"]
    }
  ],

  "concert": {
    "tour_name": "2026 World Tour",
    "venue": "서울 잠실 주경기장",
    "date": "2026-06-15",
    "start_time": "19:00"
  },

  "setlist": [
    {
      "order": 1,
      "title": "Dynamite",
      "album": "BE",
      "duration_seconds": 199,
      "cheer_color": "#FFD700",
      "cheer_color_name": "골드",
      "fan_chant": "BTS! BTS!",
      "key_moments": [
        {"time": "0:45", "action": "떼창 시작"},
        {"time": "2:30", "action": "점프"}
      ],
      "lyrics_highlight": "Cause I-I-I'm in the stars tonight"
    },
    {
      "order": 2,
      "title": "좋아좋아",
      "album": "화양연화 pt.2",
      "duration_seconds": 213,
      "cheer_color": "#0000FF",
      "cheer_color_name": "파란색",
      "fan_chant": "좋아! 좋아! 너무 좋아!",
      "key_moments": [
        {"time": "1:00", "action": "떼창"},
        {"time": "2:00", "action": "손 흔들기"}
      ],
      "lyrics_highlight": "좋아 좋아 너무 좋아"
    },
    {
      "order": 3,
      "title": "봄날",
      "album": "You Never Walk Alone",
      "duration_seconds": 274,
      "cheer_color": "#FFC0CB",
      "cheer_color_name": "분홍색",
      "fan_chant": "",
      "key_moments": [
        {"time": "3:00", "action": "떼창 '보고싶다'"}
      ],
      "lyrics_highlight": "보고 싶다 이렇게 말하니까 더 보고 싶다"
    },
    {
      "order": 4,
      "title": "작은 것들을 위한 시",
      "album": "MAP OF THE SOUL: PERSONA",
      "duration_seconds": 229,
      "cheer_color": "#800080",
      "cheer_color_name": "보라색",
      "fan_chant": "Boy with luv!",
      "key_moments": [
        {"time": "0:30", "action": "손하트"},
        {"time": "2:45", "action": "떼창"}
      ],
      "lyrics_highlight": "Oh my my my, oh my my my"
    },
    {
      "order": 5,
      "title": "Butter",
      "album": "Butter",
      "duration_seconds": 188,
      "cheer_color": "#FFFF00",
      "cheer_color_name": "노란색",
      "fan_chant": "Smooth like butter!",
      "key_moments": [
        {"time": "0:15", "action": "손가락 스냅"},
        {"time": "1:30", "action": "떼창"}
      ],
      "lyrics_highlight": "Smooth like butter, like a criminal undercover"
    }
  ],

  "fandom_terms": {
    "보라해": {
      "meaning": "보라색처럼 영원히 서로 사랑하자는 의미. 뷔가 만든 말",
      "origin": "2016년 팬미팅에서 뷔가 처음 사용",
      "usage": "인사말, 애정 표현"
    },
    "아미": {
      "meaning": "BTS 공식 팬클럽명. Adorable Representative M.C. for Youth",
      "origin": "2013년 팬클럽 창단",
      "usage": "팬을 지칭할 때"
    },
    "방탄": {
      "meaning": "방탄소년단의 줄임말",
      "origin": "그룹명",
      "usage": "일상 대화에서 BTS를 부를 때"
    },
    "떼창": {
      "meaning": "관객 전체가 함께 노래하는 것",
      "origin": "콘서트 문화",
      "usage": "특정 파트에서 팬들이 함께 부름"
    },
    "응원봉": {
      "meaning": "콘서트에서 사용하는 LED 봉. BTS는 ARMY BOMB",
      "origin": "K-POP 문화",
      "usage": "콘서트 필수 아이템"
    }
  },

  "common_questions": {
    "next_song": ["다음 곡", "다음 노래", "다음에 뭐 해", "뭐 나와"],
    "current_song": ["지금 곡", "이 노래", "지금 뭐야"],
    "remaining": ["몇 곡 남았", "얼마나 남았", "몇 개 더"],
    "member_birthday": ["생일", "언제 태어났"],
    "member_name": ["본명", "이름이 뭐", "진짜 이름"],
    "cheer_method": ["응원법", "어떻게 응원", "떼창", "팬챈트"],
    "fandom_term": ["뭔 뜻", "무슨 의미", "뭐야"]
  }
}
```

### 3.2 데이터 클래스 정의 (Kotlin)

**파일:** `app/src/main/java/com/example/fanstick/data/Models.kt`

```kotlin
package com.example.fanstick.data

import kotlinx.serialization.Serializable

@Serializable
data class ConcertData(
    val version: String,
    val last_updated: String,
    val artist: Artist,
    val members: List<Member>,
    val concert: Concert,
    val setlist: List<Song>,
    val fandom_terms: Map<String, FandomTerm>,
    val common_questions: Map<String, List<String>>
)

@Serializable
data class Artist(
    val name: String,
    val korean_name: String,
    val debut_date: String,
    val company: String,
    val fandom_name: String,
    val official_color: String,
    val official_color_name: String
)

@Serializable
data class Member(
    val stage_name: String,
    val real_name: String,
    val birthday: String,
    val position: String,
    val emoji: String,
    val fun_facts: List<String>
)

@Serializable
data class Concert(
    val tour_name: String,
    val venue: String,
    val date: String,
    val start_time: String
)

@Serializable
data class Song(
    val order: Int,
    val title: String,
    val album: String,
    val duration_seconds: Int,
    val cheer_color: String,
    val cheer_color_name: String,
    val fan_chant: String,
    val key_moments: List<KeyMoment>,
    val lyrics_highlight: String
)

@Serializable
data class KeyMoment(
    val time: String,
    val action: String
)

@Serializable
data class FandomTerm(
    val meaning: String,
    val origin: String,
    val usage: String
)
```

---

## 4. Android 앱 구현

### 4.1 ConcertDataManager 클래스

**파일:** `app/src/main/java/com/example/fanstick/data/ConcertDataManager.kt`

```kotlin
package com.example.fanstick.data

import android.content.Context
import kotlinx.serialization.json.Json

/**
 * 콘서트 데이터를 관리하는 싱글톤 클래스
 * - JSON 파일 로드
 * - 현재 곡 관리
 * - 데이터 조회
 */
class ConcertDataManager private constructor(private val context: Context) {

    // JSON 파서 설정
    private val json = Json {
        ignoreUnknownKeys = true
        isLenient = true
    }

    // 로드된 콘서트 데이터
    private var concertData: ConcertData? = null

    // 현재 곡 인덱스 (0부터 시작)
    private var currentSongIndex: Int = 0

    companion object {
        @Volatile
        private var instance: ConcertDataManager? = null

        fun getInstance(context: Context): ConcertDataManager {
            return instance ?: synchronized(this) {
                instance ?: ConcertDataManager(context.applicationContext).also {
                    instance = it
                }
            }
        }
    }

    /**
     * assets 폴더에서 JSON 파일 로드
     */
    fun loadData(): Boolean {
        return try {
            val jsonString = context.assets.open("concert_data.json")
                .bufferedReader()
                .use { it.readText() }

            concertData = json.decodeFromString<ConcertData>(jsonString)
            true
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }

    /**
     * 데이터 로드 여부 확인
     */
    fun isDataLoaded(): Boolean = concertData != null

    // ==================== 아티스트 정보 ====================

    fun getArtist(): Artist? = concertData?.artist

    fun getArtistName(): String = concertData?.artist?.name ?: "Unknown"

    // ==================== 멤버 정보 ====================

    fun getMembers(): List<Member> = concertData?.members ?: emptyList()

    fun getMemberByName(name: String): Member? {
        return concertData?.members?.find {
            it.stage_name.contains(name, ignoreCase = true) ||
            it.real_name.contains(name, ignoreCase = true)
        }
    }

    // ==================== 셋리스트 정보 ====================

    fun getSetlist(): List<Song> = concertData?.setlist ?: emptyList()

    fun getTotalSongs(): Int = concertData?.setlist?.size ?: 0

    /**
     * 현재 곡 정보
     */
    fun getCurrentSong(): Song? {
        val setlist = concertData?.setlist ?: return null
        return if (currentSongIndex in setlist.indices) {
            setlist[currentSongIndex]
        } else null
    }

    /**
     * 다음 곡 정보
     */
    fun getNextSong(): Song? {
        val setlist = concertData?.setlist ?: return null
        val nextIndex = currentSongIndex + 1
        return if (nextIndex in setlist.indices) {
            setlist[nextIndex]
        } else null
    }

    /**
     * 이전 곡 정보
     */
    fun getPreviousSong(): Song? {
        val setlist = concertData?.setlist ?: return null
        val prevIndex = currentSongIndex - 1
        return if (prevIndex in setlist.indices) {
            setlist[prevIndex]
        } else null
    }

    /**
     * 남은 곡 수
     */
    fun getRemainingSongs(): Int {
        val total = getTotalSongs()
        return if (total > 0) total - currentSongIndex - 1 else 0
    }

    /**
     * 현재 곡 인덱스
     */
    fun getCurrentSongIndex(): Int = currentSongIndex

    /**
     * 다음 곡으로 이동
     */
    fun nextSong(): Boolean {
        val setlist = concertData?.setlist ?: return false
        if (currentSongIndex < setlist.size - 1) {
            currentSongIndex++
            return true
        }
        return false
    }

    /**
     * 이전 곡으로 이동
     */
    fun previousSong(): Boolean {
        if (currentSongIndex > 0) {
            currentSongIndex--
            return true
        }
        return false
    }

    /**
     * 특정 곡으로 이동
     */
    fun goToSong(index: Int): Boolean {
        val setlist = concertData?.setlist ?: return false
        if (index in setlist.indices) {
            currentSongIndex = index
            return true
        }
        return false
    }

    // ==================== 팬덤 용어 ====================

    fun getFandomTerms(): Map<String, FandomTerm> {
        return concertData?.fandom_terms ?: emptyMap()
    }

    fun getFandomTerm(term: String): FandomTerm? {
        return concertData?.fandom_terms?.entries?.find {
            it.key.contains(term, ignoreCase = true)
        }?.value
    }

    // ==================== 콘서트 정보 ====================

    fun getConcert(): Concert? = concertData?.concert

    // ==================== 컨텍스트 정보 (프롬프트용) ====================

    /**
     * 현재 상황을 문자열로 반환 (프롬프트에 포함할 내용)
     */
    fun getCurrentContext(): String {
        val artist = getArtist() ?: return ""
        val concert = getConcert() ?: return ""
        val currentSong = getCurrentSong()
        val nextSong = getNextSong()
        val setlist = getSetlist()

        return buildString {
            appendLine("## 현재 콘서트 정보")
            appendLine("- 아티스트: ${artist.name} (${artist.korean_name})")
            appendLine("- 팬덤: ${artist.fandom_name}")
            appendLine("- 공연: ${concert.tour_name}")
            appendLine("- 장소: ${concert.venue}")
            appendLine("- 날짜: ${concert.date}")
            appendLine()

            appendLine("## 셋리스트 (총 ${setlist.size}곡)")
            setlist.forEachIndexed { index, song ->
                val marker = when (index) {
                    currentSongIndex -> "▶ " // 현재 곡
                    currentSongIndex + 1 -> "→ " // 다음 곡
                    else -> "  "
                }
                appendLine("$marker${song.order}. ${song.title} (${song.cheer_color_name})")
            }
            appendLine()

            appendLine("## 현재 진행 상황")
            if (currentSong != null) {
                appendLine("- 현재 곡: ${currentSong.order}번 \"${currentSong.title}\"")
                appendLine("- 현재 곡 응원색: ${currentSong.cheer_color_name}")
                if (currentSong.fan_chant.isNotEmpty()) {
                    appendLine("- 현재 곡 팬챈트: ${currentSong.fan_chant}")
                }
            }
            if (nextSong != null) {
                appendLine("- 다음 곡: ${nextSong.order}번 \"${nextSong.title}\"")
                appendLine("- 다음 곡 응원색: ${nextSong.cheer_color_name}")
            } else {
                appendLine("- 다음 곡: 없음 (마지막 곡)")
            }
            appendLine("- 남은 곡: ${getRemainingSongs()}곡")
        }
    }

    /**
     * 멤버 정보를 문자열로 반환
     */
    fun getMembersContext(): String {
        val members = getMembers()
        return buildString {
            appendLine("## 멤버 정보")
            members.forEach { member ->
                appendLine("- ${member.stage_name} (${member.real_name})")
                appendLine("  생일: ${member.birthday}, 포지션: ${member.position}")
            }
        }
    }

    /**
     * 팬덤 용어를 문자열로 반환
     */
    fun getFandomTermsContext(): String {
        val terms = getFandomTerms()
        return buildString {
            appendLine("## 팬덤 용어")
            terms.forEach { (term, info) ->
                appendLine("- $term: ${info.meaning}")
            }
        }
    }
}
```

### 4.2 사용 예시

```kotlin
// 앱 시작 시 데이터 로드
class MainActivity : AppCompatActivity() {
    private lateinit var dataManager: ConcertDataManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 데이터 매니저 초기화
        dataManager = ConcertDataManager.getInstance(this)

        // JSON 데이터 로드
        if (dataManager.loadData()) {
            Log.d("FanStick", "데이터 로드 성공!")
            Log.d("FanStick", "아티스트: ${dataManager.getArtistName()}")
            Log.d("FanStick", "총 곡 수: ${dataManager.getTotalSongs()}")
        } else {
            Log.e("FanStick", "데이터 로드 실패!")
        }
    }

    // 다음 곡 버튼 클릭
    fun onNextSongClick() {
        if (dataManager.nextSong()) {
            val current = dataManager.getCurrentSong()
            Log.d("FanStick", "현재 곡: ${current?.title}")
        }
    }
}
```

---

## 5. 시스템 프롬프트 생성

### 5.1 PromptGenerator 클래스

**파일:** `app/src/main/java/com/example/fanstick/ai/PromptGenerator.kt`

```kotlin
package com.example.fanstick.ai

import com.example.fanstick.data.ConcertDataManager

/**
 * Gemini API에 전달할 시스템 프롬프트를 생성하는 클래스
 */
class PromptGenerator(private val dataManager: ConcertDataManager) {

    /**
     * 시스템 프롬프트 생성
     * 이 프롬프트가 Gemini에게 "당신은 누구이고, 어떻게 행동해야 하는지" 알려줌
     */
    fun generateSystemPrompt(): String {
        return buildString {
            // 1. AI 역할 정의
            appendLine("""
                당신은 K-POP 콘서트 AI 비서 "FanStick"입니다.
                팬들의 질문에 친근하고 정확하게 답변하는 것이 역할입니다.
            """.trimIndent())
            appendLine()

            // 2. 현재 콘서트 정보 (동적)
            appendLine(dataManager.getCurrentContext())
            appendLine()

            // 3. 멤버 정보
            appendLine(dataManager.getMembersContext())
            appendLine()

            // 4. 팬덤 용어
            appendLine(dataManager.getFandomTermsContext())
            appendLine()

            // 5. 응답 규칙
            appendLine("""
                ## 응답 규칙
                1. 반말로 친근하게 답변해 (예: "다음 곡은 '좋아'야!")
                2. 1-2문장으로 간결하게 답변해
                3. 이모지를 적절히 사용해 (💜🎤🎵)
                4. ★중요★ 답변 마지막에 LED 색상을 추천해
                   예: "파란색으로 바꿔줄게!", "보라색 준비!"
                5. 모르는 정보는 솔직히 "잘 모르겠어"라고 답변해
                6. 팬을 "아미" 또는 친근하게 불러
            """.trimIndent())
            appendLine()

            // 6. 답변 예시
            appendLine("""
                ## 답변 예시
                Q: 다음 곡 뭐야?
                A: 다음 곡은 '좋아좋아'야! 파란색으로 바꿔줄게 💙

                Q: 진 생일 언제야?
                A: 진 오빠 생일은 12월 4일이야! 🎂 월드와이드핸섬 생일~

                Q: 보라해가 뭐야?
                A: 보라해는 뷔가 만든 말이야! 보라색처럼 영원히 사랑하자는 뜻이야 💜

                Q: 몇 곡 남았어?
                A: 아직 3곡 남았어! 끝까지 힘내자 아미! 🔥
            """.trimIndent())
        }
    }

    /**
     * 사용자 질문과 함께 전체 프롬프트 구성
     */
    fun buildFullPrompt(userQuestion: String): String {
        return buildString {
            appendLine(generateSystemPrompt())
            appendLine()
            appendLine("## 사용자 질문")
            appendLine(userQuestion)
        }
    }
}
```

### 5.2 생성되는 프롬프트 예시

```
당신은 K-POP 콘서트 AI 비서 "FanStick"입니다.
팬들의 질문에 친근하고 정확하게 답변하는 것이 역할입니다.

## 현재 콘서트 정보
- 아티스트: BTS (방탄소년단)
- 팬덤: 아미 (ARMY)
- 공연: 2026 World Tour
- 장소: 서울 잠실 주경기장
- 날짜: 2026-06-15

## 셋리스트 (총 5곡)
▶ 1. Dynamite (골드)
→ 2. 좋아좋아 (파란색)
  3. 봄날 (분홍색)
  4. 작은 것들을 위한 시 (보라색)
  5. Butter (노란색)

## 현재 진행 상황
- 현재 곡: 1번 "Dynamite"
- 현재 곡 응원색: 골드
- 현재 곡 팬챈트: BTS! BTS!
- 다음 곡: 2번 "좋아좋아"
- 다음 곡 응원색: 파란색
- 남은 곡: 4곡

## 멤버 정보
- RM (김남준) 생일: 1994-09-12, 포지션: 리더, 메인 래퍼
- 진 (김석진) 생일: 1992-12-04, 포지션: 서브 보컬, 비주얼
...

## 팬덤 용어
- 보라해: 보라색처럼 영원히 서로 사랑하자는 의미. 뷔가 만든 말
- 아미: BTS 공식 팬클럽명. Adorable Representative M.C. for Youth
...

## 응답 규칙
1. 반말로 친근하게 답변해
2. 1-2문장으로 간결하게 답변해
3. 이모지를 적절히 사용해
4. ★중요★ 답변 마지막에 LED 색상을 추천해
5. 모르는 정보는 솔직히 "잘 모르겠어"라고 답변해

## 사용자 질문
다음 곡 뭐야?
```

---

## 6. Gemini API 연동

### 6.1 GeminiService 클래스

**파일:** `app/src/main/java/com/example/fanstick/ai/GeminiService.kt`

```kotlin
package com.example.fanstick.ai

import com.google.ai.client.generativeai.GenerativeModel
import com.google.ai.client.generativeai.type.generationConfig
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * Gemini API와 통신하는 서비스 클래스
 */
class GeminiService(
    private val promptGenerator: PromptGenerator
) {
    // Gemini 모델 초기화
    private val generativeModel = GenerativeModel(
        modelName = "gemini-2.0-flash",
        apiKey = BuildConfig.GEMINI_API_KEY,  // local.properties에서 가져옴
        generationConfig = generationConfig {
            temperature = 0.7f      // 창의성 (0.0 ~ 1.0)
            topK = 40
            topP = 0.95f
            maxOutputTokens = 256   // 최대 응답 길이
        }
    )

    /**
     * 사용자 질문에 대한 AI 답변 생성
     *
     * @param userQuestion 사용자가 말한 질문
     * @return AI 응답 결과 (텍스트 + LED 색상)
     */
    suspend fun ask(userQuestion: String): AIResponse {
        return withContext(Dispatchers.IO) {
            try {
                // 1. 전체 프롬프트 생성
                val fullPrompt = promptGenerator.buildFullPrompt(userQuestion)

                // 2. Gemini API 호출
                val response = generativeModel.generateContent(fullPrompt)

                // 3. 응답 텍스트 추출
                val responseText = response.text ?: "죄송해요, 답변을 생성하지 못했어요."

                // 4. 응답에서 LED 색상 추출
                val ledColor = extractColorFromResponse(responseText)

                AIResponse(
                    text = responseText,
                    ledColor = ledColor,
                    success = true
                )
            } catch (e: Exception) {
                e.printStackTrace()
                AIResponse(
                    text = "오류가 발생했어요: ${e.message}",
                    ledColor = null,
                    success = false
                )
            }
        }
    }

    /**
     * AI 응답에서 LED 색상 추출
     * AI가 "파란색으로 바꿔줄게"라고 말하면 파란색 RGB 반환
     */
    private fun extractColorFromResponse(response: String): LedColor? {
        val colorMap = mapOf(
            // 기본 색상
            listOf("빨간", "빨강", "레드", "red") to LedColor(255, 0, 0, "빨간색"),
            listOf("파란", "파랑", "블루", "blue") to LedColor(0, 0, 255, "파란색"),
            listOf("초록", "녹색", "그린", "green") to LedColor(0, 255, 0, "초록색"),
            listOf("노란", "노랑", "옐로", "yellow", "골드", "금색") to LedColor(255, 255, 0, "노란색"),
            listOf("보라", "퍼플", "purple", "바이올렛") to LedColor(128, 0, 255, "보라색"),
            listOf("분홍", "핑크", "pink") to LedColor(255, 192, 203, "분홍색"),
            listOf("흰", "화이트", "white") to LedColor(255, 255, 255, "흰색"),
            listOf("주황", "오렌지", "orange") to LedColor(255, 165, 0, "주황색"),
            // 특수 패턴
            listOf("무지개", "레인보우", "rainbow") to LedColor(-1, -1, -1, "rainbow")
        )

        val lowerResponse = response.lowercase()

        for ((keywords, color) in colorMap) {
            if (keywords.any { lowerResponse.contains(it) }) {
                return color
            }
        }

        return null
    }
}

/**
 * AI 응답 결과 데이터 클래스
 */
data class AIResponse(
    val text: String,           // AI 답변 텍스트
    val ledColor: LedColor?,    // 추출된 LED 색상 (없으면 null)
    val success: Boolean        // 성공 여부
)

/**
 * LED 색상 데이터 클래스
 */
data class LedColor(
    val r: Int,
    val g: Int,
    val b: Int,
    val name: String
) {
    /**
     * BLE 명령 문자열 생성
     */
    fun toBleCommand(): String {
        return if (name == "rainbow") {
            "P:rainbow"  // 패턴 명령
        } else {
            "C:$r,$g,$b" // 색상 명령
        }
    }
}
```

### 6.2 Gradle 설정 (Gemini SDK 추가)

**파일:** `app/build.gradle.kts`

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.serialization")
}

android {
    // ...

    buildFeatures {
        buildConfig = true
    }

    defaultConfig {
        // API 키를 local.properties에서 가져옴
        buildConfigField("String", "GEMINI_API_KEY",
            "\"${project.findProperty("GEMINI_API_KEY") ?: ""}\"")
    }
}

dependencies {
    // Gemini SDK
    implementation("com.google.ai.client.generativeai:generativeai:0.9.0")

    // Kotlin Serialization (JSON 파싱)
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")

    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")

    // 기타...
}
```

### 6.3 API 키 설정

**파일:** `local.properties` (git에 커밋하지 않음!)

```properties
GEMINI_API_KEY=your_api_key_here
```

---

## 7. 현재 곡 관리 UI

### 7.1 화면 구성

```
┌─────────────────────────────────────────┐
│              AI FanStick                │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │        현재 곡 표시              │   │
│  │                                  │   │
│  │    🎵 1 / 5                      │   │
│  │    Dynamite                      │   │
│  │    응원색: 🟡 골드               │   │
│  │                                  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────┐          ┌─────────┐      │
│  │  ◀ 이전  │          │  다음 ▶ │      │
│  └─────────┘          └─────────┘      │
│                                         │
│  ─────────────────────────────────     │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │        🎤 말하기                 │   │
│  │       (길게 누르세요)            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  "다음 곡은 '좋아좋아'야!        │   │
│  │   파란색으로 바꿔줄게 💙"        │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### 7.2 Jetpack Compose UI 코드

**파일:** `app/src/main/java/com/example/fanstick/ui/MainScreen.kt`

```kotlin
package com.example.fanstick.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun MainScreen(viewModel: MainViewModel) {
    val uiState by viewModel.uiState.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // 앱 타이틀
        Text(
            text = "AI FanStick",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(24.dp))

        // 현재 곡 정보 카드
        CurrentSongCard(
            currentSongIndex = uiState.currentSongIndex,
            totalSongs = uiState.totalSongs,
            songTitle = uiState.currentSongTitle,
            cheerColor = uiState.currentCheerColor,
            cheerColorName = uiState.currentCheerColorName
        )

        Spacer(modifier = Modifier.height(16.dp))

        // 이전/다음 버튼
        SongNavigationButtons(
            onPrevious = { viewModel.previousSong() },
            onNext = { viewModel.nextSong() },
            canGoPrevious = uiState.currentSongIndex > 0,
            canGoNext = uiState.currentSongIndex < uiState.totalSongs - 1
        )

        Spacer(modifier = Modifier.height(32.dp))

        // 말하기 버튼
        SpeakButton(
            isRecording = uiState.isRecording,
            onStartRecording = { viewModel.startRecording() },
            onStopRecording = { viewModel.stopRecording() }
        )

        Spacer(modifier = Modifier.height(16.dp))

        // AI 응답 표시
        if (uiState.aiResponse.isNotEmpty()) {
            AIResponseCard(response = uiState.aiResponse)
        }

        // 로딩 표시
        if (uiState.isLoading) {
            CircularProgressIndicator()
        }
    }
}

@Composable
fun CurrentSongCard(
    currentSongIndex: Int,
    totalSongs: Int,
    songTitle: String,
    cheerColor: String,
    cheerColorName: String
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "🎵 ${currentSongIndex + 1} / $totalSongs",
                fontSize = 14.sp,
                color = Color.Gray
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = songTitle,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(8.dp))

            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                // 색상 원
                Box(
                    modifier = Modifier
                        .size(20.dp)
                        .background(
                            color = parseColor(cheerColor),
                            shape = CircleShape
                        )
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(text = "응원색: $cheerColorName")
            }
        }
    }
}

@Composable
fun SongNavigationButtons(
    onPrevious: () -> Unit,
    onNext: () -> Unit,
    canGoPrevious: Boolean,
    canGoNext: Boolean
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceEvenly
    ) {
        Button(
            onClick = onPrevious,
            enabled = canGoPrevious
        ) {
            Text("◀ 이전 곡")
        }

        Button(
            onClick = onNext,
            enabled = canGoNext
        ) {
            Text("다음 곡 ▶")
        }
    }
}

@Composable
fun SpeakButton(
    isRecording: Boolean,
    onStartRecording: () -> Unit,
    onStopRecording: () -> Unit
) {
    Button(
        onClick = { },
        modifier = Modifier
            .fillMaxWidth()
            .height(80.dp)
            .pointerInput(Unit) {
                detectTapGestures(
                    onPress = {
                        onStartRecording()
                        tryAwaitRelease()
                        onStopRecording()
                    }
                )
            },
        colors = ButtonDefaults.buttonColors(
            containerColor = if (isRecording) Color.Red else MaterialTheme.colorScheme.primary
        )
    ) {
        Text(
            text = if (isRecording) "🎤 녹음 중..." else "🎤 말하기 (길게 누르세요)",
            fontSize = 18.sp
        )
    }
}

@Composable
fun AIResponseCard(response: String) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer
        )
    ) {
        Text(
            text = response,
            modifier = Modifier.padding(16.dp),
            fontSize = 16.sp
        )
    }
}

// 색상 문자열 파싱 (#RRGGBB -> Color)
fun parseColor(colorString: String): Color {
    return try {
        Color(android.graphics.Color.parseColor(colorString))
    } catch (e: Exception) {
        Color.Gray
    }
}
```

---

## 8. 전체 동작 흐름

### 8.1 시퀀스 다이어그램

```
사용자          앱 UI         DataManager      PromptGen       Gemini        BLE/응원봉
  │               │               │               │              │              │
  │  앱 실행      │               │               │              │              │
  │──────────────►│               │               │              │              │
  │               │  loadData()   │               │              │              │
  │               │──────────────►│               │              │              │
  │               │  ◄────────────│               │              │              │
  │               │  데이터 로드 완료              │              │              │
  │               │               │               │              │              │
  │  버튼 누름    │               │               │              │              │
  │  "다음 곡 뭐야?"              │               │              │              │
  │──────────────►│               │               │              │              │
  │               │               │               │              │              │
  │               │  녹음 시작    │               │              │              │
  │               │  ──────────►  │               │              │              │
  │               │               │               │              │              │
  │  버튼 뗌      │               │               │              │              │
  │──────────────►│               │               │              │              │
  │               │  녹음 종료    │               │              │              │
  │               │               │               │              │              │
  │               │  STT 변환     │               │              │              │
  │               │  ────────────────────────────────────────►   │              │
  │               │  ◄────────────────────────────────────────   │              │
  │               │  "다음 곡 뭐야?" (텍스트)     │              │              │
  │               │               │               │              │              │
  │               │  getCurrentContext()          │              │              │
  │               │──────────────►│               │              │              │
  │               │  ◄────────────│               │              │              │
  │               │  현재 상황 정보              │              │              │
  │               │               │               │              │              │
  │               │  buildFullPrompt()            │              │              │
  │               │──────────────────────────────►│              │              │
  │               │  ◄──────────────────────────────              │              │
  │               │  시스템 프롬프트 + 질문       │              │              │
  │               │               │               │              │              │
  │               │  generateContent()            │              │              │
  │               │────────────────────────────────────────────►│              │
  │               │  ◄──────────────────────────────────────────│              │
  │               │  "다음 곡은 '좋아'야! 파란색으로..."         │              │
  │               │               │               │              │              │
  │               │  extractColor()               │              │              │
  │               │  → 파란색 (0,0,255) 추출      │              │              │
  │               │               │               │              │              │
  │               │  TTS 재생     │               │              │              │
  │  ◄────────────│               │               │              │              │
  │  음성 출력    │               │               │              │              │
  │               │               │               │              │              │
  │               │  sendLEDCommand("C:0,0,255")  │              │              │
  │               │────────────────────────────────────────────────────────────►│
  │               │               │               │              │              │
  │               │               │               │              │  LED 파란색  │
  │               │               │               │              │  ◄───────────│
  │               │               │               │              │              │
```

### 8.2 코드 흐름 요약

```kotlin
// 1. 앱 시작 시
dataManager.loadData()  // JSON 로드

// 2. 사용자가 말하기 버튼 누름
voiceRecorder.startRecording()

// 3. 버튼 뗌 → 녹음 종료
val audioFile = voiceRecorder.stopRecording()

// 4. STT 변환
val userQuestion = speechToText.recognize(audioFile)
// 결과: "다음 곡 뭐야?"

// 5. 프롬프트 생성
val systemPrompt = promptGenerator.generateSystemPrompt()
// 결과: "당신은 K-POP AI 비서입니다... 현재 곡: Dynamite..."

// 6. Gemini API 호출
val response = geminiService.ask(userQuestion)
// 결과: AIResponse(text="다음 곡은 '좋아'야! 파란색으로...", ledColor=LedColor(0,0,255))

// 7. TTS 출력
textToSpeech.speak(response.text)

// 8. LED 색상 변경
response.ledColor?.let { color ->
    bleManager.sendCommand(color.toBleCommand())
    // 전송: "C:0,0,255"
}
```

---

## 9. 테스트 방법

### 9.1 테스트 질문 목록

| 카테고리 | 테스트 질문 | 예상 답변 포함 내용 |
|----------|-------------|---------------------|
| 셋리스트 | "다음 곡 뭐야?" | "좋아좋아", "파란색" |
| 셋리스트 | "지금 곡 뭐야?" | "Dynamite" |
| 셋리스트 | "몇 곡 남았어?" | "4곡" |
| 멤버 | "진 생일 언제야?" | "12월 4일" |
| 멤버 | "RM 본명이 뭐야?" | "김남준" |
| 멤버 | "막내가 누구야?" | "정국" |
| 팬덤 | "보라해가 뭐야?" | "뷔", "사랑" |
| 팬덤 | "아미가 뭐야?" | "팬클럽" |
| 응원법 | "이 곡 응원법 알려줘" | "BTS! BTS!" |
| 기타 | "데뷔일이 언제야?" | "2013년 6월 13일" |

### 9.2 테스트 체크리스트

```
□ JSON 데이터 로드 성공
□ 현재 곡 표시 정상
□ 이전/다음 버튼 동작
□ 음성 녹음 동작
□ STT 변환 정확도 > 90%
□ Gemini 응답 생성 성공
□ 응답에서 색상 추출 성공
□ TTS 음성 출력 정상
□ BLE LED 색상 변경 성공
□ 응답 시간 < 3초
```

### 9.3 단위 테스트 코드

```kotlin
class ConcertDataManagerTest {

    @Test
    fun testLoadData() {
        val manager = ConcertDataManager.getInstance(context)
        assertTrue(manager.loadData())
        assertEquals("BTS", manager.getArtistName())
    }

    @Test
    fun testGetCurrentSong() {
        val manager = ConcertDataManager.getInstance(context)
        manager.loadData()

        val song = manager.getCurrentSong()
        assertNotNull(song)
        assertEquals("Dynamite", song?.title)
    }

    @Test
    fun testNextSong() {
        val manager = ConcertDataManager.getInstance(context)
        manager.loadData()

        assertTrue(manager.nextSong())
        assertEquals("좋아좋아", manager.getCurrentSong()?.title)
    }

    @Test
    fun testGetMemberByName() {
        val manager = ConcertDataManager.getInstance(context)
        manager.loadData()

        val member = manager.getMemberByName("진")
        assertNotNull(member)
        assertEquals("김석진", member?.real_name)
        assertEquals("1992-12-04", member?.birthday)
    }
}

class PromptGeneratorTest {

    @Test
    fun testGenerateSystemPrompt() {
        val dataManager = ConcertDataManager.getInstance(context)
        dataManager.loadData()

        val generator = PromptGenerator(dataManager)
        val prompt = generator.generateSystemPrompt()

        assertTrue(prompt.contains("BTS"))
        assertTrue(prompt.contains("Dynamite"))
        assertTrue(prompt.contains("현재 곡"))
    }
}

class GeminiServiceTest {

    @Test
    fun testExtractColor() {
        val service = GeminiService(mockPromptGenerator)

        val response1 = "파란색으로 바꿔줄게!"
        val color1 = service.extractColorFromResponse(response1)
        assertEquals(0, color1?.r)
        assertEquals(0, color1?.g)
        assertEquals(255, color1?.b)

        val response2 = "보라색 준비!"
        val color2 = service.extractColorFromResponse(response2)
        assertEquals("보라색", color2?.name)
    }
}
```

---

## 10. 파일 구조

```
app/
├── src/
│   └── main/
│       ├── assets/
│       │   └── concert_data.json          ← 콘서트 데이터
│       │
│       ├── java/com/example/fanstick/
│       │   ├── data/
│       │   │   ├── Models.kt              ← 데이터 클래스
│       │   │   └── ConcertDataManager.kt  ← 데이터 관리
│       │   │
│       │   ├── ai/
│       │   │   ├── PromptGenerator.kt     ← 프롬프트 생성
│       │   │   └── GeminiService.kt       ← Gemini API
│       │   │
│       │   ├── voice/
│       │   │   ├── VoiceRecorder.kt       ← 음성 녹음
│       │   │   ├── SpeechToText.kt        ← STT
│       │   │   └── TextToSpeech.kt        ← TTS
│       │   │
│       │   ├── ble/
│       │   │   └── BLEManager.kt          ← BLE 통신
│       │   │
│       │   ├── ui/
│       │   │   ├── MainScreen.kt          ← 메인 화면
│       │   │   └── MainViewModel.kt       ← 뷰모델
│       │   │
│       │   └── MainActivity.kt            ← 메인 액티비티
│       │
│       └── res/
│           └── ...
│
├── build.gradle.kts
└── local.properties                       ← API 키 (git 제외)
```

---

## 부록: 빠른 시작 가이드

### 1단계: 데이터 준비 (Day 1)

```bash
# assets 폴더에 JSON 파일 생성
app/src/main/assets/concert_data.json
```

### 2단계: 데이터 클래스 작성 (Day 1)

```kotlin
// Models.kt, ConcertDataManager.kt 작성
```

### 3단계: 프롬프트 생성기 작성 (Day 2)

```kotlin
// PromptGenerator.kt 작성
```

### 4단계: Gemini 연동 (Day 3)

```kotlin
// GeminiService.kt 작성
// local.properties에 API 키 추가
```

### 5단계: UI 구현 (Day 4)

```kotlin
// MainScreen.kt, MainViewModel.kt 작성
```

### 6단계: 테스트 (Day 5)

```kotlin
// 다양한 질문으로 테스트
// 프롬프트 튜닝
```

---

*작성일: 2026-02-24*
*작성: Claude Code / UTTEC*
