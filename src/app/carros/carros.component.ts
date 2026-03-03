import { Component, OnInit, inject, signal } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-carros',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './carros.component.html',
  styleUrl: './carros.component.css'
})
export class CarrosComponent implements OnInit {

  private carService = inject(CarService);

  // Signal para a lista de carros (reatividade sem RxJS no template)
  cars = signal<Car[]>([]);

  // Objeto simples para o two-way binding do formulário (ngModel)
  car: Car = {} as Car;

  ngOnInit(): void {
    this.getCars();
  }

  /** Busca todos os carros e atualiza o signal */
  getCars(): void {
    this.carService.getCars().subscribe({
      next: (data) => this.cars.set(data),
      error: (err) => console.error('Erro ao carregar carros:', err)
    });
  }

  /**
   * Decide se cria (POST) ou atualiza (PUT) baseado no ID.
   * Bug corrigido: o código original só tratava a atualização.
   */
  saveCar(form: NgForm): void {
    if (this.car.id !== undefined) {
      this.carService.updateCar(this.car).subscribe({
        next: () => this.cleanForm(form),
        error: (err) => console.error('Erro ao atualizar carro:', err)
      });
    } else {
      this.carService.saveCar(this.car).subscribe({
        next: () => this.cleanForm(form),
        error: (err) => console.error('Erro ao criar carro:', err)
      });
    }
  }

  /** Copia o carro selecionado para o formulário de edição */
  editCar(car: Car): void {
    this.car = { ...car };
  }

  /** Remove o carro e recarrega a lista */
  deleteCar(car: Car): void {
    this.carService.deleteCar(car).subscribe({
      next: () => this.getCars(),
      error: (err) => console.error('Erro ao deletar carro:', err)
    });
  }

  /** Limpa o formulário e recarrega a lista */
  cleanForm(form: NgForm): void {
    form.resetForm();
    this.car = {} as Car;
    this.getCars();
  }
}
