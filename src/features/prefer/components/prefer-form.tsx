"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  preferTopicSchema,
  type PreferTopicInput,
} from "@/lib/validations/prefer";
import type { PreferTopicType } from "@/types";
import { submitPreferAction } from "@/features/prefer/actions/prefer-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const topicTypes: { value: PreferTopicType; label: string; description: string }[] = [
  {
    value: "want_to_learn",
    label: "Want to learn",
    description: "Skills and technologies you want on your learning path.",
  },
  {
    value: "already_know",
    label: "Already know",
    description: "Expertise you bring — helps us personalize recommendations.",
  },
  {
    value: "future_technology",
    label: "Future tech",
    description: "Emerging trends you believe will matter for your team.",
  },
];

export function PreferForm() {
  const [submitting, setSubmitting] = useState(false);
  const [activeType, setActiveType] = useState<PreferTopicType>("want_to_learn");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PreferTopicInput>({
    resolver: zodResolver(preferTopicSchema),
    defaultValues: {
      topicName: "",
      topicType: "want_to_learn",
      proficiencyLevel: "",
      notes: "",
    },
  });

  function handleTabChange(value: string) {
    const type = value as PreferTopicType;
    setActiveType(type);
    setValue("topicType", type);
  }

  async function onSubmit(values: PreferTopicInput) {
    setSubmitting(true);
    try {
      const result = await submitPreferAction({
        ...values,
        topicType: activeType,
      });
      if (result.success) {
        toast.success(result.message ?? "Topic saved.");
        reset({
          topicName: "",
          topicType: activeType,
          proficiencyLevel: "",
          notes: "",
        });
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
  }

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Prefer intelligence</CardTitle>
        <CardDescription>
          Share what you want to learn, already know, or see on the horizon.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeType} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            {topicTypes.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {topicTypes.map((t) => (
            <TabsContent key={t.value} value={t.value} className="mt-4">
              <p className="text-sm text-muted-foreground mb-4">{t.description}</p>
            </TabsContent>
          ))}
        </Tabs>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <input type="hidden" {...register("topicType")} value={activeType} />
          <div className="space-y-2">
            <Label htmlFor="topicName">Topic</Label>
            <Input
              id="topicName"
              {...register("topicName")}
              placeholder="e.g. RAG pipelines, Kubernetes, prompt engineering"
            />
            {errors.topicName && (
              <p className="text-sm text-destructive">{errors.topicName.message}</p>
            )}
          </div>
          {activeType === "already_know" && (
            <div className="space-y-2">
              <Label htmlFor="proficiencyLevel">Proficiency level</Label>
              <Input
                id="proficiencyLevel"
                {...register("proficiencyLevel")}
                placeholder="e.g. Expert, 5+ years"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" rows={3} {...register("notes")} />
            {errors.notes && (
              <p className="text-sm text-destructive">{errors.notes.message}</p>
            )}
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving…" : "Submit topic"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
