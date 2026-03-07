"use client";

import React, { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import {
  QrCode,
  MapPin,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Search,
  Info,
  ArrowLeft,
  Bird,
  Factory,
  Truck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const BATCH_DATA = {
  id: "KP-JH-9021",
  product: "Premium Kadaknath Whole",
  status: "Verified & Certified",
  farm: "Green Valley Organic Farm",
  location: "Jhabua, Madhya Pradesh",
  harvestDate: "Oct 24, 2023",
  expiryDate: "Oct 31, 2023",
  journey: [
    {
      id: 1,
      title: "Chatchery & Brooding",
      desc: "Sourced from pure-line Kadaknath breeders. Initial 21 days brooding under controlled temp.",
      date: "Aug 15, 2023",
      loc: "Central Breeder Unit",
      icon: Bird,
      completed: true,
    },
    {
      id: 2,
      title: "Free Range Farming",
      desc: "Raised in stress-free environment with organic grain feed and herbal supplements.",
      date: "Aug 22 - Oct 20",
      loc: "Green Valley Farm",
      icon: MapPin,
      completed: true,
    },
    {
      id: 3,
      title: "Quality Certification",
      desc: "Weight verification and health inspection. Certified free from hormones and antibiotics.",
      date: "Oct 22, 2023",
      loc: "QA Lab #4",
      icon: ShieldCheck,
      completed: true,
    },
    {
      id: 4,
      title: "Ethical Processing",
      desc: "Hygienic processing at cold chain facility. Vacuum sealed for freshness.",
      date: "Oct 23, 2023",
      loc: "Processing Unit A",
      icon: Factory,
      completed: true,
    },
    {
      id: 5,
      title: "Cold Chain Logistics",
      desc: "Dispatched via temperature controlled vehicle.",
      date: "Oct 24, 2023",
      loc: "In Transit",
      icon: Truck,
      completed: true,
    },
  ],
};

const Traceability = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [batchId, setBatchId] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleScan = () => {
    setIsScanning(false);
    setTimeout(() => {
      setShowResult(true);
      showSuccess("Batch verified successfully! 🏷️");
    }, 800);
  };

  if (showResult) {
    return (
      <MobileLayout role="customer">
        <div className="bg-brand-black pt-12 pb-8 px-6 rounded-b-[3rem] shadow-xl relative z-20">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setShowResult(false)}
              className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-md border border-white/10"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-display font-bold text-white">
              Batch Details
            </h1>
          </div>

          <div className="bg-white/5 rounded-3xl p-5 border border-white/10 backdrop-blur-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-brand-gold font-black uppercase tracking-widest mb-1">
                  Batch ID
                </p>
                <h2 className="text-xl font-display font-bold text-white">
                  {BATCH_DATA.id}
                </h2>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-none">
                <CheckCircle2 size={12} className="mr-1" /> Verified
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Bird size={14} className="text-brand-gold" />
              <span>{BATCH_DATA.product}</span>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-6 relative z-30">
          <div className="bg-card rounded-[2.5rem] p-6 shadow-xl border border-border">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-brand-gold">
                <Info size={24} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Farm Information</h3>
                <p className="text-xs text-muted-foreground">
                  {BATCH_DATA.farm}
                </p>
              </div>
              <button className="ml-auto w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-brand-black dark:text-brand-gold">
                <ExternalLink size={18} />
              </button>
            </div>

            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-muted before:z-0">
              {BATCH_DATA.journey.map((step, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={step.id}
                  className="flex gap-6 relative z-10"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border-4 border-background shadow-md shrink-0 transition-colors",
                      step.completed
                        ? "bg-brand-gold text-brand-black"
                        : "bg-muted text-slate-400",
                    )}
                  >
                    <step.icon size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-sm text-foreground">
                        {step.title}
                      </h4>
                      <span className="text-[9px] font-black uppercase text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-1">
                      {step.desc}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      <MapPin size={10} />
                      {step.loc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Button
            className="w-full h-14 rounded-2xl bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black font-bold gap-3 my-8 border-none shadow-xl"
            onClick={() => window.print()}
          >
            Download Health Certificate
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout role="customer">
      <div className="bg-brand-black pt-12 pb-12 px-6 rounded-b-[3rem] shadow-xl relative z-20">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Traceability
        </h1>
        <p className="text-slate-400 text-sm mb-0">
          Every bird has a story. Find out where yours came from.
        </p>
      </div>

      <div className="px-6 -mt-6 relative z-30">
        <div className="bg-card rounded-[2.5rem] p-8 shadow-xl border border-border text-center">
          <div className="relative w-full aspect-square max-w-[240px] mx-auto mb-8 group">
            <div className="absolute inset-0 bg-brand-gold/10 rounded-[3rem] animate-pulse" />
            <div className="absolute inset-4 border-2 border-dashed border-brand-gold/30 rounded-[2rem] flex flex-col items-center justify-center bg-card">
              <QrCode
                size={100}
                className="text-brand-gold opacity-40 mb-4 group-hover:scale-110 transition-transform duration-500"
              />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Position QR here
              </p>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-gold rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-gold rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-gold rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-gold rounded-br-2xl" />
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleScan}
              className="w-full h-14 rounded-2xl bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold text-base shadow-xl shadow-brand-gold/20"
            >
              Scan Now
            </Button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] flex-1 bg-border" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Or enter code
              </span>
              <div className="h-[1px] flex-1 bg-border" />
            </div>

            <div className="flex gap-2">
              <Input
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="Ex: KP-JH-9021"
                className="h-14 rounded-2xl border-border bg-muted/30 font-display font-bold text-center uppercase"
              />
              <Button
                onClick={handleScan}
                disabled={!batchId}
                className="h-14 w-14 rounded-2xl bg-brand-black text-brand-gold shrink-0"
              >
                <ChevronRight size={24} />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-12">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">
            Certified Safe
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-[2rem] border border-border flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-3">
                <CheckCircle2 size={24} />
              </div>
              <p className="text-[10px] font-black uppercase text-foreground">
                Antibiotic Free
              </p>
            </div>
            <div className="bg-card p-4 rounded-[2rem] border border-border flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-3">
                <CheckCircle2 size={24} />
              </div>
              <p className="text-[10px] font-black uppercase text-foreground">
                100% Organic
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Traceability;
