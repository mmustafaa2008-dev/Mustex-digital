"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FormProvider, type DefaultValues } from "react-hook-form";

import {
  FormCheckbox,
  FormInput,
  FormSubmitButton,
  FormTextarea,
  useZodForm,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  budgetOptions,
  contactMethodOptions,
  serviceOptions,
  startProjectContent,
  timelineOptions,
} from "@/data/start-project";
import { pageTransition, withReducedMotion } from "@/lib/motion";
import {
  startProjectDefaultValues,
  startProjectSchema,
  startProjectStepFields,
  submitStartProject,
  type StartProjectFormValues,
  type StartProjectStep,
} from "@/lib/start-project";
import { cn } from "@/lib/utils";

import { FormOptionCards } from "./form-option-cards";
import { SuccessScreen } from "./success-screen";
import { WizardProgress } from "./wizard-progress";
import { WizardStepIndicator } from "./wizard-step-indicator";

const TOTAL_STEPS = 4;

/**
 * Premium multi-step Start Your Project wizard.
 */
function StartProjectWizard({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState<StartProjectStep>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useZodForm({
    schema: startProjectSchema,
    defaultValues: startProjectDefaultValues as DefaultValues<StartProjectFormValues>,
    mode: "onTouched",
  });

  const stepVariants = withReducedMotion(pageTransition, prefersReducedMotion);

  async function goNext() {
    const fields = [...startProjectStepFields[step]];
    const valid = await form.trigger(fields, { shouldFocus: true });
    if (!valid) return;
    setSubmitError(null);
    setStep((current) => Math.min(TOTAL_STEPS, current + 1) as StartProjectStep);
  }

  function goPrevious() {
    setSubmitError(null);
    setStep((current) => Math.max(1, current - 1) as StartProjectStep);
  }

  async function onSubmit(values: StartProjectFormValues) {
    setSubmitError(null);

    try {
      const result = await submitStartProject(values);

      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }

      setIsSuccess(true);
    } catch {
      setSubmitError(
        "Something went wrong while submitting your project. Please try again.",
      );
    }
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < TOTAL_STEPS) {
      await goNext();
      return;
    }

    await form.handleSubmit(onSubmit)(event);
  }

  if (isSuccess) {
    return (
      <div className={cn("w-full", className)}>
        <SuccessScreen />
      </div>
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)}>
      <header className="mb-8 flex flex-col gap-3 text-center md:mb-10 md:gap-4">
        <SectionHeading as="h1" size="xl" align="center" id="start-project-heading">
          {startProjectContent.title}
        </SectionHeading>
        <SectionDescription size="lg" align="center" className="mx-auto max-w-2xl">
          {startProjectContent.subtitle}
        </SectionDescription>
      </header>

      <GlassCard padding="lg" className="overflow-hidden">
        <div className="mb-8 flex flex-col gap-6">
          <WizardProgress currentStep={step} totalSteps={TOTAL_STEPS} />
          <WizardStepIndicator
            steps={startProjectContent.steps}
            currentStep={step}
          />
        </div>

        <FormProvider {...form}>
          <form
            noValidate
            className="flex flex-col gap-8"
            aria-labelledby="start-project-heading"
            onSubmit={handleFormSubmit}
          >
          {/* Honeypot — leave empty; hidden from assistive tech and sighted users */}
          <div
            className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
            aria-hidden="true"
          >
            <label htmlFor="start-project-website">Website</label>
            <input
              id="start-project-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("website")}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={stepVariants}
              className="flex flex-col gap-6"
            >
              {step === 1 ? (
                <FormOptionCards<StartProjectFormValues>
                  name="service"
                  label="Choose Service"
                  required
                  columns={1}
                  options={serviceOptions}
                />
              ) : null}

              {step === 2 ? (
                <>
                  <FormOptionCards<StartProjectFormValues>
                    name="budget"
                    label="Project Budget"
                    required
                    columns={1}
                    options={budgetOptions}
                  />
                  <FormOptionCards<StartProjectFormValues>
                    name="timeline"
                    label="Timeline"
                    required
                    columns={1}
                    options={timelineOptions}
                  />
                </>
              ) : null}

              {step === 3 ? (
                <>
                  <SectionHeading as="h2" size="md">
                    Project Details
                  </SectionHeading>
                  <FormInput<StartProjectFormValues>
                    name="projectName"
                    label="Project Name"
                    required
                    autoComplete="off"
                    placeholder="e.g. Customer portal redesign"
                  />
                  <FormInput<StartProjectFormValues>
                    name="company"
                    label="Company"
                    required
                    autoComplete="organization"
                    placeholder="Your company name"
                  />
                  <FormTextarea<StartProjectFormValues>
                    name="projectDescription"
                    label="Describe your project"
                    required
                    rows={6}
                    placeholder="Goals, features, users, constraints, and anything else we should know…"
                  />
                </>
              ) : null}

              {step === 4 ? (
                <>
                  <SectionHeading as="h2" size="md">
                    Contact Information
                  </SectionHeading>
                  <FormInput<StartProjectFormValues>
                    name="fullName"
                    label="Full Name"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                  <FormInput<StartProjectFormValues>
                    name="email"
                    label="Email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                  />
                  <FormInput<StartProjectFormValues>
                    name="phone"
                    label="Phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+1 555 000 0000"
                  />
                  <FormInput<StartProjectFormValues>
                    name="country"
                    label="Country"
                    required
                    autoComplete="country-name"
                    placeholder="Country"
                  />
                  <FormOptionCards<StartProjectFormValues>
                    name="preferredContactMethod"
                    label="Preferred Contact Method"
                    required
                    columns={1}
                    options={contactMethodOptions}
                  />
                  <FormCheckbox<StartProjectFormValues>
                    name="privacyAccepted"
                    label={
                      <>
                        I agree to the{" "}
                        <Link
                          href="/legal/privacy"
                          className="text-[var(--ds-primary-text)] underline-offset-4 hover:underline"
                        >
                          privacy policy
                        </Link>
                        .
                      </>
                    }
                  />
                </>
              ) : null}
            </motion.div>
          </AnimatePresence>

          {submitError ? (
            <p
              role="alert"
              className="text-sm text-[var(--ds-error-text)]"
            >
              {submitError}
            </p>
          ) : null}

          <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[var(--ds-border-subtle)] pt-6 sm:flex-row sm:items-center">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={goPrevious}
              >
                Previous
              </Button>
            ) : (
              <span className="hidden sm:block" />
            )}

            {step < TOTAL_STEPS ? (
              <Button
                type="button"
                size="lg"
                onClick={goNext}
                className="sm:ml-auto"
              >
                Next
              </Button>
            ) : (
              <FormSubmitButton size="lg" className="sm:ml-auto">
                Submit Project
              </FormSubmitButton>
            )}
          </div>
          </form>
        </FormProvider>
      </GlassCard>
    </div>
  );
}

export { StartProjectWizard };
