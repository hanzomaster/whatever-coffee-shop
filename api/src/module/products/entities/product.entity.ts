import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
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
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  price: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  cost: number

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  category: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    nullable: true,
  })
  inventory: number

  @Column()
  supplierId: number

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  supplier: Supplier

  @OneToMany(() => Supplierdetail, (supplierdetail) => supplierdetail.product)
  supplierdetails: Supplierdetail[]

  @OneToMany(() => Orderdetail, (orderdetail) => orderdetail.product)
  orderdetails: Orderdetail[]
}
