import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Declaraciones para evitar errores de compilación
declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html', 
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @ViewChild('voiceButton') voiceButton!: ElementRef;

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    const menu = document.getElementById("menu__burguer");
    const navbar = document.getElementById("header_elements");

    const options = document.querySelectorAll(".option")

    const elemento_1 = document.getElementById("home");
    const elemento_2 = document.getElementById("becas");
    const elemento_3 = document.getElementById("carreras");
    const elemento_4 = document.getElementById("instalaciones");
    const elemento_5 = document.getElementById("inscripciones");


    menu?.addEventListener('click', () => {
      const claseDelObjeto = document.getElementById("header_elements");

      const clasesDelElemento = claseDelObjeto?.classList;
  
      const arrayDeClases = Array.from(Object(clasesDelElemento));
      

      if(String(arrayDeClases[2]) == "animation_close"){
        navbar?.classList.add("nabvar_abierto")
        navbar?.classList.remove("nabvar_cerrado")
        this.limpiar_Nabvar_close(navbar, options);

        void navbar?.offsetWidth;
        this.abrir_Nabvar(navbar, options);
      } else if (String(arrayDeClases[2]) == "animation_open") {
        navbar?.classList.add("nabvar_cerrado")
        navbar?.classList.remove("nabvar_abierto")
        this.limpiar_Nabvar_open(navbar, options);

        void navbar?.offsetWidth;
        this.cerrar_Nabvar(navbar, options);
      } else {
        navbar?.classList.add("nabvar_abierto")
        navbar?.classList.remove("nabvar_cerrado")
        this.abrir_Nabvar(navbar, options);
      }
      console.log(arrayDeClases)

    })

    const ubicacionActual = window.location.pathname;

    switch (ubicacionActual) {
      case "/home":
        elemento_1?.classList.add('active');
        break;
      case "/becas":
        elemento_2?.classList.add('active');
        break;
      case "/carreras":
        elemento_3?.classList.add('active');
        break;
      case "/instalaciones":
        elemento_4?.classList.add('active');
        break;
      case "/inscripciones":
        elemento_5?.classList.add('active');
        break;
    }

  }

  activarElemento(path: any) {
    this.eliminarActivarGeneral();

    var elemento = document.getElementById(path);

    elemento?.classList.add('active');
    switch (path) {
      case "home":
        this.router.navigate(['home'])
        break;
      case "becas":
        this.router.navigate(['becas/tipos-becas'])
        break;
      case "carreras":
        this.router.navigate(['carreras'])
        break;
      case "instalaciones":
        this.router.navigate(['instalaciones'])
        break;
      case "inscripciones":
        this.router.navigate(['inscripciones'])
        break;
    }
  }

  eliminarActivarGeneral() {
    var elemento_1 = document.getElementById("home");
    var elemento_2 = document.getElementById("becas");
    var elemento_3 = document.getElementById("carreras");
    var elemento_4 = document.getElementById("instalaciones");
    var elemento_5 = document.getElementById("inscripciones");

    elemento_1?.classList.remove('active');
    elemento_2?.classList.remove('active');
    elemento_3?.classList.remove('active');
    elemento_4?.classList.remove('active');
    elemento_5?.classList.remove('active');
  }
  
  limpiar_Nabvar_open(navbar: any, options: any){
    //open
    navbar?.classList.remove("animation_open");

    for (let i = 0; i < options.length; i++) {
      options[i].classList.remove('font_open');
    }
  }

  limpiar_Nabvar_close(navbar: any, options: any){
    //close
    navbar?.classList.remove("animation_close");

    for (let i = 0; i < options.length; i++) {
      options[i].classList.remove('font_close');
    }
  }

  cerrar_Nabvar(navbar: any, options: any) {

    navbar?.classList.add("animation_close");

    for (let i = 0; i < options.length; i++) {
      options[i].classList.add('font_close');
    }
  }

  abrir_Nabvar(navbar: any, options: any) {
    navbar?.classList.add("animation_open");

    for (let i = 0; i < options.length; i++) {
      options[i].classList.add('font_open');
    }
  }

  listenToVoice() {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'es-ES';

    recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        this.handleVoiceCommand(command);
    };

    recognition.onerror = (event: any) => {
        console.error('Error en el reconocimiento de voz', event.error);
        this.toastr.error('Error en el reconocimiento de voz', 'Error');
    };

    recognition.onend = () => {
        // This is triggered when the speech recognition ends without a command
        console.log('Fin del reconocimiento de voz sin comando');
        recognition.start();
        this.toastr.error('Comando no reconocido', 'Error');
       
    };
    recognition.start();
  
}

handleVoiceCommand(command: string) {
    if (command.includes('inscripciones')) {
        window.location.href = '/inscripciones';
    } else if (command.includes('home')) {
        window.location.href = '/home';
    } else if (command.includes('tipos becas')) {
        window.location.href = '/becas/tipos-becas';
    } else if (command.includes('becas internas')) {
        window.location.href = '/becas/becas-internas';
    } else if (command.includes('becas externas')) {
        window.location.href = '/becas/becas-externas';
    } else if (command.includes('contacto')) {
        window.location.href = '/contacto';
    } else if (command.includes('carreras')) {
        window.location.href = '/carreras';
    } else if (command.includes('instalaciones')) {
        window.location.href = '/instalaciones';
    } else {
        console.log('Comando no reconocido');
        // No need to display the toast here since it will be handled in onend
    }
}


  test(event: any) {
    console.log(event);
  }

}
