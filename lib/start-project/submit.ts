import { submitStartProjectAction } from "./actions";
import type { StartProjectFormValues } from "./schema";
import type { StartProjectActionResult } from "./types";

/**
 * Client-facing submit helper — delegates to the Resend server action.
 */
export async function submitStartProject(
  values: StartProjectFormValues,
): Promise<StartProjectActionResult> {
  return submitStartProjectAction(values);
}
