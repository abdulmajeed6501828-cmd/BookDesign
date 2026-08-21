import React from "react";

const pricingPlans = {
  left: [
    {
      name: "starter",
      subtitle: "eBook\n(Kindle) Cover Only",
      details: [
        "2 cover studies\nstock image / AI",
        "2 rounds of revisions",
        "3D single & stack\nbook presentation",
        "preparation of press\nready files (JPG/PNG)",
        "source file (PSD/AI)",
        "2-3 days delivery",
      ],
      price: "$150",
    },
    {
      name: "basic",
      subtitle: "Print Cover Design\n(Paperback) Only",
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
  ],

  right: [
    {
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
    {
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
  ],
};

/* =========================================================
   Pricing Card
   ========================================================= */

const PricingCard = ({ plan, isLeft }) => {
  return (
    <div
      className="
        relative
        h-full
        min-h-0
        w-full
        overflow-visible
      "
    >
      {/* Torn Paper Background */}
      <div
        className="
          absolute
          inset-0
          h-full
          w-full
          bg-[#d5d5d5]
        "
        style={{
          clipPath:
            "polygon(3% 0%, 97% 0%, 95% 3%, 99% 6%, 95% 9%, 99% 12%, 95% 15%, 99% 18%, 95% 21%, 99% 24%, 95% 27%, 99% 30%, 95% 33%, 99% 36%, 95% 39%, 99% 42%, 95% 45%, 99% 48%, 95% 51%, 99% 54%, 95% 57%, 99% 60%, 95% 63%, 99% 66%, 95% 69%, 99% 72%, 95% 75%, 99% 78%, 95% 81%, 99% 84%, 95% 87%, 99% 90%, 95% 93%, 99% 96%, 96% 100%, 4% 100%, 1% 96%, 5% 93%, 1% 90%, 5% 87%, 1% 84%, 5% 81%, 1% 78%, 5% 75%, 1% 72%, 5% 69%, 1% 66%, 5% 63%, 1% 60%, 5% 57%, 1% 54%, 5% 51%, 1% 48%, 5% 45%, 1% 42%, 5% 39%, 1% 36%, 5% 33%, 1% 30%, 5% 27%, 1% 24%, 5% 21%, 1% 18%, 5% 15%, 1% 12%, 5% 9%, 1% 6%, 5% 3%)",
        }}
      />

      {/* Card Content */}
      <div
        className={`
          relative
          z-10
          flex
          h-full
          min-h-0
          w-full
          flex-col
          items-center
          text-center
          ${
            isLeft
              ? "px-1 py-1.5"
              : "px-0.5 py-0.5"
          }
        `}
      >
        {/* Plan Name */}
        <h3
          className={`
            m-0
            shrink-0
            font-normal
            lowercase
            text-[#3B3B3B]
            ${
              isLeft
                ? "text-[15px] leading-[17px] sm:text-[16px] sm:leading-[18px] md:text-[17px] md:leading-[19px]"
                : "text-[8px] leading-[9px] sm:text-[9px] sm:leading-[10px] md:text-[10px] md:leading-[11px]"
            }
          `}
        >
          {plan.name}
        </h3>

        {/* Subtitle */}
        <p
          className={`
            m-0
            w-full
            shrink-0
            whitespace-pre-line
            font-light
            text-[#b39a69]
            ${
              isLeft
                ? "mt-0.5 min-h-[12px] px-0.5 text-[4px] leading-[5px] sm:text-[4.5px] sm:leading-[5.5px] md:text-[5px] md:leading-[6px]"
                : "mt-0 min-h-[6px] px-0 text-[1.8px] leading-[2.2px] sm:text-[2px] sm:leading-[2.5px] md:text-[2.2px] md:leading-[2.7px]"
            }
          `}
        >
          {plan.subtitle}
        </p>

        {/* Details */}
        <div
          className={`
            flex
            min-h-0
            w-full
            flex-1
            flex-col
            items-center
            justify-start
            overflow-hidden
            ${
              isLeft
                ? "mt-1"
                : "mt-0.5"
            }
          `}
        >
          {plan.details.map((detail, index) => (
            <p
              key={index}
              className={`
                m-0
                w-full
                shrink-0
                whitespace-pre-line
                text-center
                font-normal
                text-[#858585]
                ${
                  isLeft
                    ? "px-0.5 py-[1.5px] text-[3px] leading-[4px] sm:text-[3.2px] sm:leading-[4.2px] md:text-[3.5px] md:leading-[4.5px]"
                    : "px-0 py-[0.5px] text-[1.5px] leading-[2px] sm:text-[1.7px] sm:leading-[2.2px] md:text-[1.9px] md:leading-[2.4px]"
                }
              `}
            >
              {detail}
            </p>
          ))}
        </div>

        {/* Price + Button */}
        <div
          className={`
            flex
            shrink-0
            flex-col
            items-center
            justify-end
            ${
              isLeft
                ? "-translate-y-1 pb-0.5"
                : "-translate-y-1.5 pb-0"
            }
          `}
        >
          {/* Price */}
          <p
            className={`
              m-0
              font-normal
              tracking-wide
              text-[#b39a69]
              ${
                isLeft
                  ? "text-[22px] leading-[24px] sm:text-[23px] sm:leading-[25px] md:text-[24px] md:leading-[26px]"
                  : "text-[14px] leading-[15px] sm:text-[15px] sm:leading-[16px] md:text-[16px] md:leading-[17px]"
              }
            `}
          >
            {plan.price}
          </p>

          {/* Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
            }}
            className={`
              block
              shrink-0
              bg-white
              font-light
              italic
              text-[#b39a69]
              shadow-sm
              transition-opacity
              duration-200
              hover:opacity-90
              ${
                isLeft
                  ? "mt-0.5 min-w-[65px] px-3 py-[6px] text-[8px] leading-[9px] sm:min-w-[68px] sm:px-3.5 sm:py-[6px] sm:text-[8px] md:min-w-[70px] md:px-4 md:text-[8.5px]"
                  : "mt-0 min-w-[48px] px-1.5 py-[4px] text-[5px] leading-[6px] sm:min-w-[50px] sm:px-2 sm:py-[4px] sm:text-[5.5px] md:min-w-[52px] md:px-2 md:py-[6px] md:text-[6px] md:leading-[7px]"
              }
            `}
          >
            let's start
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   Pricing Page
   ========================================================= */

export default function Pricing({ isLeft }) {
  const plans = isLeft
    ? pricingPlans.left
    : pricingPlans.right;

  return (
    <div
      className="
        section-content
        relative
        flex
        h-full
        min-h-0
        w-full
        flex-col
        overflow-hidden
        bg-white
        text-[#1e150d]
      "
    >
      {/* Pricing Heading - LEFT PAGE ONLY */}
      {isLeft && (
        <h2
          className="
            m-0
            shrink-0
            px-3
            pt-0
            text-[18px]
            font-normal
            lowercase
            leading-[22px]
            tracking-wide
            text-[#292929]
            sm:px-4
            sm:text-[20px]
            sm:leading-[25px]
            md:px-5
            md:text-[22px]
            md:leading-[28px]
          "
        >
          pricing / packages
        </h2>
      )}

      {/* =====================================================
          SAME HEIGHT CONTAINER FOR BOTH LEFT & RIGHT PAGES
          ===================================================== */}
      <div
        className="
          grid
          h-full
          min-h-0
          w-full
          flex-1
          grid-cols-2
          items-stretch
          auto-rows-fr
          gap-1
          px-3
          pb-1
          pt-1
          sm:gap-1.5
          sm:px-4
          sm:pb-2
          md:gap-3
          md:px-5
          md:pb-3
        "
      >
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            isLeft={isLeft}
          />
        ))}
      </div>
    </div>
  );
}