var orgid;
var dataElementUid_form_s = "-1"; var dataElementDeathUid_form_s ="-1";
var sordeatharray=[];
var dataElementUid_form_p = "-1"; var dataElementDeathUid_form_p ="-1";
var dataElementUid_form_l = "-1";  var dataElementDeathUid_form_l ="-1";
var period, populationPeriodId =[];
var table_form_s = [];
var table2_form_s = [];
var table1_form_s = [];
var deathId_form_s = [];
var deathId_form_p = [];
var deathId_form_l = [];
var caseid_form_s = [];var aggData_form_s =[],  aggData_form_p =[],  aggData_form_l =[];
var objList_form_s = [],childUid =[],childrenUid="-1";
var objItem_form_s = {};var orgUnitChildrenName=[];    var clickedValue,clickedValueNavigation;
var sortedListFormS =[];
var orderArr_form_s =[];
var newcaseid_form_s=[];
var minLimit=[],maxLimit=[];

var caseColorValidation_form_l =[];

var periodidS, periodP, periodidL;

// subcentreCount Ids are obtained from orgunit group for form s,p,l
var subcCountForSUid = "jnNmtgX9sxp";  var idspPeriodSqlViewId = "o3dkhYqV6Fy";  var idspFormSSqlViewId = "SwKAcRBlOeS";// ids of testing instance of kerala
var subcCountForPUid = "UK9cAiZMAoq"; var idspFormPSqlViewId = "Y1PlekAV9zf"; // periodsqlviewid is same for all 3 forms
var subcCountForLUid ="e86x9uCM0kY";  var idspFormLSqlViewId = "smD9HY6zpuU";

var dateTitleStart,dow, ISOweekStart, ISOweekStart1, ISOweekEnd, ISOweekEnd1;

var caseDataFormSArr = [];


var deathDataFormSArr = [], deathDataFormPArr =[], deathDataFormLArr =[];
var populationDataArrS = [], populationDataArrP = [], populationDataArrL = [];
var org;
populationDeSemiColonSeperated = "EDw1ACK3LFp;YP8VQF0g3RG;bCyKTkqNOCq;z7pGBFmBH7v;cD0H1QBQIHh";

// for population--
var orgUnitGroupSC = "ougrjDQCLXQ";var populationFormSOU =[],populationFormSOU1 =[], populationFormSOUSemiColonSeperated ="-1", clickedOUFormS =[];
var orgUnitGroupPHC = "P28CmFCeT4C";var populationFormPOU =[],populationFormPOU1 =[], populationFormPOUSemiColonSeperated ="-1", clickedOUFormP =[];
var orgUnitGroupLab = "N5iSNHm2ard";var populationFormlOU =[],populationFormLOU1=[], populationFormLOUSemiColonSeperated ="-1", clickedOUFormL =[];

var populationAssignedOU =[], populationForS =[];

var year1;

var datasetFormS ="BVGM6uNWl0j";
var datasetFormP ="qmK8XTvRjHJ";
var datasetFormL= "oncbrAbFYAJ";
var resultSQLView, firstday, lastday, firstday1, lastday1;
var populationDeArr =[]; //var populationDeSemiColonSeperated ="-1";
var  confirmedCountS =0, confirmedCountP = 0, confirmedCountL=0;
var totalSubcentreCountS, totalSubcentreCountP, totalSubcentreCountL;

var table_form_p = [];
var table2_form_p = [];
var table1_form_p = [];
var caseid_form_p = [];
var objList_form_p = [];
var objItem_form_p = {};
var orderArr_form_p =[];
var newcaseid_form_p=[];


var count=0;


