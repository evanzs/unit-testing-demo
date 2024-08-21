import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let dialogRef: MatDialogRef<AddProductComponent>;
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'updateProduct',
    'saveProduct',
  ]);

  let matDialogRef = jasmine.createSpyObj('MatDialogRef', [
    'open',
    'close',
  ]);

  const productStub:Product ={
        id:'1',
        title: 'Produto A',
        price: '',
        description: '',
        category: ''
  }

  beforeEach(async () => {
     await TestBed.configureTestingModule({
      imports: [SharedModule,NoopAnimationsModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: ProductsService, useValue: mockProductService },
         {
          provide: MAT_DIALOG_DATA,
          useValue: productStub
        },
      ],
       declarations: [AddProductComponent],
     }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    dialogRef = TestBed.inject(MatDialogRef);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form', () => {
      component.data = productStub;
      const title = component.productForm.get('title')?.value
      expect(title).toEqual("Produto A")
  });

  describe('should test add product functionality', () => {
    it('should call the saveProduct to add new product', () => {
      component.data = {} as Product;
      component.productForm.patchValue(productStub)

      mockProductService.saveProduct.and.returnValue(of([]))
      component.saveProduct()
      const product = productStub
      delete product.id
      expect(mockProductService.saveProduct).toHaveBeenCalledWith(product)
    });

    it('should test the saveProduct for failure while add a new product', () => {
      component.data = {} as Product;
      component.productForm.patchValue(productStub)

      mockProductService.saveProduct.and.returnValue((throwError(() => new Error)));
      component.saveProduct()
      const product = productStub
      delete product.id
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
            duration: 3000
          })
    });
  });

  describe('should test edit product functionality', () => {
    it('should set the form controls to the correct values when data is provided', () => {
      component.data = productStub;
      expect(component.productForm.get('title')?.value).toEqual('Produto A')
    });

    it('should call the saveProduct while editing the product', () => {
      component.data = productStub;
      component.productForm.patchValue(productStub)

      mockProductService.saveProduct.and.returnValue(of());
      mockProductService.updateProduct.and.returnValue(of());

      component.saveProduct()

      expect(mockProductService.updateProduct).toHaveBeenCalled();
    });

    it('should test the saveProduct for failure while update a product', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      };
      const error = new Error('Error while update a product');
      component.data = data;

      mockProductService.updateProduct.and.returnValue((throwError(() => error)));
      component.productForm.patchValue(data);
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  });
});
