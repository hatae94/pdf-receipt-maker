export interface QuoteItem {
  name: string;           // 품목명
  spec: string;           // 규격
  quantity: number;       // 수량
  unit: string;          // 단위
  unitPrice: number;     // 단가
  supplyPrice: number;   // 공급가액
  tax: number;           // 세액
  note: string;          // 비고
}

export interface SupplierInfo {
  registrationNumber: string;  // 등록번호
  companyName: string;         // 상호
  representative: string;      // 대표자
  address: string;             // 주소
  businessType: string;        // 업태
  businessItem: string;        // 종목
  contact: string;             // 연락처
}

export interface RecipientInfo {
  companyName: string;         // 받는 회사
  representative: string;      // 대표자
}

export interface QuoteData {
  invoiceNumber: string;       // 청구지번호
  date: string;                // 작성일
  type: 'receipt' | 'invoice'; // 영수/청구
  recipient: RecipientInfo;    // 수신자 정보
  supplier: SupplierInfo;      // 공급자 정보
  items: QuoteItem[];          // 품목 목록
  totalSupplyPrice: number;    // 공급가액 합계
  totalTax: number;            // 세액 합계
  totalAmount: number;         // 합계금액
  stampImage?: string;         // 도장 이미지
}
