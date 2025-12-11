import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Store } from "@prisma/client";
import type { CreateStoreDto } from "./dto/create-store.dto";
import type { UpdateStoreDto } from "./dto/update-store.dto";
import type { StoresService } from "./stores.service";

@ApiTags("stores")
@Controller("stores")
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  findAll(): Promise<Store[]> {
    return this.storesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Store> {
    return this.storesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStoreDto: UpdateStoreDto): Promise<Store> {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Store> {
    return this.storesService.remove(+id);
  }
}
