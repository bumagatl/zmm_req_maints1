jQuery.sap.require("sap.ca.ui.message.message");
sap.ui.define([
	"ui/s2p/mm/requisition/maintain/s1/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/UploadCollectionParameter",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"ui/s2p/mm/requisition/maintain/s1/model/formatter",
	"sap/ui/model/odata/ODataModel",
	"sap/ui/model/Filter",
	"ui/s2p/mm/requisition/maintain/s1/MM_REQ_MAINTS1Extension/util/Formatter"
], function(B, J, f, MessageToast, MessageBox, Formatter, ODataModel, Filter, Formatter1) {
	"use strict";
	return sap.ui.controller("ui.s2p.mm.requisition.maintain.s1.MM_REQ_MAINTS1Extension.controller.ItemDetailsCustom", {
		    // _loadattachments: function () {
		    //     var P = this.getPurchaseRequisition();
		    //     var i;
		    //     var a = "C";
		    //     if (!this.editable) {
		    //         a = "D";
		    //     }
		    //     if (P) {
		    //         while (P.length < 10) {
		    //             P = "0" + P;
		    //         }
		    //         var b = this.prItem;
		    //         if (b) {
		    //             i = P.concat(b);
		    //         } else {
		    //             i = this.itemDraftUUID;
		    //         }
		    //     } else {
		    //         i = this.itemDraftUUID;
		    //     }
		    //     i = i.replace(/-/g, "");
		    //     var s = this.getView();
		    //     var A;
		    //     var t = this;
		    //     if (A !== null && A && A.getId() === "attachmentsrv.ItemDetails") {
		    //         A.refresh(a, "EBAN", i);
		    //     } else {
		    //         A = this.getOwnerComponent().createComponent({
		    //             usage: "attachmentReuseComponent",
		    //             settings: {
		    //                 mode: a,
		    //                 objectKey: i,
		    //                 objectType: "EBAN"
		    //             }
		    //         });
		    //         A.then(function (c) {
		    //             t.byId("attachmentCompContainer").setComponent(c);
		    //         });
		    //     }
		    //     this.prcsclPresent();
		    // },
		    // onInit: function () {
		    //     this.getView().addEventDelegate({
		    //         onafterHide: function (e) {
		    //             this.oModel.resetChanges();
		    //             this.Model.refresh();
		    //         },
		    //         onbeforeHide: function () {
		    //             this.oModel.resetChanges();
		    //             this.Model.refresh();
		    //         }
		    //     });
		    //     this.getView().setBusyIndicatorDelay(0);
		    //     this.getView().setBusy(true);
		    //     this._notes = [];
		    //     this.batch_update = [];
		    //     this.batch_create = [];
		    //     this.accSection = false;
		    //     this.oModel = this.getAppModel();
		    //     this.oModel.setSizeLimit(500);
		    //     var r = sap.ui.core.UIComponent.getRouterFor(this);
		    //     r.getRoute("ItemDetails").attachPatternMatched(this._onObjectMatched, this);
		    //     var m = new sap.ui.model.json.JSONModel({
		    //         "Salutation": [
		    //             {
		    //                 "Key": "0001",
		    //                 "Name": "Ms."
		    //             },
		    //             {
		    //                 "Key": "0002",
		    //                 "Name": "Mr."
		    //             },
		    //             {
		    //                 "Key": "0003",
		    //                 "Name": "Company"
		    //             },
		    //             {
		    //                 "Key": "0004",
		    //                 "Name": "Mr. and Mrs."
		    //             }
		    //         ]
		    //     });
		    //     this.getView().setModel(m, "Title");
		    // },
		    // DateRangeValidation: function (e) {
		    //     var d = e.getSource();
		    //     var i = e.getParameter("valid");
		    //     if (i === true) {
		    //         var F = e.getSource().getDateValue();
		    //         var c = new Date(Date.UTC(F.getFullYear(), F.getMonth(), F.getDate()));
		    //         var t = e.getSource().getSecondDateValue();
		    //         var C = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()));
		    //         var p = d.getBinding("dateValue");
		    //         p.setValue(c);
		    //         var P = d.getBinding("secondDateValue");
		    //         P.setValue(C);
		    //     }
		    // },
		    // onPressApplyChange: function () {
		    //     this.saveApplyChange = true;
		    //     this.invokeMassChange();
		    // },
		    // onCancelChanges: function () {
		    //     this.ApplyChange.onCancelChanges();
		    // },
		    // onSelectItemsApplyChange: function () {
		    //     sap.ui.getCore().byId("massChangeDialog").setTitle(this.getResourceBundle().getText("selectItems"));
		    //     this.ApplyChange.onSelectItems(this.getPurchaseRequisition(), this.getHeaderDraftKey(), this);
		    // },
		    // goBacktoSectionsPage: function () {
		    //     sap.ui.getCore().byId("massChangeDialog").setTitle(this.getResourceBundle().getText("selectChanges"));
		    //     this.ApplyChange.goBacktoSectionsPage();
		    // },
		    // onSaveChanges: function () {
		    //     this.ApplyChange.onSaveChanges(this);
		    // },
		    // updateMassItemCount: function (e) {
		    //     this.ApplyChange.onUpdateSelectedItemsCount(e);
		    // },
		    // onSearchMassChange: function (e) {
		    //     this.ApplyChange.onSearchMassChange(e);
		    // },
		    prepareStatusUI: function () {
		        this.statusFromID_DBind();
		    },
		    _onObjectMatched: function (E) {
		        if (this.getOwnerComponent().getComponentData().changingSourcePageAllowed) {
		            this.setSourcePage("ItemDetails");
		        }
		        var v = new sap.ui.model.json.JSONModel();
		        var m = { editable: false };
		        this.bFlag = false;
		        if (this.getMode() === "edit") {
		            v.setData(m);
		            this.getView().setModel(v, "viewProperties");
		            this.getView().byId("smartForm1").setModel(v, "viewProperties");
		            this.getView().byId("smartForm2").setModel(v, "viewProperties");
		            this.getView().byId("smartForm3").setModel(v, "viewProperties");
		        } else {
		            try {
		                if (this.getAppModel().oData[E.getParameter("arguments").items].RequestedQuantity_fc == "1") {
		                    m = {
		                        editable: true,
		                        enabled: false
		                    };
		                } else {
		                    m = { editable: true };
		                }
		            } catch (e) {
		                m = { editable: true };
		            }
		            v.setData(m);
		            this.getView().setModel(v, "viewProperties");
		            this.getView().byId("smartForm1").setModel(v, "viewProperties");
		            this.getView().byId("smartForm2").setModel(v, "viewProperties");
		            this.getView().byId("smartForm3").setModel(v, "viewProperties");
		        }
		        this.save = false;
		        this.accSection = false;
		        this.supplierNamesos = "";
		        if (this._oContent_Supplier) {
		            this._oContent_Supplier.destroy(true);
		            this._oContent_Supplier = null;
		        }
		        if (this.productList) {
		            this.productList.destroy(true);
		            this.productList = null;
		        }
		        if (this._ocontent) {
		            this._ocontent.destroy(true);
		            this._ocontent = null;
		        }
		        this.setHeaderDraftKey(E.getParameter("arguments").DraftKey);
		        this.setPurchaseRequisition(E.getParameter("arguments").PurchaseRequisition);
		        this.itemDraftUUID = E.getParameter("arguments").DraftUUID;
		        this.getOwnerComponent().getComponentData().purReqnItemDraft = this.itemDraftUUID;
		        this.itmKey = E.getParameter("arguments").OpnCtlgItemID;
		        this.prItem = E.getParameter("arguments").PurchaseRequisitionItem;
		        this.getOwnerComponent().getComponentData().purReqnItem = this.prItem;
		        this.itemPath = E.getParameter("arguments").items;
		        if (E.getParameter("arguments").Editable === "true") {
		            this.editable = true;
		        } else {
		            this.editable = false;
		        }
		        this.getOwnerComponent().getComponentData().PRitemPath = this.itemPath;
		        this.itemBindingPath = "/" + this.itemPath + "/" + "to_PurReqnAccAssignment_WD";
		        var n = E.getParameter("name");
		        if (n === "ItemDetails") {
		            if (!this.getTestMode()) {
		                this._loadattachments();
		            }
		        }
		        this.getView().byId("smartForm1").bindElement({ path: "/" + this.itemPath });
		        this.getView().byId("smartForm2").bindElement({ path: "/" + this.itemPath });
		        this.checkAccAssignment();
		        this.getApprovalPreviewSet();
		        this.getView().setBusy(true);
		        this.dataManager.getNotes(this.getServiceCallParameter(this.onSuccessNotes, this.serviceFail), this.itemDraftUUID, this.getPurchaseRequisition(), this.prItem);
		        this.bFlag = false;
		        this.showSource();
		        var c = this.getView().byId("smartForm1").getBindingContext().getObject().Material;
		        if (c === "" || c === null) {
		            this.getView().byId("idMaterialDescription").setEnabled(true);
		        } else {
		            this.getView().byId("idMaterialDescription").setEnabled(false);
		        }
		        if (this.getPurchaseRequisition()) {
		            this.getView().byId("addSupplier").setEnabled(this.getView().byId("idDescription").getEditable());
		        }
		        this.deletable = this.getView().byId("smartForm1").getBindingContext().getObject().delete_ac;
		        this.getView().byId("idDeleteButton").setEnabled(this.deletable);
		        this.getView().byId("idSaveButton").setEnabled(this.deletable);
		        if (this.getPurchaseRequisition()) {
		            if (sap.ui.getCore().byId("itemProcessFlow")) {
		                sap.ui.getCore().byId("itemProcessFlow").destroy();
		            }
		            if (this.getPurchaseRequisition() !== "PurchaseRequisition 8") {
		            }
		        }
		        if (this.getTestMode()) {
		            this.getView().setBusy(false);
		        }
		        var p = this.getServiceCallParameter(this.successItemDetails, this.errorServiceFail);
		        this.dataManager.getItemDetails(p, this.getHeaderDraftKey(), this.itemDraftUUID, this.getPurchaseRequisition(), this.prItem, false);
		        if (this.getPurchaseRequisition()) {
		            var s = this.getItemStatus();
		            if (s === "B" || s === "A" || s === "K" || s === "L" || s === "R" || s === "S") {
		                this.getView().byId("idItemLevelStatus").setVisible(true);
		                this.prepareStatusUI();
		            } else {
		                this.getView().byId("idItemLevelStatus").setVisible(false);
		            }
		        }
		        if (this.checkSupplierAssigned()) {
		            this.getView().byId("addSupplier").setVisible(false);
		        }
		        if (this.getView().byId("idServicePerformerDet")) {
		            if (this.getView().byId("idServicePerformerDet").getValue()) {
		                if (this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0]) {
		                    this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[4].setEnabled(false);
		                }
		            }
		        }
		        if (this.getExtScenarioFlag()) {
		            this.getView().byId("productTypeSelect").setVisible(false);
		            this.getView().byId("idApplychangeButton").setVisible(false);
		        }
		        this.supplierPendingCanges = false;
		        this.getView().getModel().refresh();
		        this.oModel.resetChanges();
		    },
		//    checkSupplierAssigned: function () {
		//        var b, d;
		//        var s = this.getResourceBundle().getText("assigned");
		//        if (sap.ui.getCore().byId("idProductsTable")) {
		//            b = sap.ui.getCore().byId("idProductsTable").getItems().length;
		//            for (var i = 0; i <= b - 1; i++) {
		//                if (s === sap.ui.getCore().byId("idProductsTable").getItems()[i].getCells()[2].getText()) {
		//                    d = this.getResourceBundle().getText("assigned");
		//                    break;
		//                }
		//            }
		//        } else {
		//            if (this.getView().byId("sourceOfSupply").getContent().length > 0) {
		//                b = this.getView().byId("sourceOfSupply").getContent()[0].getItems().length;
		//            } else {
		//                b = 0;
		//            }
		//            for (var a = 0; a <= b - 1; a++) {
		//                if (s === this.getView().byId("sourceOfSupply").getContent()[0].getItems()[a].getCells()[2].getText()) {
		//                    d = this.getResourceBundle().getText("assigned");
		//                    break;
		//                }
		//            }
		//        }
		//        for (var c = 0; c <= b - 1; c++) {
		//            if (s === d) {
		//                return true;
		//            }
		//        }
		//        return false;
		//    },
		//    successItems: function (d) {
		//        if (d.results.length > 0) {
		//            var a = [];
		//            for (var i = 0; i < d.results.length; i++) {
		//                if (d.results[i].DraftUUID != this.itemDraftUUID) {
		//                    a.push(d.results[i]);
		//                }
		//            }
		//        }
		//        var b = { "items": a };
		//        this.oItemsList = new sap.ui.model.json.JSONModel(b);
		//        if (a.length > 0) {
		//            this.getView().byId("idApplychangeButton").setEnabled(true);
		//        } else {
		//            this.getView().byId("idApplychangeButton").setEnabled(false);
		//        }
		//    },
		//    errorServiceFailitems: function () {
		//        sap.m.MessageToast.show(this.oTextBundle.getText("readFailed"));
		//    },
		//    checkAccAssignment: function () {
		//        var a = this.getView().byId("accAssCategory").getValue();
		//        var p = this.getView().byId("idLocation").getValue();
		//        var e = this.getView().byId("idExtLocation").getValue();
		//        if (a === null || a === "" || (p === null || p === "") && (e === null || e === "")) {
		//            this.getView().byId("listAccAssignment").setVisible(false);
		//            this.getView().byId("formAccAssignment").setVisible(false);
		//            this.getView().setBusy(false);
		//        } else {
		//            this.dataManager.getAccAssignmentValue(this.getServiceCallParameter(this.checkAccountCategory, this.serviceFail), a);
		//        }
		//    },
		//    checkAccountCategory: function (d) {
		//        if (d.results[0] !== undefined) {
		//            this.accValue = d.results[0].ConsumptionPosting;
		//            if (this.accValue === "U") {
		//                this.getView().byId("listAccAssignment").setVisible(false);
		//                this.getView().byId("formAccAssignment").setVisible(false);
		//                this.getView().setBusy(false);
		//                this.accSection = false;
		//            } else {
		//                var p = this.getServiceCallParameter(this.successAccRead, this.errorServiceFail);
		//                this.dataManager.getAccounting(p, this.getHeaderDraftKey(), this.itemDraftUUID, this.getPurchaseRequisition(), this.prItem, false);
		//                this.getAppModel().read(this.itemBindingPath, {});
		//                this.getView().byId("listAccAssignment").setVisible(true);
		//                if (!this.getTestMode()) {
		//                    this.createAccComponent();
		//                }
		//                this.sFin = false;
		//                if (this.sFin === true) {
		//                    this.getView().byId("sFinlistAccAssignment").setVisible(true);
		//                    this.createAccComponentsFin();
		//                }
		//                this.getView().setBusy(false);
		//                this.accSection = true;
		//            }
		//        } else {
		//            this.getView().byId("listAccAssignment").setVisible(false);
		//            this.getView().setBusy(false);
		//        }
		//    },
		//    successAccRead: function (d) {
		//        var a = d.results[0];
		//    },
		//    createAccComponentsFin: function () {
		//        var F = sap.ui.getCore().createComponent({
		//            "name": "sap.fin.acc.lib.codingblock.component",
		//            componentData: {
		//                "entitySetName": "C_Sspprmaint_Accassign",
		//                "entityTypeName": "C_Sspprmaint_AccassignType",
		//                "parentEntitySetName": "C_Sspprmaint_Itm",
		//                "parentEntityKey": {
		//                    "PurchaseRequisition": this.getPurchaseRequisition(),
		//                    "PurchaseRequisitionItem": this.prItem,
		//                    "PurReqnItemDraftUUID": this.itemDraftUUID
		//                },
		//                "navigationName": "to_PurReqnAccAssignment_WD",
		//                "UIMode": "TABLE",
		//                "enableRowEditButtons": false
		//            }
		//        });
		//        F.attachCodingBlockAttributeChanged(jQuery.proxy(this.onCodingBlockChange, this));
		//        this.getView().byId("sFinaccAssignmentCompContainer").setComponent(F);
		//    },
		//    onCodingBlockChange: function (E) {
		//        var O = E.getParameter("codingBlockEvent").getSource().getModel().getData(E.getParameter("codingBlockEvent").getSource().getBindingContext().sPath);
		//        var p;
		//        try {
		//            delete O.HasDraftEntity;
		//            delete O.DraftAdministrativeDataUUID;
		//            delete O.IsActiveEntity;
		//            delete O.HasActiveEntity;
		//            delete O.MultipleAcctAssgmtDistrPercent;
		//            delete O.CompanyCode;
		//            delete O.CostElement;
		//            for (p in O)
		//                if (typeof O[p] === "object") {
		//                    delete O[p];
		//                }
		//            for (p in O) {
		//                if (p.search("UxFc") !== -1) {
		//                    delete O[p];
		//                }
		//            }
		//        } catch (e) {
		//        }
		//        var a = E.getParameter("codingBlockEvent").getSource().getBindingContext().sPath;
		//        var m = E.getParameter("codingBlockEvent").getSource().getModel();
		//        if (m) {
		//            m.update(a, O, {
		//                "success": jQuery.proxy(this.successHandler, this),
		//                "error": jQuery.proxy(this.errorHandler, this)
		//            });
		//        }
		//    },
		//    successHandler: function (e) {
		//        sap.m.MessageToast.show(this.oTextBundle.getText("updateSuccess"));
		//        e.getParameter("codingBlockEvent").getSource().getModel().refresh();
		//    },
		//    errorHandler: function () {
		//    },
		//    netPriceValidation: function () {
		//        var q = this.getView().byId("idNetPriceQuantity").getValue();
		//        q = q.split(".").join("");
		//        q = q.split(",").join("");
		//        q = Number(q);
		//        if (q <= 0 || isNaN(q)) {
		//            var d = this.getView().byId("smartForm1").getModel().getData("/" + this.itemPath);
		//            var c = d.PurReqnSSPCrossCatalogItem;
		//            if (c) {
		//                this.getView().byId("idPrice").setValueState(sap.ui.core.ValueState.None);
		//                return true;
		//            } else {
		//                this.getView().byId("idNetPriceQuantity").setValueState(sap.ui.core.ValueState.Error);
		//                this.getView().byId("idNetPriceQuantity").setValueStateText(this.getResourceBundle().getText("quantityError"));
		//                return false;
		//            }
		//        } else {
		//            var b = this.getView().byId("smartForm1").getModel().getData("/" + this.itemPath).BaseUnit;
		//            if (b === "") {
		//                this.getView().byId("idNetPriceQuantity").setUomEditState(0);
		//            } else {
		//                this.getView().byId("idNetPriceQuantity").setValueState(sap.ui.core.ValueState.None);
		//                return true;
		//            }
		//        }
		//    },
		//    priceValidation: function () {
		//        var p = this.getView().byId("idPrice").getValue();
		//        p = p.split(".").join("");
		//        p = p.split(",").join("");
		//        p = Number(p);
		//        if (p <= 0 || isNaN(p)) {
		//            var d = this.getView().byId("smartForm1").getModel().getData("/" + this.itemPath);
		//            var c = d.PurReqnSSPCrossCatalogItem;
		//            if (c) {
		//                this.getView().byId("idPrice").setValueState(sap.ui.core.ValueState.None);
		//                return true;
		//            } else {
		//                this.getView().byId("idPrice").setValueState(sap.ui.core.ValueState.Error);
		//                this.getView().byId("idPrice").setValueStateText(this.getResourceBundle().getText("priceError"));
		//                return false;
		//            }
		//        } else {
		//            this.getView().byId("idPrice").setValueState(sap.ui.core.ValueState.None);
		//            return true;
		//        }
		//    },
		//    quantityValidation: function () {
		//        var q = this.getView().byId("idDescription").getValue();
		//        if (this.getTestMode()) {
		//            q = "3,348.640";
		//        }
		//        q = q.split(".").join("");
		//        q = q.split(",").join("");
		//        var d = this.getView().byId("smartForm1").getModel().getData("/" + this.itemPath);
		//        var c = d.PurReqnSSPCrossCatalogItem;
		//        if (q.length > 13) {
		//            this.getView().byId("idDescription").setValueState(sap.ui.core.ValueState.Error);
		//            this.getView().byId("idDescription").setValueStateText(this.getResourceBundle().getText("quantityError"));
		//            return false;
		//        }
		//        q = Number(q);
		//        if (q <= 0 || isNaN(q)) {
		//            this.getView().byId("idDescription").setValueState(sap.ui.core.ValueState.Error);
		//            this.getView().byId("idDescription").setValueStateText(this.getResourceBundle().getText("quantityError"));
		//            return false;
		//        } else if (c) {
		//            this.getView().byId("idDescription").setValueState(sap.ui.core.ValueState.None);
		//            return true;
		//        } else if (this.getView().byId("idDescription").getUnitOfMeasure().trim() === "") {
		//            this.getView().byId("idDescription").setUomEditState(0);
		//            this.getView().byId("idDescription").setValueStateText(this.getResourceBundle().getText("quantityError"));
		//        } else {
		//            this.getView().byId("idDescription").setValueState(sap.ui.core.ValueState.None);
		//            return true;
		//        }
		//    },
		//    mandatoryFieldValidation: function () {
		//        var d = this.getView().byId("smartForm1").getModel().getData("/" + this.itemPath);
		//        var D = {};
		//        var s = this.getView().byId("smartForm1").getSmartFields();
		//        var a = this.getView().byId("smartForm2").getSmartFields();
		//        var b = s.concat(a);
		//        for (var i = 0; i < b.length; i++) {
		//            var k = b[i].getDataProperty().typePath;
		//            var v = b[i].getValue();
		//            D[k] = v;
		//            if (k === "NetPriceQuantity" || k === "RequestedQuantity") {
		//                if (d.PurReqnSSPCrossCatalogItem) {
		//                    D["BaseUnit"] = d.BaseUnit;
		//                } else {
		//                    D["BaseUnit"] = b[i].getUnitOfMeasure();
		//                }
		//            }
		//        }
		//        var c = Object.keys(d);
		//        for (i = 0; i < c.length; i++) {
		//            k = c[i].split("_");
		//            if (k[k.length - 1] === "fc") {
		//                if (d[c[i]] === 7) {
		//                    if (!D[k[0]]) {
		//                        return false;
		//                    }
		//                }
		//            }
		//        }
		//        if (d["Plant_fc"] === 7 && this.getView().byId("idCompany").getValue() == "") {
		//            return false;
		//        }
		//        return true;
		//    },
		//    getApprovalPreviewSet: function () {
		//        var p = this.getPurchaseRequisition();
		//        if (p.length !== 0) {
		//            this.dataManager.getApprovalPreviewSet(this.getServiceCallParameter(this.showApprovalPreview, this.serviceFail), p, this.prItem);
		//        } else {
		//            this.getView().byId("processflow2").setVisible(false);
		//            this.destroyContent("processflow2");
		//        }
		//    },
		//    showApprovalPreview: function (d) {
		//        if (d.results.length !== 0) {
		//            var a = d.results;
		//            var D = {};
		//            var o = [];
		//            var l = d.results.length;
		//            for (var i = 0; i < l; i++) {
		//                var b = {};
		//                b.id = i;
		//                if (a.length > 0) {
		//                    b.icon = "sap-icon://order-status";
		//                    b.label = a[i].Stext;
		//                    b.Userid = a[i].Objid;
		//                    b.UserType = a[i].Otype;
		//                    b.position = i;
		//                    o.push(b);
		//                }
		//            }
		//            if (o.length > 0) {
		//                D.oDataProcessFlow = o;
		//                var m = new sap.ui.model.json.JSONModel();
		//                m.setData(D);
		//                this.getView().byId("processflow1").setModel(m, "pf2");
		//            } else {
		//                this.getView().byId("processflow2").setVisible(false);
		//                this.destroyContent("processflow2");
		//            }
		//        } else {
		//            this.getView().byId("processflow2").setVisible(false);
		//            this.destroyContent("processflow2");
		//        }
		//    },
		//    onApproverClick: function (e) {
		//        this.oEventSrc = e.getSource();
		//        var a = this.byId("processflow1").getModel().getProperty("Userid", e.getSource().getBindingContext());
		//        this.dataManager.getApproverDetails(this.getServiceCallParameter(this.openApproverBusinessCard, this.serviceFail), a, this.getPurchaseRequisition(), this.prItem);
		//    },
		//    openApproverBusinessCard: function (d) {
		//        var j = new sap.ui.model.json.JSONModel(d);
		//        if (!this._oApproverPopover) {
		//            this._oApproverPopover = sap.ui.xmlfragment("F1600.view.approverBusinessCard", this);
		//            this.getView().addDependent(this._oApproverPopover);
		//        }
		//        this._oApproverPopover.setModel(j);
		//        this._oApproverPopover.setContentHeight("auto");
		//        this._oApproverPopover.openBy(this.oEventSrc);
		//    },
		//    onCallBusinessCard: function (e) {
		//        sap.m.URLHelper.triggerTel(e.getSource().getText());
		//    },
		//    onEmailBusinessCard: function (e) {
		//        sap.m.URLHelper.triggerEmail(e.getSource().getText());
		//    },
		//    materialValidation: function () {
		//        var m = this.getView().byId("idProductId").getValue();
		//        if (m === "") {
		//            this.saveItem();
		//            this.getView().byId("idMaterialDescription").setEnabled(true);
		//            this.getView().byId("idMaterialDescription").setValue("");
		//            this.getView().byId("idName").setEnabled(true);
		//        } else {
		//            this.dataManager.getMaterialDescription(this.getServiceCallParameter(this.successMaterial, this.serviceFail), m);
		//            this.getView().byId("idMaterialDescription").setEnabled(false);
		//        }
		//    },
		//    successMaterial: function (d) {
		//        var p = d.results ? d.results[0] : d;
		//        this.materialText = p.Material_Text;
		//        this.getView().byId("idMaterialDescription").setValue(this.materialText);
		//        this.getView().byId("idName").setValue(p.MaterialGroup);
		//        this.getView().byId("idName").setEnabled(false);
		//        this.saveItem();
		//    },
		
			onInnerControlsCreated: function(oEvent) {
				oEvent.getParameters()[0].setEnabled(false);
				// var sSource = oEvent.getParameters()[0].getId();
				// if((sSource.lastIndexOf("country") !== -1) || (sSource.lastIndexOf("region") !== -1)){
				// 	oEvent.getParameters()[0].setValueHelpOnly(true);
				// } else {
				// 	oEvent.getParameters()[0].setEnabled(false);
				// }
				
			},
			
		    showSource: function () {
		        this.material = this.getView().byId("smartForm1").getBindingContext().getProperty("Material");
		        if (this.material === "") {
		            this.material = this.getView().byId("smartForm1").getBindingContext().getProperty("ExtMaterialForPurg");
		        }
		        this.plant = this.getView().byId("smartForm1").getBindingContext().getProperty("Plant");
		        var a = this.getView().byId("smartForm1").getBindingContext().getProperty("FixedSupplier");
		        var p = this.getView().byId("smartForm1").getBindingContext().getProperty("PurchasingInfoRecord");
		        var b = this.getView().byId("smartForm1").getBindingContext().getProperty("PurchaseContract");
		        var c = this.getView().byId("smartForm1").getBindingContext().getProperty("PurchaseContractItem");
		        //EID030
		        var sContractText = this.getView().byId("smartForm1").getBindingContext().getProperty("ContractDescription");
		        var s = this.getView().byId("smartForm1").getBindingContext().getProperty("Supplier");
		        var e = this.getView().byId("smartForm1").getBindingContext().getProperty("ExtFixedSupplierForPurg");
		        var d = this.getView().byId("smartForm1").getBindingContext().getProperty("ExtDesiredSupplierForPurg");
		        var D = this.getView().byId("smartForm1").getModel().getData("/" + this.itemPath);
		        if ((a === "" || a === undefined) & (p === "" || p === undefined) & (b === "" || b === undefined) & (c === "" || c === undefined || c === "00000") & (s === "" || s === undefined) & (e === "" || e === undefined) & (d === "" || d === undefined)) {
		            this.getView().byId("addSupplier").setVisible(true);
		            if (!this._ocontent) {
		                this._ocontent = sap.ui.xmlfragment("ui.s2p.mm.requisition.maintain.s1.view.SourceOfSupply", this);
		            }
		            this.getView().byId("sourceOfSupply").removeAllContent();
		            this.getView().byId("sourceOfSupply").addContent(this._ocontent);
		            var t = sap.ui.getCore().byId("idProductsTable").getBinding("items");
		            var g = [];
		            g.push(new sap.ui.model.Filter("Material", "EQ", this.material));
		            g.push(new sap.ui.model.Filter("Plant", "EQ", this.plant));
		            t.filter(g);
		        } else {
		            this.getView().byId("sourceOfSupply").removeAllContent();
		            var F = this.getView().byId("smartForm1").getBindingContext().getProperty("FixedSupplier");
		            var h = this.getView().byId("smartForm1").getBindingContext().getProperty("Supplier");
		            var i = this.getView().byId("smartForm1").getBindingContext().getProperty("PurReqnSSPCatalog");
		            if (F !== "") {
		                this.text = "Fixed";
		                this.sText = F;
		            } else if (h !== "") {
		                this.text = "Preferred";
		                this.sText = h;
		            } else if (e !== "") {
		                this.text = "Fixed";
		                this.sText = e;
		            } else if (d !== "") {
		                this.text = "Preferred";
		                this.sText = d;
		            }
		            this.dataManager.getSupplierName(this.getServiceCallParameter(this.successSupplier, this.serviceFail), this.sText);
		            if (!this.productList) {
		                this.productList = sap.ui.xmlfragment("ui.s2p.mm.requisition.maintain.s1.view.AssignedSupplier", this);
		                this.getView().addDependent(this.productList);
		            }
		            this.getView().byId("sourceOfSupply").addContent(this.productList);
		            this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[1].setText(this.sText);
		            this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[2].setText(this.text);
		             //EID030
			        if (b) {
			        	this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[3].setText(b + " / " + parseInt(c,10) + " " + sContractText);	
			        }
			        //END
		            this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[2].setText(this.getResourceBundle().getText("assigned"));
		           
		            this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[4].setType("Reject");
		            if (!(i === "")) {
		                this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[4].setVisible(false);
		                this.getView().byId("addSupplier").setVisible(false);
		            } else {
		                this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[4].setVisible(true);
		                this.getView().byId("addSupplier").setVisible(true);
		            }
		        }
		    },
		//    onUpdateFinished: function () {
		//        var a = sap.ui.getCore().byId("idProductsTable").getItems().length;
		//        if (this.getPurchaseRequisition()) {
		//            for (var i = 0; i < a; i++) {
		//                sap.ui.getCore().byId("idProductsTable").getItems()[i].getCells()[4].setEnabled(this.editable);
		//            }
		//        }
		//    },
		//    disableSections: function (e) {
		//        if (this.getPurchaseRequisition() && e.getSource().getEditable() === false) {
		//            this.getView().byId("textArea").setEnabled(false);
		//            this.getView().byId("addSupplier").setEnabled(false);
		//        }
		//    },
		
		//    successSupplier: function (d) {
		//        this.getView().byId("sourceOfSupply").setBusy(true);
		//        var p = d.results ? d.results[0] : d;
		//        if (p) {
		//            this.supplierNamesos = p.SupplierName;
		//            this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[0].setText(this.supplierNamesos);
		//        }
		//        this.getView().byId("sourceOfSupply").setBusy(false);
		//    },
		    onPressSave: function (e) {
		        var t = this.getView().byId("idTitle").getValue();
		        if (this.priceValidation() && this.quantityValidation() && this.netPriceValidation() && this.mandatoryFieldValidation()) {
		            var d = this.getView().byId("smartForm1").getModel().getObject("/" + this.itemPath, { select: "*" });
		            if (this.getExtScenarioFlag()) {
		                if (this.getView().byId("sourceOfSupply").getContent()[0].getItems().length > 0)
		                    d = this.ExternalPurchasing.updateModel(this, d);
		            } else {
		                if (!(this.Fixedsupplier1 === undefined)) {
		                    d.FixedSupplier = this.Fixedsupplier1;
		                    //EID030
			                d.PurchaseContract = this.sContract;
			                d.PurchaseContractItem = this.sContractItem;
			                d.ContractDescription = this.sContractText;          
			            	//END
		                }
		                if (!(this.Supplier1 === undefined)) {
		                    d.Supplier = this.Supplier1;
		                    //EID030
			                d.PurchaseContract = this.sContract;
			                d.PurchaseContractItem = this.sContractItem;
			                d.ContractDescription = this.sContractText;      
			            	//END
		                }
		            }
		            if (this.bFlag) {
		                d.FixedSupplier = "";
		                d.Supplier = "";
		                //EID030
		                d.PurchaseContract = "";
		                d.PurchaseContractItem = "";
		                d.ContractDescription = "";      
		            	//END
		            }
		            // if (d.PurchasingDocumentItemCategory == "9") {
		            //     d.PurchasingDocumentItemCategory = "";
		            // }
		            //EID032 Item Category
					d.extPSTYP = this.getView().byId("idItemCatInput").getText();
			        //End of comment
		            d.FormOfAddress = t;
		            //EID032 Storage Location
		            d.extRESLO = this.getView().byId("idStorLocInput").getValue();
		            //End of comment
		            //EID055 
		            // d.extLGORT = this.getView().byId("idRecStorLocInput").getValue();
		            if (this.getView().byId("idDelAddInput").getValue() === "") {
		            	sap.m.MessageToast.show("Delivery Address is mandatory.");
		            	this.getView().byId("idDelAddInput").setValueState(sap.ui.core.ValueState.Error);
		            	return false;
		            }
		            
		            
		            d.extADRN2 = this.getView().byId("idDelAddInput").getValue(); 
		            //End of comment
		            
		            this.getView().setBusy(true);
		            var p = { "success": jQuery.proxy(this.successOnUpdate, this) };
		            for (var i = 0; i < this.batch_update.length; i++) {
		                this.dataManager.updateNotes(this.getServiceCallParameter(this.successOnUpdate, this.serviceFail), this.getAppModel(), this.batch_update[i].DraftUUID, this.getPurchaseRequisition(), this.batch_update[i], this.prItem, this.batch_update[i].DocumentTextForEdit);
		            }
		            for (i = 0; i < this.batch_create.length; i++) {
		                this.dataManager.createNotes(this.getServiceCallParameter(this.successOnUpdate, this.serviceFail), this.getAppModel(), this.batch_create[i].ParentDraftUUID, this.getPurchaseRequisition(), this.batch_create[i], this.prItem);
		            }
		            d = this.adjustPayload(d);
		            this.dataManager.updateItemDetails(this.getServiceCallParameter(this.successItemUpdate, this.serviceFail), this.itemDraftUUID, this.getPurchaseRequisition(), d, this.prItem);
		            this.dataManager.getNotes(this.getServiceCallParameter(this.onSuccessNotes, this.serviceFail), this.itemDraftUUID, this.getPurchaseRequisition(), this.prItem);
		        } else if (!this.mandatoryFieldValidation()) {
		            sap.m.MessageToast.show(this.getResourceBundle().getText("MandatoryFields"));
		            return;
		        }
		    },
		//    successUpdate: function () {
		//        var m = sap.ui.getCore().getMessageManager();
		//        m.removeAllMessages();
		//        var p = this.getServiceCallParameter(this.successItemDetails, this.errorServiceFail);
		//        this.dataManager.getItemDetails(p, this.getHeaderDraftKey(), this.itemDraftUUID, this.getPurchaseRequisition(), this.prItem, false);
		//        this.getView().setBusy(false);
		//        sap.m.MessageToast.show(this.getResourceBundle().getText("update"));
		//        this.bFlag = false;
		//        this.save = true;
		//    },
		//    invokeMassChange: function () {
		//        if (this.saveApplyChange) {
		//            this.getView().setBusy(false);
		//            this.saveApplyChange = false;
		//            var m = sap.ui.getCore().getMessageManager().getMessageModel().getData();
		//            var a = false;
		//            for (var i = 0; i < m.length; i++) {
		//                if (m[i].getType() === "Error") {
		//                    a = true;
		//                    break;
		//                }
		//            }
		//            if (this.mandatoryFieldValidation() === true) {
		//                if (a) {
		//                    var t = this;
		//                    sap.m.MessageBox.show(this.getResourceBundle().getText("errorBeforeCopy"), {
		//                        icon: sap.m.MessageBox.Icon.WARNING,
		//                        title: this.getResourceBundle().getText("MESSAGE_SEVERITY_WARNING"),
		//                        actions: [
		//                            sap.m.MessageBox.Action.YES,
		//                            sap.m.MessageBox.Action.NO
		//                        ],
		//                        styleClass: "sapUiSizeCompact",
		//                        onClose: function (A) {
		//                            if (A === sap.m.MessageBox.Action.YES) {
		//                                t.ApplyChange.onPressApplyChangeMass(t);
		//                            }
		//                        },
		//                        initialFocus: sap.m.MessageBox.Action.YES
		//                    });
		//                } else {
		//                    this.ApplyChange.onPressApplyChangeMass(this);
		//                }
		//            }
		//        }
		//    },
		//    successItemUpdate: function () {
		//        if (this.getTestMode()) {
		//            window.history.back();
		//            return;
		//        }
		//        if (this.accSection) {
		//            if (!this.getView().byId("smartForm1").getBindingContext().getProperty("AccountAssignmentCategory") == "") {
		//                this.accAssignComp.updateAccList(this.successAccUpdate, this.serviceFail, this);
		//            }
		//        } else {
		//            this.successUpdate();
		//        }
		//        this.supplierPendingCanges = false;
		//        this.oModel.resetChanges();
		//    },
		//    successAccUpdate: function (o) {
		//        var m = sap.ui.getCore().getMessageManager();
		//        m.removeAllMessages();
		//        var p = o.getServiceCallParameter(o.successItemDetails, o.errorServiceFail);
		//        o.dataManager.getItemDetails(p, o.getHeaderDraftKey(), o.itemDraftUUID, o.getPurchaseRequisition(), o.prItem, false);
		//        p = o.getServiceCallParameter(o.successAccRead, o.errorServiceFail);
		//        o.dataManager.getAccounting(p, o.getHeaderDraftKey(), o.itemDraftUUID, o.getPurchaseRequisition(), o.prItem, false);
		//        o.getAppModel().read(o.itemBindingPath, {});
		//        o.getView().setBusy(false);
		//        sap.m.MessageToast.show(o.getResourceBundle().getText("update"));
		//        o.bFlag = false;
		//        o.save = true;
		//    },
		//    onSuccessNotes: function (d) {
		//        this._notes = [];
		//        if (d.results.length > 0) {
		//            for (var i = 0; i < d.results.length; i++) {
		//                this._notes.push({
		//                    DocumentText: d.results[i].DocumentText,
		//                    DocumentTextForEdit: d.results[i].DocumentTextForEdit,
		//                    HasActiveEntity: d.results[i].HasActiveEntity,
		//                    HasDraftEntity: d.results[i].HasDraftEntity,
		//                    IsActiveEntity: d.results[i].IsActiveEntity,
		//                    PurReqnItemLongtext: d.results[i].PurReqnItemLongtext,
		//                    PurchaseRequisition: d.results[i].PurchaseRequisition,
		//                    PurchaseRequisitionItem: d.results[i].PurchaseRequisitionItem,
		//                    RootDraftUUID: d.results[i].RootDraftUUID,
		//                    ParentDraftUUID: d.results[i].ParentDraftUUID,
		//                    DraftUUID: d.results[i].DraftUUID,
		//                    PurReqnItmTextKey: d.results[i].PurReqnItmTextKey
		//                });
		//            }
		//            this.oJSModelCart1 = new sap.ui.model.json.JSONModel(d);
		//            this.getView().setModel(this.oJSModelCart1, "Notes");
		//            this.getView().byId("textArea").setValue(this._notes[0].PurReqnItemLongtext);
		//            this.getView().byId("idIconTabBarNoIcons").setSelectedKey(this._notes[0].DocumentText);
		//            if (!(this.getView().byId("idIconTabBarNoIcons").getItems()[0] === undefined)) {
		//                this.getView().byId("idIconTabBarNoIcons").getItems()[0].getContent()[0].setValue(this._notes[0].PurReqnItemLongtext);
		//            }
		//        } else {
		//            this.oJSModelCart1 = new sap.ui.model.json.JSONModel(d);
		//            this.getView().setModel(this.oJSModelCart1, "Notes");
		//            this.getView().byId("textArea").setValue("");
		//        }
		//        this.getView().setBusy(false);
		//        this.batch_update = [];
		//        this.batch_create = [];
		//    },
		    onSupplier: function () {
		        var b, d;
		        var s = this.getResourceBundle().getText("assigned");
		        this.cFlag = true;
		        if (sap.ui.getCore().byId("idProductsTable")) {
		            b = sap.ui.getCore().byId("idProductsTable").getItems().length;
		            for (var i = 0; i <= b - 1; i++) {
		                if (s === sap.ui.getCore().byId("idProductsTable").getItems()[i].getCells()[2].getText()) {
		                    d = this.getResourceBundle().getText("assigned");
		                    break;
		                }
		            }
		        } else {
		            if (this.getView().byId("sourceOfSupply").getContent().length > 0) {
		                b = this.getView().byId("sourceOfSupply").getContent()[0].getItems().length;
		            } else {
		                b = 0;
		            }
		            for (var a = 0; a <= b - 1; a++) {
		                if (s === this.getView().byId("sourceOfSupply").getContent()[0].getItems()[a].getCells()[2].getText()) {
		                    d = this.getResourceBundle().getText("assigned");
		                    break;
		                }
		            }
		        }
		        for (var c = 0; c <= b - 1; c++) {
		            if (s === d) {
		                sap.m.MessageToast.show(this.getResourceBundle().getText("unAssignMessage"));
		                this.cFlag = false;
		                break;
		            }
		        }
		        if (this.cFlag) {
		            if (!this._oContent_Supplier) {
		                this._oContent_Supplier = sap.ui.xmlfragment("ui.s2p.mm.requisition.maintain.s1.MM_REQ_MAINTS1Extension.view.Supplier", this);
		                sap.ui.getCore().byId("simpleForm").bindElement({ path: "/" + this.itemPath });
		                this.getView().addDependent(this._oContent_Supplier);
		            }
		            sap.ui.getCore().byId("supplier").setValue("");
		            this._oContent_Supplier.getButtons()[0].setEnabled(false);
		            var e = this.getView().byId("smartForm1").getBindingContext().getProperty("DraftUUID");
		            this._oContent_Supplier.bindElement("/" + this.entityConstants.getEntityName("itemEntity") + "(PurchaseRequisition='',PurchaseRequisitionItem='00000',DraftUUID=guid'" + e + "',IsActiveEntity=" + false + ")");
		            jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oContent_Supplier);
		            if (this.getExtScenarioFlag()) {
		                sap.ui.getCore().byId("supplier").setShowValueHelp(false);
		                sap.ui.getCore().byId("supplier").setShowSuggestion(false);
		            }
		            this._oContent_Supplier.open();
		            this.getView().byId("sourceOfSupply").removeContent();
		        }
		    },
		    onAddSupplier: function (e) {
		        this.getView().byId("sourceOfSupply").removeContent();
		        this.sText = "";
		        this.sRow = "";
		        this.sText = sap.ui.getCore().byId("supplier").getValue();
		        this.sRow = sap.ui.getCore().byId("supplier").data("Row");
		        var p = sap.ui.getCore().byId("preferred").getSelected();
		        if (p === true) {
		            this.text = "Preferred";
		            this.Supplier = this.sText;
		            this.Fixedsupplier = "";
		        } else {
		            this.text = "Fixed";
		            this.Fixedsupplier = this.sText;
		            this.Supplier = "";
		        }
		        if (!this.productList) {
		            this.productList = sap.ui.xmlfragment("ui.s2p.mm.requisition.maintain.s1.view.AssignedSupplier", this);
		            this.getView().addDependent(this.productList);
		        }
		        var a = this.oSupplierModel.oData;
		        var b = "I_Supplier_ExtSet(Row='" + this.sRow +"',Supplier='"+ this.sText + "')";
		        var c = a[b].Suppliername;
		        //EID030
		        var sContract = a[b].Contract;
		        var sContractText = a[b].Contract_text;
		        var sItem = a[b].Item;
		        //END
		        this.getView().byId("sourceOfSupply").removeAllContent();
		        this.getView().byId("addSupplier").setVisible(false);
		        this.getView().byId("sourceOfSupply").addContent(this.productList);
		        this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[0].setText(c);
		        this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[1].setText(this.sText);
		        this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[2].setText(this.text);
		        //EID030
		        if (sContract) {
		        	this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[3].setText(sContract + " / " + parseInt(sItem, 10) + " " + sContractText);	
		        } else {
		        	this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[3].setText("");
		        }
		        //END
		        this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[2].setText(this.getResourceBundle().getText("assigned"));
		        this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[4].setType("Reject");
		        this.Fixedsupplier1 = this.Fixedsupplier;
		        this.Supplier1 = this.Supplier;
		        //EID030
		        this.sContract = sContract;
		        this.sContractText = sContractText;
		        this.sContractItem = sItem;
		        //END
		        this.bFlag = false;
		        this._oContent_Supplier.close();
		        this.supplierPendingCanges = true;
		        this.onPressSave();
		    },
		//    onCancelSupplier: function () {
		//        sap.ui.getCore().byId("supplier").setValue("");
		//        this._oContent_Supplier.close();
		//    },
		    onUnAssign: function () {
		        this.supplierPendingCanges = true;
		        this.getView().byId("sourceOfSupply").removeAllContent();
		        var c = new sap.m.List({ noDataText: this.getResourceBundle().getText("supplier") });
		        this.getView().byId("addSupplier").setVisible(true);
		        this.getView().byId("sourceOfSupply").addContent(c);
		        var d = this.getView().byId("smartForm1").getModel().getData("/" + this.itemPath);
		        d.FixedSupplier = "";
		        d.Supplier = "";
		        d.ExtFixedSupplierForPurg = "";
		        d.ExtDesiredSupplierForPurg = "";
		        //EID030
		        d.PurchaseContract = "";
		        d.PurchaseContractItem = "";
		        d.ContractDescription = "";
		        //END
		        //Set Global variables to empty string
		        this.FixedSupplier1 = "";
		        this.Supplier1 = "";
		        this.sContract = "";
		        this.sContractText = "";
		        this.sContractItem = "";
		        this.sText = "";
		        this.text = "";
		        //END
		        this.bFlag = true;
		        if (!this._ocontent) {
		            this._ocontent = sap.ui.xmlfragment("ui.s2p.mm.requisition.maintain.s1.view.SourceOfSupply", this);
		        }
		        this.getView().byId("sourceOfSupply").removeAllContent();
		        this.getView().byId("sourceOfSupply").addContent(this._ocontent);
		        var t = sap.ui.getCore().byId("idProductsTable").getBinding("items");
		        var a = [];
		        a.push(new sap.ui.model.Filter("Material", "EQ", this.material));
		        a.push(new sap.ui.model.Filter("Plant", "EQ", this.plant));
		        t.filter(a);
		    },
		//    onSelect: function (e) {
		//        var k = e.getParameter("selectedKey");
		//        for (var i = 0; i < this._notes.length; i++) {
		//            if (this._notes[i].DocumentText === k || this._notes[i].DocumentTextForEdit === k) {
		//                e.getParameters().item.getContent()[0].setValue(this._notes[i].PurReqnItemLongtext);
		//                if (this.getPurchaseRequisition() && !this.getView().byId("idDescription").getEditable()) {
		//                    e.getParameters().item.getContent()[0].setEnabled(false);
		//                }
		//                break;
		//            } else {
		//                e.getParameters().item.getContent()[0].setValue("");
		//                if (this.getPurchaseRequisition() && !this.getView().byId("idDescription").getEditable()) {
		//                    e.getParameters().item.getContent()[0].setEnabled(false);
		//                }
		//            }
		//        }
		//    },
		//    onChange: function (e) {
		//        var k = e.getSource().getBindingContext().getProperty("DocumentText");
		//        var t = e.getSource().getValue();
		//        var i;
		//        var a = this._notes.map(function (x) {
		//            return x.DocumentTextForEdit;
		//        }).indexOf(k);
		//        var o = this._notes[a];
		//        var v = this.getView().byId("idPrice").getValue();
		//        var b = v.replace(/,/g, "");
		//        b = Number(b);
		//        if (isNaN(b)) {
		//            this.getView().byId("idPrice").setValueState(sap.ui.core.ValueState.Error);
		//        } else {
		//            this.getView().byId("idPrice").setValueState(sap.ui.core.ValueState.None);
		//        }
		//        if (a != "-1") {
		//            this._notes[a].PurReqnItemLongtext = t;
		//            var c = this.batch_update.map(function (x) {
		//                return x.DocumentTextForEdit;
		//            }).indexOf(k);
		//            if (c != "-1") {
		//                this.batch_update[c].PurReqnItemLongtext = t;
		//            } else {
		//                this.batch_update.push({
		//                    DocumentTextForEdit: k,
		//                    PurReqnItemLongtext: t,
		//                    DraftUUID: this._notes[a].DraftUUID
		//                });
		//            }
		//        } else {
		//            this._notes.push({
		//                DocumentTextForEdit: k,
		//                PurReqnItemLongtext: t,
		//                ParentDraftUUID: this.itemDraftUUID
		//            });
		//            var c = this.batch_create.map(function (x) {
		//                return x.DocumentTextForEdit;
		//            }).indexOf(k);
		//            if (c != "-1") {
		//                this.batch_create[c].PurReqnItemLongtext = t;
		//            } else {
		//                this.batch_create.push({
		//                    DocumentTextForEdit: k,
		//                    PurReqnItemLongtext: t,
		//                    ParentDraftUUID: this.itemDraftUUID
		//                });
		//            }
		//        }
		//    },
		//    successOnUpdate: function () {
		//        var m = sap.ui.getCore().getMessageManager();
		//        var a = m.getMessageModel().getData();
		//        var b = -1;
		//        for (var i = 0; i < a.length; i++) {
		//            if (a[i].message && a[i].code === "MMPUR_REQ_COMMON/022") {
		//                sap.m.MessageToast.show(a[i].message);
		//                b = 1;
		//                break;
		//            } else {
		//                b = 0;
		//            }
		//        }
		//        if (b !== 1) {
		//            sap.m.MessageToast.show(this.getResourceBundle().getText("itemDetailUpdate"));
		//        }
		//    },
		    onBack: function () {
		        if (!this.mandatoryFieldValidation()) {
		            sap.m.MessageToast.show(this.getResourceBundle().getText("MandatoryFields"));
		            return;
		        }
		        if (this._oContent) {
		            this._oContent.destroy();
		            this._oContent = null;
		        }
		        //EID055 Destroy global variables for dialogs
		        if (this.oIssStorLocDialog) {
		        	this.oIssStorLocDialog.destroy();
		            this.oIssStorLocDialog = null;
		        }
				if (this.oDelAddDialog) {
					this.oDelAddDialog.destroy();
					this.oDelAddDialog = null;
				}
		        var t = this;
		        if (this._oContent_Supplier) {
		            this._oContent_Supplier.destroy(true);
		            this._oContent_Supplier = null;
		        }
		        if (sap.ui.getCore().byId("attachmentsrv.ItemDetails")) {
		            sap.ui.getCore().byId("attachmentsrv.ItemDetails").destroy(true);
		        }
		        if (sap.ui.getCore().byId("buttonUnAssign1")) {
		            sap.ui.getCore().byId("buttonUnAssign1").destroy();
		        }
		        if (sap.ui.getCore().byId("textArea")) {
		            sap.ui.getCore().byId("textArea").destroy();
		        }
		        if (this.oModel.hasPendingChanges() || this.batch_update.length > 0 || this.batch_create.length > 0 || this.supplierPendingCanges) {
		            var c = !!this.getView().$().closest(".sapUiSizeCompact").length;
		            sap.m.MessageBox.show(this.getResourceBundle().getText("MESSAGE_DATA_LOST_POPUP"), {
		                icon: sap.m.MessageBox.Icon.WARNING,
		                title: this.getResourceBundle().getText("MESSAGE_SEVERITY_WARNING"),
		                actions: [
		                    sap.m.MessageBox.Action.OK,
		                    sap.m.MessageBox.Action.CANCEL
		                ],
		                onClose: function (a) {
		                    if (a === sap.m.MessageBox.Action.OK) {
		                        if (t.quantityValidation() && t.priceValidation() && t.netPriceValidation()) {
		                            t.oModel.resetChanges();
		                            t.oModel.refresh();
		                            window.history.back();
		                        }
		                    }
		                },
		                styleClass: c ? "sapUiSizeCompact" : ""
		            });
		        } else {
		            window.history.back();
		        }
		    },
		//    validatePhone: function () {
		//        var p = this.getView().byId("phone").getValue();
		//        var m = new sap.ui.core.message.ControlMessageProcessor();
		//        var M = sap.ui.getCore().getMessageManager();
		//        var s = this.getResourceBundle().getText("MESSAGE_ERROR_TELEPHONE_NUMBER");
		//        var a = new sap.ui.core.message.Message({
		//            message: s,
		//            type: sap.ui.core.MessageType.Error,
		//            target: "/phone/value",
		//            processor: m
		//        });
		//        M.registerMessageProcessor(m);
		//        if (p.length === 0 || isNaN(p)) {
		//            M.addMessages(a);
		//            this.getView().byId("phone").setValueState(sap.ui.core.ValueState.Error);
		//            return false;
		//        } else {
		//            M.removeAllMessages();
		//            return true;
		//        }
		//    },
		//    onAssign: function (e) {
		//        var l = e.getSource().getParent().getParent().getItems().length;
		//        var s = this.getResourceBundle().getText("assigned");
		//        var a = false;
		//        if (!(e.getSource().getText() === this.getResourceBundle().getText("unAssign"))) {
		//            for (var i = 0; i < l; i++) {
		//                if (s === e.getSource().getParent().getParent().getItems()[i].getCells()[2].getText()) {
		//                    a = true;
		//                    break;
		//                }
		//            }
		//        }
		//        if (!a) {
		//            if (e.getSource().getText() === this.getResourceBundle().getText("assign")) {
		//                e.getSource().getParent().getCells()[2].setText(this.getResourceBundle().getText("assigned"));
		//                e.getSource().setText(this.getResourceBundle().getText("unAssign"));
		//                e.getSource().setType(this.getResourceBundle().getText("reject"));
		//                this.Fixedsupplier1 = e.getSource().getParent().getCells()[1].getItems()[0].getAttributes()[1].getText();
		//                this.Supplier1 = e.getSource().getParent().getCells()[1].getItems()[0].getAttributes()[2].getText();
		//            } else {
		//                e.getSource().getParent().getCells()[2].setText("");
		//                e.getSource().setText(this.getResourceBundle().getText("assign"));
		//                e.getSource().setType("Default");
		//                this.getView().byId("addSupplier").setVisible(true);
		//                this.Fixedsupplier1 = "";
		//                this.Supplier1 = "";
		//            }
		//        } else {
		//            sap.m.MessageToast.show(this.getResourceBundle().getText("unAssignMessage"));
		//        }
		//        this.supplierPendingCanges = true;
		//        this.onPressSave();
		//    },
		//    validateEmail: function () {
		//        var e = this.getView().byId("email").getValue();
		//        var m = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
		//        var M = new sap.ui.core.message.ControlMessageProcessor();
		//        var o = sap.ui.getCore().getMessageManager();
		//        var s = this.getResourceBundle().getText("MESSAGE_ERROR_EMAIL");
		//        var a = new sap.ui.core.message.Message({
		//            message: s,
		//            type: sap.ui.core.MessageType.Error,
		//            target: "/email/value",
		//            processor: M
		//        });
		//        o.registerMessageProcessor(M);
		//        if (!m.test(e) || e.length === 0) {
		//            o.addMessages(a);
		//            this.getView().byId("email").setValueState(sap.ui.core.ValueState.Error);
		//            return false;
		//        } else {
		//            o.removeAllMessages();
		//            return true;
		//        }
		//    },
		    onAccCategoryUpdate: function () {
		        var d = this.getView().byId("smartForm1").getModel().getObject("/" + this.itemPath, { select: "*" });
		        d.FixedSupplier = this.Fixedsupplier;
		        d.Supplier = this.Supplier;
		        this.getView().setBusy(true);
		        //EID055 Trigger Live Change for Delivery Address BP
		        this.onDelAddLiveChange();
		       	if (this.oDelAddDialog) {
					this.oDelAddDialog.destroy();
					this.oDelAddDialog = null;
				}
		        //END
		        this.adjustPayload(d);
		        this.dataManager.updateItemDetails(this.getServiceCallParameter(this.checkAccAssignment, this.serviceFail), this.itemDraftUUID, this.getPurchaseRequisition(), d, this.prItem);
		    },
		//    onPressDelete: function () {
		//        var p = this.getServiceCallParameter(this.checkItemCount, this.errorServiceFail);
		//        this.dataManager.getHeader(p, this.getHeaderDraftKey(), this.getPurchaseRequisition());
		//    },
		//    checkItemCount: function (d) {
		//        var t = this;
		//        var p = d.results ? d.results[0] : d;
		//        this.itemCount = p.NumberOfItems;
		//        if (!this.getPurchaseRequisition() === "") {
		//            if (this.itemCount - 1 === 0) {
		//                sap.m.MessageBox.show(t.getResourceBundle().getText("msgDeleteLastItemCartMyPR"), {
		//                    icon: sap.m.MessageBox.Icon.WARNING,
		//                    title: t.getResourceBundle().getText("msgBoxTitle"),
		//                    actions: [
		//                        sap.m.MessageBox.Action.OK,
		//                        sap.m.MessageBox.Action.CANCEL
		//                    ],
		//                    styleClass: "sapUiSizeCompact",
		//                    onClose: function (a) {
		//                        if (a === sap.m.MessageBox.Action.OK) {
		//                            var m = t.getServiceCallParameter(t.successDelete, t.serviceFail);
		//                            t.dataManager.deleteItem(m, t.itemDraftUUID, t.getPurchaseRequisition(), t.prItem);
		//                        }
		//                    },
		//                    initialFocus: sap.m.MessageBox.Action.OK
		//                });
		//            } else {
		//                sap.m.MessageBox.show(t.getResourceBundle().getText("msgText"), {
		//                    icon: sap.m.MessageBox.Icon.WARNING,
		//                    title: t.getResourceBundle().getText("msgBoxTitle"),
		//                    actions: [
		//                        sap.m.MessageBox.Action.YES,
		//                        sap.m.MessageBox.Action.NO
		//                    ],
		//                    styleClass: "sapUiSizeCompact",
		//                    onClose: function (a) {
		//                        if (a === sap.m.MessageBox.Action.YES) {
		//                            var m = t.getServiceCallParameter(t.successDelete, t.serviceFail);
		//                            t.dataManager.deleteItem(m, t.itemDraftUUID, t.getPurchaseRequisition(), t.prItem);
		//                        }
		//                    },
		//                    initialFocus: sap.m.MessageBox.Action.YES
		//                });
		//            }
		//        } else {
		//            if (this.itemCount - 1 === 0) {
		//                if (this.getPurchaseRequisition() != "") {
		//                    var l = t.getResourceBundle().getText("msgDeleteLastItemCartAndOrder");
		//                } else {
		//                    l = t.getResourceBundle().getText("msgDeleteLastItemCart");
		//                }
		//                sap.m.MessageBox.show(l, {
		//                    icon: sap.m.MessageBox.Icon.WARNING,
		//                    title: t.getResourceBundle().getText("msgBoxTitle"),
		//                    actions: [
		//                        sap.m.MessageBox.Action.OK,
		//                        sap.m.MessageBox.Action.CANCEL
		//                    ],
		//                    styleClass: "sapUiSizeCompact",
		//                    onClose: function (a) {
		//                        if (a === sap.m.MessageBox.Action.OK) {
		//                            var m = t.getServiceCallParameter(t.successDelete, t.serviceFail);
		//                            t.dataManager.deleteItem(m, t.itemDraftUUID, t.getPurchaseRequisition(), t.prItem);
		//                        }
		//                    },
		//                    initialFocus: sap.m.MessageBox.Action.OK
		//                });
		//            } else {
		//                sap.m.MessageBox.show(t.getResourceBundle().getText("msgText"), {
		//                    icon: sap.m.MessageBox.Icon.WARNING,
		//                    title: t.getResourceBundle().getText("msgBoxTitle"),
		//                    actions: [
		//                        sap.m.MessageBox.Action.YES,
		//                        sap.m.MessageBox.Action.NO
		//                    ],
		//                    styleClass: "sapUiSizeCompact",
		//                    onClose: function (a) {
		//                        if (a === sap.m.MessageBox.Action.YES) {
		//                            var m = t.getServiceCallParameter(t.successDelete, t.serviceFail);
		//                            t.dataManager.deleteItem(m, t.itemDraftUUID, t.getPurchaseRequisition(), t.prItem);
		//                        }
		//                    },
		//                    initialFocus: sap.m.MessageBox.Action.YES
		//                });
		//            }
		//        }
		//    },
		//    successDelete: function () {
		//        sap.m.MessageToast.show(this.getResourceBundle().getText("delete"));
		//        if (this.getPurchaseRequisition() === "" && this.itemCount - 1 === 0) {
		//            this.getRouter().navTo("Search");
		//        } else {
		//            window.history.back();
		//        }
		//    },
		    createAccComponent: function () {
		        var e = this.editable;
		        var a = sap.ui.getCore().createComponent({
		            name: "sap.ui.s2p.mm.lib.reuse.accounting.component",
		            componentData: {
		                sAccEntitySetName: "C_Sspprmaint_Accassign",
		                sAccEntityTypeName: "C_Sspprmaint_AccassignType",
		                sAccBindingPathEntityType: "",
		                sAccBindingPathEntitySet: this.itemBindingPath,
		                oModel: this.getAppModel(),
		                oRouter: this.oRouter,
		                bEditMode: e,
		                bAccDetailsAsPopup: false,
		                sCurrentView: "list",
		                bShowListHeader: true,
		                bIsExtPurgScenario: this.getExtScenarioFlag()
		            }
		        });
		        a.attachDetailNavigation(jQuery.proxy(this.accDetailsnavigation, this));
		        this.getView().byId("accAssignmentCompContainer").setComponent(a);
		        this.accAssignComp = a;
		    },
		//    accDetailsnavigation: function (e) {
		//        var a = e.getParameter("bindpath");
		//        this.getRouter().navTo("Account_Asisgnment_Detail", { formBindingPath: a.substr(1) });
		//    },
		//    PricescaleClick: function (e) {
		//        if (!this._prcsclPopover) {
		//            this._prcsclPopover = sap.ui.xmlfragment("ui.s2p.mm.requisition.maintain.s1.view.PriceRange", this);
		//        }
		//        var i = "OpnCtlgItemID eq " + this.itmKey;
		//        var q = e.getSource().getParent().getParent().getParent().getBindingContext().getObject().NetPriceQuantity;
		//        var b = e.getSource().getParent().getParent().getParent().getBindingContext().getObject().BaseUnit;
		//        this.curr = e.getSource().getParent().getParent().getParent().getBindingContext().getObject().Currency;
		//        q = this.getResourceBundle().getText("price") + " " + this.getResourceBundle().getText("CurrencyPer") + " " + q + " " + b;
		//        var m = this.getServiceCallParameter(this.successPrcScale, this.serviceFail);
		//        this.dataManager.priceScalefind(m, i);
		//        this.getView().addDependent(this._prcsclPopover);
		//        var p = e.getSource();
		//        jQuery.sap.delayedCall(0, this, function () {
		//            this._prcsclPopover.openBy(p);
		//        });
		//        this._prcsclPopover.setPlacement("Right");
		//        this._prcsclPopover.getAggregation("content")[0].getAggregation("columns")[1].getAggregation("header").setText(q);
		//    },
		//    successPrcScale: function (d) {
		//        var j = new sap.ui.model.json.JSONModel(d);
		//        var l = j.oData.results.length;
		//        var i = 0;
		//        for (i = 0; i < l; i++) {
		//            j.oData.results[i].Currency = this.curr;
		//        }
		//        this._prcsclPopover.getContent()[0].setModel(j);
		//        this._prcsclPopover.getContent()[0].bindElement("/results");
		//    },
		//    prcsclPresent: function () {
		//        var i = "OpnCtlgItemID eq " + this.itmKey;
		//        var m = this.getServiceCallParameter(this.successPrcScalePresent, this.serviceFail);
		//        this.dataManager.priceScalefind(m, i);
		//    },
		//    successPrcScalePresent: function (d) {
		//        if (d.results.length) {
		//            this.getView().byId("l_prcscale").setVisible(true);
		//        } else {
		//            this.getView().byId("l_prcscale").setVisible(false);
		//        }
		//    },
		//    onExit: function () {
		//        if (this._oContent_Supplier) {
		//            this._oContent_Supplier.destroy(true);
		//            this._oContent_Supplier = null;
		//        }
		//        if (sap.ui.getCore().byId("attachmentsrv.ItemDetails")) {
		//            sap.ui.getCore().byId("attachmentsrv.ItemDetails").destroy(true);
		//        }
		//        if (this.productList) {
		//            this.productList.destroy(true);
		//            this.productList = null;
		//        }
		//        if (this._ocontent) {
		//            this._ocontent.destroy(true);
		//            this._ocontent = null;
		//        }
		//    },
		//    formartVisiblityDetailsPerformer: function (p) {
		//        var v = false;
		//        if (p != undefined) {
		//            if (p === "2") {
		//                v = true;
		//            }
		//        }
		//        return v;
		//    },
		//    formartVisiblityDetailsDateRange: function (p) {
		//        var v = false;
		//        if (p != undefined) {
		//            if (p === "2") {
		//                v = true;
		//            }
		//        }
		//        return v;
		//    },
		//    formartVisiblityDetailsDate: function (p) {
		//        var v = true;
		//        if (p != undefined) {
		//            if (p === "2") {
		//                v = false;
		//            }
		//        }
		//        return v;
		//    },
		//    selectionChangedDet: function (e) {
		//        var s = e.getSource().getValue();
		//        this.itemType = parseInt(s);
		//        if (this.itemType === 9) {
		//            var c = e.getSource().getBindingContext();
		//            e.getSource().getBindingContext().oModel.setProperty("ProductType", "2", c);
		//            this.getView().byId("idServicePerformerDet").setVisible(true);
		//            this.getView().byId("idServicePerformerDet").setShowLabel(true);
		//            this.getView().byId("idDeliveryDateRangeDet").setVisible(true);
		//            this.getView().byId("idDeliveryDateRangeDet").getParent().setVisible(true);
		//            this.getView().byId("idDate").setVisible(false);
		//        } else {
		//            var c = e.getSource().getBindingContext();
		//            e.getSource().getBindingContext().oModel.setProperty("ProductType", "", c);
		//            this.getView().byId("idServicePerformerDet").setVisible(false);
		//            this.getView().byId("idDeliveryDateRangeDet").setVisible(false);
		//            this.getView().byId("idDeliveryDateRangeDet").getParent().setVisible(false);
		//            this.getView().byId("idDate").setVisible(true);
		//            this.getView().byId("idDate").setShowLabel(true);
		//        }
		//        this.onPressSave();
		//    },
		//    checkDropDownEnabled: function (P) {
		//        var i = true;
		//        if (P !== "") {
		//            i = false;
		//        }
		//        return i;
		//    },
		//    formartPurchasingDocumentItemCategory: function (p, a) {
		//        if (a == "2") {
		//            p = "9";
		//            if (this.getView().byId("smartForm1") != undefined) {
		//                var i = this.getView().byId("smartForm1").getBindingContext();
		//                this.getView().byId("smartForm1").getBindingContext().oModel.setProperty("PurchasingDocumentItemCategory", "9", i);
		//            }
		//        }
		//        return p;
		//    },
		//    changeName: function (e) {
		//        e.getSource().setTextLabel(this.getResourceBundle().getText("companyCode"));
		//    },
		//    saveItem: function (S) {
		//        var t = this.getView().byId("idTitle").getValue();
		//        var d = this.getView().byId("smartForm1").getModel().getData("/" + this.itemPath);
		//        d.PurchaseRequisitionPrice = "0.00";
		//        if (!(this.Fixedsupplier1 === undefined)) {
		//            d.FixedSupplier = this.Fixedsupplier1;
		//        }
		//        if (!(this.Supplier1 === undefined)) {
		//            d.Supplier = this.Supplier1;
		//        }
		//        if (this.bFlag) {
		//            d.FixedSupplier = "";
		//            d.Supplier = "";
		//        }
		//        d.FormOfAddress = t;
		//        d = this.adjustPayload(d);
		//        this.getView().setBusy(true);
		//        this.dataManager.updateItemDetails(this.getServiceCallParameter(this.successItem(S), this.serviceFail), this.itemDraftUUID, this.getPurchaseRequisition(), d, this.prItem);
		//    },
		//    successItem: function (d) {
		//        this.getAppModel().read("/" + this.itemPath, {
		//            success: jQuery.proxy(this.updateBasicData, this),
		//            error: jQuery.proxy(this.serviceFail, this)
		//        });
		//    },
		//    updateBasicData: function (d) {
		//        this.getView().byId("idPrice").setValue(d.PurchaseRequisitionPrice);
		//        this.getView().setBusy(false);
		//    },
		//    adjustPayload: function (d) {
		//        var m = sap.ui.getCore().getMessageManager();
		//        m.removeAllMessages();
		//        for (var p in d) {
		//            if (p.search("_fc") < 0) {
		//                var a = p.toString() + "_fc";
		//                if (d[a] === 1 || d[a] === 0) {
		//                    delete d[p];
		//                    delete d[a];
		//                }
		//            }
		//        }
		//        return d;
		//    },
		//    showItemStatus: function () {
		//    },
		//    setDefaultValue: function (e) {
		//        if (e.getSource().getDataProperty().typePath === "AddressStreetName") {
		//            e.getSource().setTextLabel(this.getResourceBundle().getText("houseNumber"));
		//        }
		//    },
		//    servicePerformerChange: function (e) {
		//        var s = this.getView().byId("idServicePerformerDet").getValue();
		//        if (s) {
		//            var m = this.getModel();
		//            m.read("/C_MM_ServicePerformerValueHelp", {
		//                urlParameters: { "$filter": "ServicePerformer eq '" + s + "'" },
		//                success: jQuery.proxy(this.supplierReadSuccess, this),
		//                error: jQuery.proxy(this.supplierReadFailure, this)
		//            });
		//        } else {
		//            this.getView().byId("sourceOfSupply").getContent()[0].removeAllItems();
		//            this.getView().byId("addSupplier1").setVisible(true);
		//            if (this.productList) {
		//                this.productList.destroy();
		//                this.productList = null;
		//                var c = new sap.m.List({ noDataText: this.getResourceBundle().getText("supplier") });
		//                this.getView().byId("sourceOfSupply").addContent(c);
		//            }
		//        }
		//    },
		//    supplierReadSuccess: function (d) {
		//        if (d.results.length) {
		//            var s = d.results[0];
		//            this.text = "Fixed";
		//            this.Fixedsupplier = s.Supplier;
		//            this.Supplier = "";
		//            this.Fixedsupplier1 = this.Fixedsupplier;
		//            this.Supplier1 = this.Supplier;
		//            if (!this.productList) {
		//                this.productList = sap.ui.xmlfragment("ui.s2p.mm.requisition.maintain.s1.view.AssignedSupplier", this);
		//                this.getView().addDependent(this.productList);
		//            }
		//            this.getView().byId("sourceOfSupply").removeAllContent();
		//            this.getView().byId("sourceOfSupply").addContent(this.productList);
		//            this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[0].setText(s.SupplierName);
		//            this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[1].setText(s.Supplier);
		//            this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[1].getItems()[0].getAttributes()[2].setText(this.text);
		//            this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[2].setText("Assigned");
		//            this.getView().byId("addSupplier").setVisible(false);
		//            this.getView().byId("sourceOfSupply").getContent()[0].getItems()[0].getCells()[4].setEnabled(false);
		//        } else {
		//            this.getView().byId("idServicePerformer").setValueState(sap.ui.core.ValueState.Error);
		//            this.getView().byId("idServicePerformer").setValueStateText(this.getResourceBundle().getText("servicePerformerError"));
		//        }
		//    },
		
		onStorLocUpdate: function(oEvent){
			var that = this;
			var sId = oEvent.getSource().getId();
			var oModel = this.getView().getModel();
			var sAccount = this.getView().byId("accAssCategory").getValue();
			this.sAccAssign = sAccount; 
			var sTitle;
			var sSourceId;
			var sPath;
			var aColumns;
			var oDelAddTable;
			if (sId.lastIndexOf("idStorLocInput") !== -1){
				if (this.oIssStorLocDialog){
					this.oIssStorLocDialog.open();
					return false;
				}
				sTitle = "Issuing Storage Location";
				sSourceId = "idStorLoc";
				sPath = "/LOCATIONset";
				aColumns = [
					{label: "SLoc", template: "ZZRESLO"},
					{label: "Description", template: "LGOBE"}
				];
			} else if (sId.lastIndexOf("idRecStorLocInput") !== -1){
				if (this.oRecStorLocDialog){
					this.oRecStorLocDialog.open();
					return false;
				}
				sTitle = "Receiving Storage Location";
				sSourceId = "idRecStorLoc";
				sPath = "/LOCATIONset";
				aColumns = [
					{label: "SLoc", template: "ZZRESLO"},
					{label: "Description", template: "LGOBE"}
				];
			} else if (sId.lastIndexOf("idDelAddInput") !== -1){
				sTitle = "Delivery Address BP";
				sSourceId = "idDelAdd";
				sPath = "/DeliveryAddressSet";
				aColumns = [
					{label: "Business Partner", template: "BPNumber"},
					{label: "Name", template: "Name"},
					{label: "Street", template: "Street"},
					{label: "House Number", template: "HouseNumber"},
					{label: "City", template: "City"},
					{label: "Postal ID", template: "PostalID"}
				];
				
				if (this.oDelAddDialog){
					// oDelAddTable = sap.ui.getCore().byId("idDelAddDialog").getTable();
					
					// oDelAddTable.bindRows({
					// 	path: sPath,
					// 	filters: [new sap.ui.model.Filter("Type", sap.ui.model.FilterOperator.EQ, sAccount)]
					// });
					
					this.oDelAddDialog.open();
					return false;
				}
			}
			
			var oStorLocDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
				id: sSourceId + "Dialog",
				basicSearchText: that.getView().byId(sSourceId + "Input").getValue(),
				title: sTitle,
				supportMultiselect: false,
				supportRanges: false,
				supportRangesOnly: false,

				ok: function(oEvt){
					var oSelectedPath = oEvt.getSource()._oSelectedItems.getItems()[0];
					var oSelected = oSelectedPath.split("'");
					that.getView().byId(sSourceId + "Input").setValue(oSelected[1]);
					if (oEvt.getSource().getId() === "idDelAddDialog"){
						oModel.read("/" + oSelectedPath, {
							success: function(oData){
								//Set Values to Input Fields
								that.getView().byId("idDelAddInput").setValueState(sap.ui.core.ValueState.None);
								that.getView().byId("houseNo").setValue(oData.Street);
								that.getView().byId("houseNumber").setValue(oData.HouseNumber);
								that.getView().byId("district").setValue(oData.City);
								that.getView().byId("poCity").setValue(oData.PostalID);
								that.getView().byId("country").setValue(oData.Country);
								that.getView().byId("region").setValue(oData.Region);
							},
							error: function(oResponse){
								MessageBox.show(oResponse);
							}
						});
					}
					oStorLocDialog.close();
				},
				
				cancel: function(){
					oStorLocDialog.close();
				}
			});
			
			var oTable = oStorLocDialog.getTable();
			
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
					that.fnSearch(oStorLocDialog.getId());
				}
			});
			
			// Column Model
			var oColModel = new J();
			oColModel.setData({
				cols: aColumns
			});
			oTable.setModel(oColModel, "columns");
			oTable.setModel(oModel);
			
			if (sSourceId === "idDelAdd") {
				// Bind Rows
				oTable.bindRows({
					path: sPath,
					filters: [new sap.ui.model.Filter("DraftUUID", sap.ui.model.FilterOperator.EQ, this.itemDraftUUID),
					new sap.ui.model.Filter("Type", sap.ui.model.FilterOperator.EQ, sAccount)]
				});
			} else {
				oTable.bindRows(sPath);
			}
			
			if (oStorLocDialog.getId() === "idStorLocDialog"){
				this.oIssStorLocDialog = oStorLocDialog;
			} else if (oStorLocDialog.getId() === "idRecStorLocDialog"){
				this.oRecStorLocDialog = oStorLocDialog;
			} else if (oStorLocDialog.getId() === "idDelAddDialog"){
				this.oDelAddDialog = oStorLocDialog;
			}
			
			oStorLocDialog.setFilterBar(oFilterBar);
			oStorLocDialog.addStyleClass("sapUiSizeCompact");
			oStorLocDialog.open();
			
		},
		
		onItemCatUpdate: function(){
			var that = this;
			var oModel = this.getView().getModel();
			
			var oItemCatDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
				id: "idItemCatDialog",
				basicSearchText: that.getView().byId("idItemCatInput").getValue(),
				title: "Select Item Category",
				supportMultiselect: false,
				supportRanges: false,
				supportRangesOnly: false,

				ok: function(oEvent){
					var oSelected = oEvent.getParameter("tokens")[0].getAggregation("customData")[0].getValue();
					that.getView().byId("idItemCatInput").setValue(oSelected.EPSTP);
					oItemCatDialog.close();
				},
				
				cancel: function(){
					oItemCatDialog.close();
				},
				
				afterClose: function(){
					oItemCatDialog.destroy();
				}
			});
			
			var oTable = oItemCatDialog.getTable();
			// Column Model
			var oColModel = new J();
			oColModel.setData({
				cols: [
					{label: "Item Category", template: "EPSTP"},
					{label: "Description", template: "PTEXT"}
					]
			});
			oTable.setModel(oColModel, "columns");
			oTable.setModel(oModel);
			//Set Global Supplier Model 
			this.oItemCatModel = oModel;
			//Bind Rows
			oTable.bindRows("/ItemCategory_extSet");
			
			// Filter Bar
			var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
				advancedMode: true,
				filterBarExpanded: true,
				filterGroupItems: [
					new sap.ui.comp.filterbar.FilterGroupItem({
						groupTitle: "test",
						groupName: "gn1",
						name: "n1",
						label: "Item Category",
						control: new sap.m.Input({
							id: "idFilterEpstp"
						})
					})
					],
				search: function(){
					that.fnSearch(oItemCatDialog.getId());
				}
			});
			oItemCatDialog.setFilterBar(oFilterBar);
			oItemCatDialog.addStyleClass("sapUiSizeCompact");
			oItemCatDialog.open();
		},
		
		onSearchSupplier: function(){
			var that = this;
			var oModel = this.getView().getModel();
			this.PurchasingOrg = this.getView().byId("idPurchasingOrg").getValue();
			var sPurchOrg;
			if (!this.PurchasingOrg || this.PurchasingOrg === ""){
				sPurchOrg = "*";
			} else {
				sPurchOrg = this.PurchasingOrg;
			}
			
			var oSupplierDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
				id: "idSupplierDialog",
				basicSearchText: sap.ui.getCore().byId("supplier").getValue(),
				title: "Select Supplier",
				supportMultiselect: false,
				supportRanges: false,
				supportRangesOnly: false,

				ok: function(oEvent){
					var oSupplierInput = sap.ui.getCore().byId("supplier");
					var oSelected = oEvent.getSource()._oSelectedItems.getItems()[0];
					oSelected = oSelected.split("'");
					var sSelectedRow = oSelected[1];
					var sSelectedSupplier = oSelected[3];
					oSupplierInput.setValue(sSelectedSupplier);
					oSupplierInput.data("Row",sSelectedRow);
					oSupplierDialog.close();
				},
				
				cancel: function(){
					oSupplierDialog.close();
				},
				
				afterClose: function(){
					oSupplierDialog.destroy();
				}
			});
			
			var oTable = oSupplierDialog.getTable();
			// Column Model
			var oColModel = new J();
			oColModel.setData({
				cols: [
					{label: "Supplier", template: "Supplier"},
					{label: "Name", template: "Suppliername"},
					{label: "Contract", template: "Contract"},
					{label: "Contract Description", template: "Contract_text"}
					]
			});
			
			oTable.setModel(oColModel, "columns");
			oTable.setModel(oModel);
			//Set Global Supplier Model 
			this.oSupplierModel = oModel;
			// Bind Rows
			oTable.bindRows({
				path: "/I_Supplier_ExtSet",
				filters: [new sap.ui.model.Filter("Purchaseorg", sap.ui.model.FilterOperator.EQ, sPurchOrg)]
			});
			
			// Filter Bar
			var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
				advancedMode: true,
				filterBarExpanded: true,
				filterGroupItems: [
					new sap.ui.comp.filterbar.FilterGroupItem({
						groupTitle: "test",
						groupName: "gn1",
						name: "n1",
						label: "Supplier",
						control: new sap.m.Input({
							id: "idFilterSupplier",
							liveChange: that.onSupplierLiveChange
						})
					}),
					new sap.ui.comp.filterbar.FilterGroupItem({
						groupTitle: "test",
						groupName: "gn1",
						name: "n2",
						label: "Purchasing Organization",
						control: new sap.m.Text({
							id: "idFilterPurchOrg",
							text: that.PurchasingOrg
						})
					})
					],
				search: function(){
					that.fnSearch(oSupplierDialog.getId());
				}
			});
			
			oSupplierDialog.setFilterBar(oFilterBar);
			oSupplierDialog.addStyleClass("sapUiSizeCompact");
			oSupplierDialog.open();
			
		},
		
		onSupplierLiveChange: function(oEvent){
			var oTable = sap.ui.getCore().byId("idSupplierDialog").getTable();
			var sPurchOrgFilter = sap.ui.getCore().byId("idFilterPurchOrg").getText();
			var sPurchOrg;
			if (!sPurchOrgFilter || sPurchOrgFilter === ""){
				sPurchOrg = "*";
			} else {
				sPurchOrg = sPurchOrgFilter;
			}
			if (oEvent.getParameter("value") === ""){
				oTable.bindRows({
						path: "/I_Supplier_ExtSet",
						filters: [
						new sap.ui.model.Filter("Purchaseorg", sap.ui.model.FilterOperator.EQ, sPurchOrg)]
					});
			} else {
				oTable.bindRows({
						path: "/I_Supplier_ExtSet",
						filters: [ new sap.ui.model.Filter("Supplier", sap.ui.model.FilterOperator.EQ, oEvent.getParameter("value")),
						new sap.ui.model.Filter("Purchaseorg", sap.ui.model.FilterOperator.EQ, sPurchOrg)]
					});
			}
		},
		
		
		onFilterLiveChange: function(oEvent){
			var sId = oEvent.getSource().getId();
			var sSource = sId.slice(0, sId.length - 6);
			var oTable = sap.ui.getCore().byId(sSource + "Dialog").getTable();
			var sFilterValue = sap.ui.getCore().byId(sSource + "Filter").getValue();
			var sAccount = sap.ui.getCore().byId("accAssCategory").getValue();
			var sField;
			var sPath;
			var aFilters = [];
			if (sSource.lastIndexOf("StorLoc")){
				sField = "ZZRESLO";
				sPath = "/LOCATIONset";
				aFilters = [new sap.ui.model.Filter(sField, sap.ui.model.FilterOperator.EQ, sFilterValue)];
			} else if (sSource.lastIndexOf("DelAdd")){
				sField = "BPNumber";
				sPath = "/DeliveryAddressSet";
				aFilters = [new sap.ui.model.Filter(sField, sap.ui.model.FilterOperator.EQ, sFilterValue),
					new sap.ui.model.Filter("Type", sap.ui.model.FilterOperator.EQ, sAccount),
					new sap.ui.model.Filter("DraftUUID", sap.ui.model.FilterOperator.EQ, this.itemDraftUUID)];
			}
			
			if (sFilterValue === ""){
				oTable.bindRows(sPath);
			} else {
				oTable.bindRows({
					path: sPath,
					filters: aFilters
					});
			}
			
		},
		
		onDelAddLiveChange: function(oEvent) {
			var that = this;
			var oModel = this.getView().getModel();
			var oDelAddInput = that.getView().byId("idDelAddInput");
			var oAccAssInput = that.getView().byId("accAssCategory");
			var sInput;
			if (oEvent){
				sInput = oEvent.getParameter("value");
			} else {
				sInput = oDelAddInput.getValue();
				return false;
			}
			
			if (sInput === ""){
				oDelAddInput.setValueState(sap.ui.core.ValueState.None);
			}
			
			var aFilters = [new sap.ui.model.Filter("BPNumber", sap.ui.model.FilterOperator.EQ, sInput),
					new sap.ui.model.Filter("Type", sap.ui.model.FilterOperator.EQ, oAccAssInput),
					new sap.ui.model.Filter("DraftUUID", sap.ui.model.FilterOperator.EQ, this.itemDraftUUID)];
			
			oModel.read("/DeliveryAddressSet", {
				filters: aFilters,
				success: function(oData) {
					if (oData.BPNumber === "" || oData.BPNumber === undefined){
						oDelAddInput.setValueState(sap.ui.core.ValueState.Error);
						oDelAddInput.setValueStateText(that.getModel("i18n").getResourceBundle().getText("invalidDeliveryAddress"));
					} else {
						oDelAddInput.setValueState(sap.ui.core.ValueState.None);
					}
				},
				error: function() {
					oDelAddInput.setValueState(sap.ui.core.ValueState.Error);
					oDelAddInput.setValueStateText(that.getModel("i18n").getResourceBundle().getText("invalidDeliveryAddress"));
				}
			});
		},
		
		fnSearch: function(oEvent){
			var oTable = sap.ui.getCore().byId(oEvent).getTable();
			var sFilterId;
			if (oEvent === "idStorLocDialog" || oEvent === "idRecStorLocDialog"){
				sFilterId = oEvent.slice(0, oEvent.length - 6) + "Filter";
				var oLgortFilter = sap.ui.getCore().byId(sFilterId).getValue();
				if(oLgortFilter !== ""){
					oTable.bindRows({
						path: "/LOCATIONset",
						filters: [new sap.ui.model.Filter("ZZRESLO", sap.ui.model.FilterOperator.EQ, oLgortFilter)]
						});
				}

			} else if (oEvent === "idDelAddDialog"){
				sFilterId = oEvent.slice(0, oEvent.length - 6) + "Filter";
				var oDelAddFilter = sap.ui.getCore().byId(sFilterId).getValue();
				if(oDelAddFilter !== ""){
					oTable.bindRows({
						path: "/DeliveryAddressSet",
						filters: [new sap.ui.model.Filter("BPNumber", sap.ui.model.FilterOperator.EQ, oDelAddFilter),
							new sap.ui.model.Filter("Type", sap.ui.model.FilterOperator.EQ, this.sAccAssign),
							new sap.ui.model.Filter("DraftUUID", sap.ui.model.FilterOperator.EQ, this.itemDraftUUID)]
						});
				}

			} else if (oEvent === "idItemCatDialog"){
				var oEpstpFilter = sap.ui.getCore().byId("idFilterEpstp").getValue();
				if(oEpstpFilter !== ""){
					oTable.bindRows({
						path: "/ItemCategorySet",
						filters: [new sap.ui.model.Filter("PSTYP", sap.ui.model.FilterOperator.EQ, oEpstpFilter)]
					});
				}
			} else if (oEvent === "idSupplierDialog"){
				var oSupplierFilter = sap.ui.getCore().byId("idFilterSupplier").getValue();
				var sPurchOrg;
				if (!this.PurchasingOrg || this.PurchasingOrg === ""){
					sPurchOrg = "*";
				} else {
					sPurchOrg = this.PurchasingOrg;
				}
				if(oSupplierFilter !== ""){
					oTable.bindRows({
						path: "/I_Supplier_ExtSet",
						filters: [new sap.ui.model.Filter("Supplier", sap.ui.model.FilterOperator.EQ, oSupplierFilter),
						new sap.ui.model.Filter("Purchaseorg", sap.ui.model.FilterOperator.EQ, sPurchOrg)]
					});
				}
			}
		}
	});
});