# 部署指南

## 1. Docker 部署

```bash
# 构建镜像
docker build -t stock.chat .

# 运行容器
docker run -d -p 8080:80 --name stock.chat stock.chat