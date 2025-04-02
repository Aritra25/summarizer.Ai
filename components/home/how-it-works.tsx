import {
  BrainCircuit,
  FileOutput,
  FileText,
  MoveRight,
  Pizza,
} from "lucide-react";
import { ReactNode } from "react";
import { MotionDiv, MotionH2, MotionH3 } from "../common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: (
      <FileText
        size={64}
        strokeWidth={1.5}
        className="text-red-500 bg-red-100"
      />
    ),
    label: "Upload your PDF",
    description: "Simply drag and drop your PDF file here or click to upload",
  },
  {
    icon: (
      <BrainCircuit
        size={64}
        strokeWidth={1.5}
        className="text-red-500 bg-red-100"
      />
    ),
    label: "AI Analysis",
    description:
      "Our advanced AI processes and analyses your document instantly",
  },
  {
    icon: (
      <FileOutput
        size={64}
        strokeWidth={1.5}
        className="text-red-500 bg-red-100"
      />
    ),
    label: "Get your summary",
    description: "Receive your concise summary in seconds",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      {/* <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:pt-12 lg:px-8 relative z-10 text-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Watch how <span className="text-red-500">Sommaire</span> transforms{" "}
              <span className="text-red-500">this Next.js course PDF</span> into an{" "}
              <span className="text-teal-500">easy-to-read summary!</span>
            </h2>
          </div>
        </div> */}

      {/* Background Decoration */}
      <div
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="relative w-[36.125rem] h-[36.125rem] sm:w-[40.1875rem] sm:h-[40.1875rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 14.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2.4%, 72.5% 42.5%, 70.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* How It Works Text Section */}
      <div className="text-center mb-16 mt-12">
        <MotionH2
          className="inline-block text-red-500 font-bold text-3xl mx-auto max-w-2xl mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          HOW IT WORKS
        </MotionH2>
        <MotionH3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl max-w-2xl mx-auto font-bold mb-8"
        >
          Transform any PDF into an easy-to-digest summary in three simple steps
        </MotionH3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <MotionDiv
              // variants={itemVariants}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex items-stretch relative"
              key={idx}
            >
              <StepItem key={idx} {...step} />
              {idx < steps.length - 1 && (
                <div className="hidden md:block top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-400"
                  />
                </div>
              )}
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: Step) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 group transition-colors w-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-500">{icon}</div>
        </div>
        <div className="flex flex-col gap-1 flex-1 justify-between">
          <div className="text-center">
            <h4 className="text-xl font-bold text-center">{label}</h4>
            <p className="text-sm text-gray-600 text-center">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
