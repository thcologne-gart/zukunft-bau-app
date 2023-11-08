<template>
    <div>
      <v-container class="my-8 d-flex justify-center align-center">
        <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="8">
                    <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 519.14 160.95">
                        <rect id ="außenluftfilter" class="cls-2" x="55.19" y="112.82" width="31.86" height="47.62"
                        @click="handleAreaClick('Außenluftfilter')"/>
                        <polyline class="cls-2" points="71.12 160.44 87.05 136.63 71.12 112.82"
                        @click="handleAreaClick('Außenluftklappe')"/>
                        <rect id ="außenluftklappe" class="cls-2" x=".51" y="112.82" width="26.33" height="47.62"/>
                        <path class="cls-3" d="M13.46,126.71c2.32,0,4.25-1.9,4.25-4.25s-1.93-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.9,4.25,4.25,4.25h0Z"/>
                        <path class="cls-3" d="M13.46,155.06c2.32,0,4.25-1.9,4.25-4.25s-1.93-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.9,4.25,4.25,4.25h0Z"/>
                        <line class="cls-2" x1="8.39" y1="128.27" x2="13.46" y2="122.46"/>
                        <line class="cls-2" x1="18.51" y1="144.99" x2="13.46" y2="150.8"/>
                        <line class="cls-2" x1="13.46" y1="122.46" x2="18.51" y2="116.65"/>
                        <line class="cls-2" x1="8.39" y1="156.61" x2="13.46" y2="150.8"/>
                        <rect id ="wrg" class="cls-2" x="115.4" y=".51" width="31.69" height="159.93"
                        @click="handleAreaClick('WRG')"/>
                        <path class="cls-2" d="M131.39,88.07c4.31,0,7.8-3.49,7.8-7.8s-3.49-7.8-7.8-7.8-7.8,3.51-7.8,7.8,3.51,7.8,7.8,7.8h0Z"/>
                        <line class="cls-2" x1="147.09" y1=".51" x2="115.4" y2="160.44"/>
                        <line class="cls-2" x1="115.4" y1=".51" x2="147.09" y2="160.44"/>
                        <rect id ="vorerhitzer" class="cls-2" x="175.44" y="112.82" width="31.89" height="47.62"
                        @click="handleAreaClick('Erhitzer')"/>
                        <line class="cls-2" x1="175.44" y1="160.44" x2="207.33" y2="112.82"/>
                        <rect id ="kühler" class="cls-2" x="235.67" y="112.82" width="31.86" height="47.62"
                        @click="handleAreaClick('Kühler')"/>
                        <line class="cls-2" x1="235.67" y1="112.82" x2="267.53" y2="160.44"/>
                        <line class="cls-2" x1="267.53" y1="112.82" x2="235.67" y2="160.44"/>
                        <rect id ="zuluftventilator" class="cls-2" x="295.88" y="112.82" width="47.62" height="47.62"
                        @click="handleAreaClick('Zuluftventilator')"/>
                        <path class="cls-2" d="M319.69,150.8c7.82,0,14.17-6.38,14.17-14.17s-6.35-14.17-14.17-14.17-14.17,6.38-14.17,14.17,6.38,14.17,14.17,14.17h0Z"/>
                        <line class="cls-2" x1="333.35" y1="140.17" x2="310.34" y2="146.95"/>
                        <line class="cls-2" x1="310.34" y1="125.72" x2="333.35" y2="132.49"/>
                        <rect id ="nacherhitzer" class="cls-2" x="371.85" y="112.82" width="31.89" height="47.62"/>
                        <line class="cls-2" x1="371.85" y1="160.44" x2="403.74" y2="112.82"/>
                        <rect id ="zuluftfilter" class="cls-2" x="432.09" y="112.82" width="31.86" height="47.62"
                        @click="handleAreaClick('Zuluftfilter')"/>
                        <polyline class="cls-2" points="448.02 160.44 463.95 136.63 448.02 112.82"/>
                        <rect id="abluftfilter" class="cls-2" x="432.09" y="1.93" width="31.86" height="47.62" 
                        @click="handleAreaClick('Abluftfilter')"/>
                        <polyline class="cls-2" points="448.02 49.55 432.09 25.74 448.02 1.93"/>
                        <rect id ="abluftventilator" class="cls-2" x="295.88" y="1.93" width="47.62" height="47.62"
                        @click="handleAreaClick('Abluftventilator')"/>
                        <path class="cls-2" d="M319.69,39.91c7.82,0,14.17-6.38,14.17-14.17s-6.35-14.17-14.17-14.17-14.17,6.35-14.17,14.17,6.38,14.17,14.17,14.17h0Z"/>
                        <line class="cls-2" x1="306.06" y1="29.25" x2="329.07" y2="36.06"/>
                        <line class="cls-2" x1="329.07" y1="14.8" x2="306.06" y2="21.6"/>
                        <rect class="cls-2" x=".51" y="112.82" width="26.33" height="47.62"/>
                        <path class="cls-3" d="M13.46,126.71c2.32,0,4.25-1.9,4.25-4.25s-1.93-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.9,4.25,4.25,4.25h0Z"/>
                        <path class="cls-3" d="M13.46,155.06c2.32,0,4.25-1.9,4.25-4.25s-1.93-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.9,4.25,4.25,4.25h0Z"/>
                        <line class="cls-2" x1="8.39" y1="128.27" x2="13.46" y2="122.46"/>
                        <line class="cls-2" x1="18.51" y1="144.99" x2="13.46" y2="150.8"/>
                        <line class="cls-2" x1="13.46" y1="122.46" x2="18.51" y2="116.65"/>
                        <line class="cls-2" x1="8.39" y1="156.61" x2="13.46" y2="150.8"/>
                        <rect class="cls-2" x="492.29" y="112.82" width="26.33" height="47.62"/>
                        <path class="cls-3" d="M505.25,126.71c2.35,0,4.25-1.9,4.25-4.25s-1.9-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.93,4.25,4.25,4.25h0Z"/>
                        <path class="cls-3" d="M505.25,155.06c2.35,0,4.25-1.9,4.25-4.25s-1.9-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.93,4.25,4.25,4.25h0Z"/>
                        <line class="cls-2" x1="500.2" y1="128.27" x2="505.25" y2="122.46"/>
                        <line class="cls-2" x1="510.32" y1="144.99" x2="505.25" y2="150.8"/>
                        <line class="cls-2" x1="505.25" y1="122.46" x2="510.32" y2="116.65"/>
                        <line class="cls-2" x1="500.2" y1="156.61" x2="505.25" y2="150.8"/>
                        <rect id ="zuluftklappe" class="cls-2" x="492.29" y="112.82" width="26.33" height="47.62"
                        @click="handleAreaClick('Zuluftklappe')"/>
                        <path class="cls-3" d="M505.25,126.71c2.35,0,4.25-1.9,4.25-4.25s-1.9-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.93,4.25,4.25,4.25h0Z"/>
                        <path class="cls-3" d="M505.25,155.06c2.35,0,4.25-1.9,4.25-4.25s-1.9-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.93,4.25,4.25,4.25h0Z"/>
                        <line class="cls-2" x1="500.2" y1="128.27" x2="505.25" y2="122.46"/>
                        <line class="cls-2" x1="510.32" y1="144.99" x2="505.25" y2="150.8"/>
                        <line class="cls-2" x1="505.25" y1="122.46" x2="510.32" y2="116.65"/>
                        <line class="cls-2" x1="500.2" y1="156.61" x2="505.25" y2="150.8"/>
                        <rect id="abluftklappe" class="cls-2" x="491.36" y="1.93" width="26.33" height="47.62"
                        @click="handleAreaClick('Abluftklappe')"/>
                        <path class="cls-3" d="M504.31,15.82c2.35,0,4.25-1.93,4.25-4.25s-1.9-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.93,4.25,4.25,4.25h0Z"/>
                        <path class="cls-3" d="M504.31,44.16c2.35,0,4.25-1.93,4.25-4.25s-1.9-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.93,4.25,4.25,4.25h0Z"/>
                        <line class="cls-2" x1="499.27" y1="17.35" x2="504.31" y2="11.57"/>
                        <line class="cls-2" x1="509.39" y1="34.1" x2="504.31" y2="39.91"/>
                        <line class="cls-2" x1="504.31" y1="11.57" x2="509.39" y2="5.75"/>
                        <line class="cls-2" x1="499.27" y1="45.69" x2="504.31" y2="39.91"/>
                        <rect class="cls-2" x="491.36" y="1.93" width="26.33" height="47.62"/>
                        <path class="cls-3" d="M504.31,15.82c2.35,0,4.25-1.93,4.25-4.25s-1.9-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.93,4.25,4.25,4.25h0Z"/>
                        <path class="cls-3" d="M504.31,44.16c2.35,0,4.25-1.93,4.25-4.25s-1.9-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.93,4.25,4.25,4.25h0Z"/>
                        <line class="cls-2" x1="499.27" y1="17.35" x2="504.31" y2="11.57"/>
                        <line class="cls-2" x1="509.39" y1="34.1" x2="504.31" y2="39.91"/>
                        <line class="cls-2" x1="504.31" y1="11.57" x2="509.39" y2="5.75"/>
                        <line class="cls-2" x1="499.27" y1="45.69" x2="504.31" y2="39.91"/>
                        <rect class="cls-2" x=".51" y="1.93" width="26.33" height="47.62"/>
                        <path class="cls-3" d="M13.46,15.82c2.32,0,4.25-1.93,4.25-4.25s-1.93-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.9,4.25,4.25,4.25h0Z"/>
                        <path class="cls-3" d="M13.46,44.16c2.32,0,4.25-1.93,4.25-4.25s-1.93-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.9,4.25,4.25,4.25h0Z"/>
                        <line class="cls-2" x1="8.39" y1="17.35" x2="13.46" y2="11.57"/>
                        <line class="cls-2" x1="18.51" y1="34.1" x2="13.46" y2="39.91"/>
                        <line class="cls-2" x1="13.46" y1="11.57" x2="18.51" y2="5.75"/>
                        <line class="cls-2" x1="8.39" y1="45.69" x2="13.46" y2="39.91"/>
                        <rect id="fortluftklappe" class="cls-2" x=".51" y="1.93" width="26.33" height="47.62"
                        @click="handleAreaClick('Fortluftklappe')"/>
                        <path class="cls-3" d="M13.46,15.82c2.32,0,4.25-1.93,4.25-4.25s-1.93-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.9,4.25,4.25,4.25h0Z"/>
                        <path class="cls-3" d="M13.46,44.16c2.32,0,4.25-1.93,4.25-4.25s-1.93-4.25-4.25-4.25-4.25,1.9-4.25,4.25,1.9,4.25,4.25,4.25h0Z"/>
                        <line class="cls-2" x1="8.39" y1="17.35" x2="13.46" y2="11.57"/>
                        <line class="cls-2" x1="18.51" y1="34.1" x2="13.46" y2="39.91"/>
                        <line class="cls-2" x1="13.46" y1="11.57" x2="18.51" y2="5.75"/>
                        <line class="cls-2" x1="8.39" y1="45.69" x2="13.46" y2="39.91"/>
                        <line id="zuluftAllgemein" class="cls-1" x1="26.84" y1="136.63" x2="55.19" y2="136.63"
                        @click="handleAreaClick('Zuluft allgemein')"/>
                        <line id="zuluftAllgemein" class="cls-1" x1="87.05" y1="136.63" x2="115.4" y2="136.63"
                        @click="handleAreaClick('Zuluft allgemein')"/>
                        <line id="zuluftAllgemein" class="cls-1" x1="147.09" y1="136.63" x2="175.44" y2="136.63"
                        @click="handleAreaClick('Zuluft allgemein')"/>
                        <line id="zuluftAllgemein" class="cls-1" x1="207.33" y1="136.63" x2="235.67" y2="136.63"
                        @click="handleAreaClick('Zuluft allgemein')"/>
                        <line id="zuluftAllgemein" class="cls-1" x1="267.53" y1="136.63" x2="295.88" y2="136.63"
                        @click="handleAreaClick('Zuluft allgemein')"/>
                        <line id="zuluftAllgemein" class="cls-1" x1="343.5" y1="136.63" x2="371.85" y2="136.63"
                        @click="handleAreaClick('Zuluft allgemein')"/>
                        <line id="zuluftAllgemein" class="cls-1" x1="403.74" y1="136.63" x2="432.09" y2="136.63"
                        @click="handleAreaClick('Zuluft allgemein')"/>
                        <line id="zuluftAllgemein" class="cls-1" x1="463.95" y1="136.63" x2="492.29" y2="136.63"
                        @click="handleAreaClick('Zuluft allgemein')"/>
                        <line id ="abluftAllgemein" class="cls-1" x1="463.95" y1="25.74" x2="491.36" y2="25.74"
                        @click="handleAreaClick('Abluft allgemein')"/>
                        <line id ="abluftAllgemein" class="cls-1" x1="343.5" y1="25.74" x2="432.09" y2="25.74"
                        @click="handleAreaClick('Abluft allgemein')"/>
                        <line id ="abluftAllgemein" class="cls-1" x1="147.09" y1="25.74" x2="295.88" y2="25.74"
                        @click="handleAreaClick('Abluft allgemein')"/>
                        <line id ="abluftAllgemein" class="cls-1" x1="115.4" y1="25.74" x2="26.84" y2="25.74"
                        @click="handleAreaClick('Abluft allgemein')"/>
                    </svg>
                </v-col>
                <v-col cols="2"></v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row v-if="monitoringStore.loadingMonitoringComponent === true">
                    <v-progress-linear
                    indeterminate
                    color="success"
                    ></v-progress-linear>
            </v-row>
          <div v-else-if="monitoringStore.loadingMonitoringComponent === false">
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8">
                    <v-card class="mx-auto" elevation="1" rounded="0">
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
                <v-col cols="2"></v-col>
            </v-row>
        </div>
      </v-container>
    </div>
