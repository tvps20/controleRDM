import { Injectable } from "@angular/core";
import { Disciplina } from "~/shared/models/disciplina.model";

var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DataBaseService {

    private createDB(){
        return new Promise((resolve, reject) => {
            return (new Sqlite("controleCRE.db")).then(db => {
                db.execSQL("CREATE TABLE IF NOT EXISTS disciplinas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, professor TEXT, cargaHoraria INTEGER, horario TEXT, sala TEXT, isClosed NUMERIC, status STRING, primeiraNota REAL, segundaNota REAL, terceiraNota REAL, quartaNota REAL, notaFinal REAL)").then(id => {
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

    public insert(disciplina: Disciplina){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                res.execSQL("INSERT INTO disciplinas (nome, professor) VALUES (?,?)", [disciplina.nome, disciplina.professor]).then(id => {
                    console.log("INSERT RESULT: ", id);
                    resolve(true);
                }, error => {
                    console.log("[DATABASE] - INSERT FAILED!", error);
                    reject(false);
                })
            })
        });
    }

    public getAll(){
        return new Promise((resolve, reject) => {
            this.createDB().then((res: any) => {
                return res.all("SELECT * FROM disciplinas").then(rows => {
                    let result: any[] = [];
                    for(let row in rows){
                        result.push({
                            "id": rows[row][0],
                            "nome": rows[row][1],
                            "professor": rows[row][2],
                            "cargaHoraria": rows[row][3],
                            "horario": rows[row][4],
                            "sala": rows[row][5],
                            "isClosed": rows[row][6],
                            "status": rows[row][7],
                            "primeiraNota": rows[row][8],
                            "segundaNota": rows[row][9],
                            "terceiraNota": rows[row][10],
                            "quartaNota": rows[row][11],
                            "notaFinal": rows[row][12]
                        });
                    }
                    resolve(result);
                }, error => {
                    console.log("[DATABASE] - SELECT ERROR!");
                    reject(error);
                });
            })              
        });
    }

}