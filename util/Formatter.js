sap.ui.define(function() {
	"use strict";

	var Formatter =  {
	
		formatItemCategory: function(sItemCatInit){
			var sItemCat;
			
			switch (sItemCatInit) {
				case "0":
			        sItemCat="";
			        break;
				case "1":
			        sItemCat="B";
			        break;
			    case "2":
			        sItemCat="K";
			        break;
			    case "3":
			        sItemCat="L";
			        break;
				case "4":
			        sItemCat="M";
			        break;
			    case "5":
			        sItemCat="S";
			        break;
			    case "6":
			        sItemCat="T";
			        break;
				case "7":
			        sItemCat="U";
			        break;
			    case "8":
			        sItemCat="W";
			        break;
			    case "9":
			        sItemCat="D";
			        break;
			    case "A":
			        sItemCat="E";
			        break;
			    default:
			        sItemCat="U";
			        
				return sItemCat;
			}
			
		},
		
		formatItemCatNum: function(sItemCat) {
			var sItemCatNum;
			
			switch (sItemCat) {
				case "":
			        sItemCatNum="0";
			        break;
				case "B":
			        sItemCatNum="1";
			        break;
			    case "K":
			        sItemCatNum="2";
			        break;
			    case "L":
			        sItemCatNum="3";
			        break;
				case "M":
			        sItemCatNum="4";
			        break;
			    case "S":
			        sItemCatNum="5";
			        break;
			    case "T":
			        sItemCatNum="6";
			        break;
				case "U":
			        sItemCatNum="7";
			        break;
			    case "W":
			        sItemCatNum="8";
			        break;
			    case "D":
			        sItemCatNum="9";
			        break;
			    case "E":
			        sItemCatNum="A";
			        break;
			    default:
			        sItemCatNum="7";
			        
				return sItemCatNum;
			}
		}
		
	};
	
	return Formatter;
	
}, true);