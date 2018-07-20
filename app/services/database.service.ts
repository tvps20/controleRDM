import { Injectable } from "@angular/core";
import { Disciplina } from "~/shared/models/disciplina.model";
import { Horario } from "~/shared/models/horario.model";
import { HoraExtra } from "~/shared/models/horaExtra.model"

var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DataBaseService {

    private createDB(){
        return new Promise((resolve, reject) => {
            return (new Sqlite("controleCRE.db")).then(db => {
                db.execSQL("CREATE TABLE IF NOT EXISTS disciplinas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, professor TEXT, cargaHoraria INTEGER, isClosed NUMERIC, status STRING, primeiraNota REAL, segundaNota REAL, terceiraNota REAL, quartaNota REAL, notaFinal REAL)").then(id => {
                    db.execSQL("CREATE TABLE IF NOT EXISTS horarios (id INTEGER PRIMARY KEY AUTOINCREMENT, sala TEXT, dia TEXT, hora TEXT, qtdAulas INTEGER, idDisciplina INTEGER, nomeDisciplina TEXT)")
                    db.execSQL("CREATE TABLE IF NOT EXISTS horasExtra (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cargaHoraria INTEGER)");
                    resolve(db);
                }, error => {
                    console.log("[DATABASE] - ERROR CREATE TABLE!", error);
                    reject(error);
                });
            }, error => {
                console.log("[DATABASE] - ERROR OPEM DB!", error);
                reject(error);
            }); 
        }) 
    }

    // Rotinas para as disciplinas
    public insert(disciplina: Disciplina){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("INSERT INTO disciplinas (nome, professor, cargaHoraria, isClosed, status, primeiraNota, segundaNota, terceiraNota, quartaNota, notaFinal) VALUES (?,?,?,?,?,?,?,?,?,?)", [disciplina.nome, disciplina.professor, disciplina.cargaHoraria, disciplina.isClosed, disciplina.status, disciplina.primeiraNota, disciplina.segundaNota, disciplina.terceiraNota, disciplina.quartaNota, disciplina.notaFinal]).then(id => {
                    console.log("INSERT RESULT: ", id);
                    resolve(id);
                }, error => {
                    console.log("[DATABASE] - INSERT FAILED!", error);
                    reject(false);
                })
            })
        });
    }

    public update(disciplina: Disciplina){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("UPDATE disciplinas SET nome = ?, professor = ?, cargaHoraria = ?,  isClosed = ?, status = ?, primeiraNota = ?, segundaNota = ?, terceiraNota = ?, quartaNota = ?, notaFinal = ? WHERE id = ?", [disciplina.nome, disciplina.professor, disciplina.cargaHoraria, disciplina.isClosed, disciplina.status, disciplina.primeiraNota, disciplina.segundaNota, disciplina.terceiraNota, disciplina.quartaNota, disciplina.notaFinal, disciplina.id]).then(() => {
                    console.log("UPDATE RESULT: ", disciplina.id);
                    resolve(true);
                }, error => {
                    console.log("[DATABASE] - UPDATE FAILED!", error);
                    reject(false);
                })
            })
        })
    }

    public delete(id: number){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("DELETE FROM disciplinas WHERE id=" + id).then(id => {
                    console.log("DELETE RESULT: ", id);
                    resolve(true);
                }, error => {
                    console.log("[DATABASE] - DELETE FAILED!", error);
                    reject(false);
                })
            })
        })
    }

    // Retorna um objeto do tipo Disciplina
    public getDisciplina(id: number){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.get("SELECT * FROM disciplinas WHERE id=?", [id]).then(rows => {
                    let result: Disciplina = new Disciplina('', undefined);
                    
                    result.id = rows[0];
                    result.nome = rows[1];
                    result.professor = rows[2];
                    result.cargaHoraria = rows[3];
                    result.isClosed = rows[4];
                    result.status = rows[5];
                    result.primeiraNota = rows[6];
                    result.segundaNota = rows[7];
                    result.terceiraNota = rows[8];
                    result.quartaNota = rows[9];
                    result.notaFinal = rows[10];
                    
                    resolve(result);
                }, error => {
                    console.log("[DATABASE] - SELECT ERROR!");
                    reject(error);
                })
            })
        })
    }

    // Retorna um array de objetos do tipo Disciplina
    public getAll(){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT * FROM disciplinas").then(rows => {
                    let results: Disciplina[] = [];
                    for(let row in rows){
                        let result: Disciplina = new Disciplina('', undefined);

                        result.id = rows[row][0];
                        result.nome = rows[row][1];
                        result.professor = rows[row][2];
                        result.cargaHoraria = rows[row][3];
                        result.isClosed = rows[row][4];
                        result.status = rows[row][5];
                        result.primeiraNota = rows[row][6];
                        result.segundaNota = rows[row][7];
                        result.terceiraNota = rows[row][8];
                        result.quartaNota = rows[row][9];
                        result.notaFinal = rows[row][10];

                        results.push(result);
                    }
                    resolve(results);
                }, error => {
                    console.log("[DATABASE] - SELECT ERROR!");
                    reject(error);
                });
            })              
        });
    }   


    // Rotinas para os horários
    public insertHorario(horario: Horario){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("INSERT INTO horarios (sala, dia, hora, qtdAulas, idDisciplina, nomeDisciplina) VALUES (?, ?, ?, ?, ?, ?)", [horario.sala, horario.dia, horario.hora, horario.qtdAulas, horario.idDisciplina, horario.nomeDisciplina]).then( id => {
                    console.log("INSERT horario RESULT: ", id);
                    resolve(true);
                }, error => {
                    console.log("[DATABASE] - INSERT horario FAILED!", error);
                    reject(false);
                })
            })
        })
    }


    public deleteHorarios(idDisciplina: number){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("DELETE FROM horarios WHERE idDisciplina=" + idDisciplina).then(id => {
                    console.log("DELETE horario RESULT: ", id);
                    resolve(true);
                }, error => {
                    console.log("[DATABASE] - DELETE horario FAILED!", error);
                    reject(false);
                })
            })
        })
    }

    // Retorna um objeto do tipo Horario
    public getAllHorariosDisciplina(idDisciplina: number){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT * FROM horarios WHERE idDisciplina=?", [idDisciplina]).then(rows => {
                    let results: Horario[] = [];
                    for(let row in rows){
                        let result: Horario = new Horario(2, undefined);

                        result.id = rows[row][0];
                        result.sala = rows[row][1];
                        result.dia = rows[row][2];
                        result.hora = rows[row][3];
                        result.qtdAulas = rows[row][4];
                        result.idDisciplina = rows[row][5];
                        result.nomeDisciplina = rows[row][6];

                        results.push(result);
                    }
                    resolve(results);
                }, error => {
                    console.log("[DATABASE] - SELECT horario ERROR!");
                    reject(error);
                });
            })              
        });
    }

    public getAllHorarioDia(dia: string){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT * FROM horarios WHERE dia=?", [dia]).then(rows => {
                    let results: Horario[] = [];
                    for(let row in rows){
                        let result: Horario = new Horario(2, undefined);

                        result.id = rows[row][0];
                        result.sala = rows[row][1];
                        result.dia = rows[row][2];
                        result.hora = rows[row][3];
                        result.qtdAulas = rows[row][4];
                        result.idDisciplina = rows[row][5];
                        result.nomeDisciplina = rows[row][6];

                        results.push(result);
                    }
                    resolve(results);
                }, error => {
                    console.log("[DATABASE] - SELECT horario ERROR!");
                    reject(error);
                });
            })              
        });
    }


    // Rotinas para horas Extras

    public insertHoraExtra(horaExtra: HoraExtra){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("INSERT INTO horasExtra (nome, cargaHoraria) VALUES (?, ?)", [horaExtra.nome, horaExtra.cargaHoraria]).then( id => {
                    console.log("INSERT horasExtra RESULT: ", id);
                    resolve(true);
                }, error => {
                    console.log("[DATABASE] - INSERT horasExtra FAILED!", error);
                    reject(false);
                })
            })
        })
    }

    // Retorna um objeto do tipo Horario
    public getAllHorasExtra(){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT * FROM horasExtra ").then(rows => {
                    let results: HoraExtra[] = [];
                    for(let row in rows){
                        let result: HoraExtra = new HoraExtra();

                        result.id = rows[row][0];
                        result.nome = rows[row][1];
                        result.cargaHoraria = rows[row][2];

                        results.push(result);
                    }
                    resolve(results);
                }, error => {
                    console.log("[DATABASE] - SELECT horasExtra ERROR!");
                    reject(error);
                });
            })              
        });
    }

    public deleteHoraExtra(id: number){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("DELETE FROM horasExtra WHERE id=" + id).then(id => {
                    console.log("DELETE horasExtra RESULT: ", id);
                    resolve(true);
                }, error => {
                    console.log("[DATABASE] - DELETE horasExtra FAILED!", error);
                    reject(false);
                })
            })
        })
    }
}
