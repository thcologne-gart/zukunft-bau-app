<template>
    <div>
      <v-container v-if="monitoringStore.loadingMonitoringComponent === true">
        <v-progress-linear
        indeterminate
        color="success"
        ></v-progress-linear>
      </v-container>
      <v-container v-else-if="monitoringStore.loadingMonitoringComponent === false" class="my-8 justify-center align-center">
        <KpisMonitoringAnlage />
        <v-container>
          <LineChartAll :allElements="this.allSes"/> 
        </v-container>>
        <v-row>
          <v-col cols="4">
            <v-card
              variant="outlined" class="pa-4 anlagen-card">
              <v-card-text class="center-content">
                <div class="heizkreis">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 90 94.3" style="enable-background:new 0 0 90 94.3;" xml:space="preserve">
                  <g id="Ebene_2">
                  </g>
                  <g id="Ebene_1" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                      <g>
                          <path class="st0" d=""/>
                          <line id="vorlauf1" class="st1" x1="0" y1="85.7" x2="90" y2="85.7"
                          @click="handleAreaClick('Vorlauf')"/>
                          <line id="rücklauf1" class="st2" x1="0" y1="92.8" x2="89.9" y2="92.8"
                          @click="handleAreaClick('Rücklauf')"/>
                          <polyline class="st3" points="65.1,92.8 65.1,11 59.7,11 		"/>
                          <polyline id = 'rücklauf' class="st4" points="65.1,92.8 65.1,11 59.7,11"
                          @click="handleAreaClick('Rücklauf')"/>
                          <circle class="st5" cx="46.5" cy="11.8" r="7.8"/>
                          <circle id = 'hkAllgemein' class="st5" cx="46.5" cy="11.8" r="11.3"
                          @click="handleAreaClick('Heizkreis allgemein')"/>
                          <circle id = 'pumpe' class="st5" cx="28.7" cy="39.8" r="6.4"
                            @click="handleAreaClick('Pumpe')"/>
                          <polyline class="st3" points="35,39.8 28.7,33.5 22.3,39.8 		"/>
                          <path class="st3" d="M25,55l3.4,5.9l3.4-5.9C31.7,55,25,55,25,55z"/>
                          <path class="st6" d="M25,66.7l3.4-5.9l3.4,5.9C31.7,66.7,25,66.7,25,66.7z"/>
                          <path class="st6" d="M34.2,64.2l-5.9-3.4l5.9-3.4V64.2z"/>
                          <circle id ='ventil' class="st5" cx="16.7" cy="60.9" r="5.7"
                            @click="handleAreaClick('Ventil')"/>
                          <line class="st3" x1="22.4" y1="60.9" x2="28.4" y2="60.9"/>
                          <line id ='vorlauf2' class="st7" x1="28.4" y1="68.1" x2="28.4" y2="85.7"
                          @click="handleAreaClick('Vorlauf')"/>
                          <line id="vorlauf3" class="st7" x1="28.7" y1="47.4" x2="28.7" y2="53.9"
                          @click="handleAreaClick('Vorlauf')"/>
                          <polyline id ='vorlauf' class="st7" points="28.6,32.1 28.6,11 33.4,11"
                          @click="handleAreaClick('Vorlauf')"/>
                          <line id="rücklauf2" class="st4" x1="35.8" y1="60.9" x2="65.1" y2="60.9"
                          @click="handleAreaClick('Rücklauf')"/>
                      </g>
                  </g>
                  </svg>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card variant="outlined" class="anlagen-card">
              <v-tabs
                color="success"
              >
                <v-tab v-for="komponente in this.allComponents" :key="komponente"
                @click="handleAreaClick(komponente)"
                >
                  {{ komponente }}
                </v-tab>
              </v-tabs>
            </v-card>
            <div v-for="element in this.komponenteZeigen" :key="element.idShort">
              <AnlagenMonitoringCard :element="element"/>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
import { useGeneralStore } from "@/store/general"
import { useMonitoringStore } from "@/store/monitoring"
import AnlagenMonitoringCard from "@/components/monitoring/AnlagenMonitoringCard.vue"
import LineChartAll from "@/components/monitoring/LineChartAll.vue"
import KpisMonitoringAnlage from "@/components/monitoring/KpisMonitoringAnlage.vue"

