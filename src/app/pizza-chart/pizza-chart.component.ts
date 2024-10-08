import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { PizzaChartDataService } from '../services/pizza-chart-data.service';

@Component({
  selector: 'app-pizza-chart',
  standalone: true,
  templateUrl: './pizza-chart.component.html',
  styleUrls: ['./pizza-chart.component.css', './media-querie.css'],
  imports: [CommonModule, NgxChartsModule]
})
export class PizzaChartComponent implements OnInit {

  pieChartData: any[] = [];

  // Atualizando o esquema de cores para usar ScaleType.Ordinal
  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#8E44AD', '#33FF57', '#87CEEB', '#F1C40F', '#9B59B6']








  };

  width: number = 210;
  height: number = 400;
  innerRadius: number = 0.5;
 

  constructor(private pizzaChartDataService: PizzaChartDataService) { }

  ngOnInit(): void {
    this.pizzaChartDataService.getPieChartData().subscribe({
      next: (data: any[]) => {
        // Limita os dados para os 4 primeiros itens
        this.pieChartData = data.slice(0, 4).map(item => ({
          name: item.nome,
          value: item.valorEstoque
        }));
      },
      error: (err: any) => {
        console.error('Erro ao carregar dados do gráfico:', err);
      }
    });
  }

  onSelect(event: any): void {
    console.log('Item selecionado:', event);
  }
}
