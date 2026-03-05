import { BaseEntity } from './base.entities';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 50 })
  unit: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'float', default: 0 })
  vatRate: number;
}
