import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/FileUpload";
import { ResultCard } from "@/components/ResultCard";
import { useFullPrediction, FullPredictionInput } from "@/hooks/use-prediction";
import { ArrowRight, Thermometer, Calendar, User, Activity } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  age: z.coerce.number().min(0, "Age must be valid").max(120, "Age must be valid"),
  sex: z.string().min(1, "Please select sex"),
  coughDuration: z.coerce.number().min(0, "Duration must be valid"),
  hasFever: z.boolean().default(false),
  hasWeightLoss: z.boolean().default(false),
  hasNightSweats: z.boolean().default(false),
  image: z.custom<File>((v) => v instanceof File, {
    message: "Please upload a chest X-ray image first.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FullDemo() {
  const [step, setStep] = useState<"input" | "result">("input");
  const { mutate, isPending, data: result } = useFullPrediction();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasFever: false,
      hasWeightLoss: false,
      hasNightSweats: false,
    }
  });

  const onSubmit = (data: FormValues) => {
    mutate(data as FullPredictionInput, {
      onSuccess: () => setStep("result"),
    });
  };

  const resetDemo = () => {
    setStep("input");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="bg-primary pb-32 pt-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight" data-testid="text-page-title">
            Full Demo (CXR + Clinical Variables)
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto font-light">
            Multimodal analysis combining chest radiography with clinical symptoms
            for enhanced TB detection accuracy.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-8">
            {step === "input" ? (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in">

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-primary">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Clinical Indicators</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" /> Patient Age
                      </label>
                      <input
                        {...form.register("age")}
                        type="number"
                        placeholder="e.g. 45"
                        data-testid="input-age"
                        className="input-field"
                      />
                      {form.formState.errors.age && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.age.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Biological Sex</label>
                      <Controller
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-full h-[50px] rounded-xl border-slate-200 bg-white" data-testid="select-sex">
                              <SelectValue placeholder="Select sex" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {form.formState.errors.sex && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.sex.message}</p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" /> Cough Duration (Days)
                      </label>
                      <input
                        {...form.register("coughDuration")}
                        type="number"
                        placeholder="e.g. 14"
                        data-testid="input-cough-duration"
                        className="input-field"
                      />
                      {form.formState.errors.coughDuration && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.coughDuration.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Symptoms Present</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: "hasFever", label: "Fever", icon: Thermometer },
                        { id: "hasWeightLoss", label: "Weight Loss", icon: Activity },
                        { id: "hasNightSweats", label: "Night Sweats", icon: Activity },
                      ].map((item) => (
                        <Controller
                          key={item.id}
                          control={form.control}
                          name={item.id as keyof FormValues}
                          render={({ field }) => (
                            <label className={cn(
                              "flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                              field.value
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-slate-100 bg-slate-50"
                            )}>
                              <Checkbox
                                checked={field.value as boolean}
                                onCheckedChange={field.onChange}
                                className="mr-3"
                              />
                              <span className={cn("text-sm font-medium", field.value ? "text-primary" : "text-slate-600")}>
                                {item.label}
                              </span>
                            </label>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
                  <Controller
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FileUpload
                        onFileSelect={(file) => field.onChange(file)}
                        error={form.formState.errors.image?.message as string}
                        label="Patient Chest X-Ray (DICOM/JPG)"
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col items-end gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    data-testid="button-run-analysis"
                    className="btn-primary w-full md:w-auto text-lg px-10 py-4 flex items-center justify-center gap-2"
                  >
                    {isPending ? "Running Analysis..." : "Run Analysis"}
                    {!isPending && <ArrowRight className="w-5 h-5" />}
                  </button>
                  {form.formState.errors.image && (
                    <p className="text-red-500 text-sm font-medium" data-testid="text-image-error">
                      Please upload a chest X-ray image first.
                    </p>
                  )}
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

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg sticky top-24">
              <h3 className="font-display font-bold text-lg mb-4">How it works</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                This multimodal model processes both the visual features from the chest X-ray and structured clinical data to provide a comprehensive risk assessment.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">1</div>
                  <span>Extracts CXR feature vectors</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">2</div>
                  <span>Encodes clinical variables</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">3</div>
                  <span>Fuses modalities for prediction</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">Demo placeholder metric</div>
                <div className="text-3xl font-bold text-white">94.2%</div>
                <div className="text-sm text-slate-400">AUC-ROC (simulated)</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
