import { QuoteData } from "../types/quote";

interface QuoteTemplateProps {
  data: QuoteData;
}

export default function QuoteTemplate({ data }: QuoteTemplateProps) {
  return (
    <div
      id="quote-template"
      style={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#ffffff",
        padding: "30px",
        margin: "0 auto",
        fontFamily: "Malgun Gothic, 맑은 고딕, sans-serif",
        fontSize: "11px",
        color: "#000000",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            letterSpacing: "15px",
            margin: "0",
            color: "#000000",
          }}
        >
          견 적 서
        </h1>
      </div>

      {/* Header Section */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Date and Recipient */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontSize: "11px" }}>{data.date}</span>
          </div>
          <div style={{ marginBottom: "15px", fontSize: "11px" }}>
            <span>{data.supplier.companyName}</span>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "12px" }}>
              {data.recipient.companyName}
            </span>
            <span style={{ fontSize: "12px", marginLeft: "5px" }}>귀하</span>
          </div>
          <div style={{ fontSize: "11px", marginTop: "15px" }}>
            <span>아래와 같이 견적합니다.</span>
          </div>
        </div>

        {/* Right: Supplier Info Box */}
        <div
          style={{
            width: "280px",
            border: "2px solid #000000",
            fontSize: "10px",
            marginLeft: "20px",
          }}
        >
          {/* Invoice Number */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px dotted #000000",
            }}
          >
            <div
              style={{
                width: "80px",
                padding: "4px 8px",
                borderRight: "1px dotted #000000",
                backgroundColor: "#f5f5f5",
              }}
            >
              사업자번호
            </div>
            <div style={{ flex: 1, padding: "4px 8px" }}>
              {data.invoiceNumber}
            </div>
          </div>

          {/* Registration Number */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px dotted #000000",
            }}
          >
            <div
              style={{
                width: "80px",
                padding: "4px 8px",
                borderRight: "1px dotted #000000",
                backgroundColor: "#f5f5f5",
              }}
            >
              등록번호
            </div>
            <div style={{ flex: 1, padding: "4px 8px" }}>
              {data.supplier.registrationNumber}
            </div>
          </div>

          {/* Company Name and Representative */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px dotted #000000",
            }}
          >
            <div
              style={{
                width: "80px",
                padding: "4px 8px",
                borderRight: "1px dotted #000000",
                backgroundColor: "#f5f5f5",
              }}
            >
              상 호
            </div>
            <div
              style={{
                flex: 1,
                padding: "4px 8px",
                display: "flex",
                borderRight: "1px dotted #000000",
              }}
            >
              {data.supplier.companyName}
            </div>
            <div
              style={{
                width: "60px",
                padding: "4px 8px",
                backgroundColor: "#f5f5f5",
                borderRight: "1px dotted #000000",
              }}
            >
              대표자
            </div>
            <div style={{ flex: 1, padding: "4px 8px", position: "relative" }}>
              <div style={{ display: "inline" }}>
                {data.supplier.representative}
                <span style={{ marginLeft: "10px", fontSize: "10px" }}>
                  (인)
                </span>
              </div>
              {data.stampImage && (
                <div
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "105px",
                    height: "105px",
                  }}
                >
                  <img
                    src={data.stampImage}
                    alt="도장"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px dotted #000000",
            }}
          >
            <div
              style={{
                width: "80px",
                padding: "4px 8px",
                borderRight: "1px dotted #000000",
                backgroundColor: "#f5f5f5",
              }}
            >
              주 소
            </div>
            <div style={{ flex: 1, padding: "4px 8px" }}>
              {data.supplier.address}
            </div>
          </div>

          {/* Business Type and Item */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px dotted #000000",
            }}
          >
            <div
              style={{
                width: "80px",
                padding: "4px 8px",
                borderRight: "1px dotted #000000",
                backgroundColor: "#f5f5f5",
              }}
            >
              업 태
            </div>
            <div
              style={{
                flex: 1,
                padding: "4px 8px",
                borderRight: "1px dotted #000000",
              }}
            >
              {data.supplier.businessType}
            </div>
            <div
              style={{
                width: "60px",
                padding: "4px 8px",
                backgroundColor: "#f5f5f5",
                borderRight: "1px dotted #000000",
              }}
            >
              종 목
            </div>
            <div style={{ flex: 1, padding: "4px 8px" }}>
              {data.supplier.businessItem}
            </div>
          </div>

          {/* Contact */}
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "80px",
                padding: "4px 8px",
                borderRight: "1px dotted #000000",
                backgroundColor: "#f5f5f5",
              }}
            >
              담당자
            </div>
            <div style={{ flex: 1, padding: "4px 8px" }}>
              {data.supplier.representative}
            </div>
            <div
              style={{
                flex: 1,
                padding: "4px 8px",
                borderRight: "1px dotted #000000",
              }}
            ></div>
            <div
              style={{
                width: "60px",
                padding: "4px 8px",
                backgroundColor: "#f5f5f5",
                borderRight: "1px dotted #000000",
              }}
            >
              연락번호
            </div>
            <div style={{ flex: 1, padding: "4px 8px" }}>
              {data.supplier.contact}
            </div>
          </div>
        </div>
      </div>

      {/* Project Name Section */}
      <div
        style={{
          textAlign: "center",
          border: "2px solid #000000",
          padding: "12px",
          marginBottom: "15px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}
        >
          ◈ 공 사 명 ◈
        </div>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
          {data.projectName}
        </div>
      </div>

      {/* Items Table */}
      <div style={{ border: "2px solid #000000" }}>
        {/* Table Header */}
        <div
          style={{
            display: "flex",
            borderBottom: "2px dotted #000000",
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
            fontSize: "10px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              padding: "8px 4px",
              borderRight: "1px dotted #000000",
            }}
          >
            품 목 명
          </div>
          <div
            style={{
              width: "80px",
              padding: "8px 4px",
              borderRight: "1px dotted #000000",
            }}
          >
            규 격
          </div>
          <div
            style={{
              width: "50px",
              padding: "8px 4px",
              borderRight: "1px dotted #000000",
            }}
          >
            수 량
          </div>
          <div
            style={{
              width: "40px",
              padding: "8px 4px",
              borderRight: "1px dotted #000000",
            }}
          >
            단 위
          </div>
          <div
            style={{
              width: "70px",
              padding: "8px 4px",
              borderRight: "1px dotted #000000",
            }}
          >
            단 가
          </div>
          <div
            style={{
              width: "90px",
              padding: "8px 4px",
              borderRight: "1px dotted #000000",
            }}
          >
            공 급 가
          </div>
          <div
            style={{
              width: "70px",
              padding: "8px 4px",
              borderRight: "1px dotted #000000",
            }}
          >
            세 액
          </div>
          <div
            style={{
              flex: 1,
              padding: "8px 4px",
            }}
          >
            비 고
          </div>
        </div>

        {/* Table Rows */}
        {data.items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              borderBottom:
                index === data.items.length - 1 ? "none" : "1px dotted #d0d0d0",
              fontSize: "10px",
              minHeight: "28px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "60px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
                wordBreak: "break-word",
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                width: "80px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
                textAlign: "center",
              }}
            >
              {item.spec}
            </div>
            <div
              style={{
                width: "50px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
                textAlign: "right",
              }}
            >
              {item.quantity}
            </div>
            <div
              style={{
                width: "40px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
                textAlign: "center",
              }}
            >
              {item.unit}
            </div>
            <div
              style={{
                width: "70px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
                textAlign: "right",
              }}
            >
              {item.unitPrice.toLocaleString()}
            </div>
            <div
              style={{
                width: "90px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
                textAlign: "right",
              }}
            >
              {item.supplyPrice.toLocaleString()}
            </div>
            <div
              style={{
                width: "70px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
                textAlign: "right",
              }}
            >
              {item.tax.toLocaleString()}
            </div>
            <div
              style={{
                flex: 1,
                padding: "6px 4px",
              }}
            >
              {item.note}
            </div>
          </div>
        ))}

        {/* Empty rows to fill space */}
        {[...Array(Math.max(0, 10 - data.items.length))].map((_, index) => (
          <div
            key={`empty-${index}`}
            style={{
              display: "flex",
              borderBottom:
                index === 9 - data.items.length ? "none" : "1px dotted #d0d0d0",
              fontSize: "10px",
              minHeight: "28px",
            }}
          >
            <div
              style={{
                width: "60px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
              }}
            >
              &nbsp;
            </div>
            <div
              style={{
                width: "80px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
              }}
            >
              &nbsp;
            </div>
            <div
              style={{
                width: "50px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
              }}
            >
              &nbsp;
            </div>
            <div
              style={{
                width: "40px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
              }}
            >
              &nbsp;
            </div>
            <div
              style={{
                width: "70px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
              }}
            >
              &nbsp;
            </div>
            <div
              style={{
                width: "90px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
              }}
            >
              &nbsp;
            </div>
            <div
              style={{
                width: "70px",
                padding: "6px 4px",
                borderRight: "1px dotted #d0d0d0",
              }}
            >
              &nbsp;
            </div>
            <div style={{ flex: 1, padding: "6px 4px" }}>&nbsp;</div>
          </div>
        ))}

        {/* Total Row */}
        <div
          style={{
            display: "flex",
            borderTop: "2px dotted #000000",
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
            fontSize: "10px",
          }}
        >
          <div
            style={{
              width: "230px",
              padding: "8px 4px",
              borderRight: "1px dotted #000000",
              textAlign: "center",
            }}
          >
            총 합 계
          </div>
          <div
            style={{
              width: "90px",
              padding: "8px 4px",
              borderRight: "1px dotted #000000",
              textAlign: "right",
            }}
          >
            {data.totalSupplyPrice.toLocaleString()}
          </div>
          <div
            style={{
              width: "70px",
              padding: "8px 4px",
              borderRight: "1px dotted #000000",
              textAlign: "right",
            }}
          >
            {data.totalTax.toLocaleString()}
          </div>
          <div style={{ flex: 1, padding: "8px 4px" }}>&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
