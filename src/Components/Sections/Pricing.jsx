import React from "react";
import "./Pricing.css";

/* =========================================================
   PRICING RESPONSIVE STYLE
   ========================================================= */

const pricingResponsiveStyle = `
  .pricing-page-container {
    overflow: visible !important;
    min-width: 0;
    min-height: 0;
    box-sizing: border-box;
  }

  .pricing-plan-card {
    min-width: 0;
    min-height: 0;
    overflow: visible !important;
  }

  .pricing-details-container {
    gap: clamp(3px, 0.5vh, 8px);
    min-width: 0;
  }

  .pricing-detail-text {
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  @media (max-width: 767px) {
    .pricing-page-container {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      padding-left: 10px !important;
      padding-right: 10px !important;
      overflow: visible !important;
    }

    .pricing-page-container.pricing-page-right {
      padding-left: 10px !important;
      padding-right: 10px !important;
    }

    .pricing-header-left,
    .pricing-header-right {
      height: auto !important;
      min-height: 20px;
      margin-bottom: 4px !important;
    }

    .pricing-title {
      font-size: clamp(14px, 3vw, 18px) !important;
    }

    .pricing-plan-card {
      justify-content: flex-start;
      gap: 5px;
      padding-top: 7px;
      padding-bottom: 7px;
    }

    .pricing-plan-name {
      font-size: clamp(20px, 3.4vw, 28px) !important;
      line-height: 1.1 !important;
    }

    .pricing-plan-subtitle {
      font-size: clamp(8.5px, 2vw, 10.5px) !important;
      white-space: normal !important;
      line-height: 1.2 !important;
    }

    .pricing-details-container {
      gap: 4px !important;
      margin-top: 3px !important;
      margin-bottom: 3px !important;
    }

    .pricing-detail-text {
      font-size: clamp(8px, 2vw, 10px) !important;
      line-height: 1.25 !important;
      white-space: normal !important;
    }

    .pricing-price-container {
      margin-bottom: 4px !important;
    }

    .pricing-price-text {
      font-size: clamp(28px, 5vw, 40px) !important;
      line-height: 1 !important;
    }

    .pricing-start-button {
      width: clamp(120px, 50%, 150px) !important;
      padding: 7px 0 !important;
      font-size: clamp(8px, 1.8vw, 9px) !important;
      letter-spacing: 1px !important;
    }
  }

  @media (max-width: 480px) {
    .pricing-page-container {
      padding-top: 6px !important;
      padding-bottom: 6px !important;
      padding-left: 6px !important;
      padding-right: 6px !important;
      overflow: visible !important;
    }

    .pricing-page-container.pricing-page-right {
      padding-left: 6px !important;
      padding-right: 6px !important;
    }

    .pricing-plan-name {
      font-size: clamp(18px, 4vw, 23px) !important;
    }

    .pricing-plan-subtitle {
      font-size: clamp(8px, 2.2vw, 9px) !important;
    }

    .pricing-detail-text {
      font-size: clamp(7px, 2vw, 8.5px) !important;
      line-height: 1.2 !important;
    }

    .pricing-price-text {
      font-size: clamp(26px, 4.8vw, 32px) !important;
    }

    .pricing-start-button {
      width: clamp(110px, 55%, 135px) !important;
      padding: 6px 0 !important;
      font-size: clamp(7px, 2vw, 8.5px) !important;
    }
  }
`;

/* =========================================================
   PRICING DATA (MATCHING REFERENCE IMAGE 100%)
   ========================================================= */

const pricingPlans = {
  starter: {
    name: "Starter",
    subtitle: "Digital eBook Cover (Kindle Only)",
    details: [
      "3 cover studies\nstock image / AI",
      "2 rounds of revisions",
      "3D single & stack\nbook presentation",
      "Preparation of press\nready files (JPG/PNG)",
      "Source file (PSD/AI)",
      "2-3 days delivery",
    ],
    price: "$150",
  },

  basic: {
    name: "Basic",
    subtitle: "Physical Print Cover (Paperback Only)",
    details: [
      "2 cover studies\nstock image",
      "3 rounds of revisions",
      "3D single & stack\nbook presentation",
      "Preparation of press\nready files (PDF)",
      "Source file (PSD/AI)",
      "3-4 days delivery",
    ],
    price: "$200",
  },

  premium: {
    name: "Premium",
    subtitle: "eBook + Print Cover Design (Paperback)",
    details: [
      "2 cover studies\nstock image",
      "4 rounds of revisions",
      "3D single & stack\nbook presentation",
      "Preparation of press\nready files (JPG/PNG/PDF)",
      "Source file (PSD/AI)",
      "4-5 days delivery",
    ],
    price: "$300",
  },

  business: {
    name: "Business",
    subtitle: "eBook & Print Cover Design + Book Layout",
    details: [
      "3 cover studies\nstock image",
      "5 rounds of revisions",
      "3D single & stack\nbook presentation",
      "Text book layout design\n(200 pages) with\n5 rounds of revisions",
      "Preparation of press\nready files (JPG/PNG/PDF)",
      "Source file (PSD/AI)",
      "4-5 days delivery",
    ],
    price: "$500",
  },
};

