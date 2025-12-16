# 견적서 생성기 (PDF Quote Maker)

간편하게 PDF 견적서를 만들 수 있는 웹 애플리케이션입니다.

## 주요 기능

- ✨ 업체명, 품목명, 가격, 수량 입력
- 📄 자동 총액 계산
- 🖼️ 도장 이미지 업로드 지원
- 📱 모바일 반응형 디자인
- 💾 PDF 파일로 다운로드

## 기술 스택

- **Framework**: Next.js 16.0.10 (App Router + SSR)
- **UI**: React 19.2.1 + Tailwind CSS 4
- **PDF Generation**: jsPDF + html2canvas
- **Language**: TypeScript

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 또는 [http://localhost:3001](http://localhost:3001)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 사용 방법

1. **업체명 입력**: 견적서를 받을 업체명을 입력합니다.
2. **품목 추가**: "품목 추가" 버튼으로 여러 품목을 추가할 수 있습니다.
3. **품목 정보 입력**: 각 품목의 이름, 단가, 수량을 입력합니다.
4. **총액 확인**: 자동으로 계산된 총액을 확인합니다.
5. **도장 이미지 업로드** (선택): 필요시 도장 이미지를 업로드합니다.
6. **PDF 생성**: "PDF 견적서 생성" 버튼을 클릭하여 PDF를 다운로드합니다.

## 프로젝트 구조

```
app/
├── components/
│   ├── QuoteForm.tsx       # 견적서 입력 폼 컴포넌트
│   └── QuotePDF.tsx        # PDF 템플릿 컴포넌트
├── types/
│   └── quote.ts            # 견적서 타입 정의
├── utils/
│   └── pdfGenerator.ts     # PDF 생성 유틸리티
├── page.tsx                # 메인 페이지
└── layout.tsx              # 레이아웃
```

## 반응형 디자인

- **Desktop**: 넓은 화면에서 최적화된 레이아웃
- **Tablet**: 중간 크기 화면에 맞춘 그리드
- **Mobile**: 모바일 환경에서 세로 레이아웃으로 자동 전환

## 라이센스

MIT

## 기여

이슈나 풀 리퀘스트를 환영합니다!
# pdf-receipt-maker
