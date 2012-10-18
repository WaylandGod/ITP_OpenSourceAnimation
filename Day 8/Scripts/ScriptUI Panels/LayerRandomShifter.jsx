{//   LayerRandomShifter.jsx//   Feb 2008 Lloyd Alvarez  http://aescripts.com//	 Aug 2008 - ScriptUI Panel version//   Randomly shift layers within  user defined range////	function RandomLayerShifter(thisObj)	{		// Globals		var ls_Data = new Object();			ls_Data.scriptName = "Layer Random Shifter";		ls_Data.scriptTitle = ls_Data.scriptName + " v1.1";		ls_Data.minTxt = "Min";		ls_Data.minDef = "-60";		ls_Data.maxTxt = "Max";		ls_Data.maxDef = "30";		ls_Data.strButton = "Shift \\'em!";		ls_Data.strHelp = "?";		ls_Data.strMinAE80 = "This script requires Adobe After Effects CS3 or later.";		ls_Data.strSelComp = "Please select an active comp to use this script.";		ls_Data.strSelProj = "Please open a project first to use this script.";		ls_Data.strSelLayers = "Please select select some layers to shift!";		ls_Data.strHelpText = "©2008 http://aescripts.com\n\n" +			"Min is the minimum number of frames to shift the layer,\nuse negative numbers to shift layer backwards\n" +			"Max is the maximum number of frames to shift the layer\n\n" +			"Note: This version of the script requires After Effects CS3 or later. It can be used as a dockable panel by placing the script in a ScriptUI Panels subfolder of the Scripts folder, and then choosing this script from the Window menu.\n";				// buildUI()		function RandomLayerShifter_buildUI(thisObj)		{			var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", ls_Data.scriptName, undefined, {resizeable:true});						if (pal != null)			{				var res =				"group { \					orientation:'column', alignment:['left','top'], \					main: Group { \						alignment:['left','top'], \						minTxt: StaticText { text:'" + ls_Data.minTxt + "', alignment:['left','left'] }, \						minVal: EditText {  characters:3, alignment:['left','left'] }, \						maxTxt: StaticText { text:'" + ls_Data.maxTxt + "', alignment:['left','left'] }, \						maxVal: EditText {  characters:3, alignment:['left','left'] }, \					}, \					footer: Group { \						alignment:['fill','top'], \						help: Button { text:'" + ls_Data.strHelp +"', maximumSize:[30,20], alignment:['left','center'] }, \						shiftBtn: Button { text:'" + ls_Data.strButton +"', maximumSize:[80,20], alignment:['right','center'] }, \					}, \				} ";				pal.grp = pal.add(res);								// Workaround to ensure the edittext text color is black, even at darker UI brightness levels				var winGfx = pal.graphics;				var darkColorBrush = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [0,0,0], 1);				pal.grp.main.minVal.graphics.foregroundColor = darkColorBrush;				pal.grp.main.maxVal.graphics.foregroundColor = darkColorBrush;								pal.grp.main.minVal.text = ls_Data.minDef;				pal.grp.main.maxVal.text = ls_Data.maxDef;				pal.layout.layout(true);				pal.grp.minimumSize = pal.grp.size;				pal.layout.resize();				pal.onResizing = pal.onResize = function () {this.layout.resize();}								pal.grp.footer.help.onClick = function () {alert(ls_Data.scriptTitle + "\n" + ls_Data.strHelpText, ls_Data.scriptName);}				pal.grp.footer.shiftBtn.onClick = shiftEm;			} //close if pal!=null						return pal;		} // close LayerShift_builtUI										// main function		function shiftEm()		{				var proj = app.project;				var undoStr = ls_Data.scriptName;				if (proj){				var myComp = app.project.activeItem;			if (myComp != null && (myComp instanceof CompItem)){				var selectedLayers = myComp.selectedLayers;				if (selectedLayers.length != 0) {								min=parseInt(this.parent.parent.main.minVal.text)*myComp.frameDuration;				max=parseInt(this.parent.parent.main.maxVal.text)*myComp.frameDuration;				for (i = 0; i < selectedLayers.length; ++i) {					var myRandom = min + (max-min)*Math.random()  						var currentLayer = selectedLayers[i];					currentLayer.startTime += myRandom;										} // for close				app.endUndoGroup();				} // if selected layers close			else 			{alert(ls_Data.strSelLayers);}				} // if myComp close				else 					{alert(ls_Data.strSelComp);} 				} // if proj close			else{alert(ls_Data.strSelProj);}		} //shiftem close										// main code:		//				// Prerequisites check		if (parseFloat(app.version) < 8.0)			alert(rs_Data.strMinAE80, ls_Data.scriptName);		else		{			// Build and show the console's floating palette			var myPal = RandomLayerShifter_buildUI(thisObj);			if (myPal != null)			{				/*				// Update UI values, if saved in the settings				if (app.settings.haveSetting("aescripts", "LayerRandomShifterMin"))					{myPal.grp.main.min.text = parseInt(app.settings.getSetting("aescripts", "LayerRandomShifterMin"));}				if (app.settings.haveSetting("aescripts", "LayerRandomShifterMax"))					{myPal.grp.main.max.text = parseInt(app.settings.getSetting("aescripts", "LayerRandomShifterMax"));}			// Save current UI settings upon closing the palette				myPal.onClose = function()				{					app.settings.saveSetting("aescripts", "LayerRandomShifterMin", myPal.grp.main.min.text);					app.settings.saveSetting("aescripts", "LayerRandomShifterMax", myPal.grp.main.max.text);				}				*/								if (myPal instanceof Window)				{					// Show the palette					myPal.center();					myPal.show();				}				else					{myPal.layout.layout(true);}			}  // if myPal close		} // prereq close	} //layer shifter close		RandomLayerShifter(this);} //main close