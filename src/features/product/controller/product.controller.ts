import {Body, Controller, Get, Post} from "@nestjs/common";
import {ProductService} from "../provider/product.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Get()
    public getProducts() {
        return this.productService.getProducts()
    }

    @Post()
    public createProduct(@Body('name') name: string, @Body('desc') desc: string) {
        return this.productService.create(name, desc)
    }
}
