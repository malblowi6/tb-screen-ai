import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  probability: number;
  label: string;
  notes: string;
  isLoading?: boolean;
  onReset?: () => void;
}

export function ResultCard({ probability, label, notes, isLoading, onReset }: ResultCardProps) {
  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[400px] bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-100 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">AI</span>
          </div>
        </div>
        <h3 className="mt-6 text-xl font-bold text-slate-900 animate-pulse">Analyzing Data...</h3>
        <p className="mt-2 text-slate-500 text-center max-w-xs">
          Our model is processing clinical variables and X-ray features.
        </p>
      </div>
    );
  }

  const isHighRisk = probability > 0.5;
  const percentage = Math.round(probability * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
    >
      <div className={cn(
        "px-8 py-10 text-center relative overflow-hidden",
        isHighRisk ? "bg-orange-50" : "bg-emerald-50"
      )}>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className={cn("absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl", isHighRisk ? "bg-orange-500" : "bg-emerald-500")} />
          <div className={cn("absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl", isHighRisk ? "bg-red-500" : "bg-green-500")} />
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className={cn(
            "w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-sm",
            isHighRisk ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"
          )}
        >
          {isHighRisk ? (
            <AlertTriangle className="w-12 h-12" />
          ) : (
            <CheckCircle2 className="w-12 h-12" />
          )}
        </motion.div>
        
        <h2 className={cn("text-3xl font-display font-bold mb-2", isHighRisk ? "text-orange-800" : "text-emerald-800")}>
          {label}
        </h2>
        
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-5xl font-bold text-slate-900 tracking-tight">{percentage}%</span>
          <span className="text-slate-500 font-medium">Confidence</span>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Analysis Notes</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {notes}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <button 
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:text-primary transition-all duration-200 group"
          >
            <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
            Start New Screening
          </button>
        </div>
      </div>
    </motion.div>
  );
}
