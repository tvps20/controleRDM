import { Injectable } from "@angular/core";
import * as dialogs from 'ui/dialogs';
import * as Toast from 'nativescript-toast';

import { Disciplina } from "~/shared/models/disciplina.model";
import { Horario } from "~/shared/models/horario.model";
import { Status } from '~/shared/statusDisciplina';
import { HoraExtra } from "~/shared/models/horaExtra.model";


@Injectable()
export class DisciplinaService {

  private countHorario: number = 0;

  public calcularMedia(disciplina: Disciplina){
    if(disciplina.notaFinal)
      return this.mediaFinal(disciplina);
    else
      return this.mediaAritimetrica(disciplina); 
  }
  
  public mediaAritimetrica(disciplina: Disciplina){
    var media: number = (+disciplina.primeiraNota) + (+disciplina.segundaNota) + (+disciplina.terceiraNota) + (+disciplina.quartaNota);
     
    return parseFloat((media/4).toFixed(2));
  } 

  public mediaFinal(disciplina: Disciplina){
    var media: number = this.mediaAritimetrica(disciplina);
    var mediaFinal = ((media*0.6) + (+disciplina.notaFinal*0.4));

    return parseFloat(mediaFinal.toFixed(2));
  }

  public calculoCRE(listaDeDisciplinasFechadas: Array<Disciplina>){
    let nota: number = 0;
    let totalCargaHoraria: number = 0;

    if(!this.haveDisciplina(listaDeDisciplinasFechadas)){
    
      listaDeDisciplinasFechadas.forEach(element => {
        nota += this.calcularMedia(element) * element.cargaHoraria;
        totalCargaHoraria += element.cargaHoraria; 
      });

      let cre = nota/totalCargaHoraria

      return parseFloat(cre.toFixed(2));

    } else {
      return 0;
    }
  }

  public calculoPrecisaoCRE(listaDeDisciplinasAbertas: Array<Disciplina>, listaDeDisciplinasFechadas: Array<Disciplina>){
    let nota: number = 0;
    let totalCargaHoraria: number = 0;

    if(!this.haveDisciplina(listaDeDisciplinasAbertas) || !this.haveDisciplina(listaDeDisciplinasFechadas)){
      listaDeDisciplinasAbertas.forEach(element => {
        nota += this.calcularMedia(element) * element.cargaHoraria;
        totalCargaHoraria += element.cargaHoraria; 
      });
      
      listaDeDisciplinasFechadas.forEach(element => {
        nota += this.calcularMedia(element) * element.cargaHoraria;
        totalCargaHoraria += element.cargaHoraria;

      });
      
      let previsaCre = nota/totalCargaHoraria

      return parseFloat(previsaCre.toFixed(2));

    } else {
      return 0;
    }
  }

  public calcularChAcumulada(listaDeDisciplinasFechadas: Array<Disciplina>, listaHorasExras: Array<HoraExtra>){
    let totalCargaHoraria: number = 0;

    listaDeDisciplinasFechadas.forEach(element => {
      if(element.status != Status.Reprovado)
        totalCargaHoraria += element.cargaHoraria;
    });

    listaHorasExras.forEach(element => {
      totalCargaHoraria += element.cargaHoraria;
    });

    return totalCargaHoraria;
  }

  public previsaoDeNota(disciplina: Disciplina){
    let somaNotas = (+disciplina.primeiraNota) + (+disciplina.segundaNota) + (+disciplina.terceiraNota) + (+disciplina.quartaNota);
    let countNotas = this.verificaNotas(disciplina);
    
    if(countNotas < 4 && somaNotas <= 28){
      return (28 - somaNotas).toFixed(2);
    } else if(countNotas < 4 && somaNotas >= 28){
      // Aprovado
      return 0
    } else if(countNotas == 4){
      if(somaNotas >= 28){
        // Aprovado
        return 0
      } else if(somaNotas < 16){
        // Reprovado
        return -1
      } else {
        if(disciplina.notaFinal || disciplina.notaFinal === 0){
          let media: number = this.calcularMedia(disciplina)
          
          if(media >= 5 ){
            // Aprovado
            return 0
          }
          else {
            // Reprovado
            return -1
          }
        } else {
          let mediaParcial = (this.mediaAritimetrica(disciplina) * 6)
          let total = 50 - mediaParcial;
          
          return parseFloat((total/4).toFixed(2));
        }
      }
    }
  }

  private verificaNotas(disciplina: Disciplina){
    let countNota: number = 0;

    if(disciplina.primeiraNota || disciplina.primeiraNota === 0)
      countNota++
    if(disciplina.segundaNota || disciplina.segundaNota === 0)
      countNota++
    if(disciplina.terceiraNota || disciplina.terceiraNota === 0)
      countNota++
    if(disciplina.quartaNota || disciplina.quartaNota === 0)
      countNota++

    return countNota;
  }

  public setNewHorario(newHorario: Horario, horarios: Array<Horario>){
    if(newHorario){
        newHorario.id = ++this.countHorario;
        horarios.push(newHorario);
        Toast.makeText("Horário adicionado").show();
    }
}

  public deleteHorario(horario: Horario, horarios: Array<Horario>){
    dialogs.confirm({title: "Apagar", message: "Deseja realmente excluir este horario?", okButtonText: "Sim", cancelButtonText: "Cancelar",}).then(result => {
        if(result) {
            for (var i = 0; i < horarios.length; i++) {
                if (horarios[i].id === horario.id) {
                    horarios.splice(i, 1);
                    Toast.makeText("Horário Apagado").show();
                    break;
                }
            }
        }
    })
  }

  public haveHorario(horarios: Array<Horario>){
    if(horarios.length <= 0){
        return true
    } else {
        return false;
    }
  }

  public haveDisciplina(disciplinas: Array<Disciplina>){
    if(disciplinas.length <= 0){
        return true
    } else {
        return false;
    }
  }
}