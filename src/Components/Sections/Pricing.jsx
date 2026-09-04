import React from "react";

/* =========================================================
   PRICING DATA
   ========================================================= */

const pricingPlans = {
  starter: {
    name: "starter",
    subtitle: "Digital eBook Cover\n(Kindle Only)",
    details: [
      "3 cover studies\nstock image / AI",
      "2 rounds of revisions",
      "3D single & stack\nbook presentation",
      "preparation of press\nready files (JPG/PNG)",
      "source file (PSD/AI)",
      "2-3 days delivery",
    ],
    price: "$150",
  },

  basic: {
    name: "basic",
    subtitle: "Physical Print Cover\n(Paperback Only)",
    details: [
      "2 cover studies\nstock image",
      "3 rounds of revisions",
      "3D single & stack\nbook presentation",
      "preparation of press\nready files (PDF)",
      "source file (PSD/AI)",
      "3-4 days delivery",
    ],
    price: "$200",
  },

  premium: {
    name: "premium",
    subtitle: "eBook + Print Cover\nDesign (Paperback)",
    details: [
      "2 cover studies\nstock image",
      "4 rounds of revisions",
      "3D single & stack\nbook presentation",
      "preparation of press\nready files (JPG/PNG/PDF)",
      "source file (PSD/AI)",
      "4-5 days delivery",
    ],
    price: "$300",
  },

  business: {
    name: "business",
    subtitle: "eBook & Print Cover\nDesign + Book Layout",
    details: [
      "3 cover studies\nstock image",
      "5 rounds of revisions",
      "3D single & stack\nbook presentation",
      "text book layout design\n(200 pages) with\n5 rounds of revisions",
      "preparation of press\nready files (JPG/PNG/PDF)",
      "source file (PSD/AI)",
      "4-5 days delivery",
    ],
    price: "$500",
  },
};


/* =========================================================
   PAGE MAIN HEADING
   ========================================================= */