var table_form_l = [];
var table2_form_l = [];
var table1_form_l = [];
var caseid_form_l = [];
var objList_form_l = [];
var objItem_form_l = {};
var orderArr_form_l =[];
var newcaseid_form_l=[];
bidReportsApp
    .controller('homeController', function ($rootScope,
                                            $scope) {
        $(document).ready(function () {
            //  $('#demo').append(table);
        });
        var orgUnitUid = "q24rstddbGh";
        var orgUnitID;
        var xmlhttp_form_s = new XMLHttpRequest();
        var xmlhttp_form_p = new XMLHttpRequest();
        var xmlhttp_form_l = new XMLHttpRequest();

        xmlhttp_form_s.onreadystatechange = function () {
            if (xmlhttp_form_s.readyState == 4 && xmlhttp_form_s.status == 200) {
                generatePeriod();
                myFunction_form_s(xmlhttp_form_s);

                var orgUnit = {};
                $.get("../../organisationUnits?fields=id,name&filter=level:eq:2&paging=false", function (json) {

                    console.log("json--" + json.organisationUnits);
                    orgUnit["name"] = json.organisationUnits[0].name;
                    orgUnit["value"] = (json.organisationUnits[0].id);
                    objItem_form_s = {
                        orgName: orgUnit.name,
                        orgValue: orgUnit.value
                    };
                    objList_form_s.push(objItem_form_s);
					
					/*********************************************population for kerala*****************************************************/
					
					   $.get("../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" + objItem_form_s.orgValue + "&aggregationType=SUM", function (json6) {
                      
                        var datarows1 = json6.rows;
                        populationDataArrS=[];
                        var populationDataArrSTotal =0;

                        for (var i = 0; i < datarows1.length; i++) {
                            populationDataArrSTotal+=parseInt(datarows1[i][2]);
                            populationDataArrS.push(datarows1[i][2]);
						}
                        console.log("population Data for kerala---" + populationDataArrS);
                        console.log("Total population for kerala---" + populationDataArrSTotal);
						
                          $.get("../../../api/sqlViews/" + idspPeriodSqlViewId + "/data.json?var=firstday:" + firstday1 + "&var=lastday:" + lastday1, function (json) {
                     
                            for (var i = 0; i < json.rows.length; i++) {
                                periodidS = json.rows[i][0];
                            }
                            console.log("kerala periodid S--" + periodidS);
							
                            $.get("../../../api/organisationUnitGroups/" +subcCountForSUid+ ".json?fields=organisationUnits[id,name]&paging=false",function(data){
                   
                            totalSubcentreCountS = data.organisationUnits.length;
							    $.get("../../../api/sqlViews/" + idspFormSSqlViewId + "/data.json?var=valueType:int&var=periodid:" + periodidS + "&var=orgunit:" + objItem_form_s.orgValue, function (json2) {
                             
                                for (var i = 0; i < json2.rows.length; i++) {
                                    resultSQLView = json2.rows[i][0];
                                    confirmedCountS = resultSQLView;
                                }
                    
							var promise=[];
					promise.push(generateApi_form_s(objItem_form_s,dataElementUid_form_s));
					promise.push(generateApi_form_s(objItem_form_s,dataElementDeathUid_form_s));
					$.when.apply($, promise).then(function (param,param1) { 
						console.log("aggData_form_s--"+aggData_form_s);
                        updateRow_form_s(objList_form_s[0],param,param1,confirmedCountS,populationDataArrSTotal,totalSubcentreCountS);
						
						
						
						
					table_form_s = table1_form_s + table2_form_s;
                            document.getElementById("demo_form_s").innerHTML = table_form_s;
          
console.log(param);
	   }, function (e) {
            console.log("My ajax failed");
			
        });
					
	     });
						
                            });
					
						
                            });
					
						     });
	
                });

            }
        };
        xmlhttp_form_p.onreadystatechange = function () {
            if (xmlhttp_form_p.readyState == 4 && xmlhttp_form_p.status == 200) {
                myFunction_form_p(xmlhttp_form_p);
                generatePeriod();
                var orgUnit = {};
                $.get("../../organisationUnits?fields=id,name&filter=level:eq:2&paging=false", function (json) {
                    console.log("json--" + json.organisationUnits);
                    orgUnit["name"] = json.organisationUnits[0].name;
                    orgUnit["value"] = (json.organisationUnits[0].id);
                    // console.log("rows length--"+OrUnitAtLevel2);
                    objItem_form_p = {
                        orgName: orgUnit.name,
                        orgValue: orgUnit.value
                    };
                    objList_form_p.push(objItem_form_p);
					
					
					 /*********************************************population for kerala*****************************************************/
					  
					
					   $.get("../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" + objItem_form_p.orgValue + "&aggregationType=SUM", function (json7) {
                        //    console.log("../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" +schemas[j].orgValue+ "&aggregationType=SUM");

                        var datarows1 = json7.rows;

                        populationDataArrP=[];
                        var populationDataArrPTotal =0;

                        for (var i = 0; i < datarows1.length; i++) {
							  populationDataArrPTotal+=parseInt(datarows1[i][2]);
                    
                            populationDataArrP.push(datarows1[i][2]);
                        }
                        console.log("population Data for kerala---" + populationDataArrP);
                        console.log("Total population for kerala---" + populationDataArrPTotal);
						
						
						
						    $.get("../../../api/sqlViews/" + idspPeriodSqlViewId + "/data.json?var=firstday:" + firstday1 + "&var=lastday:" + lastday1, function (json8) {
                            //$.get("../../../api/sqlViews/q6M4Uqg0S0l/data.json?var=firstday:2016-04-25&var=lastday:2016-05-01", function(json){
                            for (var i = 0; i < json8.rows.length; i++) {
                                periodidP = json8.rows[i][0];
                            }
							
							
							    $.get("../../../api/organisationUnitGroups/" +subcCountForPUid+ ".json?fields=organisationUnits[id,name]&paging=false",function(data){
                           //var _url = "../../../api/organisationUnitGroups/" +subcCountForSUid+ ".json?fields=organisationUnits[id,name]&paging=false";
                            totalSubcentreCountP = data.organisationUnits.length;
							    $.get("../../../api/sqlViews/" + idspFormPSqlViewId + "/data.json?var=valueType:int&var=periodid:" + periodidP + "&var=orgunit:" + objItem_form_p.orgValue, function (json9) {
                                //   $.get("../../../api/sqlViews/udjdcBbz3OO/data.json?var=valueType:int&var=periodid:1053", function(json){
                                for (var i = 0; i < json9.rows.length; i++) {
                                    resultSQLView = json9.rows[i][0];
                                    confirmedCountP = resultSQLView;
                                }
								
								var promise=[];
					promise.push(generateApi_form_p(objItem_form_p,dataElementUid_form_p));
					promise.push(generateApi_form_p(objItem_form_p,dataElementDeathUid_form_p));
					$.when.apply($, promise).then(function (param1,param2) { 
						console.log("aggData_form_s--"+aggData_form_p);
						 updateRow_form_p(objList_form_p[0],param1,param2,confirmedCountP,populationDataArrPTotal,totalSubcentreCountP);
                       // updateRow_form_p(objList_form_p[0],param,param1,confirmedCountP,populationDataArrPTotal,totalSubcentreCountP);
						
						
						
						
					table_form_p = table1_form_p + table2_form_p;
                            document.getElementById("demo_form_p").innerHTML = table_form_p;
          
console.log(param);
	   }, function (e) {
            console.log("My ajax failed");
			
        });
					
	     });
						
                            });
					
						
                            });
					
						     });
	
               /*     generateApi_form_s(objItem_form_s).then(function (data) {
                        console.log(data);

                        aggData_form_s =[];
                        datarows = data.rows;

                        for(var i=0; i<datarows.length; i++)
                        {
                            aggData_form_s.push(datarows[i][2]);

                        }
                        console.log("aggData_form_s--"+aggData_form_s);
                        updateRow_form_s(objList_form_s[0],data).then(function(){table_form_s = table1_form_s + table2_form_s;
                            document.getElementById("demo_form_s").innerHTML = table_form_s;});

                    });*/
                });

            }
        };

        xmlhttp_form_l.onreadystatechange = function () {
            if (xmlhttp_form_l.readyState == 4 && xmlhttp_form_l.status == 200) {
                myFunction_form_l(xmlhttp_form_l);
                generatePeriod();
                var orgUnit = {};
                $.get("../../organisationUnits?fields=id,name&filter=level:eq:2&paging=false", function (json) {
                    console.log("json--" + json.organisationUnits);
                    orgUnit["name"] = json.organisationUnits[0].name;
                    orgUnit["value"] = (json.organisationUnits[0].id);
                    // console.log("rows length--"+OrUnitAtLevel2);
                    objItem_form_l = {
                        orgName: orgUnit.name,
                        orgValue: orgUnit.value
                    };
                    objList_form_l.push(objItem_form_l);
					
					 /*********************************************population for kerala*****************************************************/
			
					
					   $.get("../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" + objItem_form_l.orgValue + "&aggregationType=SUM", function (json8) {
                        //    console.log("../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" +schemas[j].orgValue+ "&aggregationType=SUM");

                        var datarows1 = json8.rows;

                        populationDataArrL=[];
                        var populationDataArrLTotal =0;

                        for (var i = 0; i < datarows1.length; i++) {
                              populationDataArrLTotal+=parseInt(datarows1[i][2]);
                            populationDataArrL.push(datarows1[i][2]);
                        }
                        console.log("population Data for kerala---" + populationDataArrL);
                        console.log("Total population for kerala---" + populationDataArrLTotal);
						
						  $.get("../../../api/sqlViews/" + idspPeriodSqlViewId + "/data.json?var=firstday:" + firstday1 + "&var=lastday:" + lastday1, function (json) {
                            //$.get("../../../api/sqlViews/q6M4Uqg0S0l/data.json?var=firstday:2016-04-25&var=lastday:2016-05-01", function(json){
                            for (var i = 0; i < json.rows.length; i++) {
                                periodidL = json.rows[i][0];
                            }
							
							
							    $.get("../../../api/organisationUnitGroups/" +subcCountForLUid+ ".json?fields=organisationUnits[id,name]&paging=false",function(data){
                           //var _url = "../../../api/organisationUnitGroups/" +subcCountForSUid+ ".json?fields=organisationUnits[id,name]&paging=false";
                            totalSubcentreCountL = data.organisationUnits.length;
							    $.get("../../../api/sqlViews/" + idspFormLSqlViewId + "/data.json?var=valueType:int&var=periodid:" + periodidL + "&var=orgunit:" + objItem_form_l.orgValue, function (json2) {
                                //   $.get("../../../api/sqlViews/udjdcBbz3OO/data.json?var=valueType:int&var=periodid:1053", function(json){
                                for (var i = 0; i < json2.rows.length; i++) {
                                    resultSQLView = json2.rows[i][0];
                                    confirmedCountL = resultSQLView;
                                }
								
								var promise=[];
					promise.push(generateApi_form_l(objItem_form_l,dataElementUid_form_l));
					promise.push(generateApi_form_l(objItem_form_l,dataElementDeathUid_form_l));
					$.when.apply($, promise).then(function (param,param1) { 
						console.log("aggData_form_s--"+aggData_form_l);
                        updateRow_form_l(objList_form_l[0],param,param1,confirmedCountL,populationDataArrLTotal,totalSubcentreCountL);
						
						
						
						
					table_form_l = table1_form_l + table2_form_l;
                            document.getElementById("demo_form_l").innerHTML = table_form_l;
          
console.log(param);
	   }, function (e) {
            console.log("My ajax failed");
			
        });
					
	     });
						
                            });
					
						
                            });
					
						     });
	
               /*     generateApi_form_s(objItem_form_s).then(function (data) {
                        console.log(data);

                        aggData_form_s =[];
                        datarows = data.rows;

                        for(var i=0; i<datarows.length; i++)
                        {
                            aggData_form_s.push(datarows[i][2]);

                        }
                        console.log("aggData_form_s--"+aggData_form_s);
                        updateRow_form_s(objList_form_s[0],data).then(function(){table_form_s = table1_form_s + table2_form_s;
                            document.getElementById("demo_form_s").innerHTML = table_form_s;});

                    });*/
                });

            }
        };


        xmlhttp_form_s.open("GET", "OutBreaks.xml", true);
        xmlhttp_form_p.open("GET", "OutBreaksFormP.xml", true);
        xmlhttp_form_l.open("GET", "OutBreaksFormL.xml", true);
        xmlhttp_form_s.send();
        xmlhttp_form_p.send();
        xmlhttp_form_l.send();

        var normId_form_s = [];
        var caseid_form_s = [];
        
        var normId_form_p = [];
        var caseid_form_p = [];
      
        var normId_form_l = [];
        var caseid_form_l = [];
       


        table1_form_s = "<td>" + "India" + "</td>";
        table1_form_p = "<td>" + "India" + "</td>";
        table1_form_l ="<td>" + "India" + "</td>";
        var apiChart1;

        function myFunction_form_s(xml) {
            var i;
            var xmlDoc = xml.responseXML;

            var x = xmlDoc.getElementsByTagName("norm");
            for (i = 0; i < x.length; i++) {
                normId_form_s.push(x[i].attributes[0].value);
                var check = x[i].attributes[1].value.indexOf(";");
                if(check>=0){
                    newcaseid_form_s.push(x[i].attributes[1].value);}
                caseid_form_s.push(x[i].attributes[1].value);
                deathId_form_s.push(x[i].attributes[2].value);
                var element = x[i].attributes[3].value;
                table1_form_s = table1_form_s + "<th>" + element + "</th>";
                orderArr_form_s.push(x[i].attributes[1].value);


            }
            for (var i = 0; i < caseid_form_s.length; i++) {
                dataElementUid_form_s += ";" + caseid_form_s[i];
            }

            for (var i = 0; i < deathId_form_s.length; i++) {
                dataElementDeathUid_form_s += ";" + deathId_form_s[i];
                sordeatharray.push(deathId_form_s[i]);
            }
            console.log("dataElementUid S--" + dataElementUid_form_s);
            console.log("dataElementDeathUid S--" + dataElementDeathUid_form_s);




/************************************************************************************************************************************/

            /************************************************************************************************************************************/
           // });

            table1_form_s = "<tr>" + table1_form_s + "</tr>"
        }

        function myFunction_form_p(xml) {
            var i;
            var xmlDoc = xml.responseXML;

            var x = xmlDoc.getElementsByTagName("norm");
            for (i = 0; i < x.length; i++) {
                normId_form_p.push(x[i].attributes[0].value);
                var check = x[i].attributes[1].value.indexOf(";");
                if(check>=0){
                    newcaseid_form_p.push(x[i].attributes[1].value);}
                caseid_form_p.push(x[i].attributes[1].value);
                deathId_form_p.push(x[i].attributes[2].value);
                var element = x[i].attributes[3].value;
                table1_form_p = table1_form_p + "<th>" + element + "</th>";
                orderArr_form_p.push(x[i].attributes[1].value);
            }
            for (var i = 0; i < caseid_form_p.length; i++) {
                dataElementUid_form_p += ";" + caseid_form_p[i];
            }

            for (var i = 0; i < deathId_form_p.length; i++) {
                dataElementDeathUid_form_p += ";" + deathId_form_p[i];
            }

            console.log("dataElementDeathUid P--" + dataElementDeathUid_form_p);
            console.log("dataElementUid P--" + dataElementUid_form_p);

//************************************************************************************************************************************/


            /************************************************************************************************************************************/
            table1_form_p = "<tr>" + table1_form_p + "</tr>"
        }



        function myFunction_form_l(xml) {
            var i;
            var xmlDoc = xml.responseXML;

            var x = xmlDoc.getElementsByTagName("norm");
            for (i = 0; i < x.length; i++) {
                normId_form_l.push(x[i].attributes[0].value);
                var check = x[i].attributes[1].value.indexOf(";");
                if(check>=0){
                    newcaseid_form_l.push(x[i].attributes[1].value);}
                caseid_form_l.push(x[i].attributes[1].value);
                deathId_form_l.push(x[i].attributes[3].value);
                caseColorValidation_form_l.push(x[i].attributes[2].value);
                var element = x[i].attributes[4].value;

                table1_form_l = table1_form_l + "<th>" + element + "</th>";
                orderArr_form_l.push(x[i].attributes[1].value);
            }
            for (var i = 0; i < caseid_form_l.length; i++) {
                dataElementUid_form_l += ";" + caseid_form_l[i];
            }

            for (var i = 0; i < deathId_form_l.length; i++) {
                dataElementDeathUid_form_l += ";" + deathId_form_l[i];
            }

            console.log("dataElementDeathUid L--" + dataElementDeathUid_form_l);
            console.log("dataElementUid L--" + dataElementUid_form_l);

            table1_form_l = "<tr>" + table1_form_l + "</tr>"
        }



        function generatePeriod() {
            var d = new Date();

            //for population periodid
            var toDaysDate =  [d.getFullYear(), (d.getMonth()+1),d.getDate()].join('-');
            console.log("date--"+toDaysDate);

            var year = d.getFullYear();
            year1 = d.getFullYear()-1;
            console.log("current year" + year);
            var onejan = new Date(d.getFullYear(), 0, 4);
            var n = d.getDay();
            var week;

            if(n>=1 && n<=5) {
     week = (Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7)) - 1; // value of last week
    }
            else{
    week = (Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7)) - 2; // value of last week
}

            console.log("week number-" + week);
            period = year + 'W' + week;
            var curr = new Date;
            // firstday = '2016-04-25';
            // lastday = '2016-05-01';



            // DATE TITLE
            dateTitleStart = new Date(year, 0, 1+((week-1)*7));
            var dateTitleEnd = new Date(year, 0, 1+((week-1)*7));
            dow = dateTitleStart.getDay();

            ISOweekStart = dateTitleStart;
            ISOweekEnd =  dateTitleEnd ;
            if (dow <= 4) {
                ISOweekStart.setDate(dateTitleStart.getDate() - dateTitleStart.getDay() + 1);
                ISOweekStart1 = [ISOweekStart.getDate(), (ISOweekStart.getMonth() + 1),ISOweekStart.getFullYear() ].join('-');
                ISOweekEnd.setDate(dateTitleStart.getDate()- dateTitleStart.getDay() +7);
                ISOweekEnd1 = [ISOweekEnd.getDate(), (ISOweekEnd.getMonth() + 1),ISOweekEnd.getFullYear() ].join('-');
            }
            else
            { ISOweekStart.setDate(dateTitleStart.getDate() + 8 - dateTitleStart.getDay());
                ISOweekStart1 = [ISOweekStart.getDate(), (ISOweekStart.getMonth() + 1),ISOweekStart.getFullYear() ].join('-');
                ISOweekEnd.setDate(dateTitleStart.getDate() + 7 - dateTitleStart.getDay());
                ISOweekEnd1 = [ISOweekEnd.getDate(), (ISOweekEnd.getMonth() + 1),ISOweekEnd.getFullYear() ].join('-');
            }
            console.log("ISOweekStart" + ISOweekStart1);
            console.log("ISOweekEnd1" + ISOweekEnd1);


            firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
            var a = firstday.getMonth()+1 ;
            var b = firstday.getDate();
            if(a < 10){
                a = '0'+ a;
            }
            if(b<10){
                b = '0'+b;
            }

            /********************** UNCOMMENT firstday1 ******************/
            //    firstday1 = [firstday.getFullYear(), a,b].join('-');
            /********************** UNCOMMENT firstday1 ******************/


            lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 5));
            var c = lastday.getMonth()+1;
            var d1 = lastday.getDate();
            if(c < 10){
                c = '0'+ c;
            }
            if(d1 < 10){
                d1 = '0'+d1;
            }

            /********************** UNCOMMENT lastday1 ******************/
            //   lastday1 = [lastday.getFullYear(), c ,d1+2].join('-');  // to calculate perioid which is from mon to sun and not mon to fri
            /********************** UNCOMMENT firstday1 ******************/

            firstday1 = '2016-04-25';
            lastday1 = '2016-05-01';


            var periodId = firstday.toString().split("::")[0];
            var periodString = " ( " + firstday.toString().split("::")[1] + " )";
            // var periodDate = ((firstday.getDate()) + '-' + (firstday.getMonth() + 1) + '-' + firstday.getFullYear() + " " + "To" + " " + (lastday.getDate() + 1) + '-' + (lastday.getMonth()+1) + '-' + lastday.getFullYear());
            var periodDate = ISOweekStart1 + " " + "To" + " "+ ISOweekEnd1;
            document.getElementById('date').innerHTML = periodDate;


        }

        var orgUnitID, orgUnitName;
        function getAllOU() {
            var ou_name = [], ou_id = [];
            $.get("../../../api/organisationUnits.json?field=*&paging=false", function (json) {

                for (var i = 0; i < json.organisationUnits.length; i++) {

                    ou_name.push(json.organisationUnits[i].name);
                    ou_id.push(json.organisationUnits[i].id);
                }
            })
        }
    });


