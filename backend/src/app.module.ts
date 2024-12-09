import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';


@Module({
  controllers: [AppController],
  providers: [AppService,PrismaService],
  imports: [AuthModule, ProductModule],
})
export class AppModule {}
