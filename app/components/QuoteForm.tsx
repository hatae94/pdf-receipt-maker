"use client";

import { useState } from "react";
import {
  QuoteData,
  QuoteItem,
  SupplierInfo,
  RecipientInfo,
} from "../types/quote";

interface QuoteFormProps {
  onGeneratePDF: (data: QuoteData) => void;
}

export default function QuoteForm({ onGeneratePDF }: QuoteFormProps) {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [quoteType, setQuoteType] = useState<"receipt" | "invoice">("invoice");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [projectName, setProjectName] = useState("");

  // 수신자 정보
  const [recipient, setRecipient] = useState<RecipientInfo>({
    companyName: "",
    representative: "",
  });

  // 공급자 정보
  const [supplier, setSupplier] = useState<SupplierInfo>({
    registrationNumber: "",
    companyName: "",
    representative: "",
    address: "",
    businessType: "",
    businessItem: "",
    contact: "",
  });

  // 품목 목록
  const [items, setItems] = useState<QuoteItem[]>([
    {
      name: "",
      spec: "",
      quantity: 1,
      unit: "",
      unitPrice: 0,
      supplyPrice: 0,
      tax: 0,
      note: "",
    },
  ]);

  const [stampImage, setStampImage] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        name: "",
        spec: "",
        quantity: 1,
        unit: "",
        unitPrice: 0,
        supplyPrice: 0,
        tax: 0,
        note: "",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (
    index: number,
    field: keyof QuoteItem,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // 자동 계산
    if (field === "unitPrice" || field === "quantity") {
      const quantity =
        typeof newItems[index].quantity === "string"
          ? parseFloat(newItems[index].quantity as any) || 0
          : newItems[index].quantity;
      const unitPrice =
        typeof newItems[index].unitPrice === "string"
          ? parseFloat(newItems[index].unitPrice as any) || 0
          : newItems[index].unitPrice;

      newItems[index].supplyPrice = quantity * unitPrice;
      newItems[index].tax = Math.round(newItems[index].supplyPrice * 0.1); // 10% 세액
    }

    setItems(newItems);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStampImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateTotals = () => {
    const totalSupplyPrice = items.reduce(
      (sum, item) => sum + item.supplyPrice,
      0
    );
    const totalTax = items.reduce((sum, item) => sum + item.tax, 0);
    return {
      totalSupplyPrice,
      totalTax,
      totalAmount: totalSupplyPrice + totalTax,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const totals = calculateTotals();
    const quoteData: QuoteData = {
      invoiceNumber,
      date: new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      type: quoteType,
      projectName,
      recipient,
      supplier,
      items,
      ...totals,
      stampImage: stampImage || undefined,
    };

    try {
      await onGeneratePDF(quoteData);
    } finally {
      setIsGenerating(false);
    }
  };

  const totals = calculateTotals();

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl mx-auto space-y-6 p-4 sm:p-6"
    >
      {/* 기본 정보 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
          기본 정보
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              사업자번호
            </label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="예: 401-19-91555"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              작성일 *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              구분 *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="receipt"
                  checked={quoteType === "receipt"}
                  onChange={(e) => setQuoteType(e.target.value as "receipt")}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  영수
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="invoice"
                  checked={quoteType === "invoice"}
                  onChange={(e) => setQuoteType(e.target.value as "invoice")}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  청구
                </span>
              </label>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              공사명 *
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="공사명을 입력하세요"
              required
            />
          </div>
        </div>
      </div>

      {/* 수신자 정보 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
          수신자 정보
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              회사명 *
            </label>
            <input
              type="text"
              value={recipient.companyName}
              onChange={(e) =>
                setRecipient({ ...recipient, companyName: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="받는 회사명"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              대표자
            </label>
            <input
              type="text"
              value={recipient.representative}
              onChange={(e) =>
                setRecipient({ ...recipient, representative: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="대표자명"
            />
          </div>
        </div>
      </div>

      {/* 공급자 정보 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
          공급자 정보
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              등록번호 *
            </label>
            <input
              type="text"
              value={supplier.registrationNumber}
              onChange={(e) =>
                setSupplier({ ...supplier, registrationNumber: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="사업자등록번호"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              상호 *
            </label>
            <input
              type="text"
              value={supplier.companyName}
              onChange={(e) =>
                setSupplier({ ...supplier, companyName: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="공급자 상호"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              대표자 *
            </label>
            <input
              type="text"
              value={supplier.representative}
              onChange={(e) =>
                setSupplier({ ...supplier, representative: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="대표자명"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              주소
            </label>
            <input
              type="text"
              value={supplier.address}
              onChange={(e) =>
                setSupplier({ ...supplier, address: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="사업장 주소"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              업태
            </label>
            <input
              type="text"
              value={supplier.businessType}
              onChange={(e) =>
                setSupplier({ ...supplier, businessType: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="예: 서비스업"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              종목
            </label>
            <input
              type="text"
              value={supplier.businessItem}
              onChange={(e) =>
                setSupplier({ ...supplier, businessItem: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="예: IT개발"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              연락처
            </label>
            <input
              type="text"
              value={supplier.contact}
              onChange={(e) =>
                setSupplier({ ...supplier, contact: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="전화번호"
            />
          </div>
        </div>
      </div>

      {/* 품목 목록 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            품목 내역
          </h2>
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            + 품목 추가
          </button>
        </div>

        <div className="space-y-4 overflow-x-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  품목 {index + 1}
                </span>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    삭제
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-3">
                <div className="col-span-2 lg:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    품목명 *
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="품목명"
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    규격
                  </label>
                  <input
                    type="text"
                    value={item.spec}
                    onChange={(e) =>
                      handleItemChange(index, "spec", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="규격"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    수량 *
                  </label>
                  <input
                    type="number"
                    value={item.quantity || ""}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="수량"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    단위
                  </label>
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) =>
                      handleItemChange(index, "unit", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="개, 식"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    단가 *
                  </label>
                  <input
                    type="number"
                    value={item.unitPrice || ""}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "unitPrice",
                        Number(e.target.value)
                      )
                    }
                    required
                    min="0"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="단가"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    공급가액
                  </label>
                  <input
                    type="text"
                    value={item.supplyPrice.toLocaleString()}
                    readOnly
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    비고
                  </label>
                  <input
                    type="text"
                    value={item.note}
                    onChange={(e) =>
                      handleItemChange(index, "note", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="비고"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 합계 */}
      <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              공급가액
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {totals.totalSupplyPrice.toLocaleString()}원
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              세액 (10%)
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {totals.totalTax.toLocaleString()}원
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              합계금액
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {totals.totalAmount.toLocaleString()}원
            </div>
          </div>
        </div>
      </div>

      {/* 도장 이미지 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
          도장 이미지 (선택)
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <input
            type="file"
            id="stampImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-blue-400"
          />
          {stampImage && (
            <div className="flex-shrink-0">
              <img
                src={stampImage}
                alt="도장 미리보기"
                className="w-16 h-16 object-contain border border-gray-300 rounded dark:border-gray-600"
              />
            </div>
          )}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={
            isGenerating ||
            !recipient.companyName ||
            !supplier.registrationNumber ||
            !supplier.companyName ||
            !supplier.representative ||
            items.some((item) => !item.name || item.unitPrice <= 0)
          }
          className="w-full px-6 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? "PDF 생성 중..." : "PDF 견적서 생성"}
        </button>
      </div>
    </form>
  );
}
