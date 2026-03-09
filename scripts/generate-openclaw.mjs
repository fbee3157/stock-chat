// scripts/generate-openclaw.mjs
import { generateOpenClawSkills } from '../src/utils/openclaw.js';
import fs from 'fs';
import path from 'path';

const skillsDir = './skills';
if (!fs.existsSync(skillsDir)) {
  fs.mkdirSync(skillsDir, { recursive: true });
}

const skillsContent = generateOpenClawSkills();
fs.writeFileSync(path.join(skillsDir, 'market_skill.js'), skillsContent);

console.log('✅ OpenClaw skills generated at ./skills/market_skill.js');