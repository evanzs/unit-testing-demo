import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';




describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  const productStub:Product ={
        id:'1',
        title: 'Produto A',
        price: '',
        description: '',
        category: ''
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    service.getProducts().subscribe((response)=>{
      expect(response).toEqual([productStub])
    })

    const req = httpController.expectOne(environment.baseAPI+'products')
    expect(req.request.method).toEqual('GET');
    req.flush([productStub]);
  });

  it('should test saveProducts', () => {
    
    service.saveProduct(productStub).subscribe((response)=>{
      expect(response).toEqual(productStub)
    })

    const req = httpController.expectOne(environment.baseAPI+'products')
    expect(req.request.method).toEqual('POST');
    req.flush(productStub);
  });

  it('should test updateProduct', () => {
        service.updateProduct(productStub).subscribe((response)=>{
      expect(response).toEqual(productStub)
    })

    const req = httpController.expectOne(environment.baseAPI+'products/'+productStub.id)
    expect(req.request.method).toEqual('PUT');
    req.flush(productStub);
  });

  it('should test deleteProduct', () => {
        service.deleteProduct(1).subscribe((response)=>{
      expect(response).toEqual(productStub)
    })

    const req = httpController.expectOne(environment.baseAPI+'products/'+productStub.id)
    expect(req.request.method).toEqual('DELETE');
    req.flush(productStub);
  });
});
