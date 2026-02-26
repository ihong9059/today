'use client';

import { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  Tag,
  Lightbulb
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { glossaryTerms } from '@/data/education';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: '전체' },
  { id: 'basic', label: '기초' },
  { id: 'indicator', label: '지표' },
  { id: 'analysis', label: '분석' },
  { id: 'trading', label: '거래' },
  { id: 'policy', label: '정책' },
];

const categoryColors: Record<string, string> = {
  basic: 'bg-blue-100 text-blue-700',
  indicator: 'bg-green-100 text-green-700',
  analysis: 'bg-purple-100 text-purple-700',
  trading: 'bg-orange-100 text-orange-700',
  policy: 'bg-pink-100 text-pink-700',
};

const categoryNames: Record<string, string> = {
  basic: '기초',
  indicator: '지표',
  analysis: '분석',
  trading: '거래',
  policy: '정책',
};

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || term.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof glossaryTerms> = {};

    filteredTerms.forEach(term => {
      const firstChar = term.term[0].toUpperCase();
      const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(firstChar);

      let groupKey: string;
      if (isKorean) {
        // Group Korean by initial consonant
        const charCode = firstChar.charCodeAt(0);
        const consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        const index = Math.floor((charCode - 44032) / 588);
        groupKey = consonants[index] || 'ㄱ';
      } else {
        groupKey = firstChar;
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(term);
    });

    return groups;
  }, [filteredTerms]);

  const sortedGroupKeys = Object.keys(groupedTerms).sort((a, b) => {
    const isKoreanA = /[ㄱ-ㅎ]/.test(a);
    const isKoreanB = /[ㄱ-ㅎ]/.test(b);

    if (isKoreanA && !isKoreanB) return -1;
    if (!isKoreanA && isKoreanB) return 1;
    return a.localeCompare(b, 'ko');
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">주식 용어사전</h1>
          <p className="text-orange-100 max-w-2xl mx-auto">
            주식 투자에 필요한 핵심 용어를 쉽게 찾아보고 이해하세요.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="용어를 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Terms Count */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-gray-600">
          총 <span className="font-semibold text-blue-600">{filteredTerms.length}개</span>의 용어가 있습니다.
        </p>
      </section>

      {/* Terms List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredTerms.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-500">다른 검색어를 입력해보세요.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {sortedGroupKeys.map((groupKey) => (
              <div key={groupKey}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                    {groupKey}
                  </div>
                  <span className="text-gray-500 text-sm">
                    {groupedTerms[groupKey].length}개
                  </span>
                </div>

                <div className="space-y-3">
                  {groupedTerms[groupKey].map((term) => (
                    <Card
                      key={term.id}
                      className={cn(
                        'transition-all',
                        expandedTerm === term.id ? 'ring-2 ring-blue-500' : ''
                      )}
                    >
                      <button
                        className="w-full text-left"
                        onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {term.term}
                                </h3>
                                <Badge className={categoryColors[term.category]}>
                                  {categoryNames[term.category]}
                                </Badge>
                              </div>
                              <p className={cn(
                                'text-gray-600',
                                expandedTerm === term.id ? '' : 'line-clamp-2'
                              )}>
                                {term.definition}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              {expandedTerm === term.id ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </div>

                          {/* Expanded Content */}
                          {expandedTerm === term.id && term.example && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4">
                                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-blue-800 mb-1">예시</p>
                                  <p className="text-sm text-blue-700">{term.example}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Related Terms */}
                          {expandedTerm === term.id && term.relatedTerms && term.relatedTerms.length > 0 && (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Tag className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">관련 용어:</span>
                                {term.relatedTerms.map((related, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSearchQuery(related);
                                    }}
                                    className="text-sm text-blue-600 hover:underline"
                                  >
                                    {related}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Tips */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">학습 팁</h2>
                  <p className="text-blue-100 mb-4">
                    용어를 단순히 외우기보다는 실제 투자 상황에서 어떻게 적용되는지 이해하는 것이 중요합니다.
                    교육 센터의 체계적인 과정을 통해 맥락과 함께 학습해보세요.
                  </p>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    교육 센터 바로가기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
