import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Flights } from './flights.entity';
import { Flight } from './flight.model';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flights)
    private readonly flightRepository: Repository<Flights>,
  ) {}

  async create(flight: Flight): Promise<any> {
    this.prepFlight(flight);
    return await this.flightRepository.save(flight);
  }

  async findOne(id: number): Promise<any> {
    return this.flightRepository.findOne(id);
  }

  async findAll(): Promise<Flights[]> {
    return this.flightRepository.find();
  }

  async query(orig: string, dest: string): Promise<any> {
    return await this.flightRepository.find({
      origin: orig.trim().toLowerCase(),
      destination: dest.trim().toLowerCase(),
    });
  }

  async update(flight: Flight): Promise<UpdateResult> {
    this.prepFlight(flight);
    return await this.flightRepository.update(flight.id, flight);
  }

  async delete(id: number): Promise<any> {
    return this.flightRepository.delete(id);
  }

  async flightOrigins(): Promise<string[]> {
    return this.flightRepository.query('SELECT DISTINCT origin FROM flights');
  }

  async getFlightDestinations(): Promise<string[]> {
    return this.flightRepository.query('SELECT DISTINCT destination FROM flights');
  }

  prepFlight(flight: Flight): void {
    flight.origin = flight.origin.trim().toLowerCase();
    flight.destination = flight.destination.trim().toLowerCase();
  }

  async isFlightExist(flightNum: number): Promise<boolean> {
    const flight = await this.flightRepository.find({ flightNumber: flightNum });
    return flight.length ? true : false;
  }
}
