jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.m.TablePersoController");
jQuery.sap.require("sap.ui.core.message.MessageManager");
sap.ui.define(["ui/s2p/mm/requisition/maintain/s1/controller/BaseController",
	"sap/ui/model/json/JSONModel"], function(B, J) {
	"use strict";
	return sap.ui.controller("ui.s2p.mm.requisition.maintain.s1.MM_REQ_MAINTS1Extension.controller.Account_Asisgnment_DetailCustom", {
		//    onInit: function () {
		//        var r = sap.ui.core.UIComponent.getRouterFor(this);
		//        this.oRouter = r;
		//        r.getRoute("Account_Asisgnment_Detail").attachPatternMatched(this._onObjectMatched, this);
		//    },
		//    onAfterRendering: function () {
		//    },
		//    _onObjectMatched: function (e) {
		//        this.formPath = e.getParameter("arguments").formBindingPath;
		//        this.createAccDetailComponent();
		//    },
		    createAccDetailComponent: function () {
		    	var that = this;
		        var a = sap.ui.getCore().createComponent({
		            name: "sap.ui.s2p.mm.lib.reuse.accounting.component",
		            componentData: {
		                sAccEntitySetName: "C_Sspprmaint_Accassign",
		                sAccEntityTypeName: "C_Sspprmaint_AccassignType",
		                sAccBindingPathEntityType: this.formPath,
		                sAccBindingPathEntitySet: "",
		                oModel: this.getAppModel(),
		                oRouter: this.oRouter,
		                bEditMode: true,
		                bAccDetailsAsPopup: false,
		                sCurrentView: "form",
		                bShowListHeader: true,
		                bIsExtPurgScenario: this.getExtScenarioFlag()
		            }
		        });
		        this.getView().byId("accountingFormCustom").setComponent(a);
		        
		        //EID023
		        var sPath = this.formPath;
		        var aItemPath = sPath.split(",");
		        aItemPath.splice(2,1);
		        var sItemPath = aItemPath.toString();
		        sItemPath = sItemPath.replace("C_Sspprmaint_Accassign","C_Sspprmaint_Itm");
		        this.ItemPath = sItemPath;
		        
		        this.getModel().read("/" + sItemPath, { 
		        	success: function(oData){
		        		that.getView().byId("idFDVUInput").setValue(oData.extZZFDVU);
		        		that.getView().byId("idBYGInput").setValue(oData.extZZBYG);
		        		that.getView().byId("idSEGMInput").setValue(oData.extZZSEGM);
		        		that.getView().byId("idPRDInput").setValue(oData.extZZPRD);
		        	},
		        	error: function(oResponse){
		        		sap.m.MessageToast.show(oResponse.responseText);
		        	}
		        });
		        
		    },
		    
		    onValueHelpPressed: function (oEvent) {
		    	var that = this;
		    	var sId = oEvent.getSource().getId();                         
				var oModel = this.getView().getModel();
				
				var sTitle;
				var sSourceId;
				var sPath;
				var aColumns;
				
				if (sId.lastIndexOf("idFDVUInput") !== -1){
					if (this.oFDVUDialog){
						this.oFDVUDialog.open();
						return false;
					}
					sTitle = "FDVU";
					sSourceId = "idFDVU";
					sPath = "/NS3451Set";
					aColumns = [
						{label: "FDVU", template: "FDVU"},
						{label: "Description", template: "FDVUdesc"}
					];
				} else if (sId.lastIndexOf("idBYGInput") !== -1){
					if (this.oBYGDialog){
						this.oBYGDialog.open();
						return false;
					}
					sTitle = "BYG";
					sSourceId = "idBYG";
					sPath = "/NS3454Set";
					aColumns = [
						{label: "Bygningsdel", template: "Bygningsdel"},
						{label: "Description", template: "BYGdesc"}
					];
				} else if (sId.lastIndexOf("idSEGMInput") !== -1){
					if (this.oSEGMDialog){
						this.oSEGMDialog.open();
						return false;
					}
					sTitle = "Alt. Funksjon";
					sSourceId = "idSEGM";
					sPath = "/AlternativeSegmSet";
					aColumns = [
						{label: "Segment", template: "segment"},
						{label: "Description", template: "segmname"}
					];
				} else if (sId.lastIndexOf("idPRDInput") !== -1){
					if (this.oPRDDialog){
						this.oPRDDialog.open();
						return false;
					}
					sTitle = "Periodisering";
					sSourceId = "idPRD";
					sPath = "/PeriodiseringSet";
					aColumns = [
						{label: "Periodisering", template: "PRD"},
						{label: "Description", template: "PRDdesc"}
					];
				}
				
				
				
				var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
					id: sSourceId + "Dialog",
					title: sTitle,
					supportMultiselect: false,
					supportRanges: false,
					supportRangesOnly: false,
	
					ok: function(oEvt){
						var oSelected = oEvt.getSource()._oSelectedItems.getItems()[0];
						oSelected = oSelected.split("'");
						that.getView().byId(sSourceId + "Input").setValue(oSelected[1]);
						
						oValueHelpDialog.close();
					},
					
					cancel: function(){
						oValueHelpDialog.close();
					}
				});
				
				var oTable = oValueHelpDialog.getTable();
				
							// Filter Bar
				var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
					advancedMode: true,
					filterBarExpanded: true,
					filterGroupItems: [
						new sap.ui.comp.filterbar.FilterGroupItem({
							groupTitle: "test",
							groupName: "gn1",
							name: "n1",
							label: sTitle,
							control: new sap.m.Input({
								id: sSourceId + "Filter",
								liveChange: that.onFilterLiveChange
							})
						})
						],
					search: function(){
						that.fnSearch(oValueHelpDialog.getId());
					}
				});
				
				// Column Model
				var oColModel = new J();
				oColModel.setData({
					cols: aColumns
				});
				oTable.setModel(oColModel, "columns");
				oTable.setModel(oModel);
				oTable.bindRows(sPath);
				
				if (oValueHelpDialog.getId() === "idFDVUDialog"){
					this.oFDVUDialog = oValueHelpDialog;
				} else if (oValueHelpDialog.getId() === "idBYGDialog"){
					this.oBYGDialog = oValueHelpDialog;
				} else if (oValueHelpDialog.getId() === "idSEGMDialog"){
					this.oSEGMDialog = oValueHelpDialog;
				} else if (oValueHelpDialog.getId() === "idPRDDialog"){
					this.oPRDDialog = oValueHelpDialog;
				}

				oValueHelpDialog.setFilterBar(oFilterBar);
				oValueHelpDialog.addStyleClass("sapUiSizeCompact");
				oValueHelpDialog.open();
		    },
		    
		    onFilterLiveChange: function(oEvent) {
		    	var sId = oEvent.getSource().getId();
				var sSource = sId.slice(0, sId.length - 6);
				var oTable = sap.ui.getCore().byId(sSource + "Dialog").getTable();
				var sFilterValue = sap.ui.getCore().byId(sSource + "Filter").getValue();
				var sField;
				var sPath;
				if (sSource.lastIndexOf("FDVU")){
					sField = "FDVU";
					sPath = "/NS3451Set";
				} else if (sSource.lastIndexOf("BYG")){
					sField = "BYG";
					sPath = "/NS3451Set";
				} else if (sSource.lastIndexOf("SEGM")){
					sField = "segment";
					sPath = "/AlternativeSegmSet";
				} else if (sSource.lastIndexOf("PRD")){
					sField = "PRD";
					sPath = "/PeriodiseringSet";
				}
				
				if (sFilterValue === ""){
					oTable.bindRows(sPath);
				} else {
					oTable.bindRows({
						path: sPath,
						filters: [new sap.ui.model.Filter(sField, sap.ui.model.FilterOperator.EQ, sFilterValue)]
						});
				}
		    },
		    
		    onBack: function () {
				var oModel = this.getModel();
				var oAccItem = {};
				
				oAccItem.extZZFDVU = this.getView().byId("idFDVUInput").getValue();
				oAccItem.extZZBYG = this.getView().byId("idBYGInput").getValue();
				oAccItem.extZZSEGM = this.getView().byId("idSEGMInput").getValue();
				oAccItem.extZZPRD = this.getView().byId("idPRDInput").getValue();
				oModel.update("/" + this.ItemPath, oAccItem, {
					method: "PUT",
					success: function(){
						sap.m.MessageToast.show("Item updated successfully.");
					},
					error: function(oResponse){
						sap.m.MessageToast.show(oResponse.responseText);
						return false;
					}
				});
				
				window.history.back();
		        
		        //EID023 Destroy global variables for dialogs
		        if (this.oFDVUDialog) {
		        	this.oFDVUDialog.destroy();
		            this.oFDVUDialog = null;
		        }
				if (this.oBYGDialog) {
					this.oBYGDialog.destroy();
					this.oBYGDialog = null;
				}
				if (this.oSEGMDialog) {
					this.oSEGMDialog.destroy();
					this.oSEGMDialog = null;
				}
				if (this.oPRDDialog) {
					this.oPRDDialog.destroy();
					this.oPRDDialog = null;
				}
		        
		    }
	});
});