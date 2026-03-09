
---

### 8. `docs/openclaw.md`（OpenClaw支持文档）

```markdown
# OpenClaw 集成指南

## 1. 生成技能文件

```bash
# 生成 OpenClaw 技能文件
node -e "const fs = require('fs'); fs.writeFileSync('skills/market_skill.js', require('./src/utils/openclaw').generateOpenClawSkills())"