"use client";

import React, { useRef, useState, useEffect } from "react";

interface WorkflowItem {
  id: string;
  label: string;
  title: string;
  description: string;
  cardTitle: string;
  cardSub: string;
  badge: string;
  steps: { label: string; sub: string; done?: boolean }[];
}

const WORKFLOW_ITEMS: WorkflowItem[] = [
  {
    id: "receivable",
    label: "Accounts Receivable",
    title: "Accounts Receivable",
    description:
      "From invoicing and customer portal submission all the way to cash application, Finzo makes sure your business gets paid on time, every time.",
    cardTitle: "AR Collection Agent",
    cardSub: "INV-2024-0147",
    badge: "Active",
    steps: [
      { label: "Parsed inbound email", sub: "From: ap@client.com — references PO-2024-7892", done: true },
      { label: "Matched to open invoice", sub: "Confidence: 98.2%", done: true },
      { label: "Reminder scheduled", sub: "Sends in 3 days if unpaid" },
    ],
  },
  {
    id: "payable",
    label: "Accounts Payable",
    title: "Accounts Payable",
    description:
      "Automates vendor bill intake, vendor back-and-forth, and GL coding routing, so bills are processed accurately without manual entry.",
    cardTitle: "Bill Processing",
    cardSub: "BILL-00291",
    badge: "Extracting",
    steps: [
      { label: "Bill received", sub: "vendor@supplier.com", done: true },
      { label: "GL coding suggested", sub: "AI-suggested — Job #4471" },
      { label: "Routed for approval", sub: "Pending: J. Rao" },
    ],
  },
  {
    id: "cash-application",
    label: "Cash Application",
    title: "Cash Application",
    description:
      "Payments are automatically matched to open invoices across bank feeds and remittance data, closing the loop without spreadsheets.",
    cardTitle: "Cash Match Engine",
    cardSub: "PMT-88213",
    badge: "Matched",
    steps: [
      { label: "Bank deposit detected", sub: "$18,420.00 — ACH", done: true },
      { label: "Remittance parsed", sub: "3 invoices identified", done: true },
      { label: "Ledger reconciled", sub: "Auto-posted to AR", done: true },
    ],
  },
  {
    id: "reconciliation",
    label: "Reconciliation",
    title: "Reconciliation",
    description:
      "Month-end close accelerated with continuous account reconciliation, flagging variances the moment they appear, not weeks later.",
    cardTitle: "Reconciliation Agent",
    cardSub: "GL-1000",
    badge: "Reviewing",
    steps: [
      { label: "Statement imported", sub: "Chase — Aug 2026", done: true },
      { label: "Variance detected", sub: "$212.00 — flagged for review" },
      { label: "Awaiting sign-off", sub: "Controller queue" },
    ],
  },
];

const ITEM_MIN_VH = 42;

export default function WorkflowExplorerSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-[#E5E5E5] text-[#050505] border-t border-b border-black/10">
      {/* 3 vertical lines dividing section into 4 equal columns */}
      <div className="absolute inset-0 z-0 flex pointer-events-none">
        <div className="w-1/4 h-full border-r border-black/15" />
        <div className="w-1/4 h-full border-r border-black/15" />
        <div className="w-1/4 h-full border-r border-black/15" />
        <div className="w-1/4 h-full" />
      </div>

      {/* Section header */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 border-b border-black/10">
        <div className="hidden lg:block col-span-1" />
        <div className="col-span-1 lg:col-span-2 p-8 pt-24 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 bg-[#141fdb]" />
            <span className="text-xs font-mono tracking-widest uppercase font-bold text-black/70">
              Workflows
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight leading-[1.05]">
            One engine. <br />
            Every finance workflow.
          </h2>
        </div>
        <div className="hidden lg:block col-span-1" />
        <div className="hidden lg:block col-span-1" />
      </div>

      {/* Body: 4 columns — options / description / image / empty */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 items-stretch">
        
        {/* COL 1: sticky options list */}
        <div className="hidden lg:block col-span-1 relative">
          <div className="sticky top-40 flex flex-col items-end gap-6 p-8 text-right">
            {WORKFLOW_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() =>
                  sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
                className={`text-right text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${
                  activeIndex === idx ? "text-[#050505] font-bold" : "text-[#050505]/40 hover:text-[#050505]/70"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* COL 2: descriptions */}
        <div className="col-span-1 lg:col-span-1 flex flex-col">
          {WORKFLOW_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => { sectionRefs.current[idx] = el; }}
              data-index={idx}
              style={{ minHeight: `${ITEM_MIN_VH}vh` }}
              className="flex flex-col justify-center p-8 border-b border-black/5 lg:border-b-0"
            >
              <span className="w-2.5 h-2.5 bg-[#141fdb] mb-4" />
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">{item.title}</h3>
              <p className="text-black/50 text-sm leading-relaxed max-w-xs">{item.description}</p>
            </div>
          ))}
        </div>

        {/* COL 3: image / live cards */}
        <div className="col-span-1 lg:col-span-1 flex flex-col">
          {WORKFLOW_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              style={{ minHeight: `${ITEM_MIN_VH}vh` }}
              className="flex items-center justify-center p-6 md:p-10"
            >
              <div
                className={`w-full max-w-[380px] rounded-lg border bg-white transition-all duration-500 ${
                  activeIndex === idx ? "border-black/15 opacity-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)]" : "border-black/10 opacity-40"
                }`}
              >
                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-black/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#141fdb]/10 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141fdb]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#050505]">{item.cardTitle}</p>
                      <p className="text-[11px] font-mono text-black/40">{item.cardSub}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/50 border border-black/10 rounded-full px-2 py-1">
                    {item.badge}
                  </span>
                </div>

                <div className="flex flex-col gap-4 px-5 py-5">
                  {item.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          step.done ? "border-[#141fdb] bg-[#141fdb]/10" : "border-black/20"
                        }`}
                      >
                        {step.done && <span className="w-1.5 h-1.5 rounded-full bg-[#141fdb]" />}
                      </div>
                      <div>
                        <p className="text-[13px] text-[#050505]/90">{step.label}</p>
                        <p className="text-[11px] text-black/40">{step.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COL 4: empty, kept for the 4-column grid rhythm */}
        <div className="hidden lg:block col-span-1" />
      </div>
    </section>
  );
}