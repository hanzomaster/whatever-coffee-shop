import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ColumnNumericTransformer } from '../../../config/column-numeric-transformer'
import { Order } from '../../orders/entities/order.entity'

@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  balance: number

  @Column()
  phone: string

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]
}
