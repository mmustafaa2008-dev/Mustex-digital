import {
  budgetOptions,
  contactMethodOptions,
  serviceOptions,
  timelineOptions,
} from "@/data/start-project";

import type { StartProjectInquiryValues } from "./schema";

function labelFromOptions<T extends string>(
  options: readonly { value: T; label: string }[],
  value: T,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

/** Human-readable labels for email templates. */
export function getStartProjectLabels(values: StartProjectInquiryValues) {
  return {
    service: labelFromOptions(serviceOptions, values.service),
    budget: labelFromOptions(budgetOptions, values.budget),
    timeline: labelFromOptions(timelineOptions, values.timeline),
    preferredContactMethod: labelFromOptions(
      contactMethodOptions,
      values.preferredContactMethod,
    ),
  };
}
