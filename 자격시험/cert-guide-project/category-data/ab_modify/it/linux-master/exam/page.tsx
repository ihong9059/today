'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LinuxMasterExamPage() {
  const [activeTab, setActiveTab] = useState<'level2' | 'level1'>('level2');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it/linux-master" className="text-yellow-600 hover:text-yellow-800 flex items-center gap-2">
            <span>←</span>
            <span>리눅스마스터로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📋</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">리눅스마스터 시험 정보</h1>
              <p className="text-gray-600">Linux Master 자격검정</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('level2')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'level2'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              2급 (입문)
            </button>
            <button
              onClick={() => setActiveTab('level1')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'level1'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              1급 (전문가)
            </button>
          </div>

          {activeTab === 'level2' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-2">📝 1차 시험 (필기)</h3>
                  <ul className="space-y-1 text-yellow-700 text-sm">
                    <li>• 문항수: 80문항 (객관식 4지선다)</li>
                    <li>• 시험시간: 100분</li>
                    <li>• 합격기준: 60점 이상 (100점 만점)</li>
                    <li>• 과목: 리눅스 일반, 운영 및 관리</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2">💻 2차 시험 (실기)</h3>
                  <ul className="space-y-1 text-orange-700 text-sm">
                    <li>• 형식: 작업형 (리눅스 실습)</li>
                    <li>• 시험시간: 60분</li>
                    <li>• 합격기준: 60점 이상 (100점 만점)</li>
                    <li>• 과목: 리눅스 운영 및 관리</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-2">📚 2급 필기 과목</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">1과목: 리눅스 일반</p>
                    <p className="text-gray-600">리눅스 개요, 파일시스템, 셸, 프로세스</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">2과목: 리눅스 운영 및 관리</p>
                    <p className="text-gray-600">시스템 관리, 네트워크 관리, 서비스 관리</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">💰 응시료 및 일정</h3>
                <ul className="space-y-1 text-green-700 text-sm">
                  <li>• 1차(필기): 22,000원</li>
                  <li>• 2차(실기): 44,000원</li>
                  <li>• 시행: 연 4회 (3, 6, 9, 12월)</li>
                  <li>• 접수: 시험 약 1개월 전</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'level1' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-2">📝 1차 시험 (필기)</h3>
                  <ul className="space-y-1 text-yellow-700 text-sm">
                    <li>• 문항수: 100문항 (객관식 4지선다)</li>
                    <li>• 시험시간: 100분</li>
                    <li>• 합격기준: 60점 이상 (100점 만점)</li>
                    <li>• 응시자격: 2급 합격자 또는 실무 2년</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2">💻 2차 시험 (실기)</h3>
                  <ul className="space-y-1 text-orange-700 text-sm">
                    <li>• 형식: 작업형 (리눅스 실습)</li>
                    <li>• 시험시간: 90분</li>
                    <li>• 합격기준: 60점 이상 (100점 만점)</li>
                    <li>• 과목: 시스템 관리, 네트워크, 보안</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-2">📚 1급 필기 과목</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">1과목: 리눅스 시스템의 이해</p>
                    <p className="text-gray-600">리눅스 실무, 장치 관리, 파일시스템</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">2과목: 리눅스 시스템 관리</p>
                    <p className="text-gray-600">일반 운영관리, 장치 관리, 시스템 보안</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">3과목: 네트워크 및 서비스 활용</p>
                    <p className="text-gray-600">네트워크 서비스, 웹 서버, 메일 서버</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">💰 응시료 및 일정</h3>
                <ul className="space-y-1 text-green-700 text-sm">
                  <li>• 1차(필기): 33,000원</li>
                  <li>• 2차(실기): 66,000원</li>
                  <li>• 시행: 연 4회 (3, 6, 9, 12월)</li>
                  <li>• 접수: 시험 약 1개월 전</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">⚠️ 1급 응시자격</h3>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• 리눅스마스터 2급 취득자</li>
                  <li>• 리눅스 관련 실무 2년 이상</li>
                  <li>• 기사/산업기사 자격 취득 후 1년</li>
                  <li>• 전문대 졸업(예정)자 중 해당 분야</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-3">📅 2026년 시험 일정 (예정)</h3>
          <div className="grid md:grid-cols-4 gap-3 text-sm">
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="font-bold text-yellow-700">제51회</p>
              <p className="text-gray-600">3월 15일</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="font-bold text-yellow-700">제52회</p>
              <p className="text-gray-600">6월 21일</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="font-bold text-yellow-700">제53회</p>
              <p className="text-gray-600">9월 13일</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="font-bold text-yellow-700">제54회</p>
              <p className="text-gray-600">12월 13일</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
