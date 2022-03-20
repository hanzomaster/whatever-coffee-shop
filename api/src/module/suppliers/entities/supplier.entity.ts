import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ColumnNumericTransformer } from '../../../config/column-numeric-transformer'
import { Product } from '../../products/entities/product.entity'
import { Supplierdetail } from '../../supplierdetails/entities/supplierdetail.entity'

@Entity({ name: 'supplier' })
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  name: string

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  total_price: number

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[]

  @OneToMany(() => Supplierdetail, (supplierdetail) => supplierdetail.supplier)
  supplierdetails: Supplierdetail[]
}
