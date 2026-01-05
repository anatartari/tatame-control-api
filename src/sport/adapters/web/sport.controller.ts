import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateSportDto } from '../../dto/create-sport.dto';
import { UpdateSportDto } from '../../dto/update-sport.dto';
import { SportDto } from '../../dto/sport.dto';
import { SportWithStudentsCountDto } from '../../dto/sport-with-students-count.dto';
import { BasicListSportDto } from '../../dto/basic-list-sport.dto';
import { CreateSportUseCase } from '../../application/use-cases/create-sport.use-case';
import { FindSportUseCase } from '../../application/use-cases/find-sport.use-case';
import { ListSportsUseCase } from '../../application/use-cases/list-sports.use-case';
import { UpdateSportUseCase } from '../../application/use-cases/update-sport.use-case';
import { DeleteSportUseCase } from '../../application/use-cases/delete-sport.use-case';
import { ListSportsWithStudentsCountUseCase } from '../../application/use-cases/list-sports-with-students-count.use-case';
import { ListBasicSportsUseCase } from '../../application/use-cases/list-basic-sports.use-case';

@Controller('sport')
export class SportController {
  constructor(
    private readonly createSportUseCase: CreateSportUseCase,
    private readonly findSportUseCase: FindSportUseCase,
    private readonly listSportsUseCase: ListSportsUseCase,
    private readonly updateSportUseCase: UpdateSportUseCase,
    private readonly deleteSportUseCase: DeleteSportUseCase,
    private readonly listSportsWithStudentsCountUseCase: ListSportsWithStudentsCountUseCase,
    private readonly listBasicSportsUseCase: ListBasicSportsUseCase,
  ) {}

  @Post()
  create(@Body() createSportDto: CreateSportDto): Promise<SportDto> {
    return this.createSportUseCase.execute(createSportDto);
  }

  @Get('with-students-count')
  findAllWithStudentsCount(): Promise<SportWithStudentsCountDto[]> {
    return this.listSportsWithStudentsCountUseCase.execute();
  }

  @Get('basic-list')
  listBasicList(): Promise<BasicListSportDto[]> {
    return this.listBasicSportsUseCase.execute();
  }

  @Get()
  findAll(): Promise<SportDto[]> {
    return this.listSportsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SportDto | null> {
    return this.findSportUseCase.execute(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSportDto: UpdateSportDto): Promise<SportDto> {
    return this.updateSportUseCase.execute(id, updateSportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteSportUseCase.execute(id);
  }
}

