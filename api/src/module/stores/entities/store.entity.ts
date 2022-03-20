import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ColumnNumericTransformer } from '../../../config/column-numeric-transformer'
import { Orderdetail } from '../../orderdetails/entities/orderdetail.entity'
import { Order } from '../../orders/entities/order.entity'

@Entity({ name: 'store' })
export class Store {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  location: string

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  revenue: number

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  fixed_cost: number

  @OneToMany(() => Orderdetail, (orderdetail) => orderdetail.store)
  orderdetails: Orderdetail[]

  @OneToMany(() => Order, (order) => order.store)
  orders: Order[]
}
