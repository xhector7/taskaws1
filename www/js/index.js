/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    carregarTasques();

    $("#llistaTasques").sortable({
        update: function () {
            guardarTasques();
        }
    });

    document.getElementById("afegirTasca")
        .addEventListener("click", afegirTasca);
}

function afegirTasca() {

    let text = prompt("Introdueix una nova tasca:");

    if (!text || text.trim() === "") {
        return;
    }

    crearTasca(text);

    guardarTasques();
}

function crearTasca(text) {

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = text;

    li.appendChild(span);

    let btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";

    btnEditar.addEventListener("click", function () {

        let nouText = prompt(
            "Edita la tasca:",
            span.textContent
        );

        if (nouText && nouText.trim() !== "") {

            span.textContent = nouText;

            guardarTasques();
        }
    });

    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";

    btnEliminar.addEventListener("click", function () {

        li.remove();

        guardarTasques();
    });

    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);

    document
        .getElementById("llistaTasques")
        .appendChild(li);
}

function guardarTasques() {

    let tasques = [];

    document
        .querySelectorAll("#llistaTasques li span")
        .forEach(span => {

            tasques.push(span.textContent);

        });

    localStorage.setItem(
        "tasques",
        JSON.stringify(tasques)
    );
}

function carregarTasques() {

    let tasques =
        JSON.parse(
            localStorage.getItem("tasques")
        ) || [];

    tasques.forEach(tasca => {
        crearTasca(tasca);
    });
}