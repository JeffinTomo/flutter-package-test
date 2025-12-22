## 目标
1. 开发一个独立的 dart package
2. 编译后同步给 flutter 使用
3. 编译成 node 包 给 typescript 使用

## 功能说明：
参考 /Users/shuise/tomo/tomo-wallet/packages/chains-service 中 networks
完全实现 networks 中的 api
```
loadNetworks(chainType) 根据 chainType 加载相关网络信息，chainType 为空时加载所有网络
getNetwork(chainType, chaindId) 查询 network 详情
```

## 执行步骤
1. 在 mobile 中创建一个新的 package（name = networkManage）， 说明文档：https://dart.cn/tools/pub/packages
2. 从 /Users/shuise/tomo/tomo-wallet/packages/chains-service 中 copy json 静态数据
3. 实现 loadNetworks + getNetwork 两个 api
4. 配置 编译 node
5. 自我检查代码，输出执行的关键步骤，每个步骤的描述不要超过 3 行
6. 输出 sdk 的使用说明 doc
7. 根据文档在 main 中完成调用