import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ColumnNumericTransformer } from '../../../config/column-numeric-transformer'
import { Customer } from '../../customer/entities/customer.entity'
import { Order } from '../../orders/entities/order.entity'
import { Product } from '../../products/entities/product.entity'
import { Store } from '../../stores/entities/store.entity'

@Entity({ name: 'order_detail' })
export class Orderdetail {
  @PrimaryGeneratedColumn()
  id: number

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
  quantity: number

  @Column()
  customerId: number

  @Column()
  orderId: number

  @Column()
  productId: number

  @Column()
  storeId: number

  @ManyToOne(() => Order, (order) => order.orderdetails)
  order: Order

  @ManyToOne(() => Customer, (customer) => customer.orderdetails)
  customer: Customer

  @ManyToOne(() => Product, (product) => product.orderdetails)
  product: Product[]

  @ManyToOne(() => Store, (store) => store.orderdetails)
  store: Store
}
