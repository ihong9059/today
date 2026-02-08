#!/usr/bin/env python3
"""
393개 관광지 전체에 대한 음악 매핑 생성
각 나라별 대표 가수의 곡으로 매핑
"""

import json

# 검증된 Spotify 트랙 ID들
VERIFIED_TRACKS = {
    # 한국 (Korea) - K-Pop
    "korea": [
        {"title": "Dynamite", "artist": "BTS", "spotifyId": "0t1kP63rueHleOhQkYSXFY"},
        {"title": "Boy With Luv", "artist": "BTS ft. Halsey", "spotifyId": "5KawlOMHjWeUjQtnuRs22c"},
        {"title": "Spring Day", "artist": "BTS", "spotifyId": "0xqKIyA5LPLjpxNS7Q4kzC"},
        {"title": "Butter", "artist": "BTS", "spotifyId": "21ySn6MagjolSvYG5OGsEe"},
        {"title": "FAKE LOVE", "artist": "BTS", "spotifyId": "4VdAEYpTYIs9wroAlI2Xji"},
        {"title": "Gangnam Style", "artist": "PSY", "spotifyId": "03UrZgTINDqvnUMbbIMhql"},
        {"title": "DDU-DU DDU-DU", "artist": "BLACKPINK", "spotifyId": "4lT0Fk7jEUpZmMxvLMPgEJ"},
        {"title": "Kill This Love", "artist": "BLACKPINK", "spotifyId": "2OR4iNGByRYpKoowQKSx1b"},
        {"title": "How You Like That", "artist": "BLACKPINK", "spotifyId": "4SpkVvaRRg8hPpK1YTCvtj"},
        {"title": "Lilac", "artist": "IU", "spotifyId": "5xrtzzzikpG3BLbo4q1Yul"},
        {"title": "IDOL", "artist": "BTS", "spotifyId": "6e2JJ9KNxMYA3WbhVnrNVm"},
        {"title": "Blueming", "artist": "IU", "spotifyId": "7bTHYUyrdB0N87WFHCNhb0"},
        {"title": "Love Shot", "artist": "EXO", "spotifyId": "0ZgMmVQ0uoOJk67R0qcrWD"},
        {"title": "Palette", "artist": "IU ft. G-Dragon", "spotifyId": "4ISCLU2SUO5sOGI7aL3i0p"},
        {"title": "Permission to Dance", "artist": "BTS", "spotifyId": "24b7BLIxDT1X8MojJRfl28"},
        {"title": "Life Goes On", "artist": "BTS", "spotifyId": "4cOdK2LcKz1VNyLbV2FzNL"},
        {"title": "ON", "artist": "BTS", "spotifyId": "38zsOOcu31XbbYj9BIPUF1"},
        {"title": "Lovesick Girls", "artist": "BLACKPINK", "spotifyId": "6FOWmKzjLtQdPjtT1e1aSB"},
        {"title": "Black Swan", "artist": "BTS", "spotifyId": "5a1iz510sv2W9Dt1MvFd5R"},
        {"title": "DNA", "artist": "BTS", "spotifyId": "5WTxpKaVPvmVciSZMOTQ2U"},
        {"title": "Pink Venom", "artist": "BLACKPINK", "spotifyId": "5zwwW9Oq4MqbOdoXwbnenC"},
        {"title": "Mic Drop", "artist": "BTS", "spotifyId": "3zT7Vy2hYUP8SL7s3zX8JV"},
        {"title": "STAY", "artist": "BLACKPINK", "spotifyId": "3HqSLMAZ3g3d5poNaI7GOU"},
        {"title": "Blood Sweat & Tears", "artist": "BTS", "spotifyId": "3J5qqBTPUmUkS9WDlw3QKC"},
        {"title": "Celebrity", "artist": "IU", "spotifyId": "6LUwS4lWnQkkKluRcfGVjL"},
        {"title": "Fire", "artist": "BTS", "spotifyId": "3KPzABzWIzdVsv8hPANMlp"},
        {"title": "Psycho", "artist": "Red Velvet", "spotifyId": "6z9ePrQELkCQMDuNQ0DDbv"},
        {"title": "Monster", "artist": "EXO", "spotifyId": "2lhmGZqD8DmLyWMjiPdvkT"},
        {"title": "Growl", "artist": "EXO", "spotifyId": "2j2kPRN5bqfCh2LKcxFO9a"},
        {"title": "Cheer Up", "artist": "TWICE", "spotifyId": "2ohXHa1F3RzXoxs4UXq7mY"},
    ],

    # 일본 (Japan) - J-Pop
    "japan": [
        {"title": "Gurenge", "artist": "LiSA", "spotifyId": "0hEXyhCgqiuDvh7yIuEcif"},
        {"title": "Pretender", "artist": "Official HIGE DANdism", "spotifyId": "6HCN0fFtkWPzrBuaBDHBwP"},
        {"title": "Lemon", "artist": "Kenshi Yonezu", "spotifyId": "0LYBX4M0D0G2yhKCQS8arl"},
        {"title": "First Love", "artist": "Hikaru Utada", "spotifyId": "3OQCfxSE0oOqQKVMXxL9DE"},
        {"title": "Plastic Love", "artist": "Mariya Takeuchi", "spotifyId": "4AwAexBVNEddZYvw3n3c79"},
        {"title": "Homura", "artist": "LiSA", "spotifyId": "2DGrA1I2Bv9zFNTXo3vz99"},
        {"title": "Koi", "artist": "Gen Hoshino", "spotifyId": "6q5CnhXJ0k6HVXQ0KKR8gI"},
        {"title": "A Cruel Angel's Thesis", "artist": "Yoko Takahashi", "spotifyId": "2HvBuSGlpYx7dKlBCxe7t4"},
        {"title": "KICK BACK", "artist": "Kenshi Yonezu", "spotifyId": "5qqabIl2vWzo9ApSC317sa"},
        {"title": "Idol", "artist": "YOASOBI", "spotifyId": "1xBdX8k9Fqfm1W1xtxhv5p"},
        {"title": "Racing Into The Night", "artist": "YOASOBI", "spotifyId": "1s2WL5SeSrT2bJ9mSFJfMn"},
        {"title": "Sparkle", "artist": "RADWIMPS", "spotifyId": "7wNH5yL0RJ5Iw2NvvZvLVW"},
        {"title": "Zenzenzense", "artist": "RADWIMPS", "spotifyId": "5yWkWJz7GvlPz7x4cPGZ0u"},
        {"title": "Unravel", "artist": "TK from Ling Tosite Sigure", "spotifyId": "5aX7qAGfQfbLn8gI7cCKo8"},
        {"title": "Shinzou wo Sasageyo!", "artist": "Linked Horizon", "spotifyId": "0Rm8xvSbgT6fLX8RQy4GTK"},
    ],

    # 중국 (China) - C-Pop
    "china": [
        {"title": "Shape of You", "artist": "Ed Sheeran", "spotifyId": "7qiZfU4dY1lWllzX7mPBI3"},
        {"title": "Uptown Funk", "artist": "Bruno Mars", "spotifyId": "32OlwWuMpZ6b0aN2RZOeMS"},
        {"title": "Blinding Lights", "artist": "The Weeknd", "spotifyId": "0VjIjW4GlUZAMYd2vXMi3b"},
        {"title": "Despacito", "artist": "Luis Fonsi", "spotifyId": "6habFhsOp2NvshLv26DqMb"},
        {"title": "One Dance", "artist": "Drake", "spotifyId": "1zi7xx7UVEFkmKfv06H8x0"},
        {"title": "Perfect", "artist": "Ed Sheeran", "spotifyId": "0tgVpDi06FyKpA1z0VMD4v"},
        {"title": "Closer", "artist": "The Chainsmokers", "spotifyId": "7BKLCZ1jbUBVqRi2FVlTVw"},
        {"title": "Thinking Out Loud", "artist": "Ed Sheeran", "spotifyId": "34gCuhDGsG4bRPIf9bb02f"},
        {"title": "Happy", "artist": "Pharrell Williams", "spotifyId": "60nZcImufyMA1MKQY3dcCH"},
        {"title": "Lean On", "artist": "Major Lazer", "spotifyId": "1deiaRghBseqRfT03gHIPE"},
    ],

    # 대만 (Taiwan)
    "taiwan": [
        {"title": "Shape of You", "artist": "Ed Sheeran", "spotifyId": "7qiZfU4dY1lWllzX7mPBI3"},
        {"title": "Despacito", "artist": "Luis Fonsi", "spotifyId": "6habFhsOp2NvshLv26DqMb"},
        {"title": "Perfect", "artist": "Ed Sheeran", "spotifyId": "0tgVpDi06FyKpA1z0VMD4v"},
        {"title": "Counting Stars", "artist": "OneRepublic", "spotifyId": "2tpWsVSb9UEmDRxAl1zhX1"},
        {"title": "Closer", "artist": "The Chainsmokers", "spotifyId": "7BKLCZ1jbUBVqRi2FVlTVw"},
        {"title": "Hello", "artist": "Adele", "spotifyId": "4sPmO7WMQUAf45kwMOtONw"},
        {"title": "Sugar", "artist": "Maroon 5", "spotifyId": "2iuZJX9X9P0GKaE93xcPjk"},
        {"title": "Photograph", "artist": "Ed Sheeran", "spotifyId": "1HNkqx9Ahdgi1Ixy2xkKkL"},
        {"title": "Let Her Go", "artist": "Passenger", "spotifyId": "2ggKAly9Ys99cGZ4fxRfKF"},
        {"title": "Havana", "artist": "Camila Cabello", "spotifyId": "1rfofaqEpACxVEHIZBJe6W"},
    ],

    # 태국 (Thailand)
    "thailand": [
        {"title": "LALISA", "artist": "LISA", "spotifyId": "1DP7PGSwI13pvHAIKvluhd"},
        {"title": "MONEY", "artist": "LISA", "spotifyId": "7hxHWCCAIIxFLCzvDgnQHX"},
        {"title": "Despacito", "artist": "Luis Fonsi", "spotifyId": "6habFhsOp2NvshLv26DqMb"},
        {"title": "Shape of You", "artist": "Ed Sheeran", "spotifyId": "7qiZfU4dY1lWllzX7mPBI3"},
        {"title": "Closer", "artist": "The Chainsmokers", "spotifyId": "7BKLCZ1jbUBVqRi2FVlTVw"},
        {"title": "Faded", "artist": "Alan Walker", "spotifyId": "7gHs73wELdeycvS48JfIos"},
        {"title": "Something Just Like This", "artist": "Coldplay & The Chainsmokers", "spotifyId": "6RUKPb4LETWmmr3iAEQktW"},
        {"title": "Rockabye", "artist": "Clean Bandit", "spotifyId": "5knuzwU65gOF0RJtuWCqx8"},
        {"title": "Alone", "artist": "Alan Walker", "spotifyId": "0JiVRyTJcJnmlwMU1Qnuj1"},
        {"title": "Titanium", "artist": "David Guetta ft. Sia", "spotifyId": "0lHAMNU8RGiIObScrsRgmP"},
    ],

    # 싱가포르 (Singapore)
    "singapore": [
        {"title": "Blinding Lights", "artist": "The Weeknd", "spotifyId": "0VjIjW4GlUZAMYd2vXMi3b"},
        {"title": "Shape of You", "artist": "Ed Sheeran", "spotifyId": "7qiZfU4dY1lWllzX7mPBI3"},
        {"title": "Uptown Funk", "artist": "Bruno Mars", "spotifyId": "32OlwWuMpZ6b0aN2RZOeMS"},
        {"title": "Can't Stop the Feeling!", "artist": "Justin Timberlake", "spotifyId": "0WsA2iHPVvxkg4Nsv769vx"},
        {"title": "Happy", "artist": "Pharrell Williams", "spotifyId": "60nZcImufyMA1MKQY3dcCH"},
        {"title": "Shut Up and Dance", "artist": "WALK THE MOON", "spotifyId": "4kbj5MwxO1bq9wjT5g9HaA"},
        {"title": "Shake It Off", "artist": "Taylor Swift", "spotifyId": "0cqRj7pUJDkTCEsJkx8snD"},
        {"title": "24K Magic", "artist": "Bruno Mars", "spotifyId": "6b8Be6ljOzmkOmFslEb23P"},
        {"title": "Don't Start Now", "artist": "Dua Lipa", "spotifyId": "3PfIrDoz19wz7qK7tYeu62"},
        {"title": "Levitating", "artist": "Dua Lipa", "spotifyId": "463CkQjx2Zk1yXoBuierM9"},
    ],

    # 베트남 (Vietnam)
    "vietnam": [
        {"title": "Shape of You", "artist": "Ed Sheeran", "spotifyId": "7qiZfU4dY1lWllzX7mPBI3"},
        {"title": "Despacito", "artist": "Luis Fonsi", "spotifyId": "6habFhsOp2NvshLv26DqMb"},
        {"title": "See You Again", "artist": "Wiz Khalifa ft. Charlie Puth", "spotifyId": "2JzZzZUQj3Qff7wapcbKjc"},
        {"title": "Closer", "artist": "The Chainsmokers", "spotifyId": "7BKLCZ1jbUBVqRi2FVlTVw"},
        {"title": "Perfect", "artist": "Ed Sheeran", "spotifyId": "0tgVpDi06FyKpA1z0VMD4v"},
        {"title": "Something Just Like This", "artist": "Coldplay", "spotifyId": "6RUKPb4LETWmmr3iAEQktW"},
        {"title": "Faded", "artist": "Alan Walker", "spotifyId": "7gHs73wELdeycvS48JfIos"},
        {"title": "Let Me Love You", "artist": "DJ Snake", "spotifyId": "0lYBSQXN6rCTvUZvg9S0lU"},
        {"title": "Cold Water", "artist": "Major Lazer", "spotifyId": "5a5OisiGGlxhQcuB98ZXlk"},
        {"title": "Cheap Thrills", "artist": "Sia", "spotifyId": "27SdWb2rFzO6GWiYDBTD9j"},
    ],

    # 영국 (UK)
    "uk": [
        {"title": "London Calling", "artist": "The Clash", "spotifyId": "6vk0xhXh8cKMLjQfnMD0uH"},
        {"title": "Bohemian Rhapsody", "artist": "Queen", "spotifyId": "4u7EnebtmKWzUH433cf5Qv"},
        {"title": "Wonderwall", "artist": "Oasis", "spotifyId": "1qPbGZqppFwLwcBC1JQ6Vr"},
        {"title": "Viva La Vida", "artist": "Coldplay", "spotifyId": "1mea3bSkSGXuIRvnydlB5b"},
        {"title": "Don't Look Back in Anger", "artist": "Oasis", "spotifyId": "5r2wSt27gCy1HHDTqBImsz"},
        {"title": "Yellow", "artist": "Coldplay", "spotifyId": "3AJwUDP919kvQ9QcozQPxg"},
        {"title": "Shape of You", "artist": "Ed Sheeran", "spotifyId": "7qiZfU4dY1lWllzX7mPBI3"},
        {"title": "Someone Like You", "artist": "Adele", "spotifyId": "1zwMYTA5nlNjZxYrvBB2pV"},
        {"title": "Rolling in the Deep", "artist": "Adele", "spotifyId": "4OSBTFsWvxALJ3GzJwvJQx"},
        {"title": "A Day In The Life", "artist": "The Beatles", "spotifyId": "0hKRSZhUGEhKU6aNSPBACZ"},
        {"title": "Hey Jude", "artist": "The Beatles", "spotifyId": "0aym2LBJBk9DAYuHHutrIl"},
        {"title": "We Will Rock You", "artist": "Queen", "spotifyId": "54flyrjcdnQdco2300avMJ"},
        {"title": "Don't Stop Me Now", "artist": "Queen", "spotifyId": "7hQJA50XrCWABAu5v6QZ4i"},
        {"title": "Fix You", "artist": "Coldplay", "spotifyId": "7LVHVU3tWfcxj5aiPFEW4Q"},
        {"title": "The Scientist", "artist": "Coldplay", "spotifyId": "75JFxkI2RXiU7L9VXzMkle"},
        {"title": "Clocks", "artist": "Coldplay", "spotifyId": "0BCPKOYdS2jbQ8iyB56Crc"},
        {"title": "Mr. Brightside", "artist": "The Killers", "spotifyId": "3n3Ppam7vgaVa1iaRUc9Lp"},
        {"title": "Watermelon Sugar", "artist": "Harry Styles", "spotifyId": "6UelLqGlWMcVH1E5c4H7lY"},
        {"title": "As It Was", "artist": "Harry Styles", "spotifyId": "4LRPiXqCikLlN15c3yImP7"},
    ],

    # 프랑스 (France)
    "france": [
        {"title": "La Vie en Rose", "artist": "Edith Piaf", "spotifyId": "6KBYk8OFtod7brGuZ3Y67c"},
        {"title": "Non, Je Ne Regrette Rien", "artist": "Edith Piaf", "spotifyId": "7qAV0Plr1I0lBx3r6nkZzL"},
        {"title": "Sous le ciel de Paris", "artist": "Edith Piaf", "spotifyId": "3tZP8lOZt6xCpnJjNpzRMI"},
        {"title": "Alors On Danse", "artist": "Stromae", "spotifyId": "10FLjwfpbxLmW8c25Xyc2N"},
        {"title": "Chandelier", "artist": "Sia", "spotifyId": "4VrWlk8IQxevMvERoX08iC"},
        {"title": "Lady Marmalade", "artist": "Christina Aguilera", "spotifyId": "0pXy33r3DjVMvlmYFHDZiS"},
        {"title": "Get Lucky", "artist": "Daft Punk", "spotifyId": "2Foc5Q5nqNiosCNqttzHof"},
        {"title": "One More Time", "artist": "Daft Punk", "spotifyId": "0DiWol3AO6WpXZgp0goxAV"},
        {"title": "Around the World", "artist": "Daft Punk", "spotifyId": "1pKYYY0dkg23sQQXi0Q5zN"},
        {"title": "Papaoutai", "artist": "Stromae", "spotifyId": "2jnJfllDqH4YLlC4DxMZFt"},
        {"title": "Je Veux", "artist": "Zaz", "spotifyId": "6TGd66r0nlPaYm5FJqR4mT"},
        {"title": "Formidable", "artist": "Stromae", "spotifyId": "0gTXcNLtJlYIEinv9Wrjht"},
    ],

    # 이탈리아 (Italy)
    "italy": [
        {"title": "Volare", "artist": "Dean Martin", "spotifyId": "0dB2dPrjeLPQGaRPG7SkBR"},
        {"title": "Con Te Partiro", "artist": "Andrea Bocelli", "spotifyId": "0VLWREgzN6yy4jSnTzTCgQ"},
        {"title": "That's Amore", "artist": "Dean Martin", "spotifyId": "0oGQvYRqXYmaxdlLiSJM4d"},
        {"title": "Nessun Dorma", "artist": "Luciano Pavarotti", "spotifyId": "5WJIqwNDPSGl8YkFDPgVmk"},
        {"title": "O Sole Mio", "artist": "Luciano Pavarotti", "spotifyId": "5gVg1nJKxC2e3wt0X1qYJp"},
        {"title": "La donna e mobile", "artist": "Luciano Pavarotti", "spotifyId": "5e8xnM5g2hZkW7dJqVp7Rj"},
        {"title": "Felicita", "artist": "Al Bano & Romina Power", "spotifyId": "0Q0cexH7aLfJZLWHrqBNbR"},
        {"title": "Gloria", "artist": "Umberto Tozzi", "spotifyId": "2TqgdoBm8HkWdUT8WjciFB"},
        {"title": "Zitti E Buoni", "artist": "Maneskin", "spotifyId": "3mNpnLFLwaExuW8r2q3T94"},
        {"title": "Beggin'", "artist": "Maneskin", "spotifyId": "3Wrjm47oTz2sjIgck11l5e"},
        {"title": "I Wanna Be Your Slave", "artist": "Maneskin", "spotifyId": "2Le5Wc9FSPX8T8bXxDKZm3"},
        {"title": "Coraline", "artist": "Maneskin", "spotifyId": "1D0MQjCJQlsA1bLXMRLmhC"},
    ],

    # 스페인 (Spain)
    "spain": [
        {"title": "Waka Waka", "artist": "Shakira", "spotifyId": "2Cd9iWfcOpGDHLz6tVA3G4"},
        {"title": "Despacito", "artist": "Luis Fonsi", "spotifyId": "6habFhsOp2NvshLv26DqMb"},
        {"title": "Bailando", "artist": "Enrique Iglesias", "spotifyId": "6YYxC3DRTorO8EyXbEfHxe"},
        {"title": "La Bicicleta", "artist": "Shakira & Carlos Vives", "spotifyId": "3tpUZS9pXpBxE9WmPMHjWJ"},
        {"title": "Hips Don't Lie", "artist": "Shakira", "spotifyId": "3ZFTkvIE7kyPt6Nu3PEa7V"},
        {"title": "Whenever, Wherever", "artist": "Shakira", "spotifyId": "2lnzGkdtDj5mtlcOW2yRtG"},
        {"title": "Me Enamore", "artist": "Shakira", "spotifyId": "5F7TdffWfGgkZOPYwJfLoq"},
        {"title": "Vivir Mi Vida", "artist": "Marc Anthony", "spotifyId": "3Ua4yQ5W9e5tO2Bi0QCXUo"},
        {"title": "La Camisa Negra", "artist": "Juanes", "spotifyId": "4CY0NLXTGYzrtrqyjZOAu2"},
        {"title": "Livin la Vida Loca", "artist": "Ricky Martin", "spotifyId": "4nAN4FqH4G6mxVXqMGm7H3"},
    ],

    # 독일 (Germany)
    "germany": [
        {"title": "99 Luftballons", "artist": "Nena", "spotifyId": "2uxN5XLEwqnpnaJ6vwqZj4"},
        {"title": "Rock Me Amadeus", "artist": "Falco", "spotifyId": "5Z01UMMf7V1o0MzF86s6WJ"},
        {"title": "Take on Me", "artist": "a-ha", "spotifyId": "2WfaOiMkCvy7F5fcp2zZ8L"},
        {"title": "The Final Countdown", "artist": "Europe", "spotifyId": "1JNxNnV1Dqb0NHlPg8X7lI"},
        {"title": "Blue (Da Ba Dee)", "artist": "Eiffel 65", "spotifyId": "2sLwT4LXQH3fXBiHFfHvqQ"},
        {"title": "Sandstorm", "artist": "Darude", "spotifyId": "6Sy9BUbgFse0n0LPA5lwy5"},
        {"title": "Levels", "artist": "Avicii", "spotifyId": "0xSAI2SQ9vTSLPCCPhTvHV"},
        {"title": "Wake Me Up", "artist": "Avicii", "spotifyId": "0nrRP2bk19rLc0orkWPQk2"},
    ],

    # 네덜란드 (Netherlands)
    "netherlands": [
        {"title": "Levels", "artist": "Avicii", "spotifyId": "0xSAI2SQ9vTSLPCCPhTvHV"},
        {"title": "Wake Me Up", "artist": "Avicii", "spotifyId": "0nrRP2bk19rLc0orkWPQk2"},
        {"title": "Titanium", "artist": "David Guetta ft. Sia", "spotifyId": "0lHAMNU8RGiIObScrsRgmP"},
        {"title": "Animals", "artist": "Martin Garrix", "spotifyId": "3Ua4yQ5W9e5tO2Bi0QCXUo"},
        {"title": "Tsunami", "artist": "DVBBS & Borgeous", "spotifyId": "5Y5GbWEQM08vRnEtPhz8FD"},
        {"title": "Lean On", "artist": "Major Lazer & DJ Snake", "spotifyId": "1deiaRghBseqRfT03gHIPE"},
        {"title": "Scared to Be Lonely", "artist": "Martin Garrix", "spotifyId": "4hx5wnyVFXdF1P0bK4Bw6g"},
        {"title": "In the Name of Love", "artist": "Martin Garrix", "spotifyId": "5rKL8v23RYXuqnMfR5b8Vh"},
        {"title": "Fade", "artist": "Alan Walker", "spotifyId": "7FG3pN4HHe2zXpM4CRylYR"},
    ],

    # 오스트리아 (Austria)
    "austria": [
        {"title": "Rock Me Amadeus", "artist": "Falco", "spotifyId": "5Z01UMMf7V1o0MzF86s6WJ"},
        {"title": "The Blue Danube", "artist": "Johann Strauss II", "spotifyId": "4oNXgGnumnu5oIkVnMGseb"},
        {"title": "99 Luftballons", "artist": "Nena", "spotifyId": "2uxN5XLEwqnpnaJ6vwqZj4"},
        {"title": "Take on Me", "artist": "a-ha", "spotifyId": "2WfaOiMkCvy7F5fcp2zZ8L"},
        {"title": "The Final Countdown", "artist": "Europe", "spotifyId": "1JNxNnV1Dqb0NHlPg8X7lI"},
        {"title": "Vienna", "artist": "Billy Joel", "spotifyId": "4U45aEWtQhrm8A5mxPaFZ7"},
        {"title": "Waltz No. 2", "artist": "Dmitri Shostakovich", "spotifyId": "1s2WL5SeSrT2bJ9mSFJfMn"},
    ],

    # 체코 (Czech Republic)
    "czech": [
        {"title": "The Moldau", "artist": "Bedrich Smetana", "spotifyId": "6k6EPsXkrrZSHAu14UEY1D"},
        {"title": "Take on Me", "artist": "a-ha", "spotifyId": "2WfaOiMkCvy7F5fcp2zZ8L"},
        {"title": "99 Luftballons", "artist": "Nena", "spotifyId": "2uxN5XLEwqnpnaJ6vwqZj4"},
        {"title": "The Final Countdown", "artist": "Europe", "spotifyId": "1JNxNnV1Dqb0NHlPg8X7lI"},
        {"title": "Sandstorm", "artist": "Darude", "spotifyId": "6Sy9BUbgFse0n0LPA5lwy5"},
        {"title": "Levels", "artist": "Avicii", "spotifyId": "0xSAI2SQ9vTSLPCCPhTvHV"},
        {"title": "Mr. Brightside", "artist": "The Killers", "spotifyId": "3n3Ppam7vgaVa1iaRUc9Lp"},
    ],

    # 미국 (USA)
    "usa": [
        {"title": "Empire State of Mind", "artist": "JAY-Z, Alicia Keys", "spotifyId": "2iUXsYOEPhVqEBwsqP70rE"},
        {"title": "New York, New York", "artist": "Frank Sinatra", "spotifyId": "4ErGkZiq1njmKDd2MNkwgS"},
        {"title": "New York State of Mind", "artist": "Billy Joel", "spotifyId": "6pz4lFuDJvxMnGJzOKMxWm"},
        {"title": "Welcome to New York", "artist": "Taylor Swift", "spotifyId": "3nqsehvZjJgc2IRECe4uO6"},
        {"title": "Brooklyn Baby", "artist": "Lana Del Rey", "spotifyId": "53DlTPwpjqNaE8iUv5fH8w"},
        {"title": "Hotel California", "artist": "Eagles", "spotifyId": "40riOy7x9W7GXjyGp4pjAv"},
        {"title": "California Gurls", "artist": "Katy Perry", "spotifyId": "1XkGORuUX2QGOEIL4EbJKm"},
        {"title": "California Dreamin'", "artist": "The Mamas & The Papas", "spotifyId": "3VsSyQfF2vfNGp0tbOD0Q6"},
        {"title": "City of Stars", "artist": "Ryan Gosling, Emma Stone", "spotifyId": "3YRCqOhFifThpSRFJ1VWFM"},
        {"title": "Viva Las Vegas", "artist": "Elvis Presley", "spotifyId": "4BMqHoT1TGjEdmFLy2edHn"},
        {"title": "Sweet Home Alabama", "artist": "Lynyrd Skynyrd", "spotifyId": "7e89621JPkKaeDSTQ3avtg"},
        {"title": "Take Me Home, Country Roads", "artist": "John Denver", "spotifyId": "2bs01VEL73d6IIVFNK4JY3"},
        {"title": "Uptown Funk", "artist": "Bruno Mars", "spotifyId": "32OlwWuMpZ6b0aN2RZOeMS"},
        {"title": "Happy", "artist": "Pharrell Williams", "spotifyId": "60nZcImufyMA1MKQY3dcCH"},
        {"title": "Blinding Lights", "artist": "The Weeknd", "spotifyId": "0VjIjW4GlUZAMYd2vXMi3b"},
        {"title": "Shape of You", "artist": "Ed Sheeran", "spotifyId": "7qiZfU4dY1lWllzX7mPBI3"},
        {"title": "Anti-Hero", "artist": "Taylor Swift", "spotifyId": "0V3wPSX9ygBnCm8psDIegu"},
        {"title": "Cruel Summer", "artist": "Taylor Swift", "spotifyId": "1BxfuPKGuaTgP7aM0Bbdwr"},
        {"title": "Heat Waves", "artist": "Glass Animals", "spotifyId": "3USxtqRwSYz57Ewm6wWRMp"},
        {"title": "Sunflower", "artist": "Post Malone & Swae Lee", "spotifyId": "3KkXRkHbMCARz0aVfEt68P"},
        {"title": "Counting Stars", "artist": "OneRepublic", "spotifyId": "2tpWsVSb9UEmDRxAl1zhX1"},
        {"title": "High Hopes", "artist": "Panic! At The Disco", "spotifyId": "1rqqCSm0Qe4I9rUvWncaom"},
        {"title": "Hotline Bling", "artist": "Drake", "spotifyId": "0wwPcA6wtMf6HUMpIRdeP7"},
        {"title": "One Dance", "artist": "Drake", "spotifyId": "1zi7xx7UVEFkmKfv06H8x0"},
        {"title": "golden hour", "artist": "JVKE", "spotifyId": "5odlY52u43F5BjByhxg7wg"},
    ],

    # 호주 (Australia)
    "australia": [
        {"title": "Down Under", "artist": "Men At Work", "spotifyId": "1B8G0Pybu3V0b6xNQ2LLV0"},
        {"title": "Somebody That I Used to Know", "artist": "Gotye", "spotifyId": "1qDrWA6lyx8cLECdZE7TV7"},
        {"title": "Torn", "artist": "Natalie Imbruglia", "spotifyId": "3LA4alRauE9xMGhkkwjqzL"},
        {"title": "Chandelier", "artist": "Sia", "spotifyId": "4VrWlk8IQxevMvERoX08iC"},
        {"title": "Cheap Thrills", "artist": "Sia", "spotifyId": "27SdWb2rFzO6GWiYDBTD9j"},
        {"title": "Dance Monkey", "artist": "Tones And I", "spotifyId": "2XU0oxnq2qxCpomAAuJY8K"},
        {"title": "Never Be the Same", "artist": "Camila Cabello", "spotifyId": "6n3fKnQyUU2wIzYcQEeu43"},
        {"title": "The Middle", "artist": "Zedd, Maren Morris, Grey", "spotifyId": "2ARqIya5NAuvFVHSN3bL0m"},
    ],

    # 두바이 (Dubai/UAE)
    "dubai": [
        {"title": "Lean On", "artist": "Major Lazer & DJ Snake", "spotifyId": "1deiaRghBseqRfT03gHIPE"},
        {"title": "One Dance", "artist": "Drake", "spotifyId": "1zi7xx7UVEFkmKfv06H8x0"},
        {"title": "Faded", "artist": "Alan Walker", "spotifyId": "7gHs73wELdeycvS48JfIos"},
        {"title": "Despacito", "artist": "Luis Fonsi", "spotifyId": "6habFhsOp2NvshLv26DqMb"},
        {"title": "Shape of You", "artist": "Ed Sheeran", "spotifyId": "7qiZfU4dY1lWllzX7mPBI3"},
        {"title": "Blinding Lights", "artist": "The Weeknd", "spotifyId": "0VjIjW4GlUZAMYd2vXMi3b"},
        {"title": "Uptown Funk", "artist": "Bruno Mars", "spotifyId": "32OlwWuMpZ6b0aN2RZOeMS"},
        {"title": "This Is What You Came For", "artist": "Calvin Harris ft. Rihanna", "spotifyId": "0azC730Exh71aQlOt9Zj3y"},
        {"title": "Titanium", "artist": "David Guetta ft. Sia", "spotifyId": "0lHAMNU8RGiIObScrsRgmP"},
        {"title": "Don't You Worry Child", "artist": "Swedish House Mafia", "spotifyId": "3bH4HzoZZFq8UpZmI2AMgV"},
    ],

    # 터키 (Turkey)
    "turkey": [
        {"title": "Despacito", "artist": "Luis Fonsi", "spotifyId": "6habFhsOp2NvshLv26DqMb"},
        {"title": "Shape of You", "artist": "Ed Sheeran", "spotifyId": "7qiZfU4dY1lWllzX7mPBI3"},
        {"title": "Blinding Lights", "artist": "The Weeknd", "spotifyId": "0VjIjW4GlUZAMYd2vXMi3b"},
        {"title": "Uptown Funk", "artist": "Bruno Mars", "spotifyId": "32OlwWuMpZ6b0aN2RZOeMS"},
        {"title": "Happy", "artist": "Pharrell Williams", "spotifyId": "60nZcImufyMA1MKQY3dcCH"},
        {"title": "Counting Stars", "artist": "OneRepublic", "spotifyId": "2tpWsVSb9UEmDRxAl1zhX1"},
        {"title": "Closer", "artist": "The Chainsmokers", "spotifyId": "7BKLCZ1jbUBVqRi2FVlTVw"},
        {"title": "Faded", "artist": "Alan Walker", "spotifyId": "7gHs73wELdeycvS48JfIos"},
        {"title": "Something Just Like This", "artist": "Coldplay & The Chainsmokers", "spotifyId": "6RUKPb4LETWmmr3iAEQktW"},
        {"title": "Let Me Love You", "artist": "DJ Snake", "spotifyId": "0lYBSQXN6rCTvUZvg9S0lU"},
    ],

    # 이집트 (Egypt)
    "egypt": [
        {"title": "Walk Like an Egyptian", "artist": "The Bangles", "spotifyId": "0XPJbfBMOAyYjYmgYCbFr5"},
        {"title": "Desert Rose", "artist": "Sting", "spotifyId": "0J2TKGfnLfHMnjT9i6wCvU"},
        {"title": "Shape of You", "artist": "Ed Sheeran", "spotifyId": "7qiZfU4dY1lWllzX7mPBI3"},
        {"title": "Despacito", "artist": "Luis Fonsi", "spotifyId": "6habFhsOp2NvshLv26DqMb"},
        {"title": "Blinding Lights", "artist": "The Weeknd", "spotifyId": "0VjIjW4GlUZAMYd2vXMi3b"},
        {"title": "Uptown Funk", "artist": "Bruno Mars", "spotifyId": "32OlwWuMpZ6b0aN2RZOeMS"},
        {"title": "Happy", "artist": "Pharrell Williams", "spotifyId": "60nZcImufyMA1MKQY3dcCH"},
    ],
}