const PricingPageHeading = () => {
  return (
    <div
      className="
        w-full
        shrink-0
        px-3
        pt-3
        pb-1
        sm:px-5
        sm:pt-4
        sm:pb-1
        md:px-6
        md:pt-4
        md:pb-2
      "
    >
      {/* PAGE HEADING - LOWERCASE WITHOUT UNDERLINE */}
      <h2
        className="
          m-0
          text-left
          font-['Helvetica_Light']
          font-light
          lowercase
          leading-none
          tracking-[0.5px]
          text-[#1a1a1a]
          text-[16px]
          xs:text-[17px]
          sm:text-[19px]
          md:text-[21px]
          lg:text-[22px]
        "
      >
        pricing / packages
      </h2>

      <div className="mt-2 h-[2px] w-10 bg-[#c8a951]" />
    </div>
  );
};


/* =========================================================
   PLAN CONTENT
   ========================================================= */

const PricingCard = ({ plan, compact = false, onStartProject }) => {
  if (!plan) return null;

  /* Compact sizing for 4-plan spreads or 7-detail business plan */
  const isBusiness = compact && plan.details.length > 6;

  const sz = {
    /* Plan name — "starter", "basic" etc. */
    name: isBusiness
      ? "text-[22px] xs:text-[24px] sm:text-[27px] md:text-[30px]"
      : compact
        ? "text-[24px] xs:text-[26px] sm:text-[30px] md:text-[33px]"
        : "text-[28px] xs:text-[30px] sm:text-[34px] md:text-[38px]",
    /* Subtitle under gold line */
    subtitle: isBusiness
      ? "text-[7px] xs:text-[7.5px] sm:text-[8px] md:text-[8.5px]"
      : compact
        ? "text-[7.5px] xs:text-[8px] sm:text-[8.5px] md:text-[9px]"
        : "text-[8px] xs:text-[8.5px] sm:text-[9px] md:text-[9.5px]",
    /* Feature detail rows — very small, compact */
    detailText: isBusiness
      ? "text-[3px] xs:text-[3.5px] sm:text-[4px] md:text-[4.5px]"
      : compact
        ? "text-[3.5px] xs:text-[4px] sm:text-[4.5px] md:text-[5px]"
        : "text-[4px] xs:text-[4.5px] sm:text-[5px] md:text-[5.5px]",
    /* Big price number — larger */
    price: isBusiness
      ? "text-[40px] xs:text-[44px] sm:text-[48px] md:text-[52px]"
      : compact
        ? "text-[44px] xs:text-[48px] sm:text-[52px] md:text-[56px]"
        : "text-[50px] xs:text-[54px] sm:text-[58px] md:text-[62px]",
  };

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        w-full
        flex-col
        items-center
        justify-start
        overflow-hidden
        bg-transparent
        px-2
        pb-2
        pt-1
      "
    >
      {/* =================================================
          PLAN NAME
         ================================================= */}
      <h3
        className={`
          m-0
          w-full
          text-center
          font-['Helvetica_Light']
          font-light
          lowercase
          leading-none
          tracking-wide
          text-[#b39a69]
          ${sz.name}
        `}
      >
        {plan.name}
      </h3>

      {/* GOLD LINE */}
      <div
        className="
          mt-1.5
          mb-1.5
          h-[1px]
          w-[55%]
          shrink-0
          bg-[#b39a69]
        "
      />

      {/* SUBTITLE */}
      <p
        className={`
          m-0
          w-full
          whitespace-pre-line
          text-center
          font-['Helvetica_Light']
          font-light
          leading-[1.2]
          text-[#b39a69]
          ${sz.subtitle}
        `}
      >
        {plan.subtitle}
      </p>

      {/* =================================================
          DETAILS — tight stack, small text
         ================================================= */}
      <div
        className="
          mt-2
          flex
          w-full
          shrink-0
          flex-col
          items-center
          gap-[2px]
          px-1
        "
      >
        {plan.details.map((detail, index) => (
          <p
            key={`${plan.name}-${index}`}
            className={`
              m-0
              w-full
              whitespace-pre-line
              text-center
              font-['Helvetica_Light']
              font-light
              leading-[1.15]
              text-[#666666]
              ${sz.detailText}
            `}
          >
            {detail}
          </p>
        ))}
      </div>

      {/* =================================================
          PRICE
         ================================================= */}
      <div className="mt-2 w-full text-center">
        <p
          className={`
            m-0
            w-full
            text-center
            font-['Helvetica_Light']
            font-light
            leading-none
            tracking-wide
            text-[#b39a69]
            ${sz.price}
          `}
        >
          {plan.price}
        </p>
      </div>

      {/* =================================================
          BUTTON
         ================================================= */}
      <div className="mt-2 flex w-full shrink-0 items-center justify-center pb-1">
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
          className="
            block
            shrink-0
            w-[55%]
            border
            border-[#b39a69]
            bg-transparent
            py-[10px]
            sm:py-[12px]
            text-center
            font-['Helvetica_Light']
            font-light
            uppercase
            leading-none
            tracking-[1.5px]
            text-[#b39a69]
            transition-all
            duration-200
            hover:bg-[#b39a69]
            hover:text-white
            active:scale-95
            text-[9px]
            xs:text-[9.5px]
            sm:text-[10px]
            md:text-[10.5px]
            lg:text-[11px]
          "
        >
        START A PROJECT
        </button>
      </div>
    </div>
  );
};


/* =========================================================
   CONTENT WRAPPER
   ========================================================= */

const PricingContent = ({
  plan,
  showPageHeading = false,
  compact = false,
  pageNumber = null,
  onStartProject = null,
}) => {
  return (
    <div
      className="
        flex
        h-full
        min-h-0
        w-full
        flex-col
        overflow-hidden
        bg-transparent
        relative
      "
    >

      {/* =================================================
          PAGE NUMBER - TOP RIGHT CORNER (Only on right pages)
         ================================================= */}

      {pageNumber && (
        <div
          className="
            absolute
            right-3
            top-1
            z-20
            text-[20px]
            font-light
            tracking-[0.5px]
            text-black
            sm:right-4
            sm:top-2
          "
          style={{ fontFamily: '"Helvetica Light"' }}
        >
          {pageNumber}
        </div>
      )}

      {/* =================================================
          PAGE HEADING
         ================================================= */}

      <div className="w-full shrink-0">
        {showPageHeading ? (
          <PricingPageHeading />
        ) : (
          /*
            Invisible heading spacer.
            Right page ka structure left page ke heading
            ke equal height ko maintain karta hai.
          */
          <div
            className="
              w-full
              shrink-0
              px-3
              pt-3
              pb-1
              sm:px-5
              sm:pt-4
              sm:pb-1
              md:px-6
              md:pt-4
              md:pb-2
            "
          >
            <h2
              className="
                invisible
                m-0
                text-left
                font-['Helvetica_Light']
                font-light
                lowercase
                leading-none
                tracking-[0.5px]
                text-[22px]
                xs:text-[18px]
                sm:text-[20px]
                md:text-[22px]
                lg:text-[24px]
              "
            >
              pricing / packages
            </h2>
          </div>
        )}
      </div>


      {/* =================================================
          PLAN AREA
         ================================================= */}

      <div
        className="
          min-h-0
          flex-1
          w-full
          overflow-hidden
          px-1
          pt-0
          pb-0
          xs:px-1
          xs:pt-0
          xs:pb-0
          sm:px-2
          sm:pt-0
          sm:pb-0
          md:px-3
          md:pt-0
          md:pb-0
          lg:px-4
          lg:pt-0
          lg:pb-0
        "
      >
        <PricingCard plan={plan} compact={compact} onStartProject={onStartProject} />
      </div>

    </div>
  );
};


/* =========================================================
   MAIN PRICING COMPONENT
   ========================================================= */

export default function Pricing({
  plan = null,
  isLeft = true,
  section = null,
  onStartProject = null,
}) {

  /* =======================================================
     PAGE 1 LEFT
     STARTER
     ======================================================= */

  if (section === 1) {
    return (
      <PricingContent
        plan={pricingPlans.starter}
        showPageHeading={true}
        pageNumber={null}
        onStartProject={onStartProject}
      />
    );
  }


  /* =======================================================
     PAGE 1 RIGHT
     BASIC
     ======================================================= */

  if (section === 2) {
    return (
      <PricingContent
        plan={pricingPlans.basic}
        showPageHeading={false}
        pageNumber="01"
        onStartProject={onStartProject}
      />
    );
  }


  /* =======================================================
     PAGE 2 LEFT
     PREMIUM
     ======================================================= */

  if (section === 3) {
    return (
      <PricingContent
        plan={pricingPlans.premium}
        showPageHeading={true}
        compact={true}
        pageNumber={null}
        onStartProject={onStartProject}
      />
    );
  }


  /* =======================================================
     PAGE 2 RIGHT
     BUSINESS
     ======================================================= */

  if (section === 4) {
    return (
      <PricingContent
        plan={pricingPlans.business}
        showPageHeading={false}
        compact={true}
        pageNumber="02"
        onStartProject={onStartProject}
      />
    );
  }


  /* =======================================================
     DIRECT PLAN SUPPORT
     ======================================================= */

  if (plan) {
    const selectedPlan = pricingPlans[plan];

    if (selectedPlan) {
      const shouldShowHeading =
        plan === "starter" ||
        plan === "premium";

      // Determine page number for right pages
      let pageNum = null;
      if (plan === "basic") pageNum = "01";
      if (plan === "business") pageNum = "02";

      return (
        <PricingContent
          plan={selectedPlan}
          showPageHeading={shouldShowHeading}
          pageNumber={pageNum}
          onStartProject={onStartProject}
        />
      );
    }
  }


  /* =======================================================
     DEFAULT
     ======================================================= */

  return (
    <PricingContent
      plan={
        isLeft
          ? pricingPlans.starter
          : pricingPlans.basic
      }
      showPageHeading={isLeft}
      pageNumber={!isLeft ? "01" : null}
      onStartProject={onStartProject}
    />
  );
};


/* =========================================================
   EXPORTS
   ========================================================= */

export {
  pricingPlans,
  PricingCard,
  PricingPageHeading,
  PricingContent,
};