import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { map } from 'rxjs/operators';
import { Product } from "../shared/product";
import * as OrderNS from "./order";
import { Order } from "./order";


@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

    private token: string = "";
    private tokenExpiration: Date;

    public products: Product[] = [];

    public order: OrderNS.Order = new OrderNS.Order();

    loadProducts(): Observable<boolean> {
        return this.http.get("/api/products")
            .pipe(map((data: any[]) => {
                this.products = data;
                return true;
            }));
    }

    public get loginRequired(): boolean {
        return this.token.length == 0 || this.tokenExpiration > new Date();
    }

    public login(creds): Observable<boolean> {
        return this.http
            .post("/account/createtoken", creds)
            .pipe(map((data: any) => {
                this.token = data.token;
                this.tokenExpiration = data.expiration;
                return true;
            }));
    }

    public checkout() {
        if (!this.order.orderNumber) {
            this.order.orderNumber = this.order.orderDate.getFullYear().toString() + this.order.orderDate.getTime().toString();
        }
        return this.http
            .post('/api/orders', this.order, {
                headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
            })
            .pipe(map(response => {
                this.order = new Order();
                return true;
            }));
        
    }

    public addToOrder(product: Product) {

        let item: OrderNS.OrderItem = this.order.items.find(i => i.productId == product.id);

        if (item) {
            item.quantity++;
        } else {

            item = new OrderNS.OrderItem();

            item.productId = product.id;
            item.productArtist = product.artist;
            item.productArtId = product.artId;
            item.productCategory = product.category;
            item.productSize = product.size;
            item.productTitle = product.title;
            item.unitPrice = product.price;
            item.quantity = 1;

            this.order.items.push(item);
        }
    }
}