'use client';

import { useState } from 'react';
import QuoteForm from './components/QuoteForm';
import QuoteTemplate from './components/QuotePDF';
import { QuoteData } from './types/quote';
import { generatePDF } from './utils/pdfGenerator';

export default function Home() {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGeneratePDF = async (data: QuoteData) => {
    setQuoteData(data);
    setShowPreview(true);

    // Wait for the DOM to update
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      const pdfUrl = await generatePDF('quote-template', `견적서_${data.recipient.companyName}_${data.date}.pdf`);

      // Open PDF in new tab for preview
      window.open(pdfUrl, '_blank');

      // Reset preview after successful generation
      setTimeout(() => {
        setShowPreview(false);
        setQuoteData(null);
      }, 500);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      setShowPreview(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            견적서 생성기
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            업체 정보와 품목을 입력하여 PDF 견적서를 생성하세요
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:py-12">
        <QuoteForm onGeneratePDF={handleGeneratePDF} />

        {/* Hidden Preview for PDF Generation */}
        {showPreview && quoteData && (
          <div className="fixed left-[-9999px] top-0">
            <QuoteTemplate data={quoteData} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>견적서 생성기 - PDF로 간편하게 견적서를 만들어보세요</p>
      </footer>
    </div>
  );
}
