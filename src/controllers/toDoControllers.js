const tarefasJson = require("../models/tarefas.json");


const getAll = (request, response) => {
    response.status(200).send(tarefasJson);
};

const getById = (request, response) => {
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    response.status(200).send(tarefaFiltrada)
}

const createTask = (request, response) => {
    const descricaoRequirida = request.body.descricao
    const nomeRequirido = request.body.nomeColaborador

    const novaTarefa = {
        id: Math.random().toString(32).substr(2, 9),
        dataInclusao: new Date(),
        concluido: false,
        descricao: descricaoRequirida,
        nomeColaborador: nomeRequirido
    }

    tarefasJson.push(novaTarefa)

    response.status(200).send(novaTarefa)

}

const deleteTask = (request, response) => {
    const idRequirido = request.params.id;
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido);

    const indice = tarefasJson.indexOf(tarefaFiltrada);
    tarefasJson.splice(indice, 1);

    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        tarefasJson
    }]);

};

const replaceTask = (request, response)=>{
    const idRequirido = request.params.id
    const taskFromBody = request.body; 
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    let  updateTasks ={
    "id": tarefaFiltrada.id,
    "dataInclusao": tarefaFiltrada.dataInclusao,
    "concluido": taskFromBody.concluido,
    "descricao": taskFromBody.descricao,
    "nomeColaborador": taskFromBody.nomeColaborador
 
}
const indice = tarefasJson.indexOf(tarefaFiltrada);
tarefasJson.splice(indice, 1, updateTasks);

response.status(200).send ({

    "message": "Tarefa substituida com sucesso",
    updateTasks
});
};

const updateTitle = (request, response) => {
    const idRequirido = request.params.id;
    const newTitle = request.body;

    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    tarefaFiltrada.titulo = newTitle;

    response.status(200).send({

        "message": "Título atualizado com sucesso! 😉", 
        tarefaFiltrada
    });


};

const updateAnything = (request, response) => {
    const idRequirido = request.params.id;
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido);
    const updateTasks = request.body;

    let keyList = objects.keys(updateTasks);
        keyList.forEach((key) =>{
            console.log('chave', key)
            console.log('')

            tarefaFiltrada[key] = updateTasks[key];
        });

        response.status(200).send({
            "message": "Tarefa atualizado com sucesso! "
        })
}

module.exports = {
    getAll,
    getById,
    createTask,
    deleteTask,
    replaceTask,
    updateTitle,
    updateAnything

}