import { contarPendientesHtml } from "../js/componentes";
import { Todo } from "./todo.class";


export class TodoList {


    constructor(){

        this.cargarLocalstorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
        contarPendientesHtml();
    }

    eliminarTodo (id){
        
        this.todos=this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
        contarPendientesHtml();
    }

    marcarCompletado (id){

        for (const todo of this.todos ){

            
            if (id == todo.id){

                todo.completado=!todo.completado;
                
                this.guardarLocalStorage();
                break;
            }
        }
        
        contarPendientesHtml();
    }

    eliminarCompletados(){
        // this.todos=this.todos.filter(todo => todo.completado===false);//asi lo hice yo
        this.todos=this.todos.filter(todo => !todo.completado);//asi lo hiso el profe
        this.guardarLocalStorage();
        
    }

    contarPendientes(){
        let pendientes=0;
        
        for (const todo of this.todos){

            if(!todo.completado){
                pendientes++;
            }
        }
        
        return pendientes;
    }

    guardarLocalStorage(){

        localStorage.setItem('todos',JSON.stringify(this.todos));

    }

    cargarLocalstorage(){

        this.todos = (localStorage.getItem('todos'))
                   ? JSON.parse(localStorage.getItem('todos')) 
                   : [];

        this.todos = this.todos.map(todo=>Todo.fromJson(todo));
    }
}