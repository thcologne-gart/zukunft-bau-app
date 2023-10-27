<template>
    <div>
        <div class="heizkreis">
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
                    <polyline class="st4" points="65.1,92.8 65.1,11 59.7,11 		"/>
                    <circle class="st5" cx="46.5" cy="11.8" r="7.8"/>
                    <circle class="st5" cx="46.5" cy="11.8" r="11.3"/>
                    <circle class="st5" cx="28.7" cy="39.8" r="6.4"
                    @click="handleAreaClick('Pump')"/>
                    <polyline class="st3" points="35,39.8 28.7,33.5 22.3,39.8 		"/>
                    <path 
                        class="st3" 
                        d="M25,55l3.4,5.9l3.4-5.9C31.7,55,25,55,25,55z"
                        @click="handleAreaClick('Area 1')"/>
                    <path class="st6" d="M25,66.7l3.4-5.9l3.4,5.9C31.7,66.7,25,66.7,25,66.7z"/>
                    <path class="st6" d="M34.2,64.2l-5.9-3.4l5.9-3.4V64.2z"/>
                    <circle class="st5" cx="16.7" cy="60.9" r="5.7"/>
                    <line class="st3" x1="22.4" y1="60.9" x2="28.4" y2="60.9"/>
                    <line class="st7" x1="28.4" y1="68.1" x2="28.4" y2="85.7"/>
                    <line class="st7" x1="28.7" y1="47.4" x2="28.7" y2="53.9"/>
                    <polyline class="st7" points="28.6,32.1 28.6,11 33.4,11 		"/>
                    <line class="st4" x1="35.8" y1="60.9" x2="65.1" y2="60.9"/>
                </g>
            </g>
            </svg>
        </div>
        <div>{{ this.pump }}</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      viewBox: '0 0 400 120', // Adjust the viewBox dimensions to fit your image
      pump: false
    };
  },
  methods: {
    handleImageClick(event) {
      console.log('Clicked on the image');
    },
    handleAreaClick(areaName) {
        this.pump = true
        console.log('Clicked on ' + areaName);
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

.heizkreis {
    width:40%;
}
</style>
