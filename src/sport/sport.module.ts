import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './entities/sport.entity';
import { SportRepository } from './sport.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sport])],
  exports: [SportRepository],
  controllers: [SportController],
  providers: [SportService,
    {
      provide: SportRepository,
      useFactory: (dataSource: DataSource) => new SportRepository(dataSource),
      inject: [DataSource],
    }],
})
export class SportModule { }