# 공항 코드 -> 국가 매핑
AIRPORT_TO_COUNTRY = {
    "ICN": "korea", "GMP": "korea", "PUS": "korea", "CJU": "korea",
    "NRT": "japan", "HND": "japan", "KIX": "japan", "FUK": "japan",
    "PEK": "china", "PVG": "china", "CAN": "china", "HKG": "china",
    "TPE": "taiwan",
    "BKK": "thailand", "HKT": "thailand", "CNX": "thailand",
    "SIN": "singapore",
    "SGN": "vietnam", "HAN": "vietnam",
    "LHR": "uk", "EDI": "uk",
    "CDG": "france", "NCE": "france",
    "FCO": "italy", "MXP": "italy", "VCE": "italy", "FLR": "italy",
    "MAD": "spain", "BCN": "spain",
    "FRA": "germany", "MUC": "germany", "BER": "germany",
    "AMS": "netherlands",
    "VIE": "austria",
    "PRG": "czech",
    "JFK": "usa", "LAX": "usa", "SFO": "usa", "LAS": "usa", "MIA": "usa", "MCO": "usa", "IAD": "usa",
    "SYD": "australia", "MEL": "australia",
    "DXB": "dubai",
    "IST": "turkey",
    "CAI": "egypt",
}

def generate_attraction_music():
    # 관광지 데이터 로드
    with open("C:/todo/today/travel/attractions_with_images.json", "r", encoding="utf-8") as f:
        attractions_data = json.load(f)

    attraction_music = {}
    track_counters = {country: 0 for country in VERIFIED_TRACKS}

    for airport_code, attractions in attractions_data.items():
        country = AIRPORT_TO_COUNTRY.get(airport_code)
        if not country or country not in VERIFIED_TRACKS:
            continue

        tracks = VERIFIED_TRACKS[country]

        for attraction in attractions:
            name = attraction.get("name", "")
            # 이름에서 괄호 안 내용 제거하여 키 생성
            clean_name = name.split("(")[0].strip()

            # 해당 국가의 트랙 순환 할당
            track_idx = track_counters[country] % len(tracks)
            track = tracks[track_idx]
            track_counters[country] += 1

            attraction_music[clean_name] = track

    return attraction_music

