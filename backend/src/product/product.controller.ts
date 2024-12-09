import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('products')
export class ProductsController {
  prisma:PrismaService;
  constructor(db:PrismaService){
    this.prisma=db;
  }
  @Post()
  async getProducts(
    @Body('page') page: number = 1,
    @Body('limit') limit: number = 10,
  ) {
    const offset = (page - 1) * limit;
    const products = await this.prisma.product.findMany({
      skip: offset,
      take: limit,
    });
    const total = await this.prisma.product.count();
    const totalPages = Math.ceil(total / limit);

    return { products, totalPages };
  }
}
