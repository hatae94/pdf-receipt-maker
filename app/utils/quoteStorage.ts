import { SavedQuote, QuoteFormData } from '../types/quote';

const STORAGE_KEY = 'saved_quotes';

// 저장된 모든 견적서 가져오기
export function getSavedQuotes(): SavedQuote[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as SavedQuote[];
  } catch (error) {
    console.error('Failed to load saved quotes:', error);
    return [];
  }
}

// 견적서 저장하기
export function saveQuote(formData: QuoteFormData): SavedQuote {
  const quotes = getSavedQuotes();

  // 견적서 이름 생성 (수신 회사명 + 공사명)
  const name = formData.recipient.companyName && formData.projectName
    ? `${formData.recipient.companyName} - ${formData.projectName}`
    : formData.recipient.companyName || formData.projectName || '제목 없음';

  const newQuote: SavedQuote = {
    id: generateId(),
    name,
    formData,
    savedAt: new Date().toISOString(),
  };

  quotes.push(newQuote);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
  } catch (error) {
    console.error('Failed to save quote:', error);
    throw new Error('견적서 저장에 실패했습니다.');
  }

  return newQuote;
}

// 특정 견적서 불러오기
export function getQuoteById(id: string): SavedQuote | null {
  const quotes = getSavedQuotes();
  return quotes.find(q => q.id === id) || null;
}

// 특정 견적서 삭제하기
export function deleteQuote(id: string): boolean {
  const quotes = getSavedQuotes();
  const filteredQuotes = quotes.filter(q => q.id !== id);

  if (filteredQuotes.length === quotes.length) {
    return false; // 삭제할 견적서를 찾지 못함
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredQuotes));
    return true;
  } catch (error) {
    console.error('Failed to delete quote:', error);
    return false;
  }
}

// 모든 저장된 견적서 삭제하기
export function deleteAllQuotes(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to delete all quotes:', error);
    return false;
  }
}

// 고유 ID 생성
function generateId(): string {
  return `quote_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// 저장 날짜 포맷팅
export function formatSavedDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
