import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseAPI = environment.baseAPI;
  constructor(private http: HttpClient) {}

  /**
  * getProducts() faz uma requisição pra API, recuperando uma lista de produtos
  * @returns uma lista de produtos retornada pela API
  */
  getProducts() {
    return this.http.get<Product[]>(`${this.baseAPI}products`);
  }

  /**
  * saveProduct() faz uma requisição pra API do tipo post,para salvar produto enviado por parametro
  * @param product parametro do tipo "Product" que será salvo
  * @returns retorna o produto salvo pela API
  */
  saveProduct(product: Product) {
    return this.http.post<Product>(
      `${this.baseAPI}products`,
      product
    );
  }

    /**
  * deleteProduct() faz uma requisição pra API do tipo DELETE,para deletar o produto
  * de acordo com o parametro ID enviado
  * @param id parametro do tipo "numérico"
  * @returns retorna o produto deletado pela API
  */
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.baseAPI}products/${id}`);
  }

    /**
  * updateProduct() faz uma requisição pra API do tipo PUT,para editar o produto
  * de acordo com o parametro ID do produto enviado
  * @param product parametro do tipo "Product" que será salvo
  * @returns retorna o produto editado pela API
  */
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseAPI}products/${product.id}`,
      product
    );
  }
}
