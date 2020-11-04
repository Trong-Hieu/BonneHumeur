import { Component, OnInit } from '@angular/core';
import { OrderInfoModel } from 'src/app/Model/orderInfoModel';
import { shoppingCartItem } from 'src/app/Model/shopping-cart-item';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-admin-orders-manage',
  templateUrl: './admin-orders-manage.component.html',
  styleUrls: ['./admin-orders-manage.component.css']
})
export class AdminOrdersManageComponent implements OnInit {

  allOrders = []
  filteredOrders = []
  status: string = "unship"

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    // get all orders
    console.log(status)
    this.orderService.getAllOrder().snapshotChanges().subscribe(data =>{
      this.allOrders = data.map(e =>{
        return {
          id: e.payload.doc.id,
          orderDate: e.payload.doc.get("orderDate"),
          status: e.payload.doc.get("status"),
          information: [],
          items: [],
        }
      })

      console.log(this.allOrders)

      this.filteredOrders = this.allOrders.filter(order =>{
        return order.status === this.status
      })

      console.log("filter order: " + this.filteredOrders)


      for (let order of this.filteredOrders){
        //get information
        this.orderService.getAllOrder().doc(order.id).collection("information")
          .snapshotChanges().subscribe(data =>{
            order.information = data.map(e =>{
              return {
                id: e.payload.doc.id,
                firstName: e.payload.doc.get("firstName"),
                lastName: e.payload.doc.get("lastName"),
                address: e.payload.doc.get("address"),
                email: e.payload.doc.get("email"),
                phoneNumber: e.payload.doc.get("phoneNumber"),
              } as OrderInfoModel
            })

            console.log("order information: " + order.information)
        })

        // get order items
        this.orderService.getAllOrder().doc(order.id).collection("items")
          .snapshotChanges().subscribe(data =>{
            order.items = data.map(e =>{
              return{
                id: e.payload.doc.id,
                  product: e.payload.doc.get("product"),
                  quantity: e.payload.doc.get("quantity"),
                  totalPrice: e.payload.doc.get("quantity") * e.payload.doc.get("product.price"),
              } as shoppingCartItem
            })
            console.log("order items: " + order.items)
          })
      }

    })
  }

  shipOrder(orderId){
    this.orderService.shipOder(orderId)

  }
  cancelOrder(orderId){
    this.orderService.cancelOder(orderId)

  }
  changeStatus(value){
    this.status = value;
    console.log(value)
    this.ngOnInit()
  }

}
