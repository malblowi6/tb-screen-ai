import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileUpload } from "@/components/FileUpload";
import { ResultCard } from "@/components/ResultCard";
import { useCxrPrediction, CxrPredictionInput } from "@/hooks/use-prediction";
import { ArrowRight, ScanLine } from "lucide-react";

const formSchema = z.object({
  image: z.custom<File>((v) => v instanceof File, {
    message: "Please upload a chest X-ray image first.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CxrOnly() {
  const [step, setStep] = useState<"input" | "result">("input");
  const { mutate, isPending, data: result } = useCxrPrediction();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    mutate(data as CxrPredictionInput, {
      onSuccess: () => setStep("result"),
    });
  };

  const resetDemo = () => {
    setStep("input");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="bg-slate-900 pb-32 pt-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl mb-6 backdrop-blur-sm">
            <ScanLine className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight" data-testid="text-page-title">
            CXR-only Demo
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Instant tuberculosis probability assessment using only chest radiography data.
            Optimized for high-throughput environments.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-20">
        {step === "input" ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="animate-in">
            <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-slate-200 p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Upload Radiograph</h2>
                <p className="text-slate-500 text-sm">
                  Upload a standard PA view chest X-ray in DICOM, PNG, or JPEG format.
                  High resolution is recommended for best accuracy.
                </p>
              </div>

              <Controller
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FileUpload
                    onFileSelect={(file) => field.onChange(file)}
                    error={form.formState.errors.image?.message as string}
                    label="Drag and drop or click to upload"
                  />
                )}
              />

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={isPending}
                  data-testid="button-analyze"
                  className="btn-primary w-full text-lg px-8 py-4 flex items-center justify-center gap-2"
                >
                  {isPending ? "Analyzing..." : "Analyze Image"}
                  {!isPending && <ArrowRight className="w-5 h-5" />}
                </button>
                {form.formState.errors.image && (
                  <p className="text-red-500 text-sm text-center font-medium" data-testid="text-image-error">
                    Please upload a chest X-ray image first.
                  </p>
                )}
                <p className="text-center text-xs text-slate-400">
                  By uploading, you agree to our research data usage terms.
                </p>
              </div>
            </div>
          </form>
        ) : (
          <div className="animate-in">
            {result && (
              <ResultCard
                probability={result.tb_probability}
                label={result.label}
                notes={result.notes}
                onReset={resetDemo}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