function getImmediateChildren_form_s(orgid,orgname) {
 
    table2_form_s = [];


    $.get("../../../api/organisationUnits/" + orgid + ".json?&fields=id,name,children[id,name]", function (json) {
		
		
		
        var orgChildren = json.children;
		var childlength=json.children.length;
		
 var populationDataArrSTotal =0;
 
 
 if(childlength>0){
    var str=document.getElementById("navigation").innerHTML;
    if(str.indexOf(orgname)<0)
    {
        document.getElementById("navigation").innerHTML += "->"+ "<a onclick=getImmediateChildren_form_s('" + orgid + "','" + orgname + "') >" + orgname+ "</a>";}

    else{


        var i=str.indexOf(orgname);
        var j=orgname.length;
        document.getElementById("navigation").innerHTML =(document.getElementById("navigation").innerHTML).substring(0,i+2*j+8);

    }
 }
        var children_name;
        var children_id;
        var doingList = [];
        objList_form_s=[];
        for (var i = 0; i < orgChildren.length; i++) {
            children_name = orgChildren[i].name;
            children_id = orgChildren[i].id;
            objItem_form_s = {
                orgName: children_name,
                orgValue: children_id
            };


            objList_form_s.push(objItem_form_s);
            childUid.push(objItem_form_s.orgValue);
            doingList.push(objItem_form_s);
        }

        for (var i = 0; i < childUid.length; i++) {
            childrenUid += ";" + childUid[i];
        }

        $.when.apply($, doingList).then(function () {
            var schemas = arguments;
            var orgchildrenFormS=[];
            for (var j = 0; j < schemas.length; j++) {
                orgchildrenFormS.push(schemas[j].orgName);

            }
            // sorting children
            orgchildrenFormS.sort();
            var children_s=[];
            var objchildList_form_s=[];

            for (var i = 0; i < orgchildrenFormS.length; i++)
            {   for (var j = 0; j < schemas.length; j++) {
                if(orgchildrenFormS[i]==schemas[j].orgName)
                {
                    objchildList_form_s = {
                        orgName: orgchildrenFormS[i],
                        orgValue: schemas[j].orgValue
                    };
                    children_s.push(objchildList_form_s);
                }
            }
            }
            schemas=children_s;
            //var dfd = jQuery.Deferred();
            //var promise = dfd.promise();
            var dfd = jQuery.Deferred();
            


            for (var j = 0; j < schemas.length; j++) {
				var promises1 = [];
                console.log(schemas[j]);
               var orgunit= schemas[j].orgValue;


                    //POPULATION DATA

                    $.get("../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" + schemas[j].orgValue + "&aggregationType=SUM", function (json4) {
                        //    console.log("../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" +schemas[j].orgValue+ "&aggregationType=SUM");

                        var datarows1 = json4.rows;

                        populationDataArrS=[];
                       

                        for (var i = 0; i < datarows1.length; i++) {
                             populationDataArrSTotal+=parseInt(datarows1[i][2]);
                            populationDataArrS.push(datarows1[i][2]);
                        }
                        console.log("population Data S---" + populationDataArrS);
                        console.log("Total population form S---" + populationDataArrSTotal);
						
						
						   $.get("../../../api/sqlViews/" + idspPeriodSqlViewId + "/data.json?var=firstday:" + firstday1 + "&var=lastday:" + lastday1, function (json) {
                            //$.get("../../../api/sqlViews/q6M4Uqg0S0l/data.json?var=firstday:2016-04-25&var=lastday:2016-05-01", function(json){
                            for (var i = 0; i < json.rows.length; i++) {
                                periodidS = json.rows[i][0];
                            }     $.get("../../../api/organisationUnitGroups/" +subcCountForSUid+ ".json?fields=organisationUnits[id,name]&paging=false",function(data){
                           //var _url = "../../../api/organisationUnitGroups/" +subcCountForSUid+ ".json?fields=organisationUnits[id,name]&paging=false";
                            totalSubcentreCountS = data.organisationUnits.length;

							         $.get("../../../api/sqlViews/" + idspFormSSqlViewId + "/data.json?var=valueType:int&var=periodid:" + periodidS + "&var=orgunit:" + orgunit, function (json2) {
                                //   $.get("../../../api/sqlViews/udjdcBbz3OO/data.json?var=valueType:int&var=periodid:1053", function(json){
                                for (var i = 0; i < json2.rows.length; i++) {
                                    resultSQLView = json2.rows[i][0];
                                    confirmedCountS = resultSQLView;
                                }
                                console.log("resultSQLView for form S/ confirmedCountS--" + confirmedCountS);
      });
                        });
							
                          });
						  
                            });

                        //SELECT COUNT(*) FROM completedatasetregistration WHERE sourceid IN (10671, 43,9841,7900,9961,474,3722,8050,5009,40,473,5015,6184,3715,6183,2,5013,7386,475,3639,10879,8044,37,9938) AND datasetid = 52 AND periodid = 1053;
                     
                            console.log("periodid S--" + periodidS);

                        //    var orgunit1 = schemas[j].orgValue;

                   

				   promises1.push(generateApi_form_s(schemas[j],dataElementUid_form_s));
                promises1.push(generateApi_form_s(schemas[j],dataElementDeathUid_form_s));

                //promises1.push(generateApi_form_s(schemas[j]).then(function (data,objItem_form_s) {

                $.when.apply($, promises1).then(function (param,param1) {
                    updateRow_form_s(param[1],param,param1,confirmedCountS,populationDataArrSTotal,totalSubcentreCountS);
                    table_form_s = table1_form_s + table2_form_s;
                    document.getElementById("demo_form_s").innerHTML = table_form_s;

                });

            }

            $.when.apply($, promises1) // happens now
                .then(function () {
                    $.when.apply($, promises2) // happens now
                        .then(function () {
                            table_form_s = table1_form_s + table2_form_s;
                            document.getElementById("demo_form_s").innerHTML = table_form_s;
                        }, function (e) {
                            console.log("helloff "+e);
                        });
                }, function (e) {
                    console.log("hello "+e);
                });

        }, function (e) {
            console.log("My ajax failed");

        });
        //});


        //    });
    });
    count =0;

}


