import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Flight } from './flight.model';
import { Flights } from './flights.entity';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightService: FlightsService) {}

  @Post()
  async create(@Body() flight: Flight): Promise<Flights[]> {
    if (await this.flightService.isFlightExist(flight.flightNumber)) {
      throw new HttpException('Cannot create same flight twice', HttpStatus.BAD_REQUEST);
    }
    return this.flightService.create(flight);
  }

  @Get()
  findAll(): Promise<Flights[]> {
    return this.flightService.findAll();
  }

  @Get('query/:orig/:dest')
  async query(@Param('orig') orig, @Param('dest') dest): Promise<any> {
    return this.flightService.query(orig, dest);
  }

  @Get(':id')
  async findOne(@Param() param): Promise<Flight> {
    return this.flightService.findOne(param.id);
  }

  @Patch(':id/update')
  async update(@Param('id') id, @Body() flight: Flight): Promise<any> {
    flight.id = Number(id);
    return this.flightService.update(flight);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.flightService.delete(id);
  }

  @Get('cities/origins')
  getOrigins(): Promise<string[]> {
    return this.flightService.flightOrigins();
  }

  @Get('cities/destinations')
  getDestinations(): Promise<string[]> {
    return this.flightService.getFlightDestinations();
  }
}
