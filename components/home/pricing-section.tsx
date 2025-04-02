// import { cn } from "@/lib/utils";
// import { isDev } from "@/utils/helpers";
// import { ArrowRight, CheckIcon } from "lucide-react";
// import Link from "next/link";
// import { MotionDiv } from "../common/motion-wrapper";

// type PriceType = {
//   id: string;
//   name: string;
//   price: number;
//   items: string[];
//   paymentLink: string;
//   priceId: string;
//   description: string;
// };

// const ListVariants = {
//   hidden: { opacity: 0, x: -20 },
//   visible: { opacity: 1, x: 0, transition: {
//     type: 'spring',
//     damping: 20, 
//     stiffness: 100
//   } },
// };

// export const pricingPlans = [
//   {
//     id: "basic",
//     name: "Basic",
//     description: "Perfect for occasional users",
//     price: 9,
//     items: [
//       "5 PDF summaries per month",
//       "standard processing time",
//       "Email support",
//     ],
//     paymentLink: isDev ? "https://buy.stripe.com/test_5kA4kh53E57x5Og5kk" : "",
//     priceId: isDev ? "price_1R7EwY086TCWijXj1twoWCAE" : "",
//   },
//   {
//     // id: "pro",
//     name: "Pro",
//     description: "Perfect for professional users",
//     price: 19,
//     items: [
//       "Unlimited PDF summaries",
//       "Priority processing",
//       "24/7 priority support",
//       "Markdown Export",
//     ],
//     id: "Pro",
//     paymentLink: isDev ? "https://buy.stripe.com/test_14k041fIi1Vl90sbIJ" : "",
//     priceId: isDev ? "price_1R7EyY086TCWijXjydvPjQQR" : "",
//   },
// ];

// export default function PricingSection() {
//   return (
//     <section className="relative overflow-hidden" id="pricing">
//       <div className="mx-auto py-12 lg:py-24 max-w-5xl sm:px-6 px-4 lg:px-8 lg:pt-12">
//         <div className="flex items-center justify-center w-full pb-12">
//           <h2 className="text-xl font-bold uppercase mb-8 text-rose-500">
//             Pricing
//           </h2>
//         </div>
//         <div className="flex relative flex-col justify-center lg:flex-row items-center lg:items-stretch gap-8">
//           {pricingPlans.map((plan) => (
//             <PricingCard key={plan.id} {...plan} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// const PricingCard = ({
//   id,
//   name,
//   price,
//   items,
//   paymentLink,
//   priceId,
//   description,
// }: PriceType) => {
//   return (
//     <MotionDiv
//       variants={ListVariants}
//       whileHover={{ scale: 1.02 }}

//       className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300"
//     >
//       <div
//         className={cn(
//           "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] rounded-xl border-gray-500/20",
//           id === "pro" && "border-rose-500 gap-5 border-2"
//         )}
//       >
//         <MotionDiv variants={ListVariants} className="flex justify-between items-center gap-4 ">
//           <div className="">
//             <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
//             <p className="text-base-content/80 mt-2">{description}</p>
//           </div>
//         </MotionDiv>
//         <MotionDiv variants={ListVariants} className="flex gap-2">
//           <p className="text-5xl font-extrabold tracking-tight">${price}</p>
//           <div className="">
//             <p className="text-xs uppercase font-semibold">USD</p>
//             <p className="text-xs">/month</p>
//           </div>
//         </MotionDiv>
//         <MotionDiv variants={ListVariants} className="space-y-2.5 leading-relaxed text-base flex-1">
//           {items.map((item) => (
//             <li key={item} className="flex items-center gap-2">
//               <CheckIcon size={18} />
//               {item}
//             </li>
//           ))}
//         </MotionDiv>
//         <MotionDiv variants={ListVariants} className="space-y-2 w-full justify-center">
//           <Link
//             href={paymentLink}
//             className={cn(
//               `w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white py-2 border-2`,
//               id === "pro"
//                 ? "border-rose-900"
//                 : "border-rose-100 from-rose-400 to-rose-500"
//             )}
//           >
//             Buy Now <ArrowRight size={18} />
//           </Link>
//         </MotionDiv>
//       </div>
//     </MotionDiv>
//   );
// };

import { cn } from "@/lib/utils";
import { isDev } from "@/utils/helpers";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { MotionDiv } from "../common/motion-wrapper";

type PriceType = {
  id: string;
  name: string;
  price: number;
  items: string[];
  paymentLink: string;
  priceId: string;
  description: string;
};

const ListVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

export const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for occasional users",
    price: 9,
    items: [
      "5 PDF summaries per month",
      "Standard processing time",
      "Email support",
    ],
    paymentLink: isDev
      ? "https://buy.stripe.com/test_5kA4kh53E57x5Og5kk"
      : "",
    priceId: isDev ? "price_1R7EwY086TCWijXj1twoWCAE" : "",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Perfect for professional users",
    price: 19,
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: isDev
      ? "https://buy.stripe.com/test_14k041fIi1Vl90sbIJ"
      : "",
    priceId: isDev ? "price_1R7EyY086TCWijXjydvPjQQR" : "",
  },
];

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="mx-auto py-12 lg:py-24 max-w-5xl sm:px-6 px-4 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="text-xl font-bold uppercase mb-8 text-rose-500">Pricing</h2>
        </div>
        <div className="flex relative flex-col justify-center lg:flex-row items-center lg:items-stretch gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

const PricingCard = ({ id, name, price, items, paymentLink, description }: PriceType) => {
  return (
    <MotionDiv variants={ListVariants} whileHover={{ scale: 1.02 }}
      className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] rounded-xl border-gray-500/20",
          id.toLowerCase() === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <MotionDiv variants={ListVariants} className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </MotionDiv>
        <MotionDiv variants={ListVariants} className="flex gap-2">
          <p className="text-5xl font-extrabold tracking-tight">${price}</p>
          <div>
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </MotionDiv>
        <MotionDiv variants={ListVariants} className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckIcon size={18} />
              {item}
            </li>
          ))}
        </MotionDiv>
        <MotionDiv variants={ListVariants} className="space-y-2 w-full justify-center">
          <Link href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white py-2 border-2",
              id.toLowerCase() === "pro" ? "border-rose-900" : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now <ArrowRight size={18} />
          </Link>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};
