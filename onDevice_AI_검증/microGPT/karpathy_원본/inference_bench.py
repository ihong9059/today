"""
microGPT 추론 시간 벤치마크 (학습 X, 랜덤 가중치)
목적: 토큰당 forward pass의 순수 연산 시간 측정 (autograd 그래프 없음)
"""
import math, random, time
random.seed(42)

n_layer = 1; n_embd = 16; block_size = 16; n_head = 4
head_dim = n_embd // n_head
vocab_size = 27
BOS = 26

def matrix(r, c): return [[random.gauss(0, 0.02) for _ in range(c)] for _ in range(r)]

state = {
    'wte': matrix(vocab_size, n_embd),
    'wpe': matrix(block_size, n_embd),
    'lm_head': matrix(vocab_size, n_embd),
    'attn_wq': matrix(n_embd, n_embd),
    'attn_wk': matrix(n_embd, n_embd),
    'attn_wv': matrix(n_embd, n_embd),
    'attn_wo': matrix(n_embd, n_embd),
    'mlp_fc1': matrix(4*n_embd, n_embd),
    'mlp_fc2': matrix(n_embd, 4*n_embd),
}

def matvec(W, x):
    return [sum(W[i][j]*x[j] for j in range(len(x))) for i in range(len(W))]

def rmsnorm(x):
    rms = math.sqrt(sum(xi*xi for xi in x)/len(x) + 1e-5)
    return [xi/rms for xi in x]

def softmax(z):
    m = max(z); ez = [math.exp(zi-m) for zi in z]; s = sum(ez)
    return [e/s for e in ez]

def gpt_forward(token_id, pos_id, keys, values):
    x = [a+b for a,b in zip(state['wte'][token_id], state['wpe'][pos_id])]
    x_res = x
    x = rmsnorm(x)
    q = matvec(state['attn_wq'], x)
    k = matvec(state['attn_wk'], x)
    v = matvec(state['attn_wv'], x)
    keys[0].append(k); values[0].append(v)
    x_attn = []
    for h in range(n_head):
        q_h = q[h*head_dim:(h+1)*head_dim]
        k_hs = [ki[h*head_dim:(h+1)*head_dim] for ki in keys[0]]
        v_hs = [vi[h*head_dim:(h+1)*head_dim] for vi in values[0]]
        scores = [sum(q_h[d]*kh[d] for d in range(head_dim))/math.sqrt(head_dim) for kh in k_hs]
        attn_w = softmax(scores)
        head_out = [sum(attn_w[t]*v_hs[t][j] for t in range(len(v_hs))) for j in range(head_dim)]
        x_attn.extend(head_out)
    x = matvec(state['attn_wo'], x_attn)
    x = [a+b for a,b in zip(x, x_res)]
    x_res = x
    x = rmsnorm(x)
    x = matvec(state['mlp_fc1'], x)
    x = [max(0.0, xi) for xi in x]
    x = matvec(state['mlp_fc2'], x)
    x = [a+b for a,b in zip(x, x_res)]
    logits = matvec(state['lm_head'], x)
    return logits

# warm-up
for _ in range(5):
    keys = [[]]; values = [[]]
    gpt_forward(0, 0, keys, values)

# benchmark — N samples × block_size tokens each
N = 200
t0 = time.perf_counter()
for _ in range(N):
    keys = [[]]; values = [[]]
    for pos in range(block_size):
        token = random.randint(0, vocab_size-1)
        logits = gpt_forward(token, pos, keys, values)
elapsed = time.perf_counter() - t0
total_tokens = N * block_size
print(f"N samples       : {N}")
print(f"tokens / sample : {block_size}")
print(f"total tokens    : {total_tokens}")
print(f"elapsed         : {elapsed*1000:.1f} ms")
print(f"per token (avg) : {elapsed/total_tokens*1000:.3f} ms")
print(f"per sample      : {elapsed/N*1000:.2f} ms")
print(f"per sample (rate): {N/elapsed:.1f} samples/sec")
