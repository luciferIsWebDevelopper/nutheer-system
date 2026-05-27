"use client";

import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  jobApplicationSchema,
  type JobApplicationInput,
} from "@/lib/validations/careers";
import { submitJobApplicationAction } from "@/features/careers/actions/job-application-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type JobApplicationFormProps = {
  jobId: string;
  jobTitle: string;
};

export function JobApplicationForm({ jobId, jobTitle }: JobApplicationFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobApplicationInput>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      jobId,
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
    },
  });

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    const resumeInput = event.currentTarget.elements.namedItem(
      "resume"
    ) as HTMLInputElement | null;
    const resumeFile = resumeInput?.files?.[0];

    void handleSubmit(async (values) => {
      if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
        toast.error("Resume must be under 5 MB.");
        return;
      }

      setSubmitting(true);
      try {
        const result = await submitJobApplicationAction({
          ...values,
          resumeFileName: resumeFile?.name,
        });
        if (result.success) {
          toast.success(result.message ?? "Application submitted.");
          reset({
            jobId,
            fullName: "",
            email: "",
            phone: "",
            coverLetter: "",
          });
          if (resumeInput) resumeInput.value = "";
        } else {
          const firstError =
            Object.values(result.error ?? {})
              .flat()
              .find(Boolean) ?? "Something went wrong.";
          toast.error(firstError);
        }
      } finally {
        setSubmitting(false);
      }
    })(event);
  }

  return (
    <Card id="apply" className="border-border/60 scroll-mt-24">
      <CardHeader>
        <CardTitle>Apply for {jobTitle}</CardTitle>
        <CardDescription>
          Upload your resume (PDF or DOCX). Storage upload wiring can connect to
          Supabase Storage in production.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onFormSubmit} className="space-y-4">
          <input type="hidden" {...register("jobId")} />
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" {...register("fullName")} required />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} required />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="resume">Resume</Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              aria-describedby="resume-hint"
            />
            <p id="resume-hint" className="text-xs text-muted-foreground">
              Max 5 MB. File is validated client-side; upload to storage is prepared for
              integration.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover letter (optional)</Label>
            <Textarea id="coverLetter" rows={5} {...register("coverLetter")} />
            {errors.coverLetter && (
              <p className="text-sm text-destructive">{errors.coverLetter.message}</p>
            )}
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
