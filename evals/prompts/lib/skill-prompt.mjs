/**
 * Shared Promptfoo prompt function for skill evals.
 *
 * Injects the skill's SKILL.md as the system message.
 * Set vars.skillFile to the skill path relative to the repo root,
 * e.g. "skills/maplibre-tile-sources/SKILL.md".
 */

import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

export default function ({ vars }) {
  const messages = [];
  if (vars.injectSkill !== 'false') {
    const skillContent = readFileSync(join(repoRoot, vars.skillFile), 'utf8');
    messages.push({ role: 'system', content: skillContent });
  }
  messages.push({ role: 'user', content: vars.prompt });
  return JSON.stringify(messages);
}
