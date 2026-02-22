import { Link } from "wouter";
import { ArrowRight, Activity, ScanLine, Brain, Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Stock image of medical team looking at x-rays
// https://images.unsplash.com/photo-1551076882-68b47d190680?q=80&w=2940&auto=format&fit=crop

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" 
            alt="Medical Technology Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400 ring-1 ring-inset ring-blue-500/20">
              AI for Global Health
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl mb-6">
              Next-Gen TB Screening Powered by AI
            </h1>
            <p className="text-lg leading-8 text-slate-300 mb-10">
              A multimodal deep learning system that combines chest X-ray analysis with clinical indicators 
              to provide rapid, accurate tuberculosis risk assessment in resource-constrained settings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo/full">
                <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
                  Launch Full Demo <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/demo/cxr">
                <button className="px-6 py-3 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-all w-full sm:w-auto border border-white/10">
                  Try CXR Only
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Multimodal Fusion",
              desc: "Combines vision transformers for CXR with dense layers for clinical tabular data."
            },
            {
              icon: Shield,
              title: "Privacy First",
              desc: "Edge-compatible architecture that can run predictions without data leaving the device."
            },
            {
              icon: Clock,
              title: "Rapid Triage",
              desc: "Instant results enable faster isolation and treatment initiation for high-risk patients."
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Selection Cards */}
      <div className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 font-display">Select a Workflow</h2>
            <p className="mt-4 text-slate-500">Choose the screening mode that matches your available data.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/demo/full" className="group relative block h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform transition-transform group-hover:scale-[1.02] group-hover:shadow-xl opacity-0 group-hover:opacity-100" />
              <div className="relative h-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm transition-transform group-hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-50 rounded-xl text-primary group-hover:bg-white group-hover:text-blue-600 transition-colors">
                    <Activity className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Comprehensive</h3>
                    <p className="text-sm text-slate-400">Recommended</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Best for clinical settings where patient history and vitals are available alongside imaging.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    Clinical Variables (Age, Symptoms)
                  </li>
                  <li className="flex items-center text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    Chest X-Ray Analysis
                  </li>
                </ul>
                <span className="text-primary font-semibold text-sm group-hover:text-white flex items-center gap-2">
                  Launch Demo <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/demo/cxr" className="group relative block h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl transform transition-transform group-hover:scale-[1.02] group-hover:shadow-xl opacity-0 group-hover:opacity-100" />
              <div className="relative h-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm transition-transform group-hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-600 group-hover:bg-white/10 group-hover:text-white transition-colors">
                    <ScanLine className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Image Only</h3>
                    <p className="text-sm text-slate-400">Fast Track</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Rapid screening for mass testing scenarios where only imaging data is collected.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    Chest X-Ray Analysis
                  </li>
                  <li className="flex items-center text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mr-2" />
                    No Clinical Data Required
                  </li>
                </ul>
                <span className="text-slate-600 font-semibold text-sm group-hover:text-white flex items-center gap-2">
                  Launch Demo <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
