import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ColumnNumericTransformer } from '../../../config/column-numeric-transformer'
import { Orderdetail } from '../../orderdetails/entities/orderdetail.entity'
import { Supplierdetail } from '../../supplierdetails/entities/supplierdetail.entity'
import { Supplier } from '../../suppliers/entities/supplier.entity'

@Entity({
  name: 'product',
})
export class Product {
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
  price: number

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  cost: number

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  category: string

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  inventory: number

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  img_path: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string

  @Column()
  supplierId: number

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  supplier: Supplier

  @OneToMany(() => Supplierdetail, (supplierdetail) => supplierdetail.product)
  supplierdetails: Supplierdetail[]

  @OneToMany(() => Orderdetail, (orderdetail) => orderdetail.product)
  orderdetails: Orderdetail[]
}