</template>

<script>
import { useGeneralStore } from "@/store/general"
import { useMonitoringStore } from "@/store/monitoring"
import AnlagenMonitoringCard from "@/components/monitoring/AnlagenMonitoringCard.vue"

export default {
  data() {
    return {
      viewBox: '0 0 400 120', // Adjust the viewBox dimensions to fit your image
      abluftventilator: [],
      abluftventilatorEnthalten: false,
      gerätAllgemein: [],
      gerätAllgemeinEnthalten: false,
      abluftAllgemein: [], 
      abluftAllgemeinEnthalten: false,
      abluftFilter: [],
      abluftFilterEnthalten: false,
      abluftklappe: [],
      abluftklappeEnthalten: false,
      außenluftfilter: [],
      außenluftfilterEnthalten: false,
      außenluftklappe: [],
      außenluftklappeEnthalten: false,
      erhitzer: [],
      erhitzerEnthalten: false,
      fortluftklappe: [],
      fortluftklappeEnthalten:false,
      kühler: [],
      kühlerEnthalten: false,
      wrg: [],
      wrgEnthalten: false,
      zuluftAllgemein: [],
      zuluftAllgemeinEnthalten: false,
      zuluftfilter: [],
      zuluftfilterEnthalten: false,
      zuluftklappe: [],
      zuluftklappeEnthalten: false,
      zuluftventilator: [],
      zuluftventilatorEnthalten: false,
      befeuchter: [],
      befeuchterEnthalten: false,
      filter: [],
      filterEnthalten: false,
      fu: [], 
      fuEnthalten: false,
      klappe: [],
      klappeEnthalten: false,
      umluft: [],
      umluftEnthalten: false,
      ventilator: [],
      ventilatorEnthalten: false,
      komponenteZeigen: [],
      allComponents: null
    };
  },
  components: {
    AnlagenMonitoringCard
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
      let allComponents = []
      for (const komponente in this.anlage) {
        const { aasId, semanticId } = this.anlage[komponente];
        const submodelId = 'OperatingInformation';
        const submodel = await this.generalStore.getSubmodel(aasId, submodelId);
        const submodelElements = submodel.submodelElements;
        
        console.log(submodelElements)
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
          //elementData.presentValue = supplementaryInfos.presentValue;
          
          return elementData
        });
        const elements = await Promise.all(elementPromises);

        if (semanticId === 'https://th-koeln.de/gart/ComponentExtractAirFanAAS/1/0') {
          this.abluftventilator = elements;
          this.abluftventilatorEnthalten = true
          const cssElement = document.getElementById("abluftventilator");
          cssElement.classList.add("pointer", "abluftventilator")
          allComponents.push('Abluftventilator')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentExtractAirGeneralAAS/1/0') {
          this.abluftAllgemein = elements;
          this.abluftAllgemeinEnthalten = true
          const cssElement = document.getElementById("abluftAllgemein");
          cssElement.classList.add("pointer", "abluftAllgemein")
          allComponents.push('Abluft allgemein')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentExtractAirFilterAAS/1/0') {
          this.abluftFilter = elements;
          this.abluftFilterEnthalten = true
          const cssElement = document.getElementById("abluftfilter");
          cssElement.classList.add("pointer", "abluftfilter")
          allComponents.push('Abluftfilter')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentExhaustAirFlapAAS/1/0') {
          this.abluftklappe = elements;
          this.abluftklappeEnthalten = true
          const cssElement = document.getElementById("abluftklappe");
          cssElement.classList.add("pointer", "abluftklappe")
          allComponents.push('Abluftklappe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentOutsideAirFilterAAS/1/0') {
          this.außenluftfilter = elements;
          this.außenluftfilterEnthalten = true
          const cssElement = document.getElementById("außenluftfilter");
          cssElement.classList.add("pointer", "außenluftfilter")
          allComponents.push('Außenluftfilter')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentOutsideAirFlapAAS/1/0') {
          this.außenluftklappe = elements;
          this.außenluftklappeEnthalten = true
          const cssElement = document.getElementById("außenluftklappe");
          cssElement.classList.add("pointer", "außenluftklappe")
          allComponents.push('Außenluftklappe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentDeviceGeneralAAS/1/0') {
          this.gerätAllgemein = elements;
          this.gerätAllgemeinEnthalten = true
          //const cssElement = document.getElementById("vorlauf");
          //cssElement.classList.add("pointer", "vorlauf")
          allComponents.push('Gerät allgemein')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeaterAAS/1/0') {
          this.erhitzer = elements;
          this.erhitzerEnthalten = true
          const cssElement = document.getElementById("vorerhitzer");
          cssElement.classList.add("pointer", "vorerhitzer")
          allComponents.push('Erhitzer')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentExtractAirFlapAAS/1/0') {
          this.fortluftklappe = elements;
          this.fortluftklappeEnthalten = true
          const cssElement = document.getElementById("fortluftklappe");
          cssElement.classList.add("pointer", "fortluftklappe")
          allComponents.push('Fortluftklappe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentCoolerAAS/1/0') {
          this.kühler = elements;
          this.kühlerEnthalten = true
          const cssElement = document.getElementById("kühler");
          cssElement.classList.add("pointer", "kühler")
          allComponents.push('Kühler')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeatRecoveryAAS/1/0') {
          this.wrg = elements;
          this.wrgEnthalten = true
          const cssElement = document.getElementById("wrg");
          cssElement.classList.add("pointer", "wrg")
          allComponents.push('WRG')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAirGeneralAAS/1/0') {
          this.zuluftAllgemein = elements;
          this.zuluftAllgemeinEnthalten = true
          const cssElement = document.getElementById("zuluftAllgemein");
          cssElement.classList.add("pointer", "zuluftAllgemein")
          allComponents.push('Zuluft allgemein')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAirFilterAAS/1/0') {
          this.zuluftfilter = elements;
          this.zuluftfilterEnthalten = true
          const cssElement = document.getElementById("zuluftfilter");
          cssElement.classList.add("pointer", "zuluftfilter")
          allComponents.push('Zuluftfilter')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAirFlapAAS/1/0') {
          this.zuluftklappe = elements;
          this.zuluftklappeEnthalten = true
          const cssElement = document.getElementById("zuluftklappe");
          cssElement.classList.add("pointer", "zuluftklappe")
          allComponents.push('Zuluftklappe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAirFanAAS/1/0') {
          this.zuluftventilator = elements;
          this.zuluftventilatorEnthalten = true
          const cssElement = document.getElementById("zuluftventilator");
          cssElement.classList.add("pointer", "zuluftventilator")
          allComponents.push('Zuluftventilator')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHumidifierAAS/1/0') {
          this.befeuchter = elements;
          this.befeuchterEnthalten = true
          allComponents.push('Befeuchter')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFilterAAS/1/0') {
          this.filter = elements;
          this.filterEnthalten = true
          allComponents.push('Filter')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFrequencyConverterAAS/1/0') {
          this.fu = elements;
          this.fuEnthalten = true
          allComponents.push('Frequenzumrichter')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFlapAAS/1/0') {
          this.klappe = elements;
          this.klappeEnthaltenEnthalten = true
          allComponents.push('Klappe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentCirculatingAirAAS/1/0') {
          this.umluft = elements;
          this.umluftEnthalten = true
          allComponents.push('Umluft')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFanAAS/1/0') {
          this.ventilator = elements;
          this.ventilatorEnthalten = true
          allComponents.push('Ventilator')
        }
      }
      this.allComponents = allComponents
      this.monitoringStore.setLoadingMonitoringComponent('false')
    },
    handleAreaClick(component) {
      if (component == 'Abluftventilator') {
        this.komponenteZeigen = this.abluftventilator
      } else if (component == 'Gerät allgemein') {
        this.komponenteZeigen = this.gerätAllgemein
      } else if (component == 'Abluft allgemein') {
        this.komponenteZeigen = this.abluftAllgemein
      } else if (component == 'Abluftfilter') {
        this.komponenteZeigen = this.abluftFilter
      } else if (component == 'Abluftklappe') {
        this.komponenteZeigen = this.abluftklappe
      } else if (component == 'Außenluftklappe') {
        this.komponenteZeigen = this.außenluftklappe
      } else if (component == 'Außenluftfilter') {
        this.komponenteZeigen = this.außenluftfilter
      } else if (component == 'Erhitzer') {
        this.komponenteZeigen = this.erhitzer
      } else if (component == 'Fortluftklappe') {
        this.komponenteZeigen = this.fortluftklappe
      } else if (component == 'Kühler') {
        this.komponenteZeigen = this.fortluftklappe
      } else if (component == 'WRG') {
        this.komponenteZeigen = this.wrg
      } else if (component == 'Zuluft allgemein') {
        this.komponenteZeigen = this.zuluftAllgemein
      } else if (component == 'Zuluftfilter') {
        this.komponenteZeigen = this.zuluftfilter
      } else if (component == 'Zuluftklappe') {
        this.komponenteZeigen = this.zuluftklappe
      } else if (component == 'Zuluftventilator') {
        this.komponenteZeigen = this.zuluftventilator
      } else if (component == 'Befeuchter') {
        this.komponenteZeigen = this.befeuchter
      } else if (component == 'Filter') {
        this.komponenteZeigen = this.filter
      } else if (component == 'Frequenzumrichter') {
        this.komponenteZeigen = this.fu
      } else if (component == 'Klappe') {
        this.komponenteZeigen = this.klappe
      } else if (component == 'Umluft') {
        this.komponenteZeigen = this.umluft
      } else if (component == 'Ventilator') {
        this.komponenteZeigen = this.ventilator
      }
    },
  },
};
</script>

<style>
  
  .cls-1 {
        stroke-width: 3px;
    }

    .cls-1, .cls-2 {
        fill: none;
    }

    .cls-1, .cls-2, .cls-3 {
        stroke: #141515;
        stroke-miterlimit: 10;
    }

    .cls-2, .cls-3 {
        stroke-width: 1.02px;
    }

    .cls-3 {
        fill: #141515;
        fill-rule: evenodd;
    }

  .pointer {
    cursor: pointer;
  }
  .abluftventilator:hover {
    fill: #e6bcbc;
  }
  .abluftventilator {
    fill:transparent
  }
  .abluftAllgemein:hover {
    stroke:#FF4A1C
  }
  .abluftfilter {
    fill:transparent
  }
  .abluftfilter:hover {
    fill: #e6bcbc;
  }
  .abluftklappe {
    fill:transparent
  }
  .abluftklappe:hover {
    fill:#e6bcbc
  }
  .außenluftfilter {
    fill:transparent
  }
  .außenluftfilter:hover {
    fill:#e6bcbc
  }
  .außenluftklappe{
    fill:transparent
  }
  .außenluftklappe:hover {
    fill: #e6bcbc
  }
  .vorerhitzer{
    fill:transparent
  }
  .vorerhitzer:hover {
    fill: #e6bcbc
  } 
  .fortluftklappe{
    fill:transparent
  }
  .fortluftklappe:hover {
    fill: #e6bcbc
  }
  .kühler{
    fill:transparent
  }
  .kühler:hover {
    fill: #e6bcbc
  }
  .wrg{
    fill:transparent
  }
  .wrg:hover {
    fill: #e6bcbc
  }
  .zuluftAllgemein:hover {
    stroke:#FF4A1C
  }
  .zuluftfilter{
    fill:transparent
  }
  .zuluftfilter:hover {
    fill: #e6bcbc
  }
  .zuluftklappe{
    fill:transparent
  }
  .zuluftklappe:hover {
    fill: #e6bcbc
  }
  .zuluftventilator{
    fill:transparent
  }
  .zuluftventilator:hover {
    fill: #e6bcbc
  }

.heizkreis {
    width:80%;
}
</style>