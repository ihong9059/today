/**
 * AI FanStick MVP - API 서비스
 * FastAPI 로컬 서버와 통신
 */

package com.uttec.fanstick.api

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.util.concurrent.TimeUnit

// ===== API 모델 =====

data class AskRequest(
    val question: String
)

data class AskResponse(
    val success: Boolean,
    val response: String,
    val led_color: List<Int>,
    val current_song: SongInfo
)

data class SongInfo(
    val order: Int,
    val title: String,
    val color_name: String,
    val color_rgb: List<Int>,
    val fan_chant: String,
    val highlight: String
)

data class ConcertInfo(
    val artist: ArtistInfo,
    val concert: ConcertDetail,
    val setlist: List<SongInfo>,
    val current_song: SongInfo,
    val next_song: SongInfo?,
    val remaining_songs: Int
)

data class ArtistInfo(
    val name: String,
    val korean_name: String,
    val fandom_name: String,
    val official_color: String
)

data class ConcertDetail(
    val tour_name: String,
    val venue: String,
    val date: String,
    val start_time: String
)

data class SongChangeResponse(
    val success: Boolean,
    val current_song: SongInfo,
    val next_song: SongInfo?,
    val message: String
)

data class StatusResponse(
    val server: String,
    val current_song_index: Int,
    val current_song: SongInfo,
    val total_songs: Int
)

// ===== Retrofit API Interface =====

interface FanStickApi {
    @POST("api/ask")
    suspend fun ask(@Body request: AskRequest): AskResponse

    @GET("api/concert")
    suspend fun getConcert(): ConcertInfo

    @POST("api/song/next")
    suspend fun nextSong(): SongChangeResponse

    @POST("api/song/prev")
    suspend fun prevSong(): SongChangeResponse

    @POST("api/song/set/{index}")
    suspend fun setSong(@Path("index") index: Int): SongChangeResponse

    @GET("api/status")
    suspend fun getStatus(): StatusResponse

    @GET("api/setlist")
    suspend fun getSetlist(): Map<String, Any>

    @POST("api/reload")
    suspend fun reloadData(): Map<String, Any>
}

// ===== API Client Singleton =====

object ApiClient {
    private var api: FanStickApi? = null
    private var baseUrl: String = "http://192.168.0.1:8080/"

    fun setServerUrl(url: String) {
        baseUrl = if (url.endsWith("/")) url else "$url/"
        api = null  // 다시 생성
    }

    fun getApi(): FanStickApi {
        if (api == null) {
            val logging = HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BODY
            }

            val client = OkHttpClient.Builder()
                .addInterceptor(logging)
                .connectTimeout(10, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .build()

            val retrofit = Retrofit.Builder()
                .baseUrl(baseUrl)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            api = retrofit.create(FanStickApi::class.java)
        }
        return api!!
    }
}

// ===== Repository =====

class FanStickRepository {
    private val api get() = ApiClient.getApi()

    suspend fun ask(question: String): Result<AskResponse> = runCatching {
        api.ask(AskRequest(question))
    }

    suspend fun getConcert(): Result<ConcertInfo> = runCatching {
        api.getConcert()
    }

    suspend fun nextSong(): Result<SongChangeResponse> = runCatching {
        api.nextSong()
    }

    suspend fun prevSong(): Result<SongChangeResponse> = runCatching {
        api.prevSong()
    }

    suspend fun getStatus(): Result<StatusResponse> = runCatching {
        api.getStatus()
    }
}
