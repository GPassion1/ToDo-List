import React, { useState, useEffect } from "react";
import './TodoList.css';
import Icone from './assets/icon.png';

function TodoList(){
    
    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState( listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect( () => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista])

    function adicionaItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setLista([...lista, {text:novoItem, isCompleted: false}]);
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaTudo(){
        setLista([]);
    }

    return (
        <>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input id="input-entrada" type="text" placeholder="Adicione uma Tarefa" value={novoItem} onChange={ (e)=>{ setNovoItem(e.target.value) } } />
                <button type="submit" className="add">Add</button>
            </form>
            <div className="lista__tarefas">

                <div style={{ textAlign:'center' }}>
                {
                    lista.length <1
                    ?
                    <img className="icone__central" src={Icone} />
                    :
                    lista.map((item, index)=> (
                        <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                    <span onClick={()=>{clicou(index)}}>{item.text}</span>
                    <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
                    </div>
                    ))
                }
                </div>
                {
                    lista.length > 0 && <button onClick={()=>{deletaTudo()}} className="deleteall">Deletar Todas</button>
                }
                
            </div>
        </>
    )
}

export default TodoList