$(function () {

    var contenido = $(".contenido")

    $.ajax({
        type: "GET",
        url: "http://localhost:5000/api/v1/all",
        dataType: "json",
        success: function (data) {

            var total = data.length

            for (var i = 0; i < total; i++) {

                $(contenido).append(`
                <tr>
                <td class="nombre">${data[i].nombre}</td>
                <td class="apellido">${data[i].apellido}</td>
                <td class="telefono">${data[i].telefono}</td>
                <td class="email">${data[i].email}</td>
                <td class="botones1">
                    <button type="button" class="btn btn-editar botones" id="editar_${data[i].id}"><i class="fa-regular fa-pen-to-square"></i>Editar</button>
                    <button type="button" class="btn btn-borrar botones" id="borrar_${data[i].id}"><i class="fa-regular fa-circle-xmark"></i>Borrar</button>
                </td>
                </tr>
                `
                )
            }

            $(".btn-agregar").click(function () {
                $("#modalCrear").modal("show");
            })


            $(".btn-guardar").click(function () {
                var nombre = $("#nombre").val();
                var apellido = $("#apellido").val();
                var telefono = $("#telefono").val();
                var email = $("#email").val();

                var datos = {
                    nombre: nombre,
                    apellido: apellido,
                    telefono: telefono,
                    email: email
                }

                if (nombre == "" || nombre == null) {
                    $("#nombre").addClass("red-border");
                } else {
                    $("#nombre").removeClass("red-border");
                }

                if (apellido == "" || apellido == null) {
                    $("#apellido").addClass("red-border");
                } else {
                    $("#apellido").removeClass("red-border");
                }

                if (telefono == "" || telefono == null) {
                    $("#telefono").addClass("red-border");
                } else {
                    $("#telefono").removeClass("red-border");
                }

                if (email == "" || email == null) {
                    $("#email").addClass("red-border");
                } else {
                    $("#email").removeClass("red-border");
                }

                $("input").focusout(function () {
                    if ($(this).val() == "" || $(this).val() == null) {
                        $(this).addClass("red-border")
                    } else {
                        $(this).removeClass("red-border")
                    }
                })

                if ($("input").hasClass("red-border")) {
                    alert("Revisa los campos en rojo")
                } else {
                    agregar(datos);

                }

            })
        editar();
        eliminar();
        },
        error: function (err) {
            console.log(err)
            console.log("No se encontro data")
        }
        
    })
    

    
    $(".buscador").on('keypress', function (e) {
        if (e.which == 13) {
            var nombre = $(".buscador").val()
            // var datos = '\ nombre '\

            if (nombre == null || nombre == "") {
                alert("Introduce una busqueda");
            }
            $.ajax({
                type: "GET",
                url: "http://localhost:5000/api/v1/buscar",
                data: { nombre: nombre },
                dataType: "json",
                async: true,
                contentType: "application/json",
                success: function (data) {
                    $(contenido).html(`
                    <tr>
                    <td class="nombre">${data[0].nombre}</td>
                    <td class="apellido">${data[0].apellido}</td>
                    <td class="telefono">${data[0].telefono}</td>
                    <td class="email">${data[0].email}</td>
                    <td class="botones1">
                        <button type="button" class="btn btn-outline-primary btn-editar botones" id="editar_${data[0].id}"><i class="fa-regular fa-pen-to-square"></i>Editar</button>
                        <button type="button" class="btn btn-outline-primary btn-borrar botones" id="borrar_${data[0].id}"><i class="fa-regular fa-circle-xmark"></i>Borrar</button>
                    </td>
                    </tr>
                    `
                    )
                    editar();
                    eliminar();
                },
                error: function () {
                    alert(res.mensaje)
                }
            })

        }
    });


    function eliminar() {
        $('[id^="borrar_"]').click(function () {
            var id = $(this).attr("id").replace("borrar_", "")
            if (confirm("¿Eliminar este registro?")) {
                $.ajax({
                    type: "DELETE",
                    url: "http://localhost:5000/api/v1/borrareg/" + id,
                    success: function (res) {
                        
                        if (res) {
                            alert("Registro eliminado correctamente");
                            setTimeout(() => {
                                location.href = "http://localhost:5000"
                            }, 1000);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                        alert(res.mensaje)
                    }
                })
            }
        })
    }

    function agregar(datos) {

        
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/api/v1/nuevoreg",
            contentType: "application/json",
            data: JSON.stringify(datos),
            async: true,
            responseText: "Registro insertado",
            success: function (res) {
                console.log(res)
                if (res.estado) {
                    alert("Registrado correctamente");
                    setTimeout(() => {
                        location.href = "http://localhost:5000"
                    }, 1000);
                }else{
                    alert(res.mensaje)
                }
            },
            error: function (err) {
                console.log(err);
                alert(res.mensaje)
            }
        })
    }

    function guardared(datos) {

        
        $.ajax({
            method: "PUT",
            url: "http://localhost:5000/api/v1/actualizareg",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(datos),
            async: true,
            success: function (res) {
                if (res) {
                    alert("Registro actualizado correctamente");
                    setTimeout(() => {
                        location.href = "http://localhost:5000"
                    }, 1000);
                }
            },
            error: function (err) {
                console.log(err)
                alert(res.mensaje)
            }
        })
    }


    function editar(){
        $('[id^="editar_"]').click(function () {
            var id = $(this).attr("id").replace("editar_", "")
            $.ajax({
                type: "GET",
                url: "http://localhost:5000/api/v1/buscareg",
                dataType: "json",
                contentType: "application/json",
                data: { id: id },
                success: function (data) {

                    $(".modaled").html('<div class="modal fade" id="modalEditar"><div class="modal-dialog"><div class="modal-content"><div class="modal-header centrarmodal modalheader">Editar usuario </div><div class="modal-body centrarmodal"><i class="fa-solid fa-user"></i><i class="fa-solid fa-phone-flip"></i><i class= "fa-solid fa-envelope" ></i > <input type="text" id="nombreed" class="styleinput" type="text" placeholder=""><input type="text" id="apellidoed" class="styleinput" type="text" placeholder=""><input type="number" id="telefonoed" class="styleinput" type="text" placeholder=""><input type="text" id="emailed" class="styleinput" type="text" placeholder=""><button class="btn-guardared" id="guardared">Guardar Cambios</button></div></div></div></div>')
                    $("#nombreed").val(data[0].nombre)
                    $("#apellidoed").val(data[0].apellido)
                    $("#telefonoed").val(data[0].telefono)
                    $("#emailed").val(data[0].email)

                    $("#modalEditar").modal("show")

                    $(".btn-guardared").attr("id", "guardar_" + id)

                    $("#guardar_" + id).click(function () {
                        var nombre = $("#nombreed").val()
                        var apellido = $("#apellidoed").val()
                        var telefono = $("#telefonoed").val()
                        var email = $("#emailed").val()

                        var datos = {
                            id: id,
                            nombre: nombre,
                            apellido: apellido,
                            telefono: telefono,
                            email: email
                        }

                        if (nombre == "" || nombre == null) {
                            $("#nombreed").addClass("red-border");
                        } else {
                            $("#nombreed").removeClass("red-border");
                        }
        
                        if (apellido == "" || apellido == null) {
                            $("#apellidoed").addClass("red-border");
                        } else {
                            $("#apellidoed").removeClass("red-border");
                        }
        
                        if (telefono == "" || telefono == null) {
                            $("#telefonoed").addClass("red-border");
                        } else {
                            $("#telefonoed").removeClass("red-border");
                        }
        
                        if (email == "" || email == null) {
                            $("#emailed").addClass("red-border");
                        } else {
                            $("#emailed").removeClass("red-border");
                        }
        
                        $("input").focusout(function () {
                            if ($(this).val() == "" || $(this).val() == null) {
                                $(this).addClass("red-border")
                            } else {
                                $(this).removeClass("red-border")
                            }
                        })
        
                        if ($("input").hasClass("red-border")) {
                            alert("Revisa los campos en rojo")
                        } else {
                            guardared(datos);
        
                        }
                    })
                },
                error: function(err){
                    console.log(err)
                    alert(res.mensaje)
                }
            })
        })
    }
})