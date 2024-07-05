// Paso 1: Crear el componente (Ejecutar en terminal)
// ng generate component time-picker

// Paso 2-7: Implementación del componente
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  hour: number = 0;
  minute: number = 0;

  @Output() timeChange = new EventEmitter<{ hour: number, minute: number }>();

  changeHour(amount: number): void {
    this.hour = (this.hour + amount + 24) % 24;
    this.emitTimeChange();
  }

  changeMinute(amount: number): void {
    const newMinute = this.minute + amount;
    if (newMinute > 59) {
      this.minute = 0;
      this.changeHour(1); // Incrementa la hora si los minutos superan los 59
    } else if (newMinute < 0) {
      this.minute = 59;
      this.changeHour(-1); // Decrementa la hora si los minutos son menores que 0
    } else {
      this.minute = newMinute;
    }
    this.emitTimeChange();
  }

  onHourChange(event: Event): void {
    const target = event.target as HTMLInputElement; // Aserción de tipo aquí
    let newHour = parseInt(target.value, 10);
    if (!isNaN(newHour) && newHour >= 0 && newHour <= 23) {
      this.hour = newHour;
    } else {
      // Opcional: manejar valores inválidos, como resetear a un valor por defecto o mostrar un mensaje de error.
    }
    this.emitTimeChange();
  }

  onMinuteChange(event: Event): void {
    const target = event.target as HTMLInputElement; // Aserción de tipo
    let newMinute = parseInt(target.value, 10);
    if (!isNaN(newMinute) && newMinute >= 0 && newMinute <= 59) {
      this.minute = newMinute;
    } else {
      // Opcional: manejar valores inválidos
    }
    this.emitTimeChange();
  }

  emitTimeChange(): void {
    this.timeChange.emit({ hour: this.hour, minute: this.minute });
  }
}