/* =========================================================
   SINGLE PRICING CARD COMPONENT
   ========================================================= */

const PricingCard = ({ plan, onStartProject }) => {
  if (!plan) return null;

  return (
    <div className="pricing-plan-card">
      {/* PLAN NAME & SUBTITLE */}
      <div>
        <h3 className="pricing-plan-name">{plan.name}</h3>
        <p className="pricing-plan-subtitle">{plan.subtitle}</p>
      </div>

      {/* DETAILS STACK */}
      <div className="pricing-details-container">
        {plan.details.map((detail, index) => (
          <p key={`${plan.name}-${index}`} className="pricing-detail-text">
            {detail}
          </p>
        ))}
      </div>

      {/* PRICE NUMBER */}
      <div className="pricing-price-container">
        <p className="pricing-price-text">{plan.price}</p>
      </div>

      {/* START A PROJECT BUTTON */}
      <div className="pricing-button-container">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.nativeEvent) {
              e.nativeEvent.stopImmediatePropagation();
            }
            if (onStartProject) {
              onStartProject(e);
            }
          }}
          className="pricing-start-button"
        >
          START A PROJECT
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   PAGE CONTENT WRAPPER WITH CONTINUOUS GOLD LINE
   ========================================================= */

const PricingContent = ({
  plan,
  isLeft = true,
  pageNumber = null,
  onStartProject = null,
}) => {
  return (
    <>
      <style>{pricingResponsiveStyle}</style>
      <div className={`pricing-page-container ${isLeft ? "pricing-page-left" : "pricing-page-right"}`}>
        {/* CONTINUOUS HEADER MATCHING REFERENCE IMAGE */}
        {isLeft ? (
          <div className="pricing-header-left">
            <h2 className="pricing-title">Pricing</h2>
            <div className="pricing-gold-line" />
          </div>
        ) : (
          <div className="pricing-header-right">
            <div className="pricing-gold-line" />
            {pageNumber && <span className="pricing-page-number">{pageNumber}</span>}
          </div>
        )}

        {/* PLAN CARD */}
        <PricingCard plan={plan} onStartProject={onStartProject} />
      </div>
    </>
  );
};

/* =========================================================
   MAIN PRICING COMPONENT
   ========================================================= */

export default function Pricing({
  plan = null,
  isLeft = true,
  section = null,
  pricingSection = null,
  onStartProject = null,
}) {
  const activeSection = section || pricingSection;

  /* SPREAD 1 LEFT: STARTER */
  if (activeSection === 1) {
    return (
      <PricingContent
        plan={pricingPlans.starter}
        isLeft={true}
        pageNumber={null}
        onStartProject={onStartProject}
      />
    );
  }

  /* SPREAD 1 RIGHT: BASIC */
  if (activeSection === 2) {
    return (
      <PricingContent
        plan={pricingPlans.basic}
        isLeft={false}
        pageNumber="01"
        onStartProject={onStartProject}
      />
    );
  }

  /* SPREAD 2 LEFT: PREMIUM */
  if (activeSection === 3) {
    return (
      <PricingContent
        plan={pricingPlans.premium}
        isLeft={true}
        pageNumber={null}
        onStartProject={onStartProject}
      />
    );
  }

  /* SPREAD 2 RIGHT: BUSINESS */
  if (activeSection === 4) {
    return (
      <PricingContent
        plan={pricingPlans.business}
        isLeft={false}
        pageNumber="02"
        onStartProject={onStartProject}
      />
    );
  }

  /* DIRECT PLAN SUPPORT */
  if (plan && pricingPlans[plan]) {
    const isPlanLeft = plan === "starter" || plan === "premium";
    let pageNum = null;
    if (plan === "basic") pageNum = "01";
    if (plan === "business") pageNum = "02";

    return (
      <PricingContent
        plan={pricingPlans[plan]}
        isLeft={isPlanLeft}
        pageNumber={pageNum}
        onStartProject={onStartProject}
      />
    );
  }

  /* DEFAULT FALLBACK */
  return (
    <PricingContent
      plan={isLeft ? pricingPlans.starter : pricingPlans.basic}
      isLeft={isLeft}
      pageNumber={!isLeft ? "01" : null}
      onStartProject={onStartProject}
    />
  );
}

export { pricingPlans, PricingCard, PricingContent };