import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let dialog = jasmine.createSpyObj('MatDialog', ['open']);
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'getProducts',
    'deleteProduct',
  ]);

  mockProductService.getProducts.and.returnValue(of([]));
  mockProductService.deleteProduct.and.returnValue(of([]));

  const productStub:Product ={
    id:'1',
    title: '',
    price: '',
    description: '',
    category: ''
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [SharedModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialog, useValue: dialog },
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    dialog = TestBed.inject(MatDialog);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    mockProductService.getProducts.and.returnValue(of([]));
    spyOn(component,'getProducts');
    expect(component).toBeTruthy();
  });

  describe('should test get products initially', () => {
    it('should get product data initially', () => {
      mockProductService.getProducts.and.returnValue(of([productStub]));

      component.getProducts()
      expect(component.productData).toEqual([productStub]);

    });

    it('should get product data initially on failure', () => {
        mockProductService.getProducts.and.returnValue( throwError(()=> new Error('erro sumulado')))
        expect(mockProductService.getProducts).toHaveBeenCalled();
    });
  });

  it('should test openDialog', () => {
    mockProductService.getProducts.and.returnValue(of([]));
    component.openDialog()
    expect(dialog.open).toHaveBeenCalled();

  });

  it('should test editDialog', () => {

    mockProductService.getProducts.and.returnValue(of([]));
    component.editProduct(productStub)
    expect(dialog.open).toHaveBeenCalled();
  });

  describe('should test deleteProduct', () => {
    it('should test deleteProduct on success', () => {
      spyOn(component,'getProducts');

      const productStub:Product ={
        id:'1',
        title: '',
        price: '',
        description: '',
        category: ''
      }

      mockProductService.deleteProduct.and.returnValue( of(productStub))
      component.deleteProduct(productStub)
      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(productStub.id);
      expect(matSnackBar.open).toHaveBeenCalledWith('Deleted Successfully!...', '', { duration: 3000 });
    });

    it('should test deleteProduct on failure', () => {
        const productStub:Product ={
        id:'1',
        title: '',
        price: '',
        description: '',
        category: ''        
        }

        mockProductService.deleteProduct.and.returnValue( throwError(()=> new Error('erro sumulado')))
        component.deleteProduct(productStub)
        fixture.detectChanges();
        expect(mockProductService.deleteProduct).toHaveBeenCalledWith(productStub.id);
        expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '',{ duration: 3000 });

    });
  });
});
