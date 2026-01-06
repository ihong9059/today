'use client';

import { useState, useEffect } from 'react';

interface Question { id: number; question: string; options: string[]; answer: number; explanation: string; }
interface Topic { id: string; name: string; color: string; questions: Question[]; }

export default function SystemArchitecturePage() {
  const [activeTopic, setActiveTopic] = useState<string>('cpu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const topics: Topic[] = [
    {
      id: 'cpu',
      name: 'CPU 아키텍처',
      color: 'from-emerald-500 to-emerald-400',
      questions: [
        { id: 1, question: '수퍼스칼라 프로세서의 특징은?', options: ['단일 명령어 실행', '다중 명령어 동시 실행', '순차 실행만', '단일 파이프라인'], answer: 1, explanation: '수퍼스칼라는 여러 명령어를 동시에 페치, 디코드, 실행할 수 있는 아키텍처입니다.' },
        { id: 2, question: 'Out-of-Order Execution의 목적은?', options: ['순서 보장', '명령어 의존성으로 인한 스톨 감소', '전력 절감', '메모리 절약'], answer: 1, explanation: 'OoO 실행은 의존성 없는 명령어를 먼저 실행하여 파이프라인 활용률을 높입니다.' },
        { id: 3, question: 'Branch Prediction의 종류가 아닌 것은?', options: ['정적 예측', '동적 예측', '하이브리드 예측', '랜덤 예측'], answer: 3, explanation: '분기 예측에는 정적(항상 taken/not taken), 동적(BHT, BTB), 하이브리드 방식이 있습니다.' },
        { id: 4, question: 'VLIW(Very Long Instruction Word)의 특징은?', options: ['하드웨어 스케줄링', '컴파일러가 병렬성 결정', '런타임 최적화', 'OoO 필수'], answer: 1, explanation: 'VLIW는 컴파일러가 병렬 실행 가능한 명령어를 하나의 긴 명령어로 묶습니다.' },
        { id: 5, question: 'SMT(Simultaneous Multithreading)의 예시는?', options: ['멀티코어', 'Intel Hyper-Threading', 'GPU SIMD', '벡터 처리'], answer: 1, explanation: 'SMT는 하나의 코어에서 여러 스레드를 동시에 실행하며, Intel의 Hyper-Threading이 대표적입니다.' },
        { id: 6, question: 'Spectre/Meltdown 취약점과 관련된 CPU 기능은?', options: ['캐시', '투기적 실행', '파이프라인', 'DMA'], answer: 1, explanation: 'Spectre와 Meltdown은 투기적 실행(Speculative Execution)의 부채널을 악용합니다.' },
        { id: 7, question: 'RISC-V의 특징이 아닌 것은?', options: ['오픈소스 ISA', '모듈식 확장', 'x86 호환', '로드/스토어 아키텍처'], answer: 2, explanation: 'RISC-V는 오픈소스 ISA로 x86과 호환되지 않으며, ARM과도 다른 독자적 아키텍처입니다.' },
        { id: 8, question: 'CPU 마이크로아키텍처 세대 간 IPC 향상의 주요 방법이 아닌 것은?', options: ['더 넓은 파이프라인', '더 정확한 분기 예측', '클럭 속도만 증가', '더 큰 캐시'], answer: 2, explanation: '클럭 속도 증가만으로는 IPC가 향상되지 않습니다. 파이프라인 개선, 예측 정확도 향상이 필요합니다.' },
        { id: 9, question: 'ARM big.LITTLE 아키텍처의 목적은?', options: ['최대 성능', '전력 효율과 성능의 균형', '호환성', '단순화'], answer: 1, explanation: 'big.LITTLE은 고성능 코어와 저전력 코어를 결합하여 효율적인 전력 관리를 합니다.' },
        { id: 10, question: 'Register Renaming의 목적은?', options: ['레지스터 절약', 'WAW, WAR 해저드 제거', '전력 절감', '캐시 최적화'], answer: 1, explanation: 'Register Renaming은 논리 레지스터를 물리 레지스터에 매핑하여 거짓 의존성을 제거합니다.' }
      ]
    },
    {
      id: 'memory',
      name: '메모리 시스템',
      color: 'from-teal-500 to-teal-400',
      questions: [
        { id: 1, question: 'DDR5와 DDR4의 주요 차이점은?', options: ['동일한 속도', '더 높은 대역폭과 밀도', '더 낮은 전압만', '채널 수 감소'], answer: 1, explanation: 'DDR5는 더 높은 대역폭, 더 높은 밀도, 온다이 ECC, 뱅크 그룹 증가 등의 개선이 있습니다.' },
        { id: 2, question: 'NUMA(Non-Uniform Memory Access)의 특징은?', options: ['균일한 메모리 접근', '로컬/리모트 메모리 접근 시간 차이', '단일 메모리 컨트롤러', 'GPU 전용'], answer: 1, explanation: 'NUMA는 프로세서가 로컬 메모리에 빠르게, 리모트 메모리에 느리게 접근하는 아키텍처입니다.' },
        { id: 3, question: 'HBM(High Bandwidth Memory)의 특징은?', options: ['저대역폭', '3D 스택 구조와 와이드 버스', '저전력만', 'CPU 전용'], answer: 1, explanation: 'HBM은 3D 스태킹과 넓은 버스(1024비트+)로 높은 대역폭을 제공하며 주로 GPU에 사용됩니다.' },
        { id: 4, question: 'Memory Interleaving의 목적은?', options: ['메모리 절약', '병렬 접근으로 대역폭 향상', '오류 검출', '보안 강화'], answer: 1, explanation: 'Interleaving은 연속 주소를 여러 메모리 뱅크에 분산하여 병렬 접근을 가능하게 합니다.' },
        { id: 5, question: 'ECC 메모리의 SECDED 의미는?', options: ['보안 기능', 'Single Error Correct, Double Error Detect', '속도 향상', '용량 증가'], answer: 1, explanation: 'SECDED는 단일 비트 오류를 정정하고 이중 비트 오류를 검출하는 ECC 방식입니다.' },
        { id: 6, question: 'Memory Controller의 역할이 아닌 것은?', options: ['주소 변환', '리프레시 관리', 'CPU 스케줄링', '명령 큐잉'], answer: 2, explanation: '메모리 컨트롤러는 DRAM 접근, 리프레시, 주소 매핑, 명령 스케줄링을 담당합니다. CPU 스케줄링은 OS 역할입니다.' },
        { id: 7, question: 'CXL(Compute Express Link)의 용도는?', options: ['스토리지 전용', '메모리 확장 및 공유', '네트워킹만', 'GPU 인터커넥트만'], answer: 1, explanation: 'CXL은 CPU, 가속기 간 메모리 확장과 공유를 위한 고속 인터커넥트 표준입니다.' },
        { id: 8, question: 'Persistent Memory(PMEM)의 특징은?', options: ['휘발성', '비휘발성이면서 바이트 주소 지정', 'DRAM과 동일 속도', '블록 단위만'], answer: 1, explanation: 'PMEM(예: Intel Optane)은 비휘발성이면서 바이트 단위 접근이 가능한 메모리입니다.' },
        { id: 9, question: 'Memory Bandwidth Wall의 의미는?', options: ['메모리 용량 한계', 'CPU 연산 속도 대비 메모리 대역폭 병목', '가격 상승', '기술 한계'], answer: 1, explanation: 'Memory Bandwidth Wall은 CPU 연산 속도 증가에 메모리 대역폭이 따라가지 못하는 현상입니다.' },
        { id: 10, question: 'Memory Prefetching의 종류가 아닌 것은?', options: ['하드웨어 프리페칭', '소프트웨어 프리페칭', '스트라이드 프리페칭', '랜덤 프리페칭'], answer: 3, explanation: '프리페칭은 패턴 기반(순차, 스트라이드 등)으로 동작하며, 랜덤 접근은 예측이 어렵습니다.' }
      ]
    },
    {
      id: 'cache',
      name: '캐시 설계',
      color: 'from-cyan-500 to-cyan-400',
      questions: [
        { id: 1, question: '캐시 일관성(Cache Coherence) 프로토콜이 아닌 것은?', options: ['MESI', 'MOESI', 'Directory-based', 'FIFO'], answer: 3, explanation: 'FIFO는 교체 정책입니다. 캐시 일관성 프로토콜에는 MESI, MOESI, Directory-based 등이 있습니다.' },
        { id: 2, question: 'MESI 프로토콜에서 M 상태의 의미는?', options: ['Missing', 'Modified', 'Memory', 'Mapped'], answer: 1, explanation: 'MESI의 M은 Modified로, 캐시 라인이 수정되어 메모리와 불일치 상태입니다.' },
        { id: 3, question: 'Write-Back과 Write-Through의 차이점은?', options: ['동일함', 'Write-Back은 캐시만 갱신, 지연 기록', 'Write-Through가 더 효율적', 'Write-Back은 일관성 불가'], answer: 1, explanation: 'Write-Back은 캐시만 갱신하고 교체 시 메모리에 기록, Write-Through는 즉시 메모리에도 기록합니다.' },
        { id: 4, question: 'Inclusive Cache와 Exclusive Cache의 차이는?', options: ['동일함', 'Inclusive는 상위가 하위 포함, Exclusive는 배타적', '성능 차이 없음', 'L1 전용'], answer: 1, explanation: 'Inclusive 캐시는 L1 데이터가 L2에도 있고, Exclusive 캐시는 한 레벨에만 존재합니다.' },
        { id: 5, question: 'Cache Miss의 종류(3C)가 아닌 것은?', options: ['Compulsory', 'Capacity', 'Conflict', 'Coverage'], answer: 3, explanation: '3C Miss: Compulsory(초기), Capacity(용량 부족), Conflict(동일 세트 충돌)입니다.' },
        { id: 6, question: 'Victim Cache의 목적은?', options: ['보안', 'Conflict Miss 감소', '전력 절감', '용량 증가'], answer: 1, explanation: 'Victim Cache는 교체된 캐시 라인을 임시 저장하여 Conflict Miss를 줄입니다.' },
        { id: 7, question: 'Non-Blocking Cache(Lockup-Free Cache)의 특징은?', options: ['Miss 시 블록', 'Miss 중에도 다른 요청 처리', '단일 포트', '저성능'], answer: 1, explanation: 'Non-Blocking 캐시는 Miss 처리 중에도 다른 캐시 접근을 허용합니다.' },
        { id: 8, question: 'Cache Line Size 증가의 장단점 중 단점은?', options: ['공간적 지역성 활용', 'Miss Penalty 증가', 'Prefetch 효과', '대역폭 활용'], answer: 1, explanation: '캐시 라인이 커지면 Miss 시 더 많은 데이터를 가져와야 하므로 Miss Penalty가 증가합니다.' },
        { id: 9, question: 'Last Level Cache(LLC) 공유의 문제점은?', options: ['성능 향상', '캐시 오염과 공정성 문제', '구현 단순화', '전력 감소'], answer: 1, explanation: 'LLC 공유 시 한 코어가 다른 코어의 캐시 데이터를 밀어내는 오염 문제가 발생합니다.' },
        { id: 10, question: 'Cache Partitioning의 목적은?', options: ['용량 증가', 'QoS 보장과 격리', '속도 향상', '전력 절감'], answer: 1, explanation: 'Cache Partitioning은 응용별로 캐시를 분리하여 성능 격리와 예측 가능성을 제공합니다.' }
      ]
    },
    {
      id: 'io',
      name: 'I/O 시스템',
      color: 'from-blue-500 to-blue-400',
      questions: [
        { id: 1, question: 'PCIe Gen5의 데이터 전송률은?', options: ['8GT/s', '16GT/s', '32GT/s', '64GT/s'], answer: 2, explanation: 'PCIe Gen5는 32GT/s(Giga Transfers/second)로 Gen4 대비 2배입니다.' },
        { id: 2, question: 'NVMe의 장점이 아닌 것은?', options: ['낮은 지연', '병렬 큐 지원', 'AHCI 호환', '높은 IOPS'], answer: 2, explanation: 'NVMe는 AHCI를 대체하는 프로토콜로, SSD에 최적화되어 낮은 지연과 높은 병렬성을 제공합니다.' },
        { id: 3, question: 'RDMA(Remote Direct Memory Access)의 특징은?', options: ['CPU 개입 필수', 'CPU 우회하여 메모리 직접 접근', '저속 전송', '로컬만 지원'], answer: 1, explanation: 'RDMA는 CPU 개입 없이 원격 메모리에 직접 접근하여 낮은 지연과 높은 대역폭을 제공합니다.' },
        { id: 4, question: 'IOMMU의 역할은?', options: ['메모리 압축', 'I/O 장치의 가상 주소 변환 및 보호', 'CPU 스케줄링', '네트워크 라우팅'], answer: 1, explanation: 'IOMMU는 I/O 장치의 DMA 요청에 대해 주소 변환과 메모리 보호를 제공합니다.' },
        { id: 5, question: 'SR-IOV(Single Root I/O Virtualization)의 목적은?', options: ['스토리지 가상화', 'PCIe 장치를 여러 VM에 직접 할당', 'CPU 가상화', '메모리 가상화'], answer: 1, explanation: 'SR-IOV는 하나의 PCIe 장치를 여러 가상 기능(VF)으로 분할하여 VM에 직접 할당합니다.' },
        { id: 6, question: 'Interrupt Coalescing의 목적은?', options: ['지연 감소', '인터럽트 오버헤드 감소', '대역폭 증가', '보안 강화'], answer: 1, explanation: 'Interrupt Coalescing은 여러 이벤트를 모아 하나의 인터럽트로 처리하여 오버헤드를 줄입니다.' },
        { id: 7, question: 'DPU(Data Processing Unit)의 역할은?', options: ['그래픽 처리', 'I/O 및 데이터 처리 오프로드', 'CPU 대체', '메모리 확장'], answer: 1, explanation: 'DPU는 네트워킹, 스토리지, 보안 등 데이터 처리 작업을 CPU에서 오프로드합니다.' },
        { id: 8, question: 'CXL Type 3의 용도는?', options: ['I/O 가속', '메모리 확장', '스토리지 연결', '네트워킹'], answer: 1, explanation: 'CXL Type 3은 Memory Expander로, 호스트에 추가 메모리를 제공합니다.' },
        { id: 9, question: 'Polling과 Interrupt의 비교에서 Polling의 장점은?', options: ['CPU 효율', '낮은 지연(고부하 시)', '전력 절감', '구현 복잡'], answer: 1, explanation: '고부하 상황에서 Polling은 인터럽트 오버헤드 없이 낮은 지연을 제공합니다.' },
        { id: 10, question: 'SmartNIC의 기능이 아닌 것은?', options: ['패킷 처리 오프로드', '암호화 가속', 'CPU 코어 제공', 'OVS 오프로드'], answer: 2, explanation: 'SmartNIC은 네트워크 처리를 오프로드하지만 CPU 코어를 제공하지는 않습니다(일부 DPU 제외).' }
      ]
    },
    {
      id: 'parallel',
      name: '병렬 처리',
      color: 'from-indigo-500 to-indigo-400',
      questions: [
        { id: 1, question: 'Amdahl의 법칙이 의미하는 것은?', options: ['무한 확장 가능', '순차 부분이 병렬화 이득 제한', '선형 확장 보장', '병렬화 불필요'], answer: 1, explanation: 'Amdahl의 법칙은 프로그램의 순차 실행 부분이 병렬화로 얻을 수 있는 속도 향상을 제한함을 보여줍니다.' },
        { id: 2, question: 'GPU의 SIMT(Single Instruction Multiple Threads)의 특징은?', options: ['SIMD와 동일', '스레드가 같은 명령을 다른 데이터에', '순차 실행', 'CPU 전용'], answer: 1, explanation: 'SIMT는 많은 스레드가 같은 명령어를 다른 데이터에 실행하며, 분기 발산(divergence)을 허용합니다.' },
        { id: 3, question: 'Flynn 분류 중 MIMD의 예시는?', options: ['단일 코어 CPU', '벡터 프로세서', '멀티코어 CPU', 'GPU'], answer: 2, explanation: 'MIMD는 여러 프로세서가 각자 다른 명령어를 다른 데이터에 실행하며, 멀티코어가 대표적입니다.' },
        { id: 4, question: 'OpenMP와 MPI의 차이점은?', options: ['동일한 모델', 'OpenMP는 공유 메모리, MPI는 분산 메모리', 'MPI가 더 단순', 'OpenMP만 표준'], answer: 1, explanation: 'OpenMP는 공유 메모리 병렬화, MPI는 메시지 패싱 기반 분산 메모리 병렬화입니다.' },
        { id: 5, question: 'False Sharing의 원인은?', options: ['메모리 부족', '다른 변수가 같은 캐시 라인에 있을 때', '락 경합', '네트워크 지연'], answer: 1, explanation: 'False Sharing은 서로 다른 변수가 같은 캐시 라인에 있어 불필요한 캐시 무효화가 발생하는 현상입니다.' },
        { id: 6, question: 'Memory Fence/Barrier의 목적은?', options: ['성능 향상', '메모리 연산 순서 보장', '메모리 절약', '캐시 증가'], answer: 1, explanation: 'Memory Fence는 메모리 연산의 순서를 보장하여 메모리 일관성을 유지합니다.' },
        { id: 7, question: 'Lock-free 자료구조의 특징은?', options: ['락 사용', '락 없이 원자적 연산으로 동시성 보장', '단일 스레드 전용', '느린 성능'], answer: 1, explanation: 'Lock-free는 CAS 등 원자적 연산을 사용하여 락 없이 동시 접근을 안전하게 처리합니다.' },
        { id: 8, question: 'Heterogeneous Computing의 예시가 아닌 것은?', options: ['CPU+GPU', 'CPU+FPGA', 'CPU+TPU', '동종 클러스터'], answer: 3, explanation: 'Heterogeneous Computing은 CPU, GPU, FPGA, TPU 등 다른 종류의 프로세서를 함께 사용합니다.' },
        { id: 9, question: 'Roofline Model이 분석하는 것은?', options: ['전력 소비', '연산 강도 대비 성능 한계', '메모리 용량', '네트워크 대역폭'], answer: 1, explanation: 'Roofline Model은 연산 강도(Operational Intensity) 대비 달성 가능한 성능 상한을 분석합니다.' },
        { id: 10, question: 'CUDA의 Thread Block과 Grid의 관계는?', options: ['동일한 개념', 'Grid는 Thread Block의 집합', 'Block이 상위', 'GPU와 무관'], answer: 1, explanation: 'CUDA에서 Grid는 여러 Thread Block으로 구성되고, 각 Block은 여러 Thread를 포함합니다.' }
      ]
    }
  ];

  useEffect(() => { const saved = localStorage.getItem('csp-sa-score'); if (saved) setScore(JSON.parse(saved)); }, []);
  const activeTpic = topics.find(t => t.id === activeTopic)!;
  const question = activeTpic.questions[currentQuestion];
  const handleAnswer = (idx: number) => { if (showResult) return; setSelectedAnswer(idx); setShowResult(true); if (idx === question.answer) { const newScore = { ...score, [activeTopic]: (score[activeTopic] || 0) + 1 }; setScore(newScore); localStorage.setItem('csp-sa-score', JSON.stringify(newScore)); } };
  const nextQuestion = () => { if (currentQuestion < activeTpic.questions.length - 1) { setCurrentQuestion(prev => prev + 1); } else { const nextTopicIdx = topics.findIndex(t => t.id === activeTopic) + 1; if (nextTopicIdx < topics.length) { setActiveTopic(topics[nextTopicIdx].id); setCurrentQuestion(0); } } setSelectedAnswer(null); setShowResult(false); };
  const generateAIPrompt = () => { setAiPrompt(`컴퓨터시스템응용기술사 시스템 아키텍처 "${activeTpic.name}":\n\n문제: ${question.question}\n\n정답: ${question.options[question.answer]}\n\n기술사 답안 관점에서 심층 설명해주세요.`); setShowAIModal(true); };
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCorrect = Object.values(score).reduce((sum, s) => sum + s, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600">홈</a><span className="text-gray-300">›</span><a href="/category/it/computer-system-pro" className="text-gray-600">컴퓨터시스템응용기술사</a><span className="text-gray-300">›</span><span className="text-emerald-600 font-medium">시스템 아키텍처</span></nav></div></header>
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🏗️</span></div><div><h1 className="text-2xl font-bold">시스템 아키텍처</h1><p className="text-emerald-100">CPU, 메모리, 캐시, I/O, 병렬 처리</p></div></div><div className="mt-4 flex gap-4 text-sm"><span className="bg-white/20 px-3 py-1 rounded-full">총 {totalQuestions}문항</span><span className="bg-white/20 px-3 py-1 rounded-full">정답 {totalCorrect}개</span></div></div></section>
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
      {showAIModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"><div className="flex justify-between mb-4"><h3 className="font-bold">🤖 AI 도우미</h3><button onClick={() => setShowAIModal(false)}>✕</button></div><pre className="bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap">{aiPrompt}</pre><button onClick={() => {navigator.clipboard.writeText(aiPrompt); alert('복사됨!');}} className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg">📋 복사</button></div></div>}
      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center text-gray-400">© 2026 자격시험 가이드. UTTEC</div></footer>
    </div>
  );
}
