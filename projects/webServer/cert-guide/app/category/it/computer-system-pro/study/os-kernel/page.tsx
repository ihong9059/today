'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

interface Question { id: number; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; name: string; color: string; questions: Question[]; }

export default function OSKernelPage() {
  const [activeTopic, setActiveTopic] = useState<string>('process');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [aiPrompt, setAiPrompt] = useState('');

  const topics: Topic[] = [
    {
      id: 'process',
      name: '프로세스/스케줄링',
      color: 'from-teal-500 to-teal-400',
      questions: [
        { id: 1, question: 'CFS(Completely Fair Scheduler)의 핵심 자료구조는?', options: ['Queue', 'Red-Black Tree', 'Hash Table', 'Heap'], answer: 1, explanation: 'CFS는 Red-Black Tree를 사용하여 vruntime이 가장 작은 태스크를 O(log n)에 선택합니다.' },
        { id: 2, question: 'Real-Time 스케줄링 정책 SCHED_FIFO와 SCHED_RR의 차이는?', options: ['동일함', 'RR은 타임슬라이스 기반 라운드로빈', 'FIFO가 더 공정', 'RR이 더 높은 우선순위'], answer: 1, explanation: 'SCHED_FIFO는 선점 없이 실행, SCHED_RR은 같은 우선순위 내에서 타임슬라이스로 라운드로빈합니다.' },
        { id: 3, question: 'cgroup(Control Group)의 용도가 아닌 것은?', options: ['CPU 제한', '메모리 제한', '파일 암호화', 'I/O 제한'], answer: 2, explanation: 'cgroup은 CPU, 메모리, I/O 등 리소스를 제한하고 격리합니다. 암호화는 별개입니다.' },
        { id: 4, question: 'namespace의 종류가 아닌 것은?', options: ['PID namespace', 'Network namespace', 'Cache namespace', 'Mount namespace'], answer: 2, explanation: 'Linux namespace: PID, Network, Mount, UTS, IPC, User, Cgroup 등이 있습니다.' },
        { id: 5, question: 'Work-stealing 스케줄링의 특징은?', options: ['중앙 집중 큐', '유휴 CPU가 다른 큐에서 작업 가져옴', '고정 할당', '우선순위 무시'], answer: 1, explanation: 'Work-stealing은 유휴 프로세서가 바쁜 프로세서의 큐에서 작업을 가져와 부하를 분산합니다.' },
        { id: 6, question: 'futex(fast userspace mutex)의 장점은?', options: ['커널 전용', '경합 없을 때 시스템 콜 없이 동작', '느린 성능', '단순한 구현'], answer: 1, explanation: 'futex는 경합이 없으면 사용자 공간에서 처리하고, 경합 시에만 커널로 전환합니다.' },
        { id: 7, question: 'Priority Inversion 문제의 해결책이 아닌 것은?', options: ['Priority Inheritance', 'Priority Ceiling', 'Priority Randomization', 'Immediate Ceiling'], answer: 2, explanation: '우선순위 역전은 상속(Inheritance)이나 천장(Ceiling) 프로토콜로 해결합니다.' },
        { id: 8, question: 'Preempt-RT 패치의 목적은?', options: ['성능 향상', 'Linux 커널의 실시간성 강화', '보안 강화', '메모리 절약'], answer: 1, explanation: 'Preempt-RT는 Linux 커널의 결정적 지연 시간을 낮춰 실시간 시스템에 적합하게 합니다.' },
        { id: 9, question: 'O(1) 스케줄러에서 CFS로 전환한 이유는?', options: ['성능 저하', '인터랙티브 응답성 및 공정성 개선', '구현 단순화', '메모리 절약'], answer: 1, explanation: 'CFS는 가상 런타임 기반으로 더 나은 공정성과 인터랙티브 응답성을 제공합니다.' },
        { id: 10, question: 'BPF(Berkeley Packet Filter)의 현대적 용도는?', options: ['패킷 필터링만', '커널 내 프로그래밍 가능한 확장', 'GUI 렌더링', '파일 시스템'], answer: 1, explanation: 'eBPF는 네트워크, 보안, 추적, 스케줄링 등 커널의 다양한 기능을 안전하게 확장합니다.' }
      ]
    },
    {
      id: 'memory',
      name: '메모리 관리',
      color: 'from-cyan-500 to-cyan-400',
      questions: [
        { id: 1, question: 'Huge Pages의 장점은?', options: ['메모리 절약', 'TLB Miss 감소', '보안 강화', '단편화 증가'], answer: 1, explanation: 'Huge Pages(2MB, 1GB)는 더 적은 TLB 엔트리로 더 많은 메모리를 매핑하여 TLB Miss를 줄입니다.' },
        { id: 2, question: 'KSM(Kernel Same-page Merging)의 용도는?', options: ['성능 향상', '동일 페이지 공유로 메모리 절약', '보안 강화', '스왑 가속'], answer: 1, explanation: 'KSM은 가상화 환경에서 동일한 내용의 페이지를 하나로 합쳐 메모리를 절약합니다.' },
        { id: 3, question: 'NUMA 환경에서 메모리 정책 mpol의 종류가 아닌 것은?', options: ['MPOL_BIND', 'MPOL_INTERLEAVE', 'MPOL_RANDOM', 'MPOL_LOCAL'], answer: 2, explanation: 'NUMA 정책: DEFAULT, BIND, INTERLEAVE, PREFERRED, LOCAL 등이 있습니다.' },
        { id: 4, question: 'OOM Killer가 프로세스를 선택하는 기준은?', options: ['랜덤', 'oom_score 기반', '가장 오래된 프로세스', 'PID 순서'], answer: 1, explanation: 'OOM Killer는 메모리 사용량, 우선순위 등을 고려한 oom_score가 가장 높은 프로세스를 종료합니다.' },
        { id: 5, question: 'Memory Balloon Driver의 용도는?', options: ['메모리 확장', 'VM과 호스트 간 메모리 동적 조절', '스왑 대체', '캐시 관리'], answer: 1, explanation: 'Balloon Driver는 게스트 VM의 메모리를 호스트에 반환하거나 회수하여 동적으로 조절합니다.' },
        { id: 6, question: 'Copy-on-Write(COW)의 단점은?', options: ['메모리 절약 불가', '쓰기 시 페이지 폴트 오버헤드', '공유 불가', '읽기 성능 저하'], answer: 1, explanation: 'COW는 쓰기 시 페이지를 복사해야 하므로 페이지 폴트와 복사 오버헤드가 발생합니다.' },
        { id: 7, question: 'Swap 영역의 단점을 완화하는 기술은?', options: ['더 큰 Swap', 'zswap/zram 압축', 'Swap 비활성화', '더 느린 디스크'], answer: 1, explanation: 'zswap/zram은 스왑 데이터를 압축하여 메모리에 저장함으로써 I/O를 줄입니다.' },
        { id: 8, question: 'Memory Compaction의 목적은?', options: ['메모리 절약', '연속 메모리 확보(단편화 해소)', '스왑 가속', '캐시 증가'], answer: 1, explanation: 'Compaction은 페이지를 이동하여 연속된 빈 공간을 확보합니다(Huge Page 할당 등에 필요).' },
        { id: 9, question: 'ASLR(Address Space Layout Randomization)의 목적은?', options: ['성능 향상', '보안 공격 방어', '메모리 절약', '단편화 감소'], answer: 1, explanation: 'ASLR은 메모리 레이아웃을 무작위화하여 버퍼 오버플로우 등 공격을 어렵게 합니다.' },
        { id: 10, question: 'Memory Cgroup의 기능이 아닌 것은?', options: ['메모리 제한', 'OOM 제어', 'CPU 제한', '메모리 통계'], answer: 2, explanation: 'Memory Cgroup은 메모리 관련 제한과 모니터링을 담당합니다. CPU는 CPU cgroup이 담당합니다.' }
      ]
    },
    {
      id: 'filesystem',
      name: '파일 시스템',
      color: 'from-blue-500 to-blue-400',
      questions: [
        { id: 1, question: 'ext4의 특징이 아닌 것은?', options: ['저널링', 'Extent 기반', 'Copy-on-Write', '지연 할당'], answer: 2, explanation: 'ext4는 저널링, Extent, 지연 할당을 지원하지만 COW는 btrfs, ZFS의 특징입니다.' },
        { id: 2, question: 'XFS의 장점은?', options: ['소용량 최적화', '대용량 파일 및 병렬 I/O 최적화', '단순한 구조', '메모리 절약'], answer: 1, explanation: 'XFS는 대용량 파일 시스템과 병렬 I/O에 최적화되어 있습니다.' },
        { id: 3, question: 'btrfs의 특징이 아닌 것은?', options: ['스냅샷', 'COW', '저널링', 'RAID 내장'], answer: 2, explanation: 'btrfs는 COW 방식으로 저널링 없이 일관성을 보장합니다.' },
        { id: 4, question: 'ZFS의 특징이 아닌 것은?', options: ['데이터 무결성', '압축/중복 제거', 'Linux 네이티브', 'RAID-Z'], answer: 2, explanation: 'ZFS는 원래 Solaris용이며 Linux에서는 커널 모듈로 사용합니다(라이선스 문제).' },
        { id: 5, question: 'VFS(Virtual File System)의 역할은?', options: ['특정 FS 구현', '파일 시스템 추상화 계층', '블록 장치 관리', '네트워크 전용'], answer: 1, explanation: 'VFS는 다양한 파일 시스템에 대한 통일된 인터페이스를 제공합니다.' },
        { id: 6, question: 'Direct I/O의 특징은?', options: ['페이지 캐시 사용', '페이지 캐시 우회', '항상 더 빠름', '소용량 최적화'], answer: 1, explanation: 'Direct I/O는 페이지 캐시를 우회하여 디스크에 직접 접근합니다(데이터베이스 등에서 사용).' },
        { id: 7, question: 'O_SYNC와 fsync()의 차이는?', options: ['동일함', 'O_SYNC는 매 쓰기마다, fsync는 호출 시', 'fsync가 더 빠름', 'O_SYNC만 동기화'], answer: 1, explanation: 'O_SYNC는 모든 쓰기가 동기적이고, fsync()는 호출 시점에 버퍼를 플러시합니다.' },
        { id: 8, question: 'inode에 저장되지 않는 정보는?', options: ['권한', '파일 크기', '파일 이름', '수정 시간'], answer: 2, explanation: '파일 이름은 디렉터리 엔트리에 저장됩니다. inode는 메타데이터와 블록 포인터를 저장합니다.' },
        { id: 9, question: 'Overlay FS의 용도는?', options: ['암호화', '읽기 전용 레이어 위에 쓰기 가능 레이어', '압축', '네트워크 공유'], answer: 1, explanation: 'Overlay FS는 컨테이너에서 이미지 레이어를 합치는 데 사용됩니다.' },
        { id: 10, question: 'NVMe의 I/O 스케줄러로 적합한 것은?', options: ['CFQ', 'Deadline', 'None/mq-deadline', 'Anticipatory'], answer: 2, explanation: 'NVMe는 자체 큐가 효율적이므로 None이나 가벼운 mq-deadline이 적합합니다.' }
      ]
    },
    {
      id: 'kernel',
      name: '커널 구조',
      color: 'from-indigo-500 to-indigo-400',
      questions: [
        { id: 1, question: '모놀리식 커널과 마이크로커널의 차이는?', options: ['동일함', '모놀리식은 커널에 모든 서비스, 마이크로는 최소화', '마이크로가 더 빠름', '모놀리식이 더 안전'], answer: 1, explanation: '모놀리식은 커널 공간에 대부분의 서비스가, 마이크로커널은 최소한의 기능만 커널에 있습니다.' },
        { id: 2, question: 'Linux 커널의 선점 모드가 아닌 것은?', options: ['PREEMPT_NONE', 'PREEMPT_VOLUNTARY', 'PREEMPT', 'PREEMPT_RANDOM'], answer: 3, explanation: 'Linux 선점 모델: NONE, VOLUNTARY, PREEMPT, PREEMPT_RT입니다.' },
        { id: 3, question: 'RCU(Read-Copy-Update)의 특징은?', options: ['쓰기 최적화', '읽기 측 락 없이 동시 접근', '메모리 증가', '순차 접근만'], answer: 1, explanation: 'RCU는 읽기 측에서 락 없이 데이터를 읽고, 쓰기 측이 복사 후 갱신합니다.' },
        { id: 4, question: 'Spinlock과 Mutex의 차이는?', options: ['동일함', 'Spinlock은 바쁜 대기, Mutex는 슬립', 'Mutex가 더 빠름', 'Spinlock만 커널에서 사용'], answer: 1, explanation: 'Spinlock은 획득까지 바쁘게 대기하고, Mutex는 슬립하여 CPU를 양보합니다.' },
        { id: 5, question: 'Softirq와 Tasklet의 차이는?', options: ['동일함', 'Softirq는 재진입 가능, Tasklet은 불가', 'Tasklet이 더 빠름', '용도가 다름'], answer: 1, explanation: 'Softirq는 같은 타입이 여러 CPU에서 동시 실행 가능하고, Tasklet은 직렬화됩니다.' },
        { id: 6, question: 'Kernel ASLR(KASLR)의 목적은?', options: ['성능 향상', '커널 주소 무작위화로 공격 방어', '메모리 절약', '부팅 가속'], answer: 1, explanation: 'KASLR은 커널 코드/데이터 주소를 무작위화하여 커널 공격을 어렵게 합니다.' },
        { id: 7, question: 'slab allocator의 목적은?', options: ['대용량 할당', '자주 사용되는 객체의 효율적 캐싱', '페이지 관리', '스왑 관리'], answer: 1, explanation: 'slab allocator는 커널 객체를 캐싱하여 할당/해제 오버헤드를 줄입니다.' },
        { id: 8, question: 'kernel space와 user space 전환 시 오버헤드의 원인이 아닌 것은?', options: ['컨텍스트 저장', 'TLB 플러시(일부)', '캐시 오염', '디스크 I/O'], answer: 3, explanation: '커널/사용자 전환은 컨텍스트 저장, TLB 처리, 캐시 영향이 있지만 디스크 I/O와는 무관합니다.' },
        { id: 9, question: 'kprobes의 용도는?', options: ['보안 강화', '커널 함수 동적 추적', '메모리 관리', '스케줄링'], answer: 1, explanation: 'kprobes는 커널 함수에 동적으로 프로브를 삽입하여 디버깅/추적에 사용합니다.' },
        { id: 10, question: 'Linux 커널에서 Loadable Kernel Module(LKM)의 장점은?', options: ['보안 강화만', '동적 로드로 커널 재컴파일 불필요', '성능 향상', '메모리 증가'], answer: 1, explanation: 'LKM은 커널 재부팅 없이 동적으로 기능을 추가/제거할 수 있습니다.' }
      ]
    },
    {
      id: 'driver',
      name: '디바이스 드라이버',
      color: 'from-purple-500 to-purple-400',
      questions: [
        { id: 1, question: '문자 디바이스와 블록 디바이스의 차이는?', options: ['동일함', '문자는 스트림, 블록은 블록 단위 접근', '블록이 더 빠름', '문자만 버퍼링'], answer: 1, explanation: '문자 디바이스는 바이트 스트림, 블록 디바이스는 고정 크기 블록 단위로 접근합니다.' },
        { id: 2, question: 'DMA(Direct Memory Access)의 장점은?', options: ['CPU 부하 증가', 'CPU 개입 없이 메모리 전송', '느린 전송', '보안 강화'], answer: 1, explanation: 'DMA는 CPU 개입 없이 장치가 메모리에 직접 데이터를 전송합니다.' },
        { id: 3, question: 'UDEV의 역할은?', options: ['커널 컴파일', '동적 디바이스 노드 관리', '파일 시스템 마운트', '네트워크 설정'], answer: 1, explanation: 'UDEV는 디바이스 이벤트를 감지하고 /dev에 동적으로 노드를 생성/제거합니다.' },
        { id: 4, question: 'VFIO의 용도는?', options: ['파일 I/O', '안전한 디바이스 사용자 공간 접근', '가상 파일 시스템', '로그 기록'], answer: 1, explanation: 'VFIO는 IOMMU를 사용하여 사용자 공간에서 안전하게 디바이스에 직접 접근하게 합니다.' },
        { id: 5, question: 'Interrupt Handler의 상반부(top half)와 하반부(bottom half)를 나누는 이유는?', options: ['성능 저하', '인터럽트 비활성 시간 최소화', '구현 단순화', '메모리 절약'], answer: 1, explanation: '상반부는 빠르게 처리하고 복잡한 작업은 하반부로 지연하여 인터럽트 지연을 줄입니다.' },
        { id: 6, question: 'sysfs의 용도는?', options: ['사용자 데이터 저장', '커널 객체 정보 노출', '로그 저장', '설정 파일 저장'], answer: 1, explanation: 'sysfs는 커널 객체(장치, 드라이버 등)의 정보를 사용자 공간에 파일로 노출합니다.' },
        { id: 7, question: 'Platform Driver의 특징은?', options: ['PCI 전용', '자동 검색되지 않는 장치용', '네트워크만', '사용자 공간 드라이버'], answer: 1, explanation: 'Platform Driver는 SoC 내장 장치처럼 버스 스캔으로 발견되지 않는 장치를 위한 것입니다.' },
        { id: 8, question: 'Device Tree의 용도는?', options: ['x86 전용', '하드웨어 구성을 커널에 기술', '소프트웨어 설정', '부팅 로그'], answer: 1, explanation: 'Device Tree는 ARM 등에서 하드웨어 토폴로지와 속성을 커널에 전달합니다.' },
        { id: 9, question: 'IOMMU의 보안 기능은?', options: ['암호화', 'DMA 공격 방지', '방화벽', '사용자 인증'], answer: 1, explanation: 'IOMMU는 장치의 DMA 접근을 제한하여 악의적인 DMA 공격을 방지합니다.' },
        { id: 10, question: 'UIO(Userspace I/O)의 장점은?', options: ['커널 보호 강화', '사용자 공간에서 드라이버 개발', '성능 저하', '보안 강화'], answer: 1, explanation: 'UIO는 인터럽트 처리 후 대부분의 드라이버 로직을 사용자 공간에서 구현하게 합니다.' }
      ]
    }
  ];

  useEffect(() => { const saved = localStorage.getItem('csp-os-score'); if (saved) setScore(JSON.parse(saved)); }, []);
  const activeTpic = topics.find(t => t.id === activeTopic)!;
  const question = activeTpic.questions[currentQuestion];
  const handleAnswer = (idx: number) => { if (showResult) return; setSelectedAnswer(idx); setShowResult(true); if (idx === question.answer) { const newScore = { ...score, [activeTopic]: (score[activeTopic] || 0) + 1 }; setScore(newScore); localStorage.setItem('csp-os-score', JSON.stringify(newScore)); } };
  const nextQuestion = () => { if (currentQuestion < activeTpic.questions.length - 1) { setCurrentQuestion(prev => prev + 1); } else { const nextTopicIdx = topics.findIndex(t => t.id === activeTopic) + 1; if (nextTopicIdx < topics.length) { setActiveTopic(topics[nextTopicIdx].id); setCurrentQuestion(0); } } setSelectedAnswer(null); setShowResult(false); };
  const generateAIPrompt = () => { setAiPrompt(`컴퓨터시스템응용기술사 운영체제/커널 "${activeTpic.name}":\n\n문제: ${question.question}\n\n정답: ${question.options[question.answer]}\n\n기술사 답안 관점에서 심층 설명해주세요.`); setShowAIModal(true); };
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCorrect = Object.values(score).reduce((sum, s) => sum + s, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600">홈</a><span className="text-gray-300">›</span><a href="/category/it/computer-system-pro" className="text-gray-600">컴퓨터시스템응용기술사</a><span className="text-gray-300">›</span><span className="text-emerald-600 font-medium">운영체제/커널</span></nav></div></header>
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">⚙️</span></div><div><h1 className="text-2xl font-bold">운영체제/커널</h1><p className="text-emerald-100">프로세스, 메모리, 파일시스템, 커널 구조</p></div></div><div className="mt-4 flex gap-4 text-sm"><span className="bg-white/20 px-3 py-1 rounded-full">총 {totalQuestions}문항</span><span className="bg-white/20 px-3 py-1 rounded-full">정답 {totalCorrect}개</span></div></div></section>
      <div className="bg-white border-b sticky top-14 z-40 overflow-x-auto"><div className="max-w-6xl mx-auto px-4"><div className="flex">{topics.map(t => (<button key={t.id} onClick={() => { setActiveTopic(t.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-3 text-sm border-b-2 whitespace-nowrap ${activeTopic === t.id ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-transparent text-gray-500'}`}>{t.name} ({score[t.id]||0}/{t.questions.length})</button>))}</div></div></div>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between mb-4"><span className={`bg-gradient-to-r ${activeTpic.color} text-white px-3 py-1 rounded-full text-sm`}>{activeTpic.name}</span><span className="text-gray-500 text-sm">{currentQuestion + 1}/{activeTpic.questions.length}</span></div>
          <h3 className="text-lg font-medium mb-6">{question.question}</h3>
          <div className="space-y-3">{question.options.map((opt, idx) => (<button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 ${showResult ? idx === question.answer ? 'border-green-500 bg-green-50' : idx === selectedAnswer ? 'border-red-500 bg-red-50' : 'border-gray-200' : selectedAnswer === idx ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}>{idx+1}. {opt}</button>))}</div>
          {showResult && <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === question.answer ? 'bg-green-50' : 'bg-red-50'}`}><p className={selectedAnswer === question.answer ? 'text-green-700' : 'text-red-700'}>{selectedAnswer === question.answer ? '✓ 정답!' : `✗ 정답: ${question.options[question.answer]}`}</p><p className="text-gray-600 mt-2 text-sm">{question.explanation}</p></div>}
          <div className="flex justify-between mt-6"><button onClick={generateAIPrompt} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">🤖 AI 해설</button><button onClick={nextQuestion} disabled={!showResult} className="px-6 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50">다음 →</button></div>
        </div>
      </main>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(aiPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}
      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center text-gray-400">© 2026 자격시험 가이드. UTTEC</div></footer>
    </div>
  );
}
