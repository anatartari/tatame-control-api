import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SportService } from './sport.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { SportDto } from './dto/sport.dto';
import { SportWithStudentsCountDto } from './dto/sport-with-students-count.dto';
import { BasicListSportDto } from './dto/basic-list-sport.dto';

@Controller('sport')
export class SportController {
  constructor(private readonly sportService: SportService) { }

  @Post()
  create(@Body() createSportDto: CreateSportDto): Promise<SportDto> {
    return this.sportService.create(createSportDto);
  }

  @Get('with-students-count')
  findAllWithStudentsCount(): Promise<SportWithStudentsCountDto[]> {
    return this.sportService.findAllWithStudentsCount();
  }

  @Get('basic-list')
  listBasicList() : Promise<BasicListSportDto[]> {
    return this.sportService.listBasicList();
  }

  @Get()
  findAll(): Promise<SportDto[]> {
    return this.sportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SportDto | null> {
    return this.sportService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSportDto: UpdateSportDto): Promise<SportDto> {
    return this.sportService.update(id, updateSportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportService.remove(id);
  }
}