export default {
  data() {
    return {
      viewBox: '0 0 400 120', // Adjust the viewBox dimensions to fit your image
      rücklauf: [],
      rücklaufEnthalten: false,
      vorlauf: [],
      vorlaufEnthalten: false,
      pumpe: [],
      pumpeEnthalten: false,
      heizkreisAllgemein: [],
      hkEnthalten: false,
      ventil: [],
      ventilEnthalten: false,
      heizkurve: [],
      heizkurveEnthalten: false,
      komponenteZeigen: [],
      allComponents: null,
      allSes: null
    };
  },
  components: {
    AnlagenMonitoringCard, KpisMonitoringAnlage, LineChartAll
  },
  props: {
    anlage: Object
  },
  mounted() {
    this.getSubmodelInformations()
  },
  computed: {
    generalStore () {
      return useGeneralStore()
    }, 
    monitoringStore () {
      return useMonitoringStore()
    }
  },
  methods: {
    async getSubmodelInformations() {
      await this.monitoringStore.setLoadingMonitoringComponent('true')
      let allSE = []
      let allComponents = []
      for (const komponente in this.anlage) {
        const { aasId, semanticId } = this.anlage[komponente];
        const submodelId = 'OperatingInformation';
        const submodel = await this.generalStore.getSubmodel(aasId, submodelId);
        const submodelElements = submodel.submodelElements;

        // Define an array to store the promises for the asynchronous calls
        const elementPromises = submodelElements.map(async (element) => {
          let elementData = {
            'aasId': aasId,
            'submodelName': submodelId,
            'idShort': element.idShort,
            'name': element.descriptions[0].text,
            'semanticId': element.semanticId.keys[0].value
          };
          /*
          let valueIdShortpath = {
            path: [element.idShort]
          }
          */
          elementData = await this.monitoringStore.getSeValueAnlagenmonitoring(aasId, submodelId, element.idShort, elementData)
          // elementData.presentValue = supplementaryInfos.presentValue;
          return elementData
        });

        const elements = await Promise.all(elementPromises);

        if (this.komponenteZeigen.length === 0) {
          this.komponenteZeigen = elements
        }

        allSE.push(
            {
            'anlagenInformation': this.anlage[komponente],
            'elements': elements
            }
        )
        this.allSes = allSE
        //console.log(elements);
        /*
        const elements = submodelElements.map(element => ({
          'aasId': aasId,
          'submodelName': submodelId,
          'idShort': element.idShort,
          'name': element.descriptions[0].text,
          'semanticId': element.semanticId.keys[0].value
        }));
        */
      
        if (semanticId === 'https://th-koeln.de/gart/ComponentReturnAAS/1/0') {
          this.rücklauf = elements;
          this.rücklaufEnthalten = true
          allComponents.push('Rücklauf')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAAS/1/0') {
          this.vorlauf = elements;
          this.vorlaufEnthalten = true
          allComponents.push('Vorlauf')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentPumpAAS/1/0') {
          this.pumpe = elements;
          this.pumpeEnthalten = true
          allComponents.push('Pumpe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeatingCurveAAS/1/0') {
          this.heizkurve = elements;
          this.heizkurveEnthalten = true
          allComponents.push('Heizkurve')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeatingCircuitGeneralAAS/1/0') {
          this.heizkreisAllgemein = elements;
          this.hkEnthalten = true
          allComponents.push('Heizkreis allgemein')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentValveAAS/1/0') {
          this.ventil = elements;
          this.ventilEnthalten = true
          allComponents.push('Ventil')
        } 
      }
      this.allComponents = allComponents
      await this.monitoringStore.setLoadingMonitoringComponent('false')
      this.getCssInfos(allComponents)
    },

    getCssInfos(allComponents) {
      for (let element in allComponents) {
        let name = allComponents[element]
        if (name === 'Rücklauf') {
          const cssElement = document.getElementById("rücklauf");
          cssElement.classList.add("pointer", "rücklauf")
          const cssElement1 = document.getElementById("rücklauf1");
          cssElement1.classList.add("pointer", "rücklauf")
          const cssElement2 = document.getElementById("rücklauf2");
          cssElement2.classList.add("pointer", "rücklauf")
        } else if (name === 'Vorlauf') {
          const cssElement = document.getElementById("vorlauf");
          cssElement.classList.add("pointer", "vorlauf")
          const cssElement1 = document.getElementById("vorlauf1");
          cssElement1.classList.add("pointer", "vorlauf")
          const cssElement2 = document.getElementById("vorlauf2");
          cssElement2.classList.add("pointer", "vorlauf")
          const cssElement3 = document.getElementById("vorlauf3");
          cssElement3.classList.add("pointer", "vorlauf")
        } else if (name === 'Pumpe') {
          const cssElement = document.getElementById("pumpe");
          cssElement.classList.add("pointer", "pumpe")
        }  else if (name === 'Heizkreis allgemein') {
          const cssElement = document.getElementById("hkAllgemein");
          cssElement.classList.add("pointer", "hkAllgemein")
        } else if (name === 'Ventil') {
          const cssElement = document.getElementById("ventil");
          cssElement.classList.add("pointer", "ventil")
        }
      }
    },

    handleAreaClick(component) {
      if (component == 'Rücklauf') {
        this.komponenteZeigen = this.rücklauf
      } else if (component == 'Vorlauf') {
        this.komponenteZeigen = this.vorlauf
      } else if (component == 'Pumpe') {
        this.komponenteZeigen = this.pumpe
      } else if (component == 'Ventil') {
        this.komponenteZeigen = this.ventil
      } else if (component == 'Heizkreis allgemein') {
        this.komponenteZeigen = this.heizkreisAllgemein
      }
    },
  },
};
</script>

<style>
  
	.st0{fill:none;}
	.st1{fill:none;stroke:#FF4A1C;stroke-width:2.9999;stroke-miterlimit:10;}
	.st2{fill:none;stroke:#372772;stroke-width:2.9999;stroke-miterlimit:10;}
	.st3{fill:none;stroke:#2B2A29;stroke-width:0.5669;stroke-miterlimit:10;}
	.st4{fill:none;stroke:#372772;stroke-width:1.5001;stroke-miterlimit:10;}
	.st5{fill:transparent;stroke:#2B2A29;stroke-width:1.0001;stroke-miterlimit:10;}
	.st6{fill:#2B2A29;stroke:#2B2A29;stroke-width:0.5669;stroke-miterlimit:10;}
	.st7{fill:none;stroke:#FF4A1C;stroke-width:1.5001;stroke-miterlimit:10;}

  .pointer {
    cursor: pointer;
  }
  .pumpe:hover {
    fill: #e6bcbc;
  }
  .ventil:hover {
    fill: #e6bcbc;
  }
  .hkAllgemein:hover {
    fill: #e6bcbc;
  }
  .rücklauf:hover {
    stroke: #5c3ec9;
  }
  .vorlauf:hover {
    stroke: #8c260d;
  }

.heizkreis {
    width:80%;
}
.anlagen-card {
  background-color: #ffffff;
}
.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center; /* Optional: If you want to center-align text within v-card-text */
  height: 100%; /* Optional: Set a specific height if needed */
}
</style>