function getImmediateChildren_form_p(orgid,orgname) {

   
    table2_form_p = [];

    $.get("../../../api/organisationUnits/" + orgid + ".json?&fields=id,name,children[id,name]", function (json) {

        var orgChildren = json.children;
var childlength=json.children.length;
if(childlength>0){
 var str=document.getElementById("navigation1").innerHTML;
    if(str.indexOf(orgname)<0)
    {
        document.getElementById("navigation1").innerHTML += "->"+ "<a onclick=getImmediateChildren_form_p('" + orgid + "','" + orgname + "')>" + orgname+ "</a>";}

    else{
        var k=str.length;
        var i=str.indexOf(orgname);
        var j=orgname.length;
        document.getElementById("navigation1").innerHTML =(document.getElementById("navigation1").innerHTML).substring(0,i+2*j+8);

}}
        //POPULATION DE

var populationDataArrPTotal=0;

    /*    orgChildren.sort(function(a, b) {
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;//default return value (no sorting)
        });
*/
        var children_name;
        var children_id;
        var doingList = [];
        objList_form_p=[];
		
		 for (var i = 0; i < orgChildren.length; i++) {
            children_name = orgChildren[i].name;
            children_id = orgChildren[i].id;
           objItem_form_p = {
                orgName: children_name,
                orgValue: children_id
            };


             objList_form_p.push(objItem_form_p);
            childUid.push(objItem_form_p.orgValue);
             doingList.push(objItem_form_p);
        }
		
		 for (var i = 0; i < childUid.length; i++) {
            childrenUid += ";" + childUid[i];
        }
		
		
     
            /*var children_name;
             var children_id;
             var doingList = [];
             objList_form_p=[];
             for (var i = 0; i < json.children.length; i++) {
             children_name = json.children[i].name;
             children_id = json.children[i].id;
             objItem_form_p = {
             orgName: children_name,
             orgValue: children_id
             };*/

			  
			 
			 
			 
			 
      
    
        $.when.apply($, doingList).then(function () {
            var schemas = arguments;

            var orgchildrenFormP=[];
            for (var j = 0; j < schemas.length; j++) {
                orgchildrenFormP.push(schemas[j].orgName);

            }
            //sorting children
            orgchildrenFormP.sort();
            var children_p=[];
            var objchildList_form_p=[];

            for (var i = 0; i < orgchildrenFormP.length; i++)
            {   for (var j = 0; j < schemas.length; j++) {
                if(orgchildrenFormP[i]==schemas[j].orgName)
                {
                    objchildList_form_p = {
                        orgName: orgchildrenFormP[i],
                        orgValue: schemas[j].orgValue
                    };
                    children_p.push(objchildList_form_p);
                }
            }
            }
            schemas=children_p;
            var dfd = jQuery.Deferred();
			
		
          
        
            for (var j = 0; j < schemas.length; j++) {
				  var promises1 = [];
                console.log(schemas[j]);

                var orgunit= schemas[j].orgValue;


                //POPULATION DATA

                $.get("../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" + schemas[j].orgValue + "&aggregationType=SUM", function (json4) {
                   

                    var datarows1 = json4.rows;
                    populationDataArrP=[];
                  

                        for (var i = 0; i < datarows1.length; i++) {
                             populationDataArrPTotal+=parseInt(datarows1[i][2]);
                            populationDataArrP.push(datarows1[i][2]);
                        }
                    console.log("population Data P---" + populationDataArrP);
					
					
					 $.get("../../../api/sqlViews/" + idspPeriodSqlViewId + "/data.json?var=firstday:" + firstday1 + "&var=lastday:" + lastday1, function (json) {
                    
                    for (var i = 0; i < json.rows.length; i++) {
                        periodidP = json.rows[i][0];
                    }
                    console.log("periodid P--" + periodidP);

                 

                    $.get("../../../api/sqlViews/" + idspFormPSqlViewId + "/data.json?var=valueType:int&var=periodid:" + periodidP + "&var=orgunit:" + orgunit, function (json) {
                        //   $.get("../../../api/sqlViews/udjdcBbz3OO/data.json?var=valueType:int&var=periodid:1053", function(json){
                        for (var i = 0; i < json.rows.length; i++) {
                            resultSQLView = json.rows[i][0];
                            confirmedCountP = resultSQLView;
                        }
                        console.log("resultSQLView for form P/ confirmedCountP--" + confirmedCountP);
						
						
        $.get("../../../api/organisationUnitGroups/" +subcCountForPUid+ ".json?fields=organisationUnits[id,name]&paging=false",function(data) {
            //var _url = "../../../api/organisationUnitGroups/" +subcCountForSUid+ ".json?fields=organisationUnits[id,name]&paging=false";
            totalSubcentreCountP = data.organisationUnits.length;
        });


                    });
                });


                });

				    promises1.push(generateApi_form_p(schemas[j],dataElementUid_form_p));
                promises1.push(generateApi_form_p(schemas[j],dataElementDeathUid_form_p));

                $.when.apply($, promises1).then(function (param,param1) {
                    updateRow_form_p(param[1],param,param1,confirmedCountP,populationDataArrPTotal,totalSubcentreCountP);
                    table_form_p = table1_form_p + table2_form_p;
                    document.getElementById("demo_form_p").innerHTML = table_form_p;

                });

            }

            $.when.apply($, promises1) // happens now
                .then(function () {
                    $.when.apply($, promises2) // happens now
                        .then(function () {
                            table_form_p = table1_form_p + table2_form_p;
                            document.getElementById("demo_form_p").innerHTML = table_form_p;
                        }, function (e) {
                            console.log("helloff "+e);
                        });
                }, function (e) {
                    console.log("hello "+e);
                });

        }, function (e) {
            console.log("My ajax failed");

        });
        //});


        //    });
    });
    count =0;

}
function getImmediateChildren_form_l(orgid,orgname) {

   
    table2_form_l = [];

    $.get("../../../api/organisationUnits/" + orgid + ".json?&fields=id,name,children[id,name]", function (json) {

        var orgChildren = json.children;
		
		  var childlength = json.children.length;
		  if(childlength>0){
		 var str=document.getElementById("navigation2").innerHTML;
    if(str.indexOf(orgname)<0)
    {
        document.getElementById("navigation2").innerHTML += "->"+ "<a onclick=getImmediateChildren_form_l('" + orgid + "','" + orgname + "')>" + orgname+ "</a>";}

    else{
        var k=str.length;
        var i=str.indexOf(orgname);
        var j=orgname.length;
        document.getElementById("navigation2").innerHTML =(document.getElementById("navigation2").innerHTML).substring(0,i+2*j+8);

    }
		  }
    var   populationDataArrLTotal=0;


        var children_name;
        var children_id;
        var doingList = [];
        objList_form_l=[];
        for (var i = 0; i < orgChildren.length; i++) {
            children_name = orgChildren[i].name;
            children_id = orgChildren[i].id;
            objItem_form_l = {
                orgName: children_name,
                orgValue: children_id
            };
           
            objList_form_l.push(objItem_form_l);
			 childUid.push(objItem_form_l.orgValue);
            doingList.push(objItem_form_l);
        }
		
		 for (var i = 0; i < childUid.length; i++) {
            childrenUid += ";" + childUid[i];
        }
		
		

        $.when.apply($, doingList).then(function () {
            var schemas = arguments;
            var orgchildrenFormL=[];
            for (var j = 0; j < schemas.length; j++) {
                orgchildrenFormL.push(schemas[j].orgName);

            }
            //sorting children
            orgchildrenFormL.sort();
            var children_l=[];
            var objchildList_form_l=[];

            for (var i = 0; i < orgchildrenFormL.length; i++)
            {   for (var j = 0; j < schemas.length; j++) {
                if(orgchildrenFormL[i]==schemas[j].orgName)
                {
                    objchildList_form_l = {
                        orgName: orgchildrenFormL[i],
                        orgValue: schemas[j].orgValue
                    };
                    children_l.push(objchildList_form_l);
                }
            }
            }
            schemas=children_l;
            var dfd = jQuery.Deferred();
          
		  


           
            for (var j = 0; j < schemas.length; j++) {
				 var promises1 = [];
                console.log(schemas[j]);
 

                var orgunit= schemas[j].orgValue;


                //POPULATION DATA
				
				
				     $.get("../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" + schemas[j].orgValue + "&aggregationType=SUM", function (json4) {
                    //    console.log("../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" +schemas[j].orgValue+ "&aggregationType=SUM");

                    var datarows1 = json4.rows;
                   populationDataArrL=[];
                  

                        for (var i = 0; i < datarows1.length; i++) {
                            populationDataArrLTotal+=parseInt(datarows1[i][2]);
                            populationDataArrL.push(datarows1[i][2]);
                        }
                    console.log("population Data L---" + populationDataArrL);

					     $.get("../../../api/sqlViews/" + idspPeriodSqlViewId + "/data.json?var=firstday:" + firstday1 + "&var=lastday:" + lastday1, function (json) {
                    //$.get("../../../api/sqlViews/q6M4Uqg0S0l/data.json?var=firstday:2016-04-25&var=lastday:2016-05-01", function(json){
                    for (var i = 0; i < json.rows.length; i++) {
                        periodidL = json.rows[i][0];
                    }
                    console.log("periodid L--" + periodidL);

                    //    var orgunit1 = schemas[j].orgValue;

                    $.get("../../../api/sqlViews/" + idspFormPSqlViewId + "/data.json?var=valueType:int&var=periodid:" + periodidL + "&var=orgunit:" + orgunit, function (json) {
                        //   $.get("../../../api/sqlViews/udjdcBbz3OO/data.json?var=valueType:int&var=periodid:1053", function(json){
                        for (var i = 0; i < json.rows.length; i++) {
                            resultSQLView = json.rows[i][0];
                            confirmedCountL = resultSQLView;
                        }
                        console.log("resultSQLView for form L/ confirmedCountL--" + confirmedCountL);
						
						
						
				 $.get("../../../api/organisationUnitGroups/" +subcCountForLUid+ ".json?fields=organisationUnits[id,name]&paging=false",function(data) {
            //var _url = "../../../api/organisationUnitGroups/" +subcCountForSUid+ ".json?fields=organisationUnits[id,name]&paging=false";
            totalSubcentreCountL = data.organisationUnits.length;
        

                    });
                });
					

                });
                });
   

               promises1.push(generateApi_form_l(schemas[j],dataElementUid_form_l));
                promises1.push(generateApi_form_l(schemas[j],dataElementDeathUid_form_l));

                $.when.apply($, promises1).then(function (param,param1) {
                    updateRow_form_l(param[1],param,param1,confirmedCountL,populationDataArrLTotal,totalSubcentreCountL);
                    table_form_l= table1_form_l + table2_form_l;
                    document.getElementById("demo_form_l").innerHTML = table_form_l;

                });

            }

            $.when.apply($, promises1) // happens now
                .then(function () {
                    $.when.apply($, promises2) // happens now
                        .then(function () {
                            table_form_l = table1_form_l + table2_form_l;
                            document.getElementById("demo_form_l").innerHTML = table_form_l;
                        }, function (e) {
                            console.log("helloff "+e);
                        });
                }, function (e) {
                    console.log("hello "+e);
                });

        }, function (e) {
            console.log("My ajax failed");

        });
  
    });
    count =0;

}
// working code------------------

