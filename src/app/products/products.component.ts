import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productData!: Product[];
  showSpinner = false;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

   /**
  * ngOnInit() responsavel pelo ciclo de vida, tudo que estiver dentro 
  * - inicia assim que componente for criado
  * @returns vazio
  * 
  */
  ngOnInit(): void {
    this.getProducts();
  }
  
    /**
   * getProducts() recupera os dados do produto do ProductService usando subscribe
   * caso não dê erro: atribui o retorno para "productData" e desativar o snpinner 
   * caso dê erro: mostra mensagem de erro e desativar o snpinner 
   * @returns vazio
   */
  getProducts() {
    this.showSpinner = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productData = res;
        this.showSpinner = false;
      },
      error: (err) => {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      }
    });
  }
    /**
   * openDialog() abre um dialog com o componente AddProductComponent
   * @returns vazio
   */
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width: '40%',
    });
  }

  /**
  * editProduct() abre um dialog com o componente AddProductComponent para editar
  * @param product parametro do tipo "Product" que será editado
  * @returns vazio
  */
  editProduct(product: Product) {
    this.dialog.open(AddProductComponent, {
      data: product,
      width: '40%',
    });
  }

  /**
  * deleteProduct() deleta o produto passado por parametro.
  * - caso não dê erro: retorna mensagem de sucesso,senão mensagem de erro.
  * @param product parametro do tipo "Product" que será deletado
  * @returns vazio
  */
  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (res) => {
        this.snackbar.open('Deleted Successfully!...', '', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      },
    });
  }
}
