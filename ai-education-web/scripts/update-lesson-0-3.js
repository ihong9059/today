const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../src/data/curriculum.ts');
let content = fs.readFileSync(curriculumPath, 'utf8');

// Find the start and end of lesson 0-3
const startMarker = 'id: "0-3",';
// Handle both LF and CRLF line endings
let endMarker = '      },\r\n      {\r\n        id: "0-4",';
if (content.indexOf(endMarker) === -1) {
  endMarker = '      },\n      {\n        id: "0-4",';
}

const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.log('❌ Could not find lesson 0-3 start');
  process.exit(1);
}

// Find the opening brace before id: "0-3"
let braceIdx = content.lastIndexOf('{', startIdx);
const lessonStartIdx = braceIdx;

// Find the end of this lesson (before id: "0-4")
const endIdx = content.indexOf(endMarker);
if (endIdx === -1) {
  console.log('❌ Could not find lesson 0-3 end');
  process.exit(1);
}

const lessonEndIdx = endIdx + '      },'.length;

// The new lesson content
const newLesson = `{
        id: "0-3",
        title: "조건문과 반복문",
        description: "AI 학습 루프의 핵심 - Epoch, Batch, Early Stopping의 원리",
        duration: "45분",
        videoUrl: "",
        content: \`
# 조건문과 반복문 - AI 학습의 심장

## 🎯 학습 목표
- 반복문이 AI 학습에서 어떤 역할을 하는지 **이해**한다
- 조건문으로 학습을 제어하는 방법을 파악한다
- Epoch, Batch, Early Stopping의 원리를 안다
- 문법을 외우는 것이 아니라, AI 학습 구조를 이해한다

## 💡 핵심 메시지
> **"AI 학습 = 반복문 안에서 일어나는 마법"**
>
> 모든 딥러닝 학습은 for 루프 안에서 이루어집니다.
> 조건문은 학습을 언제 멈출지, 어떻게 조절할지 결정합니다.

---

## 🔄 1. 반복문: AI 학습의 심장

### 딥러닝의 모든 것은 반복이다

모든 AI 모델 학습은 이 구조를 따릅니다:

\\\`\\\`\\\`python
# 🤖 이것이 AI 학습의 핵심 구조입니다!
for epoch in range(100):        # 100번 반복 학습 (Epoch)
    for batch in dataloader:    # 데이터를 조금씩 나눠서 (Batch)
        output = model(batch)   # 예측하고
        loss = loss_fn(output)  # 손실 계산하고
        loss.backward()         # 역전파하고
        optimizer.step()        # 가중치 업데이트
\\\`\\\`\\\`

### 왜 반복이 필요할까?

| 이유 | 설명 |
|-----|------|
| 메모리 한계 | 수백만 개의 이미지를 한 번에 처리할 수 없음 |
| 점진적 학습 | 조금씩 여러 번 봐야 패턴을 제대로 학습 |
| 일반화 | 다양한 데이터를 반복적으로 보면서 일반적 패턴 학습 |

### 핵심 용어 정리

\\\`\\\`\\\`python
# Epoch: 전체 데이터를 한 번 다 보는 것
for epoch in range(100):  # 100 epochs = 전체 데이터를 100번 학습

    # Batch: 한 번에 처리하는 데이터 묶음
    for batch in dataloader:  # batch_size=32면 32개씩 처리
        train_step(batch)
\\\`\\\`\\\`

- **Epoch**: 전체 데이터셋을 1회 학습
- **Batch**: 한 번에 처리하는 데이터 묶음 (보통 32, 64, 128개)
- **Iteration**: 1개 배치를 처리하는 단위

---

## 🎮 2. 조건문: AI 학습의 뇌

### Early Stopping - 과적합 방지

언제 학습을 멈춰야 할까요? **조건문**이 결정합니다!

\\\`\\\`\\\`python
best_loss = float('inf')
patience = 0

for epoch in range(1000):
    train_loss = train_one_epoch()
    val_loss = validate()

    # 🎯 조건문으로 학습 중단 결정!
    if val_loss < best_loss:
        best_loss = val_loss
        save_model()
        patience = 0
    else:
        patience += 1

    # 10번 연속 개선 없으면 학습 중단
    if patience > 10:
        print("Early stopping!")
        break
\\\`\\\`\\\`

### 학습률 스케줄링

\\\`\\\`\\\`python
for epoch in range(100):
    train_one_epoch()

    # 30 epoch마다 학습률 감소
    if epoch % 30 == 0 and epoch > 0:
        learning_rate *= 0.1
        print(f"Learning rate: {learning_rate}")
\\\`\\\`\\\`

### 모델 저장 조건

\\\`\\\`\\\`python
for epoch in range(100):
    loss = train_one_epoch()

    # 손실이 특정 값 이하면 저장
    if loss < 0.01:
        torch.save(model.state_dict(), 'best_model.pt')
        print("Model saved!")
\\\`\\\`\\\`

---

## 🔁 3. while 반복문: 조건 기반 학습

### 목표 달성까지 학습

\\\`\\\`\\\`python
# 정확도 95% 달성할 때까지 학습
accuracy = 0
epoch = 0

while accuracy < 0.95:
    accuracy = train_and_evaluate()
    epoch += 1
    print(f"Epoch {epoch}: Accuracy = {accuracy:.2%}")

print(f"목표 달성! {epoch}번 만에 95% 도달")
\\\`\\\`\\\`

### 강화학습에서의 while

\\\`\\\`\\\`python
# 게임이 끝날 때까지 에이전트 실행
done = False
total_reward = 0

while not done:
    action = agent.select_action(state)
    state, reward, done = env.step(action)
    total_reward += reward
\\\`\\\`\\\`

---

## 📊 4. 실제 PyTorch 학습 코드

실제 딥러닝 프로젝트에서 볼 수 있는 코드입니다:

\\\`\\\`\\\`python
import torch

# 학습 설정
epochs = 100
best_val_loss = float('inf')
patience_counter = 0
max_patience = 10

# 🔄 메인 학습 루프
for epoch in range(epochs):
    model.train()
    train_loss = 0

    # 📦 배치 단위 학습
    for batch_idx, (data, target) in enumerate(train_loader):
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        train_loss += loss.item()

    # 📈 검증
    model.eval()
    val_loss = validate(model, val_loader)

    # 🎯 Early Stopping 체크
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), 'best_model.pt')
        patience_counter = 0
    else:
        patience_counter += 1

    # ⏹️ 조기 종료
    if patience_counter >= max_patience:
        print(f"Early stopping at epoch {epoch}")
        break

    print(f"Epoch {epoch}: Train Loss={train_loss:.4f}, Val Loss={val_loss:.4f}")
\\\`\\\`\\\`

---

## ✅ 정리: 핵심만 기억하세요!

| 개념 | AI에서의 역할 | 코드 패턴 |
|-----|-------------|----------|
| for + range | Epoch 반복 | \\\`for epoch in range(100):\\\` |
| 중첩 for | Batch 처리 | \\\`for batch in dataloader:\\\` |
| if | 조건부 저장/종료 | \\\`if val_loss < best:\\\` |
| break | Early Stopping | \\\`if patience > 10: break\\\` |
| while | 목표 기반 학습 | \\\`while accuracy < 0.95:\\\` |

---

## 💬 잊어버렸다면?

AI에게 이렇게 물어보세요:

- "PyTorch에서 학습 루프 코드 작성해줘"
- "Early Stopping 구현 방법 알려줘"
- "for문으로 배치 처리하는 방법?"
- "학습률 스케줄링 코드 예시"

**문법은 잊어도 됩니다. "AI 학습은 반복문 안에서 일어난다"는 것만 기억하세요!**
        \`
      }`;

// Replace
content = content.substring(0, lessonStartIdx) + newLesson + content.substring(lessonEndIdx);

fs.writeFileSync(curriculumPath, content);
console.log('✅ Lesson 0-3 content successfully updated!');
console.log(`   - Start index: ${lessonStartIdx}`);
console.log(`   - End index: ${lessonEndIdx}`);