function updateRow_form_s(objItem_form_s,json,json1,confirmedCountS,populationDataArrSTotal,totalSubcentreCountS) {


    /****************************************************************************************************************/

            objItem_form_s.orgName = objItem_form_s.orgName.replace(/ /g, '-');
            //objItem_form_s.orgName = objItem_form_s.orgName.replace(' ', '-');
            table2_form_s += "<td>" + "<a onclick=getImmediateChildren_form_s('" + objItem_form_s.orgValue + "','" + objItem_form_s.orgName + "')>" + objItem_form_s.orgName + "</a>" + "</td>";

            if((json[0].rows.length>0)||(json1[0].rows.length>0)){

               // getConfirmedCountForFormS();
                var color;
                var result1=0;
                var result2=0;
                var result=[];
				var Deathresult=[];
                function sortArr(orderAr, attributeArr){
                    var item={};
                    var count123=1;
                    item["name"]=orderAr;
                    var n = orderAr.indexOf(";");
                    if(n==-1){
                        item["name"]=orderAr;
                        for(var j =0; j<json[0].rows.length; j++){
                            if(attributeArr[j][0]==orderAr){
                                item["value"]=attributeArr[j][2];
                                result.push(item);
                                console.log(result);
                                break;
                            }
                            else{
                                count123+=1;
                            }

                        }
                        if(count123>json[0].rows.length)
                        {item["value"]=0;
                            result.push(item);}
                    }

                    else
                    {

                        var kao= orderAr.substring(0,n);
                        var kao1= orderAr.substring(n+1,orderAr.length);
                        item["name"]=orderAr;
                        for(var j =0; j<json[0].rows.length; j++){
                            if(attributeArr[j][0]==kao){
                                result1=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(result);
                                break;
                            }
                        }
                        for(var j =0; j<json[0].rows.length; j++){
                            if(attributeArr[j][0]==kao1){
                                result2=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(result);
                                break
                            }
                        }
                        result3=(parseFloat(result1)+parseFloat(result2));
                        item["value"]=result3;
                        result.push(item);
                        var kao1= orderAr.substring(n+1,orderAr.length );
                        console.log(kao);
                        console.log(kao1);
                    }

                    return result;
                }

				
				
				 function sortDeathArr(orderAr, attributeArr){
                    var item={};
                    var count123=1;
                    item["name"]=orderAr;
                    var n = orderAr.indexOf(";");
                    if(n==-1){
                        item["name"]=orderAr;
                        for(var j =0; j<json1[0].rows.length; j++){
                            if(attributeArr[j][0]==orderAr){
                                item["value"]=attributeArr[j][2];
                                Deathresult.push(item);
                                console.log(Deathresult);
                                break;
                            }
                            else{
                                count123+=1;
                            }

                        }
                        if(count123>json1[0].rows.length)
                        {item["value"]=0;
                            Deathresult.push(item);}
                    }

                    else
                    {

                        var kao= orderAr.substring(0,n);
                        var kao1= orderAr.substring(n+1,orderAr.length);
                        item["name"]=orderAr;
                        for(var j =0; j<json1[0].rows.length; j++){
                            if(attributeArr[j][0]==kao){
                                result1=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(Deathresult);
                                break;
                            }
                        }
                        for(var j =0; j<json1[0].rows.length; j++){
                            if(attributeArr[j][0]==kao1){
                                result2=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(Deathresult);
                                break
                            }
                        }
                        result3=(parseFloat(result1)+parseFloat(result2));
                        item["value"]=result3;
                        Deathresult.push(item);
                        var kao1= orderAr.substring(n+1,orderAr.length );
                        console.log(kao);
                        console.log(kao1);
                    }

                    return Deathresult;
                }

				
				
				
				
				
				
				
				
				
				
                for(var i=0;i<orderArr_form_s.length;i++){
                    var caseresult = sortArr(orderArr_form_s[i], json[0].rows);
                    console.log(caseresult.length);

                }
				 for(var i=0;i<deathId_form_s.length;i++){
                    var deathresult = sortDeathArr(deathId_form_s[i], json1[0].rows);
                    console.log(deathresult.length);

                }
                var items = [];
                for (var l = 0; l < result.length; l++) {
					
					
					if((parseInt(deathresult[l].value)>0))
					{var item = parseInt(deathresult[l].value);
						if(confirmedCountS!=totalSubcentreCountS){
							
						 
                    table2_form_s += "<td  bgcolor=#ffb6c1>" +item+ " Deaths"
                        "</td>";
					}
					else
					{ 
                    table2_form_s += "<td  bgcolor=#ff0000>" +item+ " Deaths"
                        "</td>";
						
					}
					
					
					}
					else
						
					{
                            var minLimit =  populationDataArrSTotal / 1000.0 ;
                            var maxLimit =( populationDataArrSTotal / 1000.0) * 5 ;
                  
                            if ( confirmedCountS != totalSubcentreCountS )
                            {var item = parseInt(caseresult[l].value);
                               
								//pink
                               table2_form_s += "<td  bgcolor=#ffb6c1>" +item+ " cases"
                              "</td>";
                            }

                            if ( minLimit == 0 || maxLimit == 0 )
                            {//white
                               var item = parseInt(caseresult[l].value);
                               table2_form_s += "<td  bgcolor=#ffffff>" +item+ " Cases"
                               "</td>";
                            }

                            if ( caseresult[l] > maxLimit )
                            {//red
                               var item = parseInt(caseresult[l].value);
                              table2_form_s += "<td  bgcolor=#ff0000>" +item+ " Cases"
                              "</td>";
                            }
                            
                            else if (  caseresult[l] == 0  )
                            {//green
                                var item = parseInt(caseresult[l].value);
                                table2_form_s += "<td  bgcolor=#00ff00>" +item+ " Cases"
                               "</td>";
                            }
                            
                            else if ( caseresult[l]> 0 &&caseresult[l] <= maxLimit )
                            {//yellow
                                 var item = parseInt(caseresult[l].value);
                                 table2_form_s += "<td  bgcolor=#FFFF00>" +item+ " Cases"
                                 "</td>";
                            }
                            
                            
                        }
						
					

                  

                }
                console.log(items);

				}
            else{
                for (var l = 0; l < 11; l++) {
                    table2_form_s += "<td >" +"0 Cases"+
                        "</td>";

                }
            }


            //  table2_form_s = "<tr>" + table2_form_s + "</tr>"+"<td style='background:"+ currentColor +";padding:0 15px'>"+"</td>";

            table2_form_s = "<tr>" + table2_form_s + "</tr>";
            //  table_form_s = table1_form_s + table2_form_s;
            //  document.getElementById("demo_form_s").innerHTML = table_form_s;
 
        






 



}


