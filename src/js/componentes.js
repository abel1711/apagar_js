
import { Todo, TodoList } from "../class";
import { todoList } from '../index.js'

//referencias en el Html

const divTodoList	   =document.querySelector('.todo-list');
const txtImput	 	   =document.querySelector('.new-todo');
const borrarCompletados=document.querySelector('.clear-completed');
const ulFilters		   =document.querySelector('.filters');
const anchorFilters	   =document.querySelectorAll('.filtro');
const footerPendientes  =document.querySelector('#divPendientes');

export const crearTodoHtml = (todo)=> { //creamos un metodo para el html
	
    const todoHtml=`
    <li class="${(todo.completado)? 'completed':''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
				<label>${todo.tarea}</label>
					<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li> -->`;

    const div=document.createElement('div');
    div.innerHTML=todoHtml;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;



};

export const contarPendientesHtml = ()=>{
	footerPendientes.innerHTML='';
	const htmlPendientes =`<span class="todo-count"><strong>${todoList.contarPendientes()}</strong> pendiente(s)</span>`

	const newDiv=document.createElement('div');
	newDiv.innerHTML=htmlPendientes;
	footerPendientes.append(newDiv);
	
	return newDiv;

};
//eventos

txtImput.addEventListener('keyup',(event)=>{

	if (event.keyCode === 13 && txtImput.value.length > 0){

		const nuevoTodo = new Todo(txtImput.value);
		todoList.nuevoTodo(nuevoTodo);

		crearTodoHtml(nuevoTodo);
		
		txtImput.value='';
	}

});


divTodoList.addEventListener('click', (event)=>{

	const nombreElemento = event.target.localName; //input, label, button.destroy
	const todoElemento 	 = event.target.parentElement.parentElement;
	const idElemento	 = todoElemento.getAttribute('data-id');


	if (nombreElemento.includes('input')){ //click en el check
		todoList.marcarCompletado(idElemento);
		todoElemento.classList.toggle('completed');
	}
	else if (nombreElemento.includes('button')){

		todoList.eliminarTodo(idElemento);
		divTodoList.removeChild(todoElemento);                      
	}

});

borrarCompletados.addEventListener('click',()=>{

	todoList.eliminarCompletados();

	for (let i=divTodoList.children.length-1; i>=0 ; i--){

		const elemento=divTodoList.children[i];
		
		if(elemento.classList.contains('completed')){
			divTodoList.removeChild(elemento);
		}
	}
	
});


ulFilters.addEventListener('click' , (event)=>{

	const filtro= event.target.text;
	if (!filtro){return;}
	
	anchorFilters.forEach(elemt => elemt.classList.remove('selected'));
	event.target.classList.add('selected');
		
	for (const elemento of divTodoList.children){

		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');
		switch (filtro) {
			case 'Pendientes':
				if (completado){
					elemento.classList.add('hidden');
				}				
				break;
				
			case 'Pagados':
				if (!completado){
					elemento.classList.add('hidden');
				}
				break;
		}

	}
 
});