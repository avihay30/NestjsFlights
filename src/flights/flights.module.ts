import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsController } from './flights.controller';
import { Flights } from './flights.entity';
import { FlightsService } from './flights.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flights])],
  providers: [FlightsService],
  controllers: [FlightsController],
})
export class FlightsModule {}
