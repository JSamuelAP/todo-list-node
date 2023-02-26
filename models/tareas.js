const Tarea = require("./tarea");

class Tareas {
	_listado = {};

	constructor() {
		this._listado = {};
	}

	get listadoArr() {
		const listado = [];
		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});

		return listado;
	}

	crearTarea(desc = "") {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	cargarTareasFromArray(tareas = []) {
		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	}

	listadoCompleto() {
		console.log();
		this.listadoArr.forEach((tarea, index) => {
			const { desc, completadoEl } = tarea;
			const i = `${index + 1}.`.green;
			const estado = completadoEl ? "Completado".green : "Pendiente".red;

			console.log(`${i} ${desc} :: ${estado}`);
		});
	}

	listarPendientes(completadas = true) {
		let contador = 0;

		console.log();
		this.listadoArr.forEach((tarea) => {
			const { desc, completadoEl } = tarea;
			const estado = completadoEl ? "Completado".green : "Pendiente".red;

			if (completadas && completadoEl) {
				contador++,
					console.log(
						`${(contador + ".").green} ${desc} :: ${completadoEl.green}`
					);
			} else if (!completadas && !completadoEl) {
				contador++,
					console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
			}
		});
	}

	borrarTarea(id = "") {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}

	toggleCompletadas(ids = []) {
		ids.forEach((id) => {
			const tarea = this._listado[id];
			if (!tarea.completadoEl) {
				tarea.completadoEl = new Date().toISOString();
			}
		});

		this.listadoArr.forEach((tarea) => {
			if (!ids.includes(tarea.id)) this._listado[tarea.id].completadoEl = null;
		});
	}
}

module.exports = Tareas;
