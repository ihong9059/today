const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// OpenAI API 키 설정
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 나레이션 데이터 로드
const narrations = require('./narrations.json');

// 출력 디렉토리
const outputDir = path.join(__dirname, '..', 'public', 'audio');

// 출력 디렉토리 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateTTS(scene) {
  console.log(`Generating TTS for ${scene.id}: ${scene.name}...`);

  try {
    const mp3Response = await openai.audio.speech.create({
      model: 'tts-1-hd',  // 고품질 모델
      voice: 'onyx',      // 차분하고 전문적인 남성 목소리
      input: scene.narration,
      speed: 0.95,        // 약간 느리게 (명확한 전달)
    });

    const buffer = Buffer.from(await mp3Response.arrayBuffer());
    const outputPath = path.join(outputDir, `${scene.id}.mp3`);

    fs.writeFileSync(outputPath, buffer);
    console.log(`  Saved: ${outputPath}`);

    return {
      id: scene.id,
      path: `/audio/${scene.id}.mp3`,
      success: true,
    };
  } catch (error) {
    console.error(`  Error: ${error.message}`);
    return {
      id: scene.id,
      success: false,
      error: error.message,
    };
  }
}

async function main() {
  console.log('=== OpenAI TTS Generation ===\n');

  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is not set.');
    console.log('\nUsage:');
    console.log('  Windows: set OPENAI_API_KEY=your-api-key && node scripts/generate-tts.js');
    console.log('  Linux/Mac: OPENAI_API_KEY=your-api-key node scripts/generate-tts.js');
    process.exit(1);
  }

  const results = [];

  for (const scene of narrations.scenes) {
    const result = await generateTTS(scene);
    results.push(result);

    // API 속도 제한 방지를 위한 딜레이
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n=== Generation Complete ===');
  console.log(`Success: ${results.filter(r => r.success).length}/${results.length}`);

  // 메타데이터 저장
  const metadata = {
    generatedAt: new Date().toISOString(),
    model: 'tts-1-hd',
    voice: 'onyx',
    scenes: results,
  };

  fs.writeFileSync(
    path.join(outputDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  console.log('\nMetadata saved to public/audio/metadata.json');
}

main().catch(console.error);