function updateRow_form_p(objItem_form_p, json , json1 , confirmedCountP , populationDataArrPTotal , totalSubcentreCountP) {
	totalSubcentreCountP=1;
  

  objItem_form_p.orgName = objItem_form_p.orgName.replace(' ', '-');



            console.log("objectitem"+json);
            table2_form_p += "<td>" + "<a style=cursor: pointer; onclick=getImmediateChildren_form_p('" + objItem_form_p.orgValue + "','" + objItem_form_p.orgName + "')>" + objItem_form_p.orgName + "</a>" + "</td>";

            /****************************************************************************************************************/

             if((json[0].rows.length>0)||(json1[0].rows.length>0)){
           //     getConfirmedCountForFormP();
                var color;

                var result1=0;
                var result2=0;
                var result=[];
				var Deathresult=[];
                function sortArr(orderAr, attributeArr){
                    var item={};
                    var count123=1;
                    item["name"]=orderAr;
                    var n = orderAr.indexOf(";");
                    if(n==-1){
                        item["name"]=orderAr;

                        for(var j =0; j<json[0].rows.length; j++){

                            if(attributeArr[j][0]==orderAr){

                                item["value"]=attributeArr[j][2];
                                result.push(item);
                                console.log(result);
                                break;
                            }
                            else{
                                count123+=1;
                            }

                        }
                        if(count123>json[0].rows.length)
                        {item["value"]=0;
                            result.push(item);}


                    }


                    else
                    {

                        var kao= orderAr.substring(0,n);
                        var kao1= orderAr.substring(n+1,orderAr.length);
                        item["name"]=orderAr;
                        for(var j =0; j<json[0].rows.length; j++){
                            if(attributeArr[j][0]==kao){

                                result1=attributeArr[j][2];
                                vount=1;
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(result);
                                break;
                            }
                        }
                        for(var j =0; j<json[0].rows.length; j++){
                            if(attributeArr[j][0]==kao1){

                                result2=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(result);
                                break
                            }

                        }

                        result3=(parseFloat(result1)+parseFloat(result2));
                        item["value"]=result3;
                        result.push(item);
                        var kao1= orderAr.substring(n+1,orderAr.length );
                        console.log(kao);
                        console.log(kao1);
                    }



                    return result;
                }

				
				
				 function sortDeathArr(orderAr, attributeArr){
                    var item={};
                    var count123=1;
                    item["name"]=orderAr;
                    var n = orderAr.indexOf(";");
                    if(n==-1){
                        item["name"]=orderAr;
                        for(var j =0; j<json1[0].rows.length; j++){
                            if(attributeArr[j][0]==orderAr){
                                item["value"]=attributeArr[j][2];
                                Deathresult.push(item);
                                console.log(Deathresult);
                                break;
                            }
                            else{
                                count123+=1;
                            }

                        }
                        if(count123>json1[0].rows.length)
                        {item["value"]=0;
                            Deathresult.push(item);}
                    }

                    else
                    {

                        var kao= orderAr.substring(0,n);
                        var kao1= orderAr.substring(n+1,orderAr.length);
                        item["name"]=orderAr;
                        for(var j =0; j<json1[0].rows.length; j++){
                            if(attributeArr[j][0]==kao){
                                result1=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(Deathresult);
                                break;
                            }
                        }
                        for(var j =0; j<json1[0].rows.length; j++){
                            if(attributeArr[j][0]==kao1){
                                result2=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(Deathresult);
                                break
                            }
                        }
                        result3=(parseFloat(result1)+parseFloat(result2));
                        item["value"]=result3;
                        Deathresult.push(item);
                        var kao1= orderAr.substring(n+1,orderAr.length );
                        console.log(kao);
                        console.log(kao1);
                    }

                    return Deathresult;
                }
				
				
				for(var i=0;i<orderArr_form_p.length;i++){
                    var caseresult = sortArr(orderArr_form_p[i], json[0].rows);
                    console.log(caseresult.length);

                }
				  
				 for(var i=0;i<deathId_form_p.length;i++){
                    var deathresult = sortDeathArr(deathId_form_p[i], json1[0].rows);
                    console.log(deathresult.length);

                }

             
                var items = [];
             for (var l = 0; l < result.length; l++) {
					
					
					if((parseInt(deathresult[l].value)>0))
					{var item = parseInt(deathresult[l].value);
						if(confirmedCountP!=totalSubcentreCountP){
							
						 
                    table2_form_p += "<td  bgcolor=#ffb6c1>" +item+ " Deaths"
                        "</td>";
					}
					else
					{ 
                    table2_form_p += "<td  bgcolor=#ff0000>" +item+ " Deaths"
                        "</td>";
						
					}
					
					
					}
					else
						
					{
                            var minLimit =  populationDataArrPTotal / 1000.0 ;
                            var maxLimit =( populationDataArrPTotal / 1000.0) * 5 ;
                  
                            if ( confirmedCountP != totalSubcentreCountP )
                            {var item = parseInt(caseresult[l].value);
                               
								//pink
                               table2_form_p += "<td  bgcolor=#ffb6c1>" +item+ " cases"
                              "</td>";
                            }

                            if ( minLimit == 0 || maxLimit == 0 )
                            {//white
                               var item = parseInt(caseresult[l].value);
                               table2_form_p += "<td  bgcolor=#ffffff>" +item+ " cases"
                               "</td>";
                            }

                            if ( caseresult[l] > maxLimit )
                            {//red
                               var item = parseInt(caseresult[l].value);
                              table2_form_p += "<td  bgcolor=#ff0000>" +item+ " cases"
                              "</td>";
                            }
                            
                            else if (  caseresult[l] == 0  )
                            {//green
                                var item = parseInt(caseresult[l].value);
                                table2_form_p += "<td  bgcolor=#00ff00>" +item+ " cases"
                               "</td>";
                            }
                            
                            else if ( caseresult[l]> 0 &&caseresult[l] <= maxLimit )
                            {//yellow
                                 var item = parseInt(caseresult[l].value);
                                 table2_form_p += "<td  bgcolor=#FFFF00>" +item+ " cases"
                                 "</td>";
                            }
                            
                            
                        }
						
					

                  

                }
                console.log(items);
}
            else{
                for (var l = 0; l < 24; l++) {
                    table2_form_p += "<td>" +" 0 Cases "+
                        "</td>";

                }
            }

            table2_form_p = "<tr>" + table2_form_p + "</tr>";
            // table_form_p = table1_form_p + table2_form_p;
            //document.getElementById("demo_form_p").innerHTML = table_form_p;
       









}
function updateRow_form_l(objItem_form_l,json,json1,confirmedCountL,populationDataArrLTotal,totalSubcentreCountL) {
totalSubcentreCountL=1;

    // color = getColorForFormS();


  

            objItem_form_l.orgName = objItem_form_l.orgName.replace(' ', '-');

            // color for s//


            //console.log("objectitem"+json);
            //table2_form_p += "<td>" + "<a style=cursor: pointer; onclick=getImmediateChildren_form_p('" + objItem_form_s.orgValue + "','" + objItem_form_s.orgName + "')>" + objItem_form_p.orgName + "</a>" + "</td>";

            // console.log("objectitem"+json);
            table2_form_l += "<td>" + "<a onclick=getImmediateChildren_form_l('" + objItem_form_l.orgValue + "','" + objItem_form_l.orgName + "')>" + objItem_form_l.orgName + "</a>" + "</td>";

            /****************************************************************************************************************/

            if((json[0].rows.length>0)||(json1[0].rows.length>0)){

               // getConfirmedCountForFormL();
                var color;
                var result1=0;
                var result2=0;
                var result=[];
				var Deathresult=[];
                function sortArr(orderAr, attributeArr){
                    var item={};
                    var count123=1;
                    item["name"]=orderAr;
                    var n = orderAr.indexOf(";");
                    if(n==-1){
                        item["name"]=orderAr;
                        for(var j =0; j<json[0].rows.length; j++){
                            if(attributeArr[j][0]==orderAr){
                                item["value"]=attributeArr[j][2];
                                result.push(item);
                                console.log(result);
                                break;
                            }
                            else{count123+=1;}

                        }

                        if(count123>json[0].rows.length)
                        {item["value"]=0;
                            result.push(item);}
                    }

                    else
                    {

                        var kao= orderAr.substring(0,n);
                        var kao1= orderAr.substring(n+1,orderAr.length);
                        item["name"]=orderAr;
                        for(var j =0; j<json[0].rows.length; j++){
                            if(attributeArr[j][0]==kao){
                                result1=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(result);
                                break;
                            }
                        }
                        for(var j =0; j<json[0].rows.length; j++){
                            if(attributeArr[j][0]==kao1){
                                result2=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(result);
                                break
                            }
                        }
                        result3=(parseFloat(result1)+parseFloat(result2));
                        item["value"]=result3;
                        result.push(item);
                        var kao1= orderAr.substring(n+1,orderAr.length );
                        console.log(kao);
                        console.log(kao1);
                    }

                    return result;
                }

				function sortDeathArr(orderAr, attributeArr){
                    var item={};
                    var count123=1;
                    item["name"]=orderAr;
                    var n = orderAr.indexOf(";");
                    if(n==-1){
                        item["name"]=orderAr;
                        for(var j =0; j<json1[0].rows.length; j++){
                            if(attributeArr[j][0]==orderAr){
                                item["value"]=attributeArr[j][2];
                                Deathresult.push(item);
                                console.log(Deathresult);
                                break;
                            }
                            else{
                                count123+=1;
                            }

                        }
                        if(count123>json1[0].rows.length)
                        {item["value"]=0;
                            Deathresult.push(item);}
                    }

                    else
                    {

                        var kao= orderAr.substring(0,n);
                        var kao1= orderAr.substring(n+1,orderAr.length);
                        item["name"]=orderAr;
                        for(var j =0; j<json1[0].rows.length; j++){
                            if(attributeArr[j][0]==kao){
                                result1=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(Deathresult);
                                break;
                            }
                        }
                        for(var j =0; j<json1[0].rows.length; j++){
                            if(attributeArr[j][0]==kao1){
                                result2=attributeArr[j][2];
                                /*item["value"]=attributeArr[j][2];
                                 result.push(item);*/
                                console.log(Deathresult);
                                break
                            }
                        }
                        result3=(parseFloat(result1)+parseFloat(result2));
                        item["value"]=result3;
                        Deathresult.push(item);
                        var kao1= orderAr.substring(n+1,orderAr.length );
                        console.log(kao);
                        console.log(kao1);
                    }

                    return Deathresult;
                }
				
				
				
                for(var i=0;i<orderArr_form_l.length;i++){
                    var caseresult = sortArr(orderArr_form_l[i], json[0].rows);
                    console.log(caseresult.length);

                }
				  
				 for(var i=0;i<deathId_form_l.length;i++){
                    var deathresult = sortDeathArr(deathId_form_l[i], json1[0].rows);
                    console.log(deathresult.length);

                }
                var items = [];
              

             for (var l = 0; l < result.length; l++) {
					
					
					if((parseInt(deathresult[l].value)>0))
					{
						var item = parseInt(deathresult[l].value);
						if(confirmedCountL!=totalSubcentreCountL)
						{
					
                    table2_form_l += "<td  bgcolor=#ffb6c1>" +item+ " Deaths"
                        "</td>";
					}
					else
					{ 
                    table2_form_l += "<td  bgcolor=#ff0000>" +item+ " Deaths"
                        "</td>";
						
					}
					
					
					}
					
					
					 else if( parseInt( caseColorValidation_form_l[l] ) != -1 && caseresult[l].value >= parseInt( caseColorValidation_form_l[l] ) )
                        {
							
							
							var item = parseInt(caseresult[l].value);
                               
								//pink
                               table2_form_l += "<td  bgcolor=#ff0000>" +item+ " cases"
                              "</td>";
                           
                        }
					else
						
					{
                            var minLimit =  populationDataArrLTotal / 1000.0 ;
                            var maxLimit =( populationDataArrLTotal / 1000.0) * 5 ;
                  
                            if ( confirmedCountL != totalSubcentreCountL )
                            {var item = parseInt(caseresult[l].value);
                               
								//pink
                               table2_form_l += "<td  bgcolor=#ffb6c1>" +item+ " cases"
                              "</td>";
                            }

                            if ( minLimit == 0 || maxLimit == 0 )
                            {//white
                               var item = parseInt(caseresult[l].value);
                               table2_form_l += "<td  bgcolor=#ffffff>" +item+ " cases"
                               "</td>";
                            }

                            if ( caseresult[l] > maxLimit )
                            {//red
                               var item = parseInt(caseresult[l].value);
                              table2_form_l += "<td  bgcolor=#ff0000>" +item+ " cases"
                              "</td>";
                            }
                            
                            else if (  caseresult[l] == 0  )
                            {//green
                                var item = parseInt(caseresult[l].value);
                                table2_form_l += "<td  bgcolor=#00ff00>" +item+ " cases"
                               "</td>";
                            }
                            
                            else if ( caseresult[l]> 0 &&caseresult[l] <= maxLimit )
                            {//yellow
                                 var item = parseInt(caseresult[l].value);
                                 table2_form_l += "<td  bgcolor=#FFFF00>" +item+ " cases"
                                 "</td>";
                            }
                            
                            
                        }
						
					

                  

                }
				
				}
            else{
                for (var l = 0; l < 15; l++) {
                    table2_form_l += "<td>" +"0 Cases "+
                        "</td>";

                }
            }

            table2_form_l = "<tr>" + table2_form_l + "</tr>";
            //table_form_l = table1_form_l + table2_form_l;
            //document.getElementById("demo_form_l").innerHTML = table_form_l;




}




