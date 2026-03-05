import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductTcpRequest } from '@common/interfaces/tcp/product';
@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async create(data: CreateProductTcpRequest) {
    const { sku, name } = data;
    const exist = await this.productRepository.exists(sku, name);
    if (exist) {
      throw new Error('Product with this SKU already exists');
    }
    return this.productRepository.create(data);
  }
  getAll() {
    return this.productRepository.findAll();
  }
}
