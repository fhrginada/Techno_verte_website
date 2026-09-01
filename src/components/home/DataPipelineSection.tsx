"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { Satellite, Droplets, Cpu, CheckCircle2 } from "lucide-react";

type Step = {
  id: string;
  icon: ElementType;
  label: string;
  description?: string;
};

type DataPipelineSectionProps = {
  title?: string;
  eyebrow?: string;
  steps?: Step[];
};

/**
 * DataPipelineSection — premium dark enterprise card variant
 *
 * The layout and motion logic stays intact; this update focuses purely on the
 * visual treatment to create a more elevated “enterprise intelligence” feel.
 */
export default function DataPipelineSection({
  title = "Data In. Decisions Out.",
  eyebrow = "How our pipeline works",
  steps = [
    { id: "sat", icon: Satellite, label: "Satellite", description: "Live field imagery" },
    { id: "soil", icon: Droplets, label: "Soil & Water", description: "Telemetry and sensors" },
    { id: "ai", icon: Cpu, label: "AI Analysis", description: "Model-driven insights" },
    { id: "dec", icon: CheckCircle2, label: "Decision", description: "Actionable recommendations" },
  ],
}: DataPipelineSectionProps) {
  const prefersReduced = useReducedMotion();
  const count = steps.length;

  const centerPct = (i: number) => ((i + 0.5) / count) * 100;
  const firstCenter = centerPct(0);
  const lastCenter = centerPct(count - 1);
  const lineLeftPct = firstCenter;
  const lineWidthPct = lastCenter - firstCenter;

  const totalLineDur = 1.4;
  const nodeDur = 0.35;

  return (
    <section
      className="relative w-full bg-[#0B1F14] bg-center bg-cover bg-scroll px-5 md:px-8 lg:px-12 xl:px-20 py-14 md:py-20 lg:py-28 text-[#F3F7F3]"
      style={{ backgroundImage: "url('/img/tree_transparent.png')" }}
      aria-labelledby="pipeline-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(160,255,180,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 35%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 35%, transparent 85%)",
        }}
      />

      {/* Dark overlay to keep text readable */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.66), rgba(0,10,0,0.55))" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 top-8 h-56 w-56 rounded-full opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(126,217,87,0.22) 0%, transparent 72%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-4 h-52 w-52 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(126,217,87,0.14) 0%, transparent 72%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full opacity-35 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(126,217,87,0.16) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <p className="mb-2 text-[12px] md:text-[13px] font-medium uppercase tracking-[0.18em] text-[#A7C4AB]">{eyebrow}</p>
        <h2 id="pipeline-title" className="font-heading text-[1.875rem] md:text-[2.25rem] lg:text-[3rem] font-bold leading-[1.08] tracking-[-0.04em] text-[#F2F8F3]">
          {title}
        </h2>

        <div
          className="relative mt-8 md:mt-10 lg:mt-12 rounded-[16px] border border-[#1E3A28] bg-[#12291C]/90 p-4 md:p-6 lg:p-12 text-[#F3F7F3] shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-[16px]"
          style={{ WebkitBackdropFilter: "blur(16px)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[20px]"
            style={{
              background: "linear-gradient(135deg, rgba(126,217,87,0.08), rgba(126,217,87,0.01) 28%, rgba(126,217,87,0.03) 72%, rgba(126,217,87,0.06))",
            }}
          />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#D8FDE1]/40 to-transparent" />
          <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(126,217,87,0.22) 0%, transparent 72%)" }} />
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-[70px]" style={{ background: "radial-gradient(circle, rgba(126,217,87,0.18) 0%, transparent 72%)" }} />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-28 w-28 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(126,217,87,0.14) 0%, transparent 70%)" }} />

          <div className="relative hidden md:block">
            <div className="relative h-20">
              <div
                className="absolute top-1/2 h-px -translate-y-1/2 bg-[#1E3A28]"
                style={{ left: `${lineLeftPct}%`, width: `${lineWidthPct}%` }}
              />
              <motion.div
                className="absolute top-1/2 h-px -translate-y-1/2 origin-left"
                style={{
                  left: `${lineLeftPct}%`,
                  width: `${lineWidthPct}%`,
                  background: "linear-gradient(90deg, rgba(126,217,87,0.34), rgba(126,217,87,0.9) 30%, rgba(126,217,87,0.54) 100%)",
                  boxShadow: "0 0 18px rgba(126,217,87,0.22)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: prefersReduced ? 0 : totalLineDur, ease: "easeInOut", delay: 0.15 }}
              />
              {!prefersReduced && (
                <motion.div
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#7ED957]"
                  style={{ left: `${lineLeftPct}%`, boxShadow: "0 0 18px rgba(126,217,87,0.5)" }}
                  initial={{ left: `${lineLeftPct}%`, opacity: 0 }}
                  animate={{ left: `${lastCenter}%`, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: totalLineDur, ease: "linear", delay: 0.15, times: [0, 0.05, 0.95, 1] }}
                />
              )}

              <div className="grid h-full" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const activateDelay = prefersReduced ? 0 : 0.15 + (idx / (count - 1)) * totalLineDur;
                  const isAi = step.id === "ai";
                  return (
                    <div key={step.id} className="flex items-center justify-center">
                      <div
                        className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#244935] bg-[radial-gradient(circle_at_30%_30%,rgba(126,217,87,0.12),rgba(18,41,28,0.96)_45%,rgba(11,31,20,1)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                        style={{
                          boxShadow: isAi
                            ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(126,217,87,0.14), 0 18px 32px rgba(2,8,5,0.38), 0 0 16px rgba(126,217,87,0.18)"
                            : "inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 28px rgba(2,8,5,0.35)",
                        }}
                      >
                        <div className="pointer-events-none absolute inset-[1px] rounded-full border border-white/4" />
                        <motion.div
                          className="relative z-10 text-[#8FE77E]"
                          initial={{ scale: 1 }}
                          animate={prefersReduced ? { scale: 1 } : { scale: [1, 1.12, 1] }}
                          transition={{ duration: nodeDur, delay: activateDelay }}
                        >
                          <Icon size={24} />
                        </motion.div>
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full"
                          initial={{ boxShadow: "0 0 0 rgba(126,217,87,0)" }}
                          animate={{ boxShadow: isAi ? "0 0 18px rgba(126,217,87,0.22)" : "0 0 12px rgba(126,217,87,0.18)" }}
                          transition={{ duration: nodeDur, delay: activateDelay }}
                        />
                        {isAi && !prefersReduced && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 rounded-full"
                            animate={{
                              boxShadow: [
                                "0 0 0 rgba(126,217,87,0.08)",
                                "0 0 18px rgba(126,217,87,0.28)",
                                "0 0 0 rgba(126,217,87,0.08)",
                              ],
                            }}
                            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: activateDelay }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 grid" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
              {steps.map((step, idx) => {
                const activateDelay = prefersReduced ? 0 : 0.15 + (idx / (count - 1)) * totalLineDur;
                return (
                  <div key={step.id} className="flex flex-col items-center px-2 text-center">
                    <motion.p
                      className="text-[0.95rem] font-medium text-[#F2F8F3]"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: nodeDur, delay: activateDelay + 0.05 }}
                    >
                      {step.label}
                    </motion.p>
                    <motion.p
                      className="mt-1 text-sm text-[#A7C4AB]"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: nodeDur, delay: activateDelay + 0.08 }}
                    >
                      {step.description}
                    </motion.p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative flex flex-col gap-5 md:hidden">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const activateDelay = prefersReduced ? 0 : 0.15 + idx * 0.25;
              const isLast = idx === steps.length - 1;
              const isAi = step.id === "ai";
              return (
                <div key={step.id} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#244935] bg-[radial-gradient(circle_at_30%_30%,rgba(126,217,87,0.12),rgba(18,41,28,0.96)_45%,rgba(11,31,20,1)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                      style={{
                        boxShadow: isAi
                          ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(126,217,87,0.12), 0 12px 24px rgba(2,8,5,0.3), 0 0 14px rgba(126,217,87,0.18)"
                          : "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 20px rgba(2,8,5,0.3)",
                      }}
                    >
                      <motion.div
                        className="relative z-10 text-[#8FE77E]"
                        initial={{ scale: 1 }}
                        animate={prefersReduced ? { scale: 1 } : { scale: [1, 1.12, 1] }}
                        transition={{ duration: nodeDur, delay: activateDelay }}
                      >
                        <Icon size={22} />
                      </motion.div>
                      {isAi && !prefersReduced && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full"
                          animate={{
                            boxShadow: [
                              "0 0 0 rgba(126,217,87,0.08)",
                              "0 0 18px rgba(126,217,87,0.28)",
                              "0 0 0 rgba(126,217,87,0.08)",
                            ],
                          }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: activateDelay }}
                        />
                      )}
                    </div>
                    {!isLast && (
                      <div className="relative my-1 w-px flex-1 bg-[#1E3A28]">
                        <motion.div
                          className="absolute left-0 top-0 w-px origin-top"
                          style={{ height: "100%", background: "linear-gradient(180deg, rgba(126,217,87,0.32), rgba(126,217,87,0.9))" }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: prefersReduced ? 0 : 0.5, delay: activateDelay + 0.1 }}
                        />
                      </div>
                    )}
                  </div>

                  <motion.div
                    className="pb-8"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: nodeDur, delay: activateDelay + 0.05 }}
                  >
                    <p className="font-medium text-[#F2F8F3]">{step.label}</p>
                    <p className="mt-1 text-[14px] leading-[1.6] text-[#A7C4AB]">{step.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}