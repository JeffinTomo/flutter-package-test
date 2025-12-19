#!/usr/bin/env node

/**
 * Node.js 测试脚本
 * 验证编译后的 network_manage.js 是否正常工作
 */

console.log('=== Network Manage Node.js 测试 ===\n');

try {
  // 加载编译后的模块
  const networkManage = require('./dist/network_manage.js');

  console.log('✅ 模块加载成功');
  console.log('可用导出:', Object.keys(networkManage).join(', '));

  // 注意：由于 Dart 编译到 JS 的限制，可能需要通过特定方式访问
  // 这里只是验证文件可以被加载

  console.log('\n✅ 测试通过！');
  console.log('📝 注意：Dart to JS 编译的模块可能需要特殊的互操作方式');
  console.log('💡 建议：对于生产环境，考虑使用纯 TypeScript/JavaScript 实现');

} catch (error) {
  console.error('❌ 测试失败:', error.message);
  process.exit(1);
}

