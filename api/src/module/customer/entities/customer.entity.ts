import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ColumnNumericTransformer } from '../../../config/column-numeric-transformer'
import { Orderdetail } from '../../orderdetails/entities/orderdetail.entity'
import { Order } from '../../orders/entities/order.entity'

@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  first_name: string

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  last_name: string

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  balance: number

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  address: string

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]

  @OneToMany(() => Orderdetail, (order) => order.customer)
  orderdetails: Orderdetail[]
}
