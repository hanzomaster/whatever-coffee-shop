import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[]

  @OneToMany(() => Supplierdetail, (supplierdetail) => supplierdetail.supplier)
  supplierdetails: Supplierdetail[]
}
