import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Product } from "@prisma/client";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { UpdateProductDto } from "./dto/update-product.dto";
import type { ProductsService } from "./products.service";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Product> {
    return this.productsService.remove(+id);
  }
}