function population_form_s(){
		
	
	 var _url = "../../../api/analytics.json?dimension=dx:" + populationDeSemiColonSeperated + "&dimension=pe:" + year1 + "&filter=ou:" + objItem_form_s.orgValue + "&aggregationType=SUM";
    console.log(_url);



    var dfd = jQuery.Deferred();
    $.ajax({
        url: _url,

        success: function (data) {
            dfd.resolve(data,objItem_form_s);
        },
        timeout: 20000
    }).fail(function (xhr, status) {
        if (status == "timeout") {
            dfd.reject(status)
        }
    });

    return dfd.promise();
	
	
	
}
function generateApi_form_s(objItem_form_s,data) {
    var _url = "../../../api/analytics.json?dimension=dx:" + data + "&dimension=pe:" + period + "&filter=ou:" + objItem_form_s.orgValue;
    console.log(_url);



    var dfd = jQuery.Deferred();
    $.ajax({
        url: _url,

        success: function (data) {
            dfd.resolve(data,objItem_form_s);
        },
        timeout: 20000
    }).fail(function (xhr, status) {
        if (status == "timeout") {
            dfd.reject(status)
        }
    });

    return dfd.promise();
    //});

}


function generateApi_form_p(objItem_form_p,data) {
    var _url = "../../../api/analytics.json?dimension=dx:" + data + "&dimension=pe:" + period + "&filter=ou:" + objItem_form_p.orgValue;
    console.log(_url);

    var dfd = jQuery.Deferred();
    $.ajax({
        url: _url,
        success: function (data) {
            dfd.resolve(data,objItem_form_p);
        },
        timeout: 20000
    }).fail(function (xhr, status) {
        if (status == "timeout") {
            dfd.reject(status)
        }
    });

    return dfd.promise();
    //});

}

function generateApi_form_l(objItem_form_l) {
    var _url = "../../../api/analytics.json?dimension=dx:" + dataElementUid_form_l + "&dimension=pe:" + period + "&filter=ou:" + objItem_form_l.orgValue;
    console.log(_url);

    var dfd = jQuery.Deferred();
    $.ajax({
        url: _url,
        success: function (data) {
            dfd.resolve(data,objItem_form_l);
        },
        timeout: 20000
    }).fail(function (xhr, status) {
        if (status == "timeout") {
            dfd.reject(status)
        }
    });

    return dfd.promise();
    //});
}

// methods for IDSP OUTBREAK
