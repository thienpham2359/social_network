import {Injectable} from "@nestjs/common";
import {ProductModel} from "../dto/product.model";

@Injectable()
export class ProductService {
    private products: ProductModel[] = []

    public getProducts() {
        return [...this.products]
    }

    public create(name: string, desc: string): string {
        const product = new ProductModel(new Date().toISOString(), name, desc)
        this.products.push(product)
        return product.id
    }
}
