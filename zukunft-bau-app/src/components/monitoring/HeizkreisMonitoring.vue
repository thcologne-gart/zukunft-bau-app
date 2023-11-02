<template>
    <div>
        <div class="heizkreis">
          <v-container class="d-flex justify-center align-center">
            <v-row>
              <v-col cols="6">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 90 94.3" style="enable-background:new 0 0 90 94.3;" xml:space="preserve">
                <g id="Ebene_2">
                </g>
                <g id="Ebene_1" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                    <g>
                        <path class="st0" d=""/>
                        <line class="st1" x1="0" y1="85.7" x2="90" y2="85.7"/>
                        <line class="st2" x1="0" y1="92.8" x2="89.9" y2="92.8"/>
                        <polyline class="st3" points="65.1,92.8 65.1,11 59.7,11 		"/>
                        <polyline id = 'rücklauf' class="st4" points="65.1,92.8 65.1,11 59.7,11"
                        @click="handleAreaClick(this.rücklauf)"/>
                        <circle class="st5" cx="46.5" cy="11.8" r="7.8"/>
                        <circle id = 'hkAllgemein' class="st5" cx="46.5" cy="11.8" r="11.3"
                        @click="handleAreaClick(this.heizkreisAllgemein)"/>
                        <circle id = 'pumpe' class="st5" cx="28.7" cy="39.8" r="6.4"
                          @click="handleAreaClick(this.pumpe)"/>
                        <polyline class="st3" points="35,39.8 28.7,33.5 22.3,39.8 		"/>
                        <path class="st3" d="M25,55l3.4,5.9l3.4-5.9C31.7,55,25,55,25,55z"/>
                        <path class="st6" d="M25,66.7l3.4-5.9l3.4,5.9C31.7,66.7,25,66.7,25,66.7z"/>
                        <path class="st6" d="M34.2,64.2l-5.9-3.4l5.9-3.4V64.2z"/>
                        <circle id ='ventil' class="st5" cx="16.7" cy="60.9" r="5.7"
                          @click="handleAreaClick(this.ventil)"/>
                        <line class="st3" x1="22.4" y1="60.9" x2="28.4" y2="60.9"/>
                        <line class="st7" x1="28.4" y1="68.1" x2="28.4" y2="85.7"/>
                        <line class="st7" x1="28.7" y1="47.4" x2="28.7" y2="53.9"/>
                        <polyline id ='vorlauf' class="st7" points="28.6,32.1 28.6,11 33.4,11"
                        @click="handleAreaClick(this.vorlauf)"/>
                        <line class="st4" x1="35.8" y1="60.9" x2="65.1" y2="60.9"/>
                    </g>
                </g>
                </svg>
              </v-col>
              <v-col cols="6">
                <v-card v-for="element in this.komponenteZeigen" :key="element.idShort">
                  <div>{{ element.name }}</div>
                  <LineChart :aasId="element.aasId" :submodelRefIdShort="element.submodelName" :submodelElementPath="element.idShort"/>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
    </div>
</template>

<script>
import { useGeneralStore } from "@/store/general"
import LineChart from "@/components/general/charts/LineChart.vue"
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
      komponenteZeigen: []
    };
  },
  components: {
    LineChart
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
    }
  },
  methods: {
    async getSubmodelInformations() {
      for (const komponente in this.anlage) {
        const { aasId, semanticId } = this.anlage[komponente];
        const submodelId = 'OperatingInformation';
        const submodel = await this.generalStore.getSubmodel(aasId, submodelId);
        const submodelElements = submodel.submodelElements;

        const elements = submodelElements.map(element => ({
          'aasId': aasId,
          'submodelName': submodelId,
          'idShort': element.idShort,
          'name': element.descriptions[0].text,
          'semanticId': element.semanticId.keys[0].value
        }));

        if (semanticId === 'https://th-koeln.de/gart/ComponentReturnAAS/1/0') {
          this.rücklauf = elements;
          this.rücklaufEnthalten = true
          const cssElement = document.getElementById("rücklauf");
          cssElement.classList.add("pointer", "rücklauf")
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAAS/1/0') {
          this.vorlauf = elements;
          this.vorlaufEnthalten = true
          const cssElement = document.getElementById("vorlauf");
          cssElement.classList.add("pointer", "vorlauf")
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentPumpAAS/1/0') {
          this.pumpe = elements;
          this.pumpeEnthalten = true
          const cssElement = document.getElementById("pumpe");
          cssElement.classList.add("pointer", "pumpe")
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeatingCurveAAS/1/0') {
          this.heizkurve = elements;
          this.heizkurveEnthalten = true
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeatingCircuitGeneralAAS/1/0') {
          this.heizkreisAllgemein = elements;
          this.hkEnthalten = true
          const cssElement = document.getElementById("hkAllgemein");
          cssElement.classList.add("pointer", "hkAllgemein")
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentValveAAS/1/0') {
          this.ventil = elements;
          this.ventilEnthalten = true
          const cssElement = document.getElementById("ventil");
          cssElement.classList.add("pointer", "ventil")
        } 
      }
    },
    handleAreaClick(component) {
        this.komponenteZeigen = component
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
</style>
