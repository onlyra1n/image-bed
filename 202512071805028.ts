import { PrismaClient } from "@prisma/client";

// 创建一个全局的Prisma Client实例
let prisma: PrismaClient;

// 在Node.js环境中全局缓存实例，避免开发环境中创建多个连接
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // 使用全局变量在开发环境中缓存实例
  const globalForPrisma = global as unknown as { prisma: PrismaClient };
  
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  
  prisma = globalForPrisma.prisma;
}

export default prisma; 