import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Customer } from '../../customer/entities/customer.entity'
import { Orderdetail } from '../../orderdetails/entities/orderdetail.entity'
import { Store } from '../../stores/entities/store.entity'

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  date: Date

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  total_price: number

  @Column()
  customerId: number

  @Column()
  storeId: number

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer

  @ManyToOne(() => Store, (store) => store.orders)
  store: Store

  @OneToMany(() => Orderdetail, (orderdetail) => orderdetail.order)
  orderdetails: Orderdetail[]
}