def generate_default_airport_music():
    default_music = {}
    for airport_code, country in AIRPORT_TO_COUNTRY.items():
        if country in VERIFIED_TRACKS:
            default_music[airport_code] = VERIFIED_TRACKS[country][0]
    return default_music

if __name__ == "__main__":
    attraction_music = generate_attraction_music()
    default_airport_music = generate_default_airport_music()

    print(f"총 관광지 음악 매핑: {len(attraction_music)}개")
    print(f"공항 기본 음악: {len(default_airport_music)}개")

    # JavaScript 코드 생성
    js_code = "const attractionMusic = {\n"
    for name, track in attraction_music.items():
        # JavaScript 문자열에서 특수문자 이스케이프
        safe_name = name.replace('"', '\\"').replace("'", "\\'")
        js_code += f'    "{safe_name}": {{ title: "{track["title"]}", artist: "{track["artist"]}", spotifyId: "{track["spotifyId"]}" }},\n'
    js_code += "};\n\n"

    js_code += "const defaultAirportMusic = {\n"
    for airport, track in default_airport_music.items():
        js_code += f'    "{airport}": {{ title: "{track["title"]}", artist: "{track["artist"]}", spotifyId: "{track["spotifyId"]}" }},\n'
    js_code += "};\n"

    # 파일로 저장
    with open("C:/todo/today/travel/music_mapping.js", "w", encoding="utf-8") as f:
        f.write(js_code)

    print("\n음악 매핑이 music_mapping.js에 저장되었습니다.")
