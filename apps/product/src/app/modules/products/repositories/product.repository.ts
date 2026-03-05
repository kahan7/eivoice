import { Product } from '@common/entities/product.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<Product[]> {
    return await this.repo.find();
  }

  async findById(id: number): Promise<Product | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async exists(sku: string, name: string): Promise<boolean> {
    const result = await this.repo.findOne({
      where: [{ sku }, { name }],
    });

    return !!result;
  }
}
