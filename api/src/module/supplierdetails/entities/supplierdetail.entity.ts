import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ColumnNumericTransformer } from '../../../config/column-numeric-transformer'
import { Product } from '../../products/entities/product.entity'
import { Supplier } from '../../suppliers/entities/supplier.entity'

@Entity({ name: 'supplier_detail' })
export class Supplierdetail {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'date',
    nullable: true,
  })
  order_date: Date

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  unit_price: number

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  supplier_quantity: number

  @Column()
  supplierId: number

  @Column()
  productId: number

  @ManyToOne(() => Supplier, (supplier) => supplier.supplierdetails)
  supplier: Supplier

  @ManyToOne(() => Product, (product) => product.supplierdetails)
  product: Product
}
