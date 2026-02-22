import { Link, useLocation } from "wouter";
import { Activity, LayoutGrid, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/demo/full", label: "Full Screening", icon: Activity },
    { href: "/demo/cxr", label: "CXR Only", icon: ScanLine },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="bg-primary/10 p-2 rounded-lg">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-slate-900 hidden sm:block">
                TB Screen<span className="text-primary">AI</span>
              </span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {links.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200",
                      isActive 
                        ? "border-primary text-slate-900" 
                        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                    )}
                  >
                    <link.icon className="w-4 h-4 mr-2" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Prototype v1.0
            </span>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden border-t border-slate-100 flex justify-around p-2 bg-slate-50">
        {links.map((link) => {
          const isActive = location === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg text-xs font-medium w-full mx-1",
                isActive 
                  ? "bg-white text-primary shadow-sm ring-1 ring-slate-200" 
                  : "text-slate-500 hover:bg-white/50"
              )}
            >
              <link.icon className="w-5 h-5 mb-1" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